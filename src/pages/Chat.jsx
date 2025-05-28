import React, { useEffect, useRef, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Chat() {
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [supplierId, setSupplierId] = useState("");
  const [supplierList, setSupplierList] = useState([]);
  const [supplierNameMap, setSupplierNameMap] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [supplierInput, setSupplierInput] = useState("");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [aiUsed, setAiUsed] = useState(0);
  const chatEndRef = useRef(null);
  const query = useQuery();

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setIsPremium(data.premium || false);
          setAiUsed(data.aiUsed || 0);
        }

        const incomingSupplier = query.get("supplier");
        const incomingName = query.get("name");
        const seedMessage = query.get("seedMessage");

        if (incomingSupplier) {
          setSupplierId(incomingSupplier);

          const chatRef = doc(
            db,
            "users",
            firebaseUser.uid,
            "chats",
            incomingSupplier
          );
          const chatSnap = await getDoc(chatRef);

          if (!chatSnap.exists()) {
            const chatDocs = await getDocs(
              collection(db, "users", firebaseUser.uid, "chats")
            );
            if (!isPremium && chatDocs.size >= 1) {
              setShowUpgradeModal(true);
              return;
            }

            const messageArray = seedMessage
              ? [
                  {
                    from: "user",
                    text: decodeURIComponent(seedMessage),
                    timestamp: Date.now(),
                  },
                ]
              : [];

            await setDoc(chatRef, {
              name: decodeURIComponent(incomingName || incomingSupplier),
              messages: messageArray,
              updatedAt: serverTimestamp(),
            });
          }
        }

        await loadSupplierList(firebaseUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadSupplierList = async (uid) => {
    const chatCollection = collection(db, "users", uid, "chats");
    const chatDocs = await getDocs(chatCollection);
    const names = {};
    const ids = [];
    chatDocs.forEach((doc) => {
      ids.push(doc.id);
      names[doc.id] = doc.data().name || doc.id;
    });
    setSupplierList(ids);
    setSupplierNameMap(names);
  };

  useEffect(() => {
    const loadMessages = async () => {
      if (!user || !supplierId) return;
      setLoading(true);
      const chatRef = doc(db, "users", user.uid, "chats", supplierId);
      const chatSnap = await getDoc(chatRef);
      if (chatSnap.exists()) {
        const data = chatSnap.data();
        setMessages(data.messages || []);
      } else {
        setMessages([]);
      }
      setLoading(false);
    };
    loadMessages();
  }, [user, supplierId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveMessagesToFirebase = async (newMessages) => {
    if (!user || !supplierId) return;
    const chatRef = doc(db, "users", user.uid, "chats", supplierId);
    await setDoc(chatRef, {
      name: supplierNameMap[supplierId] || supplierId,
      messages: newMessages,
      updatedAt: serverTimestamp(),
    });
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { from: "user", text: input, timestamp: Date.now() };
    const updated = [...messages, newMessage];
    setMessages(updated);
    saveMessagesToFirebase(updated);
    setInput("");
  };

  const simulateSupplierReply = () => {
    if (!supplierInput.trim()) return;
    const newMessage = {
      from: "supplier",
      text: supplierInput,
      timestamp: Date.now(),
    };
    const updated = [...messages, newMessage];
    setMessages(updated);
    saveMessagesToFirebase(updated);
    setSupplierInput("");
  };

  const askImportChimp = async () => {
    if (!isPremium && aiUsed >= 1) {
      setShowUpgradeModal(true);
      return;
    }

    const context = messages
      .map((msg) => {
        return `${
          msg.from === "user"
            ? "User"
            : msg.from === "supplier"
            ? "Supplier"
            : "System"
        }: ${msg.text}`;
      })
      .join("\n");

    const prompt = `You're an experienced sourcing consultant assisting a dropshipper who is communicating with a supplier. Here is the full message history so far:\n\n${context}\n\nNow suggest the next message the dropshipper should send. The tone should be friendly and professional. Subtly give them a strategic edge by making suggestions that sound like great ideas for the manufacturer too.`;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 200,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
        }
      );

      const aiText = response.data.choices[0].message.content;
      const newMessage = { from: "chimp", text: aiText, timestamp: Date.now() };
      const updated = [...messages, newMessage];
      setMessages(updated);
      saveMessagesToFirebase(updated);

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { aiUsed: increment(1) }, { merge: true });
      setAiUsed((prev) => prev + 1);
    } catch (error) {
      console.error("OpenAI error:", error);
      alert("ImportChimp had trouble responding.");
    }
  };

  const deleteChat = async () => {
    if (!user || !supplierId) return;
    await deleteDoc(doc(db, "users", user.uid, "chats", supplierId));
    setSupplierId("");
    await loadSupplierList(user.uid);
    setMessages([]);
  };

  const renameChat = async () => {
    const newName = prompt(
      "Enter new name for this supplier:",
      supplierNameMap[supplierId]
    );
    if (!newName || !user || !supplierId) return;
    const chatRef = doc(db, "users", user.uid, "chats", supplierId);
    await setDoc(chatRef, { name: newName }, { merge: true });
    await loadSupplierList(user.uid);
  };

  const addNewChat = async () => {
    const newId = prompt("Enter a supplier ID to start chat:");
    if (!newId || !user) return;
    if (!isPremium && supplierList.length >= 1) {
      setShowUpgradeModal(true);
      return;
    }
    await setDoc(doc(db, "users", user.uid, "chats", newId), {
      name: newId,
      messages: [],
      updatedAt: serverTimestamp(),
    });
    setSupplierId(newId);
    await loadSupplierList(user.uid);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 space-y-4">
      {showUpgradeModal && (
        <div className="bg-white border border-gray-300 p-4 rounded-md shadow-md text-center">
          <h2 className="text-lg font-bold mb-2">
            🔒 Upgrade to ImportMate Premium
          </h2>
          <p className="text-gray-700 mb-4">
            You've used your free trial. Unlock unlimited supplier chats and AI
            replies by upgrading to Premium.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-black text-white px-4 py-2 rounded-md">
              Upgrade
            </button>
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="bg-gray-200 px-4 py-2 rounded-md"
            >
              Not now
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mb-2">
        <select
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
          className="flex-1 border rounded-md px-3 py-2 text-black"
        >
          <option value="" disabled>
            Select a supplier...
          </option>
          {supplierList.map((id) => (
            <option key={id} value={id}>
              {supplierNameMap[id] || id}
            </option>
          ))}
        </select>
        <button className="text-xl px-2" onClick={addNewChat}>
          ➕
        </button>
        <button className="text-xl px-2" onClick={renameChat}>
          ✏️
        </button>
        <button className="text-xl px-2 text-red-500" onClick={deleteChat}>
          ❌
        </button>
      </div>

      <h1 className="text-2xl font-bold text-center mb-4">
        Chat with {supplierNameMap[supplierId] || supplierId || "Supplier"}
      </h1>

      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-white shadow-sm space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`space-y-1 ${
              msg.from === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block max-w-xs px-4 py-2 rounded-lg ${
                msg.from === "user"
                  ? "bg-blue-500 text-white"
                  : msg.from === "chimp"
                  ? "bg-yellow-100 text-black italic"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
            <div className="text-xs text-gray-500">
              {msg.from} • {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-md px-4 py-2 text-black"
          placeholder="Your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={sendMessage}
        >
          Send
        </button>
        <button
          className="bg-gray-200 px-4 py-2 rounded-md"
          onClick={askImportChimp}
        >
          Ask ImportChimp
        </button>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="text"
          className="flex-1 border rounded-md px-4 py-2 text-black"
          placeholder="Simulate supplier reply..."
          value={supplierInput}
          onChange={(e) => setSupplierInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && simulateSupplierReply()}
        />
        <button
          className="bg-gray-300 px-4 py-2 rounded-md"
          onClick={simulateSupplierReply}
        >
          Submit Supplier
        </button>
      </div>
    </div>
  );
}

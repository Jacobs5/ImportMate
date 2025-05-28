import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Generate() {
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [aiUsed, setAiUsed] = useState(0);

  const [product, setProduct] = useState("");
  const [destination, setDestination] = useState("");
  const [quantity, setQuantity] = useState("");
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
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
      }
    });
    return () => unsubscribe();
  }, []);

  const generateMessage = async () => {
    if (!product.trim() || !destination.trim() || !quantity.trim()) return;

    if (!isPremium && aiUsed >= 1) {
      setShowUpgradeModal(true);
      return;
    }

    const message = `Hello, we’re currently sourcing ${product.trim()} for delivery to ${destination.trim()}. We're considering ordering ${quantity.trim()} units and would appreciate details on your MOQ, pricing, and shipping timelines. We’re looking to onboard a reliable supplier soon.`;
    setGeneratedMessage(message);

    if (user) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { aiUsed: increment(1) }, { merge: true });
      setAiUsed((prev) => prev + 1);

      const visionId = `${Date.now()}`;
      await setDoc(doc(db, "users", user.uid, "vision", visionId), {
        input: `${product}, ${destination}, ${quantity}`,
        message,
        timestamp: serverTimestamp(),
      });
    }
  };

  const goToChat = () => {
    navigate(
      `/chat?supplier=${Date.now()}&name=New%20Supplier&seedMessage=${encodeURIComponent(
        generatedMessage
      )}`
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 space-y-4">
      {showUpgradeModal && (
        <div className="bg-white border border-gray-300 p-4 rounded-md shadow-md text-center">
          <h2 className="text-lg font-bold mb-2">
            🔒 Upgrade to ImportMate Premium
          </h2>
          <p className="text-gray-700 mb-4">
            Unlock unlimited AI-powered messages and conversions by upgrading.
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

      <h1 className="text-2xl font-bold text-center mb-4">
        Generate a Supplier Inquiry
      </h1>

      <input
        type="text"
        placeholder="What product are you sourcing?"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="w-full border rounded-md px-4 py-2 text-black"
      />

      <input
        type="text"
        placeholder="Shipping destination (e.g., Canada)"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="w-full border rounded-md px-4 py-2 text-black"
      />

      <input
        type="text"
        placeholder="How many units are you interested in?"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full border rounded-md px-4 py-2 text-black"
      />

      <button
        className="w-full bg-black text-white px-4 py-2 rounded-md"
        onClick={generateMessage}
      >
        Generate Inquiry
      </button>

      {generatedMessage && (
        <div className="border rounded-md p-4 bg-white shadow-sm space-y-2">
          <h2 className="font-bold text-lg">Generated Inquiry:</h2>
          <p className="text-black whitespace-pre-line">{generatedMessage}</p>

          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={goToChat}
          >
            Start Manufacturer Chat ➜
          </button>
        </div>
      )}
    </div>
  );
}

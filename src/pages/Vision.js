import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Vision() {
  const [user, setUser] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await loadInquiries(firebaseUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadInquiries = async (uid) => {
    const inquiryCollection = collection(db, "users", uid, "visionBoard");
    const inquiryDocs = await getDocs(inquiryCollection);
    const loaded = inquiryDocs.docs.map((doc) => ({
      id: doc.id,
      tag: "Inquiry",
      ...doc.data(),
    }));
    setInquiries(loaded);
  };

  const deleteInquiry = async (id) => {
    if (!user || !id) return;
    const confirmed = window.confirm(
      "Remove this inquiry from your Vision Board?"
    );
    if (!confirmed) return;
    await deleteDoc(doc(db, "users", user.uid, "visionBoard", id));
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  const startChat = async (message) => {
    const name = prompt("What would you like to name this manufacturer?");
    if (!name || !name.trim()) return;
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const encodedMessage = encodeURIComponent(message);
    const encodedName = encodeURIComponent(name.trim());
    navigate(
      `/chat?supplier=${slug}&seedMessage=${encodedMessage}&name=${encodedName}`
    );
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Vision Board</h1>

      {inquiries.length === 0 ? (
        <p className="text-center text-gray-500">No saved inquiries yet.</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="p-4 bg-white border rounded shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {inq.tag || "Inquiry"}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startChat(inq.message)}
                    className="text-sm bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded"
                  >
                    Start Chat
                  </button>
                  <button
                    onClick={() => deleteInquiry(inq.id)}
                    className="text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-800 whitespace-pre-line">{inq.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

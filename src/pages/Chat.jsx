import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles.css';

function Chat() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [supplierReply, setSupplierReply] = useState('');
  const [hasSeeded, setHasSeeded] = useState(false);

  // Fake premium check for now: logged-in users = premium
  const premium = isLoggedIn;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const seedMessage = params.get('seedMessage');

    if (seedMessage && !hasSeeded) {
      const readableName = seedMessage.slice(0, 30) + '...';
      setSelectedSupplier(readableName);
      setMessages([{ sender: 'user', text: decodeURIComponent(seedMessage) }]);
      setHasSeeded(true);
    }
  }, [location.search, hasSeeded]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
    setInput('');
  };

  const handleSupplierSubmit = () => {
    if (!supplierReply.trim()) return;
    setMessages((prev) => [...prev, { sender: 'supplier', text: supplierReply }]);
    setSupplierReply('');
  };

  return (
    <div className="container">
      {!premium && (
        <div className="p-4 border border-yellow-400 rounded bg-yellow-100 text-black mb-6">
          <h2 className="font-bold mb-2 text-lg">🔒 Upgrade to ImportMate Premium</h2>
          <p className="mb-3">
            You've used your free trial. Unlock unlimited supplier chats and AI replies by upgrading to Premium.
          </p>
          <div className="flex gap-2">
            <button className="btn" onClick={() => window.location.href = '/upgrade'}>
              Upgrade
            </button>
            <button className="btn-secondary">Not now</button>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold text-brand-blue mb-4">
        Chat with {selectedSupplier || 'your supplier'}
      </h2>

      <div className="border border-gray-700 rounded p-3 h-64 overflow-y-auto bg-gray-900 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span
              className={`inline-block px-3 py-2 rounded ${
                msg.sender === 'user' ? 'bg-brand-blue text-white' : 'bg-gray-800 text-white'
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex mb-3 gap-2">
        <input
          type="text"
          className="input flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Your message..."
        />
        <button className="btn" onClick={handleSend}>Send</button>
        <button className="btn-secondary">Ask ImportChimp</button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="input flex-1"
          value={supplierReply}
          onChange={(e) => setSupplierReply(e.target.value)}
          placeholder="Simulate supplier reply..."
        />
        <button className="btn-secondary" onClick={handleSupplierSubmit}>
          Submit Supplier
        </button>
      </div>
    </div>
  );
}

export default Chat;

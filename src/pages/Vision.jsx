import React, { useState } from 'react';
import '../styles.css';

function Vision() {
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      label: 'iPhone 15 Case Order',
      message: 'Hello, we’re currently sourcing iPhone 15 cases for delivery to Canada. We’re looking to place an order of 500 units.',
      tags: ['Cases', 'Mobile', '500 units']
    },
    {
      id: 2,
      label: 'Gaming Mouse Bulk Inquiry',
      message: 'We’re sourcing high-precision gaming mice with customizable RGB lighting. Target quantity is 1,000 units to US warehouses.',
      tags: ['Gaming', 'Mouse', '1000 units']
    },
  ]);

  const handleStartChat = (message) => {
    const encoded = encodeURIComponent(message);
    window.location.href = `/chat?seedMessage=${encoded}`;
  };

  const handleDelete = (id) => {
    setInquiries(inquiries.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold text-brand-blue mb-6">Your Vision Board</h1>

      {inquiries.length === 0 ? (
        <p className="text-gray-400">No saved inquiries yet.</p>
      ) : (
        <div className="space-y-6">
          {inquiries.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 p-4 rounded border border-gray-700"
            >
              <h2 className="text-lg font-semibold text-white mb-2">{item.label}</h2>
              <div className="flex flex-wrap gap-2 mb-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-brand-blue/20 text-brand-blue px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-300 mb-3">{item.message}</p>
              <div className="flex gap-3">
                <button
                  className="btn"
                  onClick={() => handleStartChat(item.message)}
                >
                  Start Chat
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => handleDelete(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Vision;

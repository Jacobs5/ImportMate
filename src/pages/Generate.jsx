import React, { useState } from 'react';

function Generate() {
  const [product, setProduct] = useState('');
  const [destination, setDestination] = useState('');
  const [quantity, setQuantity] = useState('');
  const [inquiry, setInquiry] = useState('');
  const [loading, setLoading] = useState(false);

  const generateInquiry = async () => {
    if (!product || !destination || !quantity) {
      alert('Please fill in all fields.');
      return;
    }
    setLoading(true);
    const prompt = `Hello, we are currently sourcing ${product} for delivery to ${destination}. We're interested in ordering ${quantity} units. Could you please provide us with pricing, shipping times, and any minimum order requirements?`;

    setTimeout(() => {
      setInquiry(prompt);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-semibold text-blue-400 mb-6">Generate Inquiry</h1>

        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">Product Type</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="e.g. iPhone 15 cases"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">Shipping Destination</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Canada"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">Quantity</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 500"
          />
        </div>

        <button
          onClick={generateInquiry}
          className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded transition duration-200"
        >
          Generate
        </button>

        {loading && (
          <div className="mt-6 text-orange-400 animate-pulse text-sm">🧠 ImportChimp is generating your message...</div>
        )}

        {inquiry && !loading && (
          <div className="mt-6 p-4 bg-gray-800 rounded border border-gray-700">
            <h2 className="text-blue-300 font-semibold mb-2">Generated Inquiry:</h2>
            <p className="text-gray-200 whitespace-pre-wrap">{inquiry}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Generate;

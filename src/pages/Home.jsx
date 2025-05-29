import React from 'react';
import '../styles.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container text-center py-12">
      <h1 className="text-4xl font-bold text-white mb-4">
        <span className="text-brand-blue">ImportMate</span><span className="text-brand-orange">.</span>
      </h1>

      <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
        ImportMate is your AI-powered sourcing assistant. Effortlessly generate supplier-ready inquiry messages, manage communication, and scale your dropshipping business with clarity and speed.
      </p>

      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        <Link to="/generate" className="btn">
          Try It Free
        </Link>
        <Link to="/upgrade" className="btn-secondary">
          Upgrade to Premium
        </Link>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded p-6 max-w-4xl mx-auto mb-12">
        <h2 className="text-xl text-brand-blue font-semibold mb-4">What You Can Do with ImportMate</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2 text-left">
          <li>✨ Instantly generate supplier inquiry messages using AI</li>
          <li>💬 Manage conversations with manufacturers in one place</li>
          <li>🔒 Unlock unlimited chats and AI guidance with Premium</li>
          <li>🚀 Save time, reduce errors, and grow with confidence</li>
        </ul>
      </div>

      <div className="max-w-4xl mx-auto text-left px-4">
        <h2 className="text-xl text-brand-blue font-semibold mb-4">What Others Are Saying</h2>
        <div className="space-y-6">
          <div className="bg-gray-900 p-4 border border-gray-700 rounded">
            <p className="text-gray-200 italic">"ImportMate saved me hours of back-and-forth. The inquiry it generated got a response within 15 minutes. Total game-changer."</p>
            <p className="text-sm text-gray-400 mt-2">— Alex G., Shopify Seller</p>
          </div>

          <div className="bg-gray-900 p-4 border border-gray-700 rounded">
            <p className="text-gray-200 italic">"I was nervous about contacting suppliers. ImportMate made it easy — now I focus on growing the store instead of writing emails."</p>
            <p className="text-sm text-gray-400 mt-2">— Samantha T., First-time Dropshipper</p>
          </div>

          <div className="bg-gray-900 p-4 border border-gray-700 rounded">
            <p className="text-gray-200 italic">"Honestly, this app does 90% of the communication work for me. I just review, click send, and get replies."</p>
            <p className="text-sm text-gray-400 mt-2">— Devin K., Amazon FBA Seller</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

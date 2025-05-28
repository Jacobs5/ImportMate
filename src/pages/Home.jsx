import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Smart sourcing starts here.
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600 mb-8">
          ImportChimp helps beginner and expert dropshippers communicate with
          manufacturers quickly and confidently. Generate perfect messages,
          track replies, and save your vision — all in one place.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/generate"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-gray-200 text-black px-6 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-2xl font-bold text-center mb-10">Why ImportMate?</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">✅ Generate Perfect Inquiries</h3>
            <p>Custom-tailored and supplier-friendly messages in one click.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">✅ Manage All Supplier Chats</h3>
            <p>Organized, clear, and professional threads for every conversation.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">✅ Ask ImportChimp</h3>
            <p>Your 24/7 AI dropshipping consultant built right in.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">✅ Vision Board</h3>
            <p>Save and organize your product opportunities visually.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">What early users are saying</h2>
        <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-lg">
          <p className="italic text-gray-700">
            “ImportMate feels like having a sourcing pro on my team. I send
            better messages and close faster.”
          </p>
          <p className="mt-4 font-semibold">Alex D., Dropshipper</p>
        </div>
      </section>

      {/* Premium Tease */}
      <section className="bg-black text-white py-16 text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Upgrade to Premium</h2>
        <p className="max-w-xl mx-auto mb-6">
          Unlock full AI-powered chat, multiple supplier threads, and full Vision
          Board access. Let ImportMate carry your sourcing workflow.
        </p>
        <Link
          to="/upgrade"
          className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
        >
          View Premium Features
        </Link>
      </section>
    </div>
  );
}

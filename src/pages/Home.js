import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center bg-white px-4">
      <div className="max-w-xl space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Smart sourcing starts here.
        </h1>
        <p className="text-gray-600 text-lg">
          ImportChimp helps beginner and expert dropshippers communicate with
          manufacturers quickly and confidently. Generate perfect messages,
          track replies, and save your vision — all in one place.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/signup">
            <Button className="px-6 py-2">Get Started</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="px-6 py-2">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

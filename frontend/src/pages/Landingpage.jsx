import { Wallet, ShieldCheck, Zap, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Landingpage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl">
        <div className="p-6 text-center">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-2 text-blue-600">
            <Wallet className="h-10 w-10" />
            EasyWallet
          </h1>
          <p className="text-xl mt-2 text-gray-600">
            Simplify Your Finances with Our Smart Digital Wallet
          </p>
        </div>
        <div className="p-6 space-y-8">
          <p className="text-center text-lg text-gray-700">
            EasyWallet is your all-in-one solution for managing money, making
            transfers, and tracking expenses. Join thousands of satisfied users
            and take control of your financial life today!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Wallet className="h-8 w-8 text-blue-500" />}
              title="Easy Money Management"
              description="Keep all your finances in one place for easy tracking and management."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-8 w-8 text-green-500" />}
              title="Secure Transactions"
              description="Bank-level security ensures your money and data are always protected."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-yellow-500" />}
              title="Instant Transfers"
              description="Send and receive money instantly, anytime and anywhere."
            />
          </div>
        </div>
        <div className="p-6 flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="w-full sm:w-auto bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
            onClick={() => navigate("/signin")}
          >
            <LogIn className="mr-2 h-4 w-4" /> Sign In
          </button>
          <button
            className="w-full sm:w-auto border border-blue-600 text-blue-600 font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50"
            onClick={() => navigate("/signup")}
          >
            <UserPlus className="mr-2 h-4 w-4" /> Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

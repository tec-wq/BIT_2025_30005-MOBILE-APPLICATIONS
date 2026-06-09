import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, Hexagon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { motion } from "motion/react";

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#ECEFF1" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-10"
        style={{ width: "440px", minHeight: "520px" }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#1A237E" }}
          >
            <Hexagon className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-2" style={{ color: "#1A237E" }}>
          ApexRoute
        </h1>
        <p className="text-center mb-8" style={{ color: "#546E7A", fontSize: "16px" }}>
          Smart Logistics Engine
        </p>

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#546E7A" }} />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-11 h-12 rounded-lg border-gray-300"
              style={{ backgroundColor: "#F5F5F5" }}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#546E7A" }} />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-11 pr-11 h-12 rounded-lg border-gray-300"
              style={{ backgroundColor: "#F5F5F5" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" style={{ color: "#546E7A" }} />
              ) : (
                <Eye className="w-5 h-5" style={{ color: "#546E7A" }} />
              )}
            </button>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full h-12 text-white font-semibold rounded-lg"
            style={{ backgroundColor: "#1A237E" }}
          >
            SIGN IN
          </Button>

          {/* Forgot Password */}
          <div className="text-center">
            <a href="#" className="text-sm hover:underline" style={{ color: "#1A237E" }}>
              Forgot Password?
            </a>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm" style={{ color: "#546E7A" }}>
              OR
            </span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* SSO Buttons */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 font-medium rounded-lg border-gray-300"
          >
            Sign in with Google
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 font-medium rounded-lg border-gray-300"
          >
            Sign in with SSO
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
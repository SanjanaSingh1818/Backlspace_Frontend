import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Parallax animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, window.innerHeight], [10, -10]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admin/dashboard");
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 pt-28 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* 🔹 Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-red-700/10 to-transparent"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* 🔹 Floating geometric shapes */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          style={{ rotateX, rotateY }}
          className="absolute w-14 h-14 border border-red-600/30 rounded-xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 360],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 🔹 Compact Glassmorphism Form */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-xs bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-6"
      >
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-3 shadow-md">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Admin Login</h2>
          <p className="text-gray-400 text-xs">Backspace Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-8 pr-2 py-1.5 bg-white/10 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:ring-1 focus:ring-red-500 text-xs"
                placeholder="admin@backspace.co.in"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-8 pr-2 py-1.5 bg-white/10 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:ring-1 focus:ring-red-500 text-xs"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-1.5 rounded-md transition-all duration-300 text-xs shadow-md hover:shadow-red-500/20 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>

          <p className="text-center text-[10px] text-gray-400 mt-2">
            Don’t have an account?{" "}
            <Link to="/admin-signup" className="text-red-400 hover:text-red-500 font-medium">
              Sign Up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

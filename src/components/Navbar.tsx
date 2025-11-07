import { useState, useEffect } from "react";
import { Menu, X, UserCog, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/white-logo-bg.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Navbar Links
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Workspaces", path: "/workspaces" },
    { label: "Amenities", path: "/amenities" },
    { label: "Gallery", path: "/gallery" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-md shadow-lg" : "bg-black/90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* ✅ Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <img
              src={logo}
              alt="Backspace Logo"
              className="h-10 w-auto object-contain transition-transform hover:scale-105"
            />
          </button>

          {/* ✅ Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className={`font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-red-500"
                    : "text-white hover:text-red-500"
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* ✅ Admin Icon */}
            <button
              onClick={() => navigate("/admin")}
              className="p-2 rounded-full hover:bg-red-600/20 text-white transition-colors"
              title="Admin Panel"
            >
              <UserCog className="w-6 h-6" />
            </button>

            {/* ✅ Book Now Button */}
            <motion.button
              onClick={() => navigate("/contact")}
              whileHover={{ scale: 1.05 }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(239,68,68,0)",
                  "0 0 12px rgba(239,68,68,0.7)",
                  "0 0 0px rgba(239,68,68,0)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="ml-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-5 py-2 flex items-center gap-2 rounded-md shadow-md transition-all duration-300"
            >
              <CalendarDays className="w-5 h-5" />
              Book Now
            </motion.button>
          </div>

          {/* ✅ Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black text-white shadow-lg overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    navigate(link.path);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? "text-red-500 bg-red-600/10"
                      : "hover:text-red-500 hover:bg-red-600/10"
                  }`}
                >
                  {link.label}
                </button>
              ))}

              {/* ✅ Admin + Book Now for Mobile */}
              <div className="flex items-center justify-between gap-4 pt-3 border-t border-gray-700">
                <button
                  onClick={() => {
                    navigate("/admin");
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 text-white hover:text-red-500 transition-colors"
                >
                  <UserCog className="w-5 h-5" />
                  <span>Admin</span>
                </button>

                <motion.button
                  onClick={() => {
                    navigate("/contact");
                    setIsOpen(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(239,68,68,0)",
                      "0 0 12px rgba(239,68,68,0.7)",
                      "0 0 0px rgba(239,68,68,0)",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-md font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300"
                >
                  <CalendarDays className="w-4 h-4" />
                  Book
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Search } from "lucide-react";
import WorkspaceCard from "../components/WorkspaceCard";

interface Workspace {
  _id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
  discount?: number;
  location?: string;
  cta_text?: string;
}

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [filtered, setFiltered] = useState<Workspace[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const res = await axios.get("https://backspace-fullstack.onrender.com/api/workspaces");
      const data = Array.isArray(res.data) ? res.data : res.data.workspaces || [];
      setWorkspaces(data);
      setFiltered(data);
    } catch (err) {
      console.error("❌ Error fetching workspaces:", err);
    }
  };

  // ✅ Filter by search keyword
  useEffect(() => {
    if (!search.trim()) return setFiltered(workspaces);
    const lower = search.toLowerCase();
    setFiltered(
      workspaces.filter(
        (w) =>
          w.title.toLowerCase().includes(lower) ||
          w.description.toLowerCase().includes(lower) ||
          w.location?.toLowerCase().includes(lower)
      )
    );
  }, [search, workspaces]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-32 pb-24 overflow-hidden relative">
      {/* ✅ Background Geometry */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-red-200/30 rounded-xl"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              width: `${25 + Math.random() * 30}px`,
              height: `${25 + Math.random() * 30}px`,
              rotate: i * 40,
            }}
            animate={{
              y: [0, 20, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 18 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🏙️ Page Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Discover Our <span className="text-red-600">Workspaces</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-black/80 to-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore flexible and inspiring coworking environments designed for productivity, collaboration, and comfort.
          </p>
        </motion.div>

        {/* 🔍 Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg flex items-center p-2 max-w-md w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search workspace or location..."
              className="flex-1 px-4 py-3 text-gray-700 outline-none rounded-xl"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-all">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* 🧱 Workspaces Grid */}
        {filtered.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filtered.map((workspace, i) => (
              <motion.div
                key={workspace._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <WorkspaceCard workspace={workspace} onCtaClick={() => {}} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-600 text-lg mt-10">
            No workspaces found for your search.
          </p>
        )}

        {/* 💫 CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 bg-gradient-to-r from-black/80 to-red-600 rounded-2xl p-10 md:p-14 text-center text-white shadow-2xl"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Need help choosing the right workspace?
          </h3>
          <p className="text-lg mb-8 text-red-200">
            Our team is ready to help you find your perfect spot.
          </p>
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-white text-red-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
}

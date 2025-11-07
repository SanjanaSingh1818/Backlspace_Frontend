import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import axios from "axios";
import WorkspaceCard from "./WorkspaceCard";

interface Workspace {
  _id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
  discount?: number;
  category: string;
  cta_text: string;
  cta_url: string;
}

interface WorkspaceSolutionsProps {
  onCtaClick: (workspace: Workspace) => void;
}

export default function WorkspaceSolutions({ onCtaClick }: WorkspaceSolutionsProps) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/workspaces");
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.workspaces || [];
      setWorkspaces(data);
    } catch (error) {
      console.error("❌ Error fetching workspaces:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="workspaces" ref={ref} className="relative py-28 overflow-hidden">
      {/* 🌈 BACKGROUND LAYERS */}
      <div className="absolute inset-0 overflow-hidden">
        {/* gradient base */}
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
        />

        {/* glows */}
        <motion.div
          style={{ y: y2 }}
          className="absolute -top-32 left-1/3 w-[700px] h-[700px] bg-gradient-to-br from-red-500/25 via-black/10 to-transparent blur-[140px] rounded-full opacity-60"
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-black/10 via-red-500/20 to-transparent blur-[130px] rounded-full opacity-60"
        />

        {/* subtle texture */}
        <div
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]
          opacity-[0.05] mix-blend-overlay"
        ></div>

        {/* 🧩 Floating Geometric Shapes */}
        {[
          { top: "10%", left: "8%", w: 20, h: 20, shape: "square" },
          { top: "25%", right: "15%", w: 16, h: 16, shape: "circle" },
          { bottom: "15%", left: "25%", w: 14, h: 14, shape: "triangle" },
          { top: "65%", right: "10%", w: 18, h: 18, shape: "circle" },
          { bottom: "25%", right: "35%", w: 20, h: 20, shape: "square" },
          { top: "40%", left: "5%", w: 12, h: 12, shape: "triangle" },
          { bottom: "10%", left: "15%", w: 22, h: 22, shape: "circle" },
          { top: "80%", right: "20%", w: 15, h: 15, shape: "square" },
        ].map((s, i) => (
          <motion.div
            key={i}
            className={`absolute`}
            style={{
              top: s.top,
              left: s.left,
              right: s.right,
              bottom: s.bottom,
              width: `${s.w * 4}px`,
              height: `${s.h * 4}px`,
              borderWidth: "2px",
              borderColor: i % 2 === 0 ? "rgba(220,38,38,0.3)" : "rgba(0,0,0,0.2)",
              borderRadius: s.shape === "circle" ? "9999px" : s.shape === "square" ? "8px" : "0px",
              transform: s.shape === "triangle" ? "rotate(45deg)" : "none",
            }}
            animate={{
              x: [0, 40, -40, 0],
              y: [0, 25, -25, 0],
              rotate: [0, 360],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 30 + i * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ✅ CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Workspace <span className="text-red-600">Solutions</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="origin-center w-24 h-1 bg-gradient-to-r from-black/80 to-red-600 mx-auto mb-6"
          ></motion.div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Flexible workspace solutions designed to meet every need – from individuals
            to growing teams. Find your perfect work environment.
          </p>
        </motion.div>

        {/* Cards */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg h-96 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {workspaces.map((workspace, i) => (
              <motion.div
                key={workspace._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                }}
              >
                <WorkspaceCard
                  workspace={workspace}
                  onCtaClick={() => onCtaClick(workspace)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-700 mb-4">
            Not sure which option is right for you?
          </p>
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
          >
            Talk to our team
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

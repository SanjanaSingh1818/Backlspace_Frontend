import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Target, Users, Lightbulb, Award } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To provide exceptional workspaces that inspire productivity and foster collaboration among professionals.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Building a vibrant community of entrepreneurs, freelancers, and businesses that grow together.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Hub",
    description:
      "Creating an environment that sparks creativity and drives innovation through modern amenities.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Delivering world-class infrastructure and services that exceed expectations every day.",
  },
];

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1.05, 1]), {
    stiffness: 60,
    damping: 15,
  });

  // ✨ Variants for wave animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 120,
      },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden"
    >
      {/* Background glow orbs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-black rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            About <span className="text-red-600">Backspace</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="origin-center w-24 h-1 bg-gradient-to-r from-black/80 to-red-600 mx-auto mb-6"
          ></motion.div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            More than just a workspace — we're a community of innovators,
            creators, and entrepreneurs building the future together.
          </p>
        </motion.div>

        {/* Image + Text Section */}
        <div className="grid md:grid-cols-2 gap-14 items-center mb-24">
          <motion.div style={{ y, scale }}>
            <motion.img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
              alt="Backspace Coworking"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="rounded-2xl shadow-[0_25px_40px_rgba(0,0,0,0.2)] hover:scale-[1.02] transition-transform duration-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Redefining Workspace Experience
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Founded with a vision to transform how people work, Backspace
              offers premium coworking solutions that blend flexibility,
              functionality, and community.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From solo entrepreneurs to growing teams, we provide an ecosystem
              that supports your journey at every stage — in prime locations
              where opportunities thrive.
            </p>

            <div className="flex justify-center md:justify-start gap-6 pt-4">
              {[
                { value: "500+", label: "Happy Members" },
                { value: "50+", label: "Companies" },
                { value: "24/7", label: "Access" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center px-4"
                >
                  <div className="text-3xl font-extrabold text-red-600">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 🌊 Feature Cards with Wave Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0px 12px 35px rgba(255,0,0,0.25)",
              }}
              className="relative text-center p-8 rounded-2xl bg-white border border-gray-100 
                         hover:border-red-300 hover:bg-gradient-to-b from-white to-red-50 
                         shadow-md hover:shadow-2xl transition-all duration-500 group overflow-hidden"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-400 to-black opacity-0 group-hover:opacity-10 blur-3xl transition-all duration-500"></div>

              {/* Animated Icon */}
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.15, rotate: 10 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-black/70 to-red-600 rounded-full mb-5 shadow-lg group-hover:shadow-red-400/40 transition-all duration-500"
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>

              <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

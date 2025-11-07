import { motion, useScroll, useTransform } from "framer-motion";
import {
  Wifi,
  Coffee,
  Car,
  Printer,
  Video,
  Lock,
  Zap,
  Wind,
  Users,
  BookOpen,
  Phone,
  Clock,
} from "lucide-react";
import { useRef } from "react";

const amenities = [
  { icon: Wifi, title: "High-Speed WiFi", description: "100+ Mbps connectivity" },
  { icon: Coffee, title: "Free Beverages", description: "Unlimited tea & coffee" },
  { icon: Car, title: "Parking Space", description: "Secure parking facility" },
  { icon: Printer, title: "Printing Services", description: "Print, scan & copy" },
  { icon: Video, title: "Meeting Rooms", description: "Fully equipped rooms" },
  { icon: Lock, title: "Secure Access", description: "24/7 security system" },
  { icon: Zap, title: "Power Backup", description: "Uninterrupted power" },
  { icon: Wind, title: "AC Workspace", description: "Climate controlled" },
  { icon: Users, title: "Community Events", description: "Networking opportunities" },
  { icon: BookOpen, title: "Library Access", description: "Resource library" },
  { icon: Phone, title: "Reception Services", description: "Professional front desk" },
  { icon: Clock, title: "24/7 Access", description: "Work anytime" },
];

export default function Amenities() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={ref}
      id="amenities"
      className="relative py-28 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100"
    >
      {/* 🌈 Background Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glows */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-red-500/25 via-black/10 to-transparent blur-[130px] rounded-full opacity-70"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-black/10 via-red-500/20 to-transparent blur-[120px] rounded-full opacity-70"
        />
        {/* Subtle geometric shapes */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-red-200/40 rounded-xl"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              rotate: i * 40,
            }}
            animate={{
              y: [0, 20, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 🌟 Content */}
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
            World-Class <span className="text-red-600">Amenities</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="origin-center w-24 h-1 bg-gradient-to-r from-black/80 to-red-600 mx-auto mb-6"
          ></motion.div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to work productively and comfortably, all under one roof.
          </p>
        </motion.div>

        {/* Amenities Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-10"
        >
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                scale: 1.07,
                rotate: [-2, 2, -2],
                transition: { duration: 0.4, yoyo: Infinity },
              }}
              className="group bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-gray-100 hover:border-red-300 hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <motion.div
                  className="w-14 h-14 bg-gradient-to-br from-black/80 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                >
                  <amenity.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="font-bold text-gray-900 text-lg">{amenity.title}</h3>
                <p className="text-sm text-gray-600">{amenity.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 bg-gradient-to-r from-black/80 to-red-600 rounded-2xl p-10 md:p-14 text-center text-white shadow-2xl relative overflow-hidden"
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/30 via-transparent to-black/20 opacity-30"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <h3 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
            Ready to Experience Premium Workspace?
          </h3>
          <p className="text-xl mb-8 text-red-200 relative z-10">
            Schedule a free tour and see our amenities in action
          </p>
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-white text-red-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 relative z-10"
          >
            Schedule Tour
          </button>
        </motion.div>
      </div>
    </section>
  );
}

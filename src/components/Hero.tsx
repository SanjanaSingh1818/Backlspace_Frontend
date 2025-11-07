import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

// ✅ Import local images
import img1 from "../assets/hero1.webp";
import img2 from "../assets/hero2.webp";
import img3 from "../assets/hero3.jpg";
import img4 from "../assets/hero4.jpg";

export default function Hero() {
  const images = [img1, img2, img3, img4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prev) => (prev + 1) % images.length),
      4000
    );
  };

  const stopAutoSlide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <section className="bg-[#f6f9fc] py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center md:justify-between gap-16">
        
        {/* ✅ LEFT TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <p className="text-gray-600 text-lg mb-4">
            Collaborate, Connect and Create.
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Flexible space to fit
            <br className="hidden md:block" />
            what, when, and how <br className="hidden md:block" />
            you want to <span className="text-red-600">work.</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-8">
            Discover how{" "}
            <span className="font-semibold text-gray-900">Backspace</span> helps
            you complete your most impactful and inspired work in our
            ultra-cool coworking spaces.
          </p>

          {/* ✅ Search Box */}
          <div className="bg-white rounded-xl shadow-lg p-2 flex items-center max-w-lg mx-auto md:mx-0">
            <input
              type="text"
              placeholder="Search nearby location..."
              className="flex-1 px-4 py-3 text-gray-700 outline-none rounded-xl text-sm sm:text-base"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-all">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* ✅ RIGHT IMAGE SLIDER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 relative flex flex-col items-center"
        >
          {/* ✅ Slider Container */}
          <div
            className="relative overflow-hidden rounded-xl shadow-2xl w-full max-w-md sm:max-w-lg"
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
          >
            <motion.div
              className="flex transition-transform duration-700 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 + 6)}%)`,
              }}
            >
              {images.map((img, index) => (
                <div
                  key={index}
                  className="w-[90%] flex-shrink-0 overflow-hidden rounded-xl mx-auto"
                >
                  <img
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-[250px] sm:h-[350px] md:h-[480px] object-cover rounded-xl"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* ✅ Line-style Indicators (Always below image) */}
          <div className="mt-6 flex justify-center gap-2 w-full">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "bg-red-600 w-10"
                    : "bg-gray-300 w-4 hover:bg-red-400"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

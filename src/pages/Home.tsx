// src/pages/Home.tsx
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import About from "../components/About";
import WorkspaceSolutions from "../components/WorkspaceSolutions";
import Amenities from "../components/Amenities";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white"
    >
      <Hero />
      <About />
      <WorkspaceSolutions />
      <Amenities />
      <Gallery />
      <Testimonials />
      <Contact />
    </motion.div>
  );
}

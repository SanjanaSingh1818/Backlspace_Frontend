// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import WorkspaceSolutionsPage from "./pages/WorkspacePage";
import AmenitiesPage from "./pages/AmenitiesPage";
import GalleryPage from "./pages/GalleryPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ContactPage from "./pages/ContactPage";
import Admin from "./pages/Admin";
import AdminSignup from "./components/admin/AdminSignup";
import AddWorkspace from "./components/admin/workspace/addWorkspace";
import EditWorkspace from "./components/admin/workspace/editWorkspace";
import AdminDashboard from "./components/admin/AdminDashboard";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/workspaces" element={<WorkspaceSolutionsPage />} />
          <Route path="/amenities" element={<AmenitiesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/add-workspace" element={<AddWorkspace />} />
          <Route path="/edit-workspace/:id" element={<EditWorkspace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

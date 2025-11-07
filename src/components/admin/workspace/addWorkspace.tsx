import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddWorkspace() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    price: "",
    discount: "",
    location: "",
    cta_text: "Book Now",
    cta_url: "#",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://backspace-fullstack.onrender.com/api/workspaces",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setMessage("✅ Workspace added successfully!");
        setFormData({
          title: "",
          description: "",
          image_url: "",
          price: "",
          discount: "",
          location: "",
          cta_text: "Book Now",
          cta_url: "#",
        });

        // ✅ Redirect to dashboard after short delay
        setTimeout(() => navigate("/admin/dashboard"), 1500);
      }
    } catch (error: any) {
      console.error("❌ Error adding workspace:", error);
      setMessage("❌ Failed to add workspace. Please check your input or server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8"
      >
        {/* ❌ Close Button */}
        <button
          onClick={() => navigate("/admin/dashboard")} // or setShowAddForm(false)
          className="absolute top-5 right-5 text-gray-500 hover:text-red-600 transition-colors"
          aria-label="Close form"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add <span className="text-red-600">Workspace</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Image URL
            </label>
            <div className="flex items-center gap-3">
              <Upload className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                required
                placeholder="https://example.com/workspace.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g. Bangalore, Pune"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* CTA Text */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              CTA Text
            </label>
            <input
              type="text"
              name="cta_text"
              value={formData.cta_text}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* CTA URL */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              CTA URL
            </label>
            <input
              type="text"
              name="cta_url"
              value={formData.cta_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-black/80 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-xl"
          >
            {loading ? "Adding..." : "Add Workspace"}
          </button>

          {/* Message */}
          {message && (
            <p
              className={`text-center mt-4 font-medium ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
}

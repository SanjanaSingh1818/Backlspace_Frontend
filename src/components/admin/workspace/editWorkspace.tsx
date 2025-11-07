import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";

export default function EditWorkspace() {
  const { id } = useParams<{ id: string }>();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch existing workspace data
  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const res = await axios.get(`https://backspace-fullstack.onrender.com/api/workspaces/${id}`);
        setFormData(res.data);
      } catch (error) {
        console.error("❌ Error fetching workspace:", error);
        setMessage("Failed to load workspace details.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspace();
  }, [id]);

  // ✅ Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle workspace update (PUT request)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await axios.put(
        `https://backspace-fullstack.onrender.com/api/workspaces/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            // Uncomment if route is protected:
            // Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      if (res.status === 200) {
        setMessage("✅ Workspace updated successfully!");
        setTimeout(() => navigate("/admin"), 1500);
      }
    } catch (error: any) {
      console.error("❌ Error updating workspace:", error);
      setMessage("Failed to update workspace. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Handle cancel / close
  const handleCancel = () => {
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600 animate-pulse">
          Loading workspace details...
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 relative"
      >
        {/* ❌ Close Button */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Edit <span className="text-red-600">Workspace</span>
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
            disabled={saving}
            className="w-full py-3 bg-gradient-to-r from-black/80 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-xl"
          >
            {saving ? "Updating..." : "Update Workspace"}
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

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut, Plus, Edit, Trash2, Save, X } from "lucide-react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

interface Workspace {
  _id?: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  image_url: string;
  is_active: boolean;
}

interface Contact {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  service_interest?: string;
  status: string;
  created_at?: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"workspaces" | "contacts">("workspaces");
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkspaces();
    fetchContacts();
  }, []);

  async function fetchWorkspaces() {
    try {
      const res = await axios.get("http://localhost:5000/api/workspaces");
      setWorkspaces(res.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  }

  async function fetchContacts() {
    try {
      const res = await axios.get("http://localhost:5000/api/contact"); // ✅ Corrected endpoint
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }

  async function handleDeleteWorkspace(id: string) {
    if (!confirm("Are you sure you want to delete this workspace?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.delete(`http://localhost:5000/api/workspaces/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        alert("✅ " + res.data.message);
        fetchWorkspaces();
      } else {
        alert("❌ " + (res.data.message || "Failed to delete workspace."));
      }
    } catch (error: any) {
      console.error("Error deleting workspace:", error);
      alert("❌ Unauthorized or session expired. Please log in again.");
    }
  }

  async function handleSaveWorkspace(workspace: Workspace) {
    if (!workspace._id) return;
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/workspaces/${workspace._id}`, workspace);
      setEditingWorkspace(null);
      fetchWorkspaces();
    } catch (error) {
      console.error("Error updating workspace:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-signup");
    if (onLogout) onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28"> {/* ✅ Added padding-top to fix overlap */}
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <RouterLink
              to="/"
              className="text-2xl font-bold text-gray-900 hover:text-red-600 transition-colors"
            >
              Back<span className="text-red-600">space</span> Admin
            </RouterLink>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("workspaces")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "workspaces"
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Workspaces ({workspaces.length})
          </button>

          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "contacts"
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Contact Submissions ({contacts.length})
          </button>
        </div>

        {/* ---------------- Workspaces Tab ---------------- */}
        {activeTab === "workspaces" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Manage Workspaces</h2>
              <RouterLink to="/add-workspace">
                <button className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all">
                  <Plus className="w-5 h-5" />
                  Add Workspace
                </button>
              </RouterLink>
            </div>

            <div className="grid gap-6">
              {workspaces.map((workspace) => (
                <motion.div
                  key={workspace._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  {editingWorkspace?._id === workspace._id ? (
                    <WorkspaceEditForm
                      workspace={editingWorkspace}
                      onChange={setEditingWorkspace}
                      onSave={() => handleSaveWorkspace(editingWorkspace)}
                      onCancel={() => setEditingWorkspace(null)}
                      loading={loading}
                    />
                  ) : (
                    <div className="flex gap-4">
                      <img
                        src={workspace.image_url}
                        alt={workspace.title}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {workspace.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">{workspace.description}</p>
                        <div className="flex gap-4 text-sm">
                          <span className="text-gray-700">Price: ₹{workspace.price}</span>
                          <span className="text-gray-700">Discount: {workspace.discount}%</span>
                          <span
                            className={
                              workspace.is_active ? "text-green-600" : "text-red-600"
                            }
                          >
                            {workspace.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingWorkspace(workspace)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteWorkspace(workspace._id!)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- Contacts Tab ---------------- */}
        {activeTab === "contacts" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Submissions</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Interest</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Remark</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                  </tr>
                </thead>
              <tbody className="divide-y">
  {contacts.map((contact) => (
    <tr key={contact._id} className="hover:bg-gray-50 transition-all">
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{contact.name}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{contact.email}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{contact.phone}</td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {contact.service_interest || "-"}
      </td>

      {/* Status Dropdown */}
      <td className="px-6 py-4">
        <select
          value={contact.status}
          onChange={async (e) => {
            const newStatus = e.target.value;
            try {
              const res = await axios.put(
                `http://localhost:5000/api/contact/${contact._id}`,
                { status: newStatus, remark: contact.remark || "" } // ✅ Send both
              );
              if (res.data.success) {
                setContacts((prev) =>
                  prev.map((c) =>
                    c._id === contact._id
                      ? { ...c, status: newStatus }
                      : c
                  )
                );
              }
            } catch (error) {
              console.error("Error updating contact:", error);
            }
          }}
          className={`text-sm rounded px-2 py-1 border font-medium transition-all
            ${
              contact.status === "pending"
                ? "bg-yellow-50 border-yellow-400 text-yellow-700"
                : contact.status === "contacted"
                ? "bg-green-50 border-green-400 text-green-700"
                : "bg-red-50 border-red-400 text-red-700"
            }`}
        >
          <option value="pending">Pending</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
      </td>

      {/* Remark Field */}
      <td className="px-6 py-4 text-sm text-gray-700">
        <input
          type="text"
          value={contact.remark || ""}
          onChange={(e) => {
            const newRemark = e.target.value;
            setContacts((prev) =>
              prev.map((c) =>
                c._id === contact._id ? { ...c, remark: newRemark } : c
              )
            );
          }}
          onBlur={async (e) => {
            const newRemark = e.target.value;
            try {
              const res = await axios.put(
                `http://localhost:5000/api/contact/${contact._id}`,
                { status: contact.status, remark: newRemark } // ✅ Send both
              );
              if (!res.data.success) {
                alert("Failed to update remark");
              }
            } catch (error) {
              console.error("Error updating remark:", error);
            }
          }}
          placeholder="Add remark..."
          className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-red-400 outline-none"
        />
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">
        {new Date(contact.created_at || "").toLocaleDateString()}
      </td>
    </tr>
  ))}
</tbody>

              </table>
              {contacts.length === 0 && (
                <p className="text-center py-8 text-gray-500 text-sm">
                  No contact submissions yet.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ------------------ Edit Form ------------------
function WorkspaceEditForm({
  workspace,
  onChange,
  onSave,
  onCancel,
  loading,
}: {
  workspace: Workspace;
  onChange: (w: Workspace) => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={workspace.title}
        onChange={(e) => onChange({ ...workspace, title: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        placeholder="Title"
      />
      <textarea
        value={workspace.description}
        onChange={(e) => onChange({ ...workspace, description: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        rows={3}
        placeholder="Description"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          value={workspace.price}
          onChange={(e) => onChange({ ...workspace, price: Number(e.target.value) })}
          className="px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Price"
        />
        <input
          type="number"
          value={workspace.discount}
          onChange={(e) => onChange({ ...workspace, discount: Number(e.target.value) })}
          className="px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Discount %"
        />
      </div>
      <input
        type="text"
        value={workspace.image_url}
        onChange={(e) => onChange({ ...workspace, image_url: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        placeholder="Image URL"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={workspace.is_active}
          onChange={(e) => onChange({ ...workspace, is_active: e.target.checked })}
          className="rounded"
        />
        <span className="text-sm text-gray-700">Active</span>
      </label>
      <div className="flex gap-2">
        <button
          onClick={onSave}
          disabled={loading}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );
}

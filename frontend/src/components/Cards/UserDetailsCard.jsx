import React, { useState, useContext } from "react";
import axios from "axios";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const UserDetailsCard = ({ id, email, role, token }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState(email);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { updateUser } = useContext(UserContext); // 👈 get updater

  const getUpdateUrl = () => {
    if (role === "student") return `${API_PATHS.STUDENTS.EDITSTUDENTSBYID}/${id}`;
    if (role === "admin") return `${API_PATHS.STUDENTS.EDITADMINSBYID}/${id}`;
    if (role === "superadmin") return `${API_PATHS.STUDENTS.EDITSUPERADMINSBYID}/${id}`;
    return null;
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      const url = getUpdateUrl();
      if (!url) throw new Error("Invalid role for update");

      const res = await axios.put(
        url,
        { email: newEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("✅ Email updated successfully");
      setIsEditing(false);

      // 👇 update global context
      updateUser({ email: newEmail });
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("❌ Error updating email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded shadow-md w-full max-w-md bg-white">
      <div className="mb-4">
        <p className="font-semibold">Your Email:</p>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setNewEmail(email);
              }}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>{newEmail}</span>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <div>
        <p className="font-semibold">Role:</p>
        <span className="px-2 py-1 bg-gray-100 rounded">{role}</span>
      </div>

      {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default UserDetailsCard;

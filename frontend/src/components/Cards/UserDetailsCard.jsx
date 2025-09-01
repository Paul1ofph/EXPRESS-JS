import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const UserDetailsCard = ({ id, email, role, token }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState(email);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  //  Choose update route
  const getUpdateUrl = () => {
    if (role === "student") return `${API_PATHS.STUDENTS.EDITSTUDENTSBYID}/${id}`;
    if (role === "admin") return `${API_PATHS.STUDENTS.EDITADMINSBYID}/${id}`;
    if (role === "superadmin") return `${API_PATHS.STUDENTS.EDITSUPERADMINSBYID}/${id}`;
    return null;
  };

  //  Choose delete route
  const getDeleteUrl = () => {
    if (role === "student") return `${API_PATHS.STUDENTS.DELETESTUDENT}/${id}`;
    if (role === "admin") return `${API_PATHS.STUDENTS.DELETEADMIN}/${id}`;
    if (role === "superadmin") return `${API_PATHS.STUDENTS.DELETESUPERADMIN}/${id}`;
    return null;
  };

  //  Save updated email
  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      const url = getUpdateUrl();
      if (!url) throw new Error("Invalid role for update");

      await axios.put(
        url,
        { email: newEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Email updated successfully");
      setIsEditing(false);

      // update global context
      updateUser({ email: newEmail });
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("Error updating email");
    } finally {
      setLoading(false);
    }
  };

  // Delete account
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;

    setLoading(true);
    setMessage("");

    try {
      const url = getDeleteUrl();
      if (!url) throw new Error("Invalid role for delete");

      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Account deleted successfully");

      // clear context + redirect if current user deletes themselves
      if (id === JSON.parse(localStorage.getItem("user"))?._id) {
        localStorage.removeItem("user");
        updateUser(null);

        setTimeout(() => {
          navigate("/"); //redirect to home after deletion
        }, 1000); // wait 1s so user sees the success message
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("Error deleting account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded shadow-md w-full text-2xl font-epunda bg-white">
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
            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete"}
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

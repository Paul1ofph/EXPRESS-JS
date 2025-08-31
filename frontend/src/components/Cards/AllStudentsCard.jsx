import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";

const AllStudentsCard = ({ limit }) => {
  const navigate = useNavigate();
  const [fetchStudents, setFetchStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({ email: "" });

  const token = localStorage.getItem("token");

  // Fetch students
  useEffect(() => {
    if (!token) {
      navigate("/login/admin");
      return;
    }

    axios
      .get(API_PATHS.STUDENTS.FETCHALLSTUDENTS, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFetchStudents(res.data.students || res.data);
      })
      .catch(() => setError("Failed to load students"))
      .finally(() => setLoading(false));
  }, [token, navigate]);

  // Handle edit button click
  const handleEditClick = (student) => {
    setEditingStudent(student._id);
    setFormData({ email: student.email });
  };

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit edit
  const handleSave = () => {
    axios
      .put(
        `${API_PATHS.STUDENTS.EDITSTUDENTSBYID}/${editingStudent}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        // Update UI without reloading
        setFetchStudents((prev) =>
          prev.map((s) => (s._id === editingStudent ? res.data : s))
        );
        setEditingStudent(null); // close form
      })
      .catch(() => setError("Error editing student"));
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingStudent(null);
    setFormData({ email: "" });
  };

  const displayStudents = limit ? fetchStudents.slice(0, limit) : fetchStudents;

  return (
    <div>
      {loading ? (
        <p>Loading students...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : fetchStudents.length === 0 ? (
        <p>No students found</p>
      ) : (
        <>
          <table className="table-auto border-collapse border border-gray-400 w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-400 px-4 py-2">S/N</th>
                <th className="border border-gray-400 px-4 py-2">Email</th>
                <th className="border border-gray-400 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayStudents.map((student, index) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="border border-gray-400 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {editingStudent === student._id ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      student.email
                    )}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {editingStudent === student._id ? (
                      <div className="space-x-2">
                        <button
                          onClick={handleSave}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-400 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditClick(student)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <tfoot>
            {limit && fetchStudents.length > limit && (
              <div className="mt-4 text-right">
                <button
                  onClick={() => navigate("/students")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View All Students
                </button>
              </div>
            )}
          </tfoot>
        </>
      )}
    </div>
  );
};

export default AllStudentsCard;

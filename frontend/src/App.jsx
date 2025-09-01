import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/userAuth/login";
import Register from "./pages/Auth/userAuth/register";
import LoginAdmin from "./pages/Auth/adminAuth/login";
import RegisterAdmin from "./pages/Auth/adminAuth/register";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UserDetails from "./pages/DetailsPage/UserDetails";
import AllStudents from "./pages/DetailsPage/AllStudents";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        {/* Student Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes allowedRoles={["student"]}>
              <Dashboard />
            </ProtectedRoutes>
          }
        />        
        {/* Admin Routes */}
        <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/register/admin" element={<RegisterAdmin />} />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <UserDetails />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoutes>
              <AllStudents />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;

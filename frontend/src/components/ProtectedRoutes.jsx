import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const roleDashboards = {
  student: "/dashboard",
  admin: "/dashboard/admin",
  superadmin: "/dashboard/superadmin", 
};

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(UserContext);

  // Wait until loading is done before deciding
  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={roleDashboards[user.role]} replace />;
  }

  return children;
};

export default ProtectedRoutes;

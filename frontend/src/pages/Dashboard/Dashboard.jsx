import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import UserDetailsCard from "../../components/Cards/UserDetailsCard";
import { useNavigate } from "react-router-dom";
import DashBoardLayouot from "../../components/Layout/DashBoardLayouot";

const Dashboard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <DashBoardLayouot>
      <h1>Dashboard</h1>

      <h2>Welcome {user?.email}</h2>
    </DashBoardLayouot>
  );
};

export default Dashboard;

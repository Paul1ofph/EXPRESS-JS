import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import UserDetailsCard from "../../components/Cards/UserDetailsCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_PATHS } from "../../utils/apiPaths";
import DashBoardLayouot from "../../components/Layout/DashBoardLayouot";
import AllStudentsCard from "../../components/Cards/AllStudentsCard";

const AdminDashboard = () => {
  const { user } = useContext(UserContext);


  return (
    <div>
      <DashBoardLayouot>
        <h2>Welcome {user?.email}</h2>
        <AllStudentsCard limit={3}/>
      </DashBoardLayouot>
    </div>
  );
};

export default AdminDashboard;

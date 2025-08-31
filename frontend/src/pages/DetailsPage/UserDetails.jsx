import React, { useContext } from "react";
import UserDetailsCard from "../../components/Cards/UserDetailsCard";
import { UserContext } from "../../context/UserContext";
import DashBoardLayouot from "../../components/Layout/DashBoardLayouot";

const UserDetails = () => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token")
  return (
    <DashBoardLayouot>
        User Profile
        <UserDetailsCard 
  id={user._id || user.id} 
  email={user.email} 
  role={user.role} 
  token={token} 
  onUserUpdate={(updatedUser) => {
    // update context/localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));
    // OR update context if you have setUser in UserContext
    // setUser(updatedUser);
  }}
/>


    </DashBoardLayouot>
  );
};

export default UserDetails;

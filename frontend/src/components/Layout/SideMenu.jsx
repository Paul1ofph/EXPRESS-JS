import { SIDE_MENU_DATA } from "../../utils/data";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import ProfileCard from "../Cards/ProfileCard";
import { CiLogout } from "react-icons/ci";

const SideMenu = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);
  const handleLogout = () => {
    localStorage.clear(); // safer than clear()
    clearUser(); // clears context
    navigate("/"); // redirect to login page
  };
  const handleUserProfile = () => {
    navigate("/profile");
  }

  return (
    <div className="flex flex-col justify-between w-64 h-[calc(100vh-61px)] bg-slate-50/50 border-r  border-slate-100/70 p-5 sticky top-[61px] z-20">
      <div className="">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[20px] py-4 px-6 rounded-md mb-3`}
            onClick={() => navigate(item.path)}
          >
            {item.icon && <item.icon className="text-2xl" />}
            <span>{item.label}</span>
          </button>
        ))}
        <button
          className="w-full flex items-center gap-4 text-[20px] py-4 px-6 rounded-md mb-3"
          onClick={handleLogout}
        >
          <CiLogout className="text-2xl" />
          LogOut
        </button>
      </div>

      {user && (
          <div onClick={handleUserProfile} className="cursor-default">
            <ProfileCard email={user.email} role={user.role} />
          </div>
      )}
    </div>
  );
};

export default SideMenu;

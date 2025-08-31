import React, { useContext, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import ProfileCard from "../Cards/ProfileCard";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="flex gap-5 boredr-b border-white-100 bg-slate-50/50 backdrop-blur-[2px] p-4 sticky top-0 z-30 items-center justify-between">
      <div className="flex gap-5">
        <button
          className="block lg:hidden text-black"
          onClick={() => {
            setOpenSideMenu(!openSideMenu);
          }}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>
        <h2 className="text-lg font-medium text-black">School DB</h2>

        {openSideMenu && (
          <div className="fixed top-[61px] -ml-4 bg-white">
            <SideMenu />
          </div>
        )}
      </div>
      <div className="flex items-center cursor-default" onClick={() => navigate("/profile")}>
        <ProfileCard role={user.role} />
      </div>
    </div>
  );
};

export default Navbar;

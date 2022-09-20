import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const NavbarLink = ({ path, text }) => {
  const { authToken, user } = useAuthContext();
  const activeClassNames = "bg-gray-900 text-white";
  const inactiveClassNames = "text-gray-300 hover:bg-gray-700 hover:text-white";

  //display skeleton if user is not loaded yet
  return authToken && !user.profile_pic ? (
    <div className="h-5 w-10 bg-slate-200 text-slate rounded col-span-1"></div>
  ) : (
    <NavLink
      to={path.toLowerCase()}
      className={({ isActive }) =>
        isActive ? activeClassNames : inactiveClassNames
      }
    >
      {text}
    </NavLink>
  );
};

export default NavbarLink;

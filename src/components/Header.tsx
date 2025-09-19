import { NavLink, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { useState } from "react";
import UserCard from "./cards/UserCard";
import { LogOutUser } from "../slice/userSlice";
import { UserIcon } from "lucide-react";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);
  const [userCard, setUserCard] = useState(false);

  // Logout handler
  const handleLogout = () => {
    dispatch(LogOutUser());
    setUserCard(false);
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1
            className="md:text-2xl font-bold text-gray-700 cursor-pointer"
            onClick={() => navigate("")}
          >
            IssueTrack
          </h1>

          {currentUser.userId &&<nav>
            <div className="hidden md:flex gap-4 font-semibold">
              <NavLink
                to={""}
                className={({ isActive }) =>
                  isActive ? "underline text-gray-800" : ""
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) =>
                  isActive ? "underline text-gray-800" : ""
                }
              >
        
                Dashboard
              </NavLink>
            </div>
          </nav>}

          {/* User Menu */}
          <div className="relative">
            <div
            title={currentUser.userName}
              onClick={() => {
                setUserCard(!userCard);
              }}
              className="w-10 h-10 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md flex items-center justify-center text-gray-600 font-semibold text-lg"
            >
              {currentUser.userName?.[0]?.toUpperCase() || <UserIcon/>}
            </div>

            {userCard && (
              <UserCard
                setUserCard={setUserCard}
                currentUser={currentUser}
                handleLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

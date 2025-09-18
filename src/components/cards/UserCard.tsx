import { useNavigate } from "react-router-dom";
import type { UserType } from "../../types/types";
import { LogIn, LogOut, User, X, LayoutDashboard, HomeIcon } from "lucide-react";
interface UserCardProps {
  currentUser: UserType;
  handleLogout: () => void;
  setUserCard: (userCard: boolean) => void;
}
export default function UserCard({
  currentUser,
  handleLogout,
  setUserCard,
}: UserCardProps) {
  const navigate = useNavigate();
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border p-4 z-50 text-gray-700">
      {/* Profile Section */}
      <div
        onClick={() => {
          setUserCard(false);
        }}
        className="absolute -right-1 -top-1 bg-gray-300 p-0.5 md:p-1 shadow-md rounded-full hover:bg-gray-400"
      >
        <X size={20} />
      </div>
      <div className="flex items-center gap-3 border-b pb-3 mb-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg">
          {currentUser.userName?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <div className="font-semibold text-gray-800">
            {currentUser.userName}
          </div>
          <div className="text-sm text-gray-600 truncate">
            {currentUser.email}
          </div>
        </div>
      </div>

      {/* Menu Actions */}
      <div className="space-y-1">
        {/* profile button */}
        {currentUser.userId && (
          <button
            onClick={() => {
              setUserCard(false);
              navigate("/profile");
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition"
          >
            <User size={18} />
            Profile
          </button>
        )}

        {/* Dashboard Button */}
        {currentUser.userId && (
          <button
            onClick={() => {
              setUserCard(false);
              navigate("/dashboard");
            }}
            className="md:hidden flex items-center gap-2 w-full px-3 py-2  font-medium rounded-lg  hover:bg-gray-100 text-gray-700 "
          >
            <LayoutDashboard size={18} />
            Dashbord
          </button>
        )}
        {/* home  button */}
         {currentUser.userId && (
          <button
            onClick={() => {
              setUserCard(false);
              navigate("/");
            }}
            className="md:hidden flex items-center gap-2 w-full px-3 py-2  font-medium rounded-lg  hover:bg-gray-100 text-gray-700 "
          >
            <HomeIcon size={18} />
            Home
          </button>
        )}

        {/* login logout button */}
        {currentUser.userId ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-red-600 font-medium rounded-lg hover:bg-red-50 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-green-600 font-medium rounded-lg hover:bg-green-50 transition"
          >
            <LogIn size={18} />
            LogIn
          </button>
        )}
      </div>
    </div>
  );
}

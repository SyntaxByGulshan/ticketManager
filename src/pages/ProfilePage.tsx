
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LogOut, ArrowLeft, User } from "lucide-react"; 
import { LogOutUser } from "../slice/userSlice"; 

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  // Redirect if not logged in
  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
    }
  }, [user, navigate]);



  return (
    <div className="flex justify-center py-20 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-gray-600 hover:text-green-600"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <button
            onClick={() => {
              dispatch(LogOutUser());
              navigate("/login");
            }}
            className="flex items-center gap-1 text-red-500 hover:text-red-600"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>

        {/* Avatar + Name */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-md">
            {user?.userName ? user.userName.charAt(0).toUpperCase() : <User size={40} />}
          </div>
          <h2 className="mt-4 text-2xl font-bold">{user?.userName || "User"}</h2>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>

        {/* User Info */}
        <div className="space-y-4">
          <div className="flex justify-between p-3 border rounded-lg">
            <span className="text-gray-500 text-sm">User ID</span>
            <span className="text-lg font-medium">{user?.userId}</span>
          </div>

          <div className="flex justify-between p-3 border rounded-lg">
            <span className="text-gray-500 text-sm">Role</span>
            <span className="text-lg font-medium capitalize">{user?.authLeval}</span>
          </div>

          
        </div>

        {/* Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/edit-profile")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md"
          >
            Edit Profile
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg shadow-md"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

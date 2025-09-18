// src/pages/ProfilePage.tsx
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  // If no user is logged in, redirect to login page
  useEffect(()=>{
    if (!user?.email) {
    navigate("/login");
  
  }
  },[])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>

        <div className="space-y-4">
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Role</p>
            <p className="text-lg font-medium capitalize">{user.authLeval}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">User ID</p>
            <p className="text-lg font-medium">{user.userId}</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-green-500 text-white p-2 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

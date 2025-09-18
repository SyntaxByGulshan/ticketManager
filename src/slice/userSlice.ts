import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../types/types";


interface LoginDataType {
  email: string;
  password: string;
}

// Adjust initialState to match UserType structure
const initialState: UserType = {
  authLeval: JSON.parse(sessionStorage.getItem('user')||'null')?.authLeval||"user",
  userId:JSON.parse(sessionStorage.getItem('user')||'null')?.userId || "",
  userName: JSON.parse(sessionStorage.getItem('user')||'null')?.userName||"",
  email:JSON.parse(sessionStorage.getItem('user')||'null')?.email|| "",
  password:JSON.parse(sessionStorage.getItem('user')||'null')?.password||"",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpUser: (state, action: PayloadAction<UserType>) => {
      // update current state
      state.authLeval = action.payload.authLeval;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.password = action.payload.password;
      sessionStorage.setItem('user',JSON.stringify(state))
      // persist to localStorage
      const users: UserType[] = JSON.parse(localStorage.getItem("users") || "[]");
      users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(users));
      sessionStorage.setItem('user',JSON.stringify(state))
    },

    loginInUser: (state, action: PayloadAction<LoginDataType>) => {
      const users: UserType[] = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = users.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );

      if (foundUser) {
        state.authLeval = foundUser.authLeval;
        state.userId = foundUser.userId;
        state.userName = foundUser.userName;
        state.email = foundUser.email;
        state.password = foundUser.password;
        sessionStorage.setItem('user',JSON.stringify(state))
      } else {
        // optional: clear state if login fails
        state.authLeval = "user";
        state.userId = "";
        state.userName = "";
        state.email = "";
        state.password = "";
      }
    },
    LogOutUser:(state)=>{
      sessionStorage.removeItem('user')
      state.authLeval = "user";
        state.userId = "";
        state.userName = "";
        state.email = "";
        state.password = "";
    }
  },
});

export const { signUpUser, loginInUser,LogOutUser } = userSlice.actions;
export default userSlice.reducer;

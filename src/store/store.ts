// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "../slice/ticketSlice";
import userReducer from "../slice/userSlice"

export const store = configureStore({
  reducer: {
    tickets: ticketReducer,
     user:userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

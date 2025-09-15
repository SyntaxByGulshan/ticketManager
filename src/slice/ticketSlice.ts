// src/store/ticketSlice.ts
import { createSlice} from "@reduxjs/toolkit";
import type {PayloadAction } from "@reduxjs/toolkit";
import type TicketType from "../types/types";


interface TicketState {
  tickets: TicketType[];
}

const initialState: TicketState = {
  tickets: JSON.parse(localStorage.getItem("ticket") || "[]"),
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<TicketType>) => {
      state.tickets = [action.payload, ...state.tickets];
      localStorage.setItem("ticket", JSON.stringify(state.tickets));
    },
    updateStatus: (state, action: PayloadAction<{ id: string, status: TicketType["status"] ,resolvedAt?:TicketType['resolvedAt'] }>) => {
      const ticket = state.tickets.find((t) => t.id === action.payload.id);
      if (ticket) {
        ticket.status = action.payload.status;
        ticket.resolvedAt=action.payload.resolvedAt;
        localStorage.setItem("ticket", JSON.stringify(state.tickets));
      }
    },
    deleteTicket: (state, action: PayloadAction<string>) => {
      state.tickets = state.tickets.map((ticket)=>{
            if(ticket.id===action.payload){
              ticket.isDeleted=true;
             
              return ticket
            }
            return ticket
      })
      localStorage.setItem("ticket", JSON.stringify(state.tickets));
    },
    addComment: (state, action: PayloadAction<{ id: string; comment: string }>) => {
      const { id, comment } = action.payload;
      const ticket = state.tickets.find((t) => t.id === id);
      if (ticket) {
        if (!ticket.comments) {
          ticket.comments = [];
        }
        ticket.comments.push({
          comment,
          commentTime: new  Date().toString(),
          commentStatus:ticket.status
        });
        localStorage.setItem("ticket", JSON.stringify(state.tickets));
      }
    }
  },
});
export const { addTicket, updateStatus, deleteTicket,addComment } = ticketSlice.actions;
export default ticketSlice.reducer;

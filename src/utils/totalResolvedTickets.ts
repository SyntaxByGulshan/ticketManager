import type TicketType from "../types/types";


export default function totalResolvedTickets(ticketsArray:TicketType[]) {
     return ticketsArray.filter(
    (t) => t.status === "Resolved"
  ).length;
}
import type TicketType from "../types/types";


export default function totalActiveTickets(ticketsArray:TicketType[]) {
     return ticketsArray.filter(
    (t) => t.status === "Open" || t.status === "In Progress"
  ).length;
}

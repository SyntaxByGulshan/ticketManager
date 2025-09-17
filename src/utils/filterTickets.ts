import type { UserType } from "../types/types";
import type TicketType from "../types/types"

interface FilterProps{
    currentUser:UserType
    tickets:TicketType[];
    search:string;
    statusFilter:'All'|"In Progress" | "Resolved" | 'Open';
    priorityFilter:"All"|"Low" | "Medium" | "High";
}

export default function filterTickets({tickets,search,statusFilter,priorityFilter,currentUser}:FilterProps):TicketType[]{
  return tickets.filter((ticket) => {
    const matchesSearch = ticket.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || ticket.status === statusFilter;
    const matchesPriority =
      priorityFilter === "All" || ticket.priority === priorityFilter;
    const matchsCurrentUser=(currentUser.userId===ticket.userId)?true:false 
    return (
      !ticket.isDeleted && matchesSearch && matchesStatus && matchesPriority && matchsCurrentUser
    );
  });
}

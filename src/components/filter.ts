import type TicketType from "../types/types"

interface FilterProps{
    ticket:TicketType;
    search:string;
    statusFilter:string;
    
}

export default function filter({ticket}:TicketType){
   const matchesSearch = ticket.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || ticket.status === statusFilter;
    const matchesPriority =
      priorityFilter === "All" || ticket.priority === priorityFilter;
    return (
      !ticket.isDeleted && matchesSearch && matchesStatus && matchesPriority
    );

}
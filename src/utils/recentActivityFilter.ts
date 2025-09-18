
import type TicketType from '../types/types';

export default function recentActivityFilter(ticketsArray:TicketType[]) {
const allActivity: { message: string; date: Date; type: string }[] = [];
  ticketsArray.forEach((ticket) => {
    if (ticket.createdAt) {
      allActivity.push({
        message: `Ticket #${ticket.id} created`,
        date: new Date(ticket.createdAt),
        type: "create",
      });
    }
    if (ticket.status === "Resolved") {
      allActivity.push({
        message: `Ticket #${ticket.id} resolved`,
        date: new Date(ticket.resolvedAt||''), 
        type: "resolve",
      });
    }
  });
  return allActivity
    .sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0,5)
}

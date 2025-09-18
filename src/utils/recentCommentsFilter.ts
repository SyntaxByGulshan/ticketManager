import type TicketType from '../types/types';

export default function recentCommentsFilter(ticketsArray:TicketType[]) {
    const allComments: { ticketId: string; comment: string; commentTime: Date }[] = [];
  ticketsArray.forEach((ticket) => {
    if (ticket.comments) {
      ticket.comments.forEach((c) => {
        allComments.push({
          ticketId: ticket.id,
          comment: c.comment,
          commentTime: new Date(c.commentTime),
        });
      });
    }
  });
  return allComments.sort((a,b)=>b.commentTime.getTime() - a.commentTime.getTime()).slice(0,5)
}

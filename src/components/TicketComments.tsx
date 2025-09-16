
import type TicketType from '../types/types'
interface TicketDetailsProps{
    ticket:TicketType
}

export default function TicketComments({ticket}:TicketDetailsProps) {
  return (
    <div className="space-y-2 mb-4  ">
          {ticket.comments && ticket.comments.length > 0 ? (
            ticket.comments.map((c, i) => (
              <div key={i} className="mb-3">
                <div className="flex items-start gap-2 ">
                  {/* Status dot */}
                  <span
                    className={`h-3 w-3 rounded-full mt-1.5 flex-shrink-0 ${
                      c.commentStatus === "Open"
                        ? "bg-[#d83646] shadow shadow-red-500"
                        : c.commentStatus === "In Progress"
                        ? "bg-yellow-500 shadow shadow-yellow-500"
                        : "bg-[#30aa2e] shadow shadow-green-500"
                    }`}
                  ></span>

                  {/* Comment content */}
                  <div>
                    <p className="text-gray-800">{c.comment}</p>
                    <span className="text-xs text-gray-500">
                      {c.commentTime}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // if no comment is present
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}
        </div>
  )
}

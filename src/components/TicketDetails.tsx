import type TicketType from "../types/types"

interface TicketDetailsProps{
    ticket:TicketType
}
export default function TicketDetails({ticket}:TicketDetailsProps) {
  return (
    <div>
        <table className="w-full border-collapse">
          <tbody>

            {/* ticket title */}
            <tr>
              <td className="font-semibold p-2 w-32">Title:</td>
              <td className="p-2">{ticket.title}</td>
            </tr>

            {/* ticket id */}
            <tr>
              <td className="font-semibold p-2">ID:</td>
              <td className="p-2">{ticket.id}</td>
            </tr>

            {/* ticket priority */}
            <tr>
              <td className="font-semibold p-2">Priority:</td>
              <td
                className={`p-2 font-semibold ${
                  ticket.priority === "High"
                    ? "text-[#d83646]"
                    : ticket.priority === "Medium"
                    ? "text-[#568ec0]"
                    : "text-[#30aa2e]"
                }`}
              >
                {ticket.priority}
              </td>
            </tr>

            {/* ticket status */}
            <tr className="">
              <td className="font-semibold p-2">Status:</td>
              <td
                className={`p-2 font-semibold ${
                  ticket.status === "Open"
                    ? "text-[#d83646]"
                    : ticket.status === "In Progress"
                    ? "text-yellow-500"
                    : "text-[#30aa2e]"
                }`}
              >
                {ticket.status}
              </td>
            </tr>

            {/* ticket created time */}
            <tr>
              <td className="font-semibold p-2">Created At:</td>
              <td className="p-2">
                {new Date(ticket.createdAt).toLocaleString()}
              </td>
            </tr>

            {/* ticket Resolved time */}
            <tr>
              <td className="font-semibold p-2">Resolved At:</td>
              <td className="p-2">{ticket.resolvedAt || "Not Resolved"}</td>
            </tr>
            
            {/* ticket discription */}
            <tr>
              <td className="font-semibold p-2 align-top">Description:</td>
              <td className="p-2 whitespace-pre-wrap">{ticket.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
  )
}

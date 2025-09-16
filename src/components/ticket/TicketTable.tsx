import type TicketType from "../../types/types";
import UpdateStatusButton from "../buttons/UpdateStatusButton";
import { CircleCheck, CircleEllipsis, ClockFading } from "lucide-react";
import type { TicketNotifictionProps } from "../../pages/TicketListPage";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../buttons/DeleteButton";
import ViewDetailsButton from "../buttons/ViewDetailsButton";

interface TicketTableProps {
  filteredTickets: TicketType[];
  setShowNotification: ({
    notificationType,
    id,
    message,
  }: TicketNotifictionProps) => void;
  setIsToDelete: (ticket: TicketType) => void;
}
export default function TicketTable({
  filteredTickets,
  setShowNotification,
  setIsToDelete,
}: TicketTableProps) {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto  rounded-md ">
      <table className="w-full border-collapse text-sm md:text-base">
        {/* table header */}
        <thead>
          <tr className="bg-gray-300 text-left ">
            <th className="p-4">ID</th>
            <th className="p-4">Title</th>
            <th className="p-4">Priority</th>
            <th className="p-4">Status</th>
            <th className="p-4">Created</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        {/* table Body */}
        <tbody>
          {filteredTickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="hover:bg-gray-200  cursor-pointer even:bg-gray-100"
            >
              
              {/* ticket id */}
              <td className="p-4 border-t">{ticket.id}</td>

              {/* ticket title */}
              <td className="p-4 border-t ">{ticket.title}</td>

              {/* ticket priority */}
              <td
                className={`p-4 border-t border-black  ${
                  ticket.priority === "High"
                    ? "text-[#d83646]"
                    : ticket.priority === "Medium"
                    ? "text-[#568ec0]"
                    : "text-[#30aa2e]"
                }`}
              >
                {ticket.priority}
              </td>


              {/* ticket status */}
              <td
                className={`p-4 border-t border-black  ${
                  ticket.status === "Open"
                    ? "text-[#d83646]"
                    : ticket.status === "In Progress"
                    ? "text-yellow-500"
                    : "text-[#30aa2e]"
                }`}
              >
                <div className="flex gap-1 items-center">
                  {ticket.status === "Resolved" ? (
                    <span>
                      {" "}
                      <CircleCheck className="h-5" />
                    </span>
                  ) : ticket.status === "In Progress" ? (
                    <span>
                      {" "}
                      <CircleEllipsis className="h-5" />
                    </span>
                  ) : (
                    <span>
                      {" "}
                      <ClockFading className="h-5" />
                    </span>
                  )}
                  <span>{ticket.status}</span>
                </div>
              </td>

              {/* created time */}
              <td className="p-4 border-t">{ticket.createdAt}</td>


              {/* actions on ticket */}
              <td className="p-4 border-t  gap-2 ">
                <div className="flex justify-center gap-4">

                  {/* view button */}
                  <ViewDetailsButton
                    onClick={() => {navigate(`/ticket/${ticket.id}`)}}
                    className="px-3 py-1 bg-blue-500 text-gray-200 rounded-md shadow hover:bg-[#267ac4] "
                 />
                  
                  {/* update button */}
                  <UpdateStatusButton
                    onUpdate={(status) => {
                      setShowNotification({
                        notificationType: status,
                        id: ticket.id,
                        message: `Status updated to ${status}`,
                      });
                    }}
                    className={`bg-green-500 border-0 text-gray-100`}
                    ticket={ticket}
                  />

                  {/* delete button */}
                  {ticket.status === "Resolved" ? (
                    <DeleteButton
                      onClick={() => {
                        setIsToDelete(ticket);
                      }}
                      className={`px-3 py-1 bg-[#d83646] text-gray-200 rounded-md shadow hover:bg-[#aa0919]`}
                    />
                  ) : (
                    <DeleteButton
                      title="not Resolved"
                      className="bg-red-300 px-3 py-1 rounded-md cursor-no-drop text-white"
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

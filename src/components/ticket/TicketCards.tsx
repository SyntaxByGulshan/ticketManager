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

export default function TicketCards({
  filteredTickets,
  setShowNotification,
  setIsToDelete,
}: TicketTableProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
      {filteredTickets.map((ticket) => (
        <div
          key={ticket.id}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-200"
        >
          {/* Title & ID */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg text-gray-800">
              {ticket.title}
            </h3>
            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-md text-gray-600">
              #{ticket.id}
            </span>
          </div>

          {/* Priority */}
          <p
            className={`text-sm font-medium mb-2 ${
              ticket.priority === "High"
                ? "text-[#d83646]"
                : ticket.priority === "Medium"
                ? "text-[#568ec0]"
                : "text-[#30aa2e]"
            }`}
          >
            Priority: {ticket.priority}
          </p>

          {/* Status */}
          <div
            className={`flex items-center gap-2 text-sm font-medium mb-2 ${
              ticket.status === "Open"
                ? "text-[#d83646]"
                : ticket.status === "In Progress"
                ? "text-yellow-500"
                : "text-[#30aa2e]"
            }`}
          >
            {ticket.status === "Resolved" ? (
              <CircleCheck className="h-5 w-5" />
            ) : ticket.status === "In Progress" ? (
              <CircleEllipsis className="h-5 w-5" />
            ) : (
              <ClockFading className="h-5 w-5" />
            )}
            <span>{ticket.status}</span>
          </div>

          {/* Created At */}
          <p className="text-xs text-gray-500 mb-4">
            Created: {ticket.createdAt}
          </p>

          {/* Actions */}
          <div className="flex justify-between gap-2">
            <ViewDetailsButton
              onClick={() => navigate(`/ticket/${ticket.id}`)}
              className="flex-1 px-3 py-1 bg-blue-500 text-gray-200 rounded-md shadow hover:bg-[#267ac4] "
            />

            <UpdateStatusButton
              onUpdate={(status) => {
                setShowNotification({
                  notificationType: status,
                  id: ticket.id,
                  message: `Status updated to ${status}`,
                });
              }}
              className="flex-1 bg-green-500 text-gray-100 rounded-md shadow"
              ticket={ticket}
            />

            {ticket.status === "Resolved" ? (
              <DeleteButton
                onClick={() => setIsToDelete(ticket)}
                className="flex-1 px-3 py-1 bg-[#d83646] text-gray-200 rounded-md shadow hover:bg-[#aa0919]"
              />
            ) : (
              <DeleteButton
                title="not Resolved"
                className="flex-1 bg-red-300 px-3 py-1 rounded-md cursor-not-allowed text-white"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

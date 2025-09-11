import type TicketType from "../types/types";
// import { AlertTriangle } from "lucide-react"; // nice warning icon

interface MessageProps {
  ticket: TicketType;
  className?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteMessage({
  ticket,
  className,
  onCancel,
  onConfirm,
}: MessageProps) {
  const isDeletable = ticket.status === "Resolved";

  return (
    <div
      className={`bg-white shadow-2xl rounded-2xl border border-gray-200 p-6 w-full max-w-md ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {/* <AlertTriangle className="text-red-500 w-6 h-6" /> */}
        <h2 className="text-xl font-bold text-gray-800">Delete Ticket</h2>
      </div>

      {/* Warning Message */}
      <p
        className={`mb-3 text-sm ${
          isDeletable ? "text-gray-600" : "text-red-600 font-medium"
        }`}
      >
        {isDeletable
          ? "Are you sure you want to delete this ticket?"
          : "You cannot delete this ticket unless it is resolved."}
      </p>

      {/* Ticket Title */}
      <p className="mb-4 text-base font-semibold text-gray-900">
        {ticket.title}
      </p>

      {/* Ticket Preview */}
      <div className="bg-gray-50 p-4 rounded-xl shadow-inner mb-6 space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-medium">ID:</span> {ticket.id}
        </p>
        <p className={`font-semibold ${
                      ticket.status === "Open"
                        ? "text-red-500"
                        : ticket.status === "In Progress"
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}>
          <span className="font-bold text-gray-600">Status:</span> {ticket.status}
        </p>
        <p className={`font-semibold ${
                      ticket.priority === "High"
                        ? "text-red-500"
                        : ticket.priority === "Medium"
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}>
          <span className="font-bold text-gray-600">Priority:</span> {ticket.priority}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-5 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 "
        >
          Cancel
        </button>
        {isDeletable && (
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-md bg-red-500 text-white font-medium shadow hover:bg-red-600 "
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

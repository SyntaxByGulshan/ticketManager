import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { deleteTicket, addComment } from "../slice/ticketSlice";
import UpdateStatus from "../components/UpdateStatus";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type TicketType from "../types/types";
import DeleteMessage from "../components/DeleteMassage";

export default function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");
  const [isToDelete, SetIsToDelete] = useState<TicketType | false>();

  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return (
      <div className="max-w-3xl w-full mx-auto py-12">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Ticket Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-gray-200 rounded hover:bg-gray-700 flex"
          >
            <ArrowLeft />
            <span>Back</span>
          </button>
        </div>
      </div>
    );
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment({ id: ticket.id, comment: newComment }));
      setNewComment("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-200 text-gray-700 shadow rounded-xl px-6 py-10 my-2 md:my-14">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-gray-500 text-gray-200 rounded hover:bg-gray-700 flex"
      >
        <ArrowLeft />
        <span>Back</span>
      </button>
      <h2 className="text-2xl font-bold my-4">Ticket Details</h2>

      <div className="space-y-4">
        <p>
          <span className="font-semibold">ID:</span> {ticket.id}
        </p>
        <p>
          <span className="font-semibold">Title:</span> {ticket.title}
        </p>
        <p>
          <span className="font-semibold">Priority:</span>{" "}
          <span
            className={`${
              ticket.priority === "High"
                ? "text-red-500"
                : ticket.priority === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            } font-semibold`}
          >
            {ticket.priority}
          </span>
        </p>
        <p>
          <span className="font-semibold">Status:</span>
          <span
            className={`font-semibold ml-2 ${
              ticket.status === "Open"
                ? "text-red-500"
                : ticket.status === "In Progress"
                ? "text-blue-500"
                : "text-green-500"
            }`}
          >
            {ticket.status}
          </span>
        </p>
        <p>
          <span className="font-semibold">Created At:</span> {ticket.createdAt}
        </p>
        <p>
          <span className="font-semibold">Description:</span>{" "}
          {ticket.description || "No description provided"}
        </p>
      </div>

      {/* Comments */}
      <div className="mt-7">
        <h3 className="text-xl font-semibold mb-3">Comments</h3>
        <div className="space-y-2 mb-4  ">
          {ticket.comments && ticket.comments.length > 0 ? (
            ticket.comments.map((c, i) => (
              <div key={i} className="mb-3">
                <div className="flex items-start gap-2 ">
                  {/* Status dot */}
                  <span
                    className={`h-3 w-3 rounded-full mt-1.5 flex-shrink-0 ${
                      c.commentStatus === "Open"
                        ? "bg-red-500 shadow shadow-red-500"
                        : c.commentStatus === "In Progress"
                        ? "bg-blue-500 shadow shadow-blue-500"
                        : "bg-green-500 shadow shadow-green-500"
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
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mt-6">
        <UpdateStatus
          className={`px-4 py-2 rounded-md ${
            ticket.status === "Resolved"
              ? "bg-green-300 text-gray-50"
              : "bg-green-500 hover:bg-gray-600 text-gray-200"
          }`}
          ticket={ticket}
        />
        <button
          onClick={() => SetIsToDelete(ticket)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      {/* Delete Confirmation */}
      {isToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex justify-center items-center px-4">
          <DeleteMessage
            className="bg-white rounded-md shadow-xl w-full max-w-md p-6"
            ticket={isToDelete}
            onCancel={() => SetIsToDelete(false)}
            onConfirm={() => {
              dispatch(deleteTicket(isToDelete.id));
              SetIsToDelete(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

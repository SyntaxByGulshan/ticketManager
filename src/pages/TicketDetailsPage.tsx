import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { deleteTicket, addComment } from "../slice/ticketSlice";
import UpdateStatus from "../components/UpdateStatus";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type TicketType from "../types/types";
import DeleteMessage from "../components/DeleteMassage";

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");
  const [isToDelete, SetIsToDelete] = useState<TicketType | false>();
  const [commentError, setCommentError] = useState("");

  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const ticket = tickets.find((t) => t.id === id && t.isDeleted===false);
  // return if no ticket is present
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

  // change on input field of comment field
  const handleOnChangeCommentField = (value: string) => {
    setNewComment(value);
    // field is empty
    if (value.trim() === "") {
      setCommentError("Comment cannot be empty.");
      return;
    }
    //  Minimum length 3
    else if (value.trim().length < 3) {
      setCommentError("Comment must be at least 3 characters.");
      return;
    }
    // Maximum length 200
    else if (value.length > 200) {
      setCommentError("Comment cannot exceed 200 characters.");
      return;
    }
    // Comment must include letters or numbers
    else if (/^[^a-zA-Z0-9]+$/.test(value)) {
      setCommentError("Comment must include letters or numbers.");
      return;
    } else {
      setCommentError("");
    }
  };
  // after adding comment
  const handleAddComment = () => {
    // check if comment have error or null value
    if (commentError.trim() === "" && newComment.trim() !== "") {
      dispatch(addComment({ id: ticket.id, comment: newComment.trim() }));
      setNewComment("");
    }
    // if input field do not have value then set error
    else {
      setCommentError("Comment cannot be empty.");
    }
  };

  // return this if ticket is present
  return (
    <div className="max-w-3xl mx-auto bg-gray-200 text-gray-700 shadow rounded-xl px-6 pb-10 pt-4 my-2 md:my-12">
      {/* this is titiel */}
      <h2 className="text-2xl font-bold my-4 p-2">Ticket Details</h2>
      {/* ticket details section */}
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

      {/* stored comments section  + input comment field*/}
      <div className="mt-7 p-2">
        {/* title */}
        <h3 className="text-xl font-semibold mb-3">Comments</h3>
        {/* comments */}
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
        {/* comment input section */}
        <div className="flex items-center gap-2">
          {/* comment input field */}
          <input
            type="text"
            value={newComment}
            onChange={(e) => handleOnChangeCommentField(e.target.value)}
            placeholder="Write a comment..."
            className="flex-auto bg-gray-100 rounded-lg px-3 py-2 outline-none"
          />
          {/* comment add button */}
          <button
            onClick={handleAddComment}
            className=" bg-[#568ec0] hover:bg-blue-600 text-white px-4 py-2 rounded-lg outline-none"
          >
            Add
          </button>
        </div>
        <span className="text-red-500"> {commentError}</span>
      </div>

      {/* Actions button section */}
      <div className="flex flex-wrap gap-3 mt-6 p-2">
        {/* update status button  */}
        <UpdateStatus
          className={`px-4 py-2 rounded-md ${
            ticket.status === "Resolved"
              ? "bg-green-300 text-gray-50 cursor-not-allowed"
              : "bg-[#30aa2e] hover:bg-[#0c8908] text-gray-200"
          }`}
          ticket={ticket}
        />
        {/* delete button */}
        <button
          onClick={() => SetIsToDelete(ticket)}
          className="px-4 py-2 bg-[#d83646] text-white rounded hover:bg-[#aa0919]"
        >
          Delete
        </button>
      </div>
      {/* Delete Confirmation  section*/}
      {isToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex justify-center items-center px-4">
          <DeleteMessage
            className="bg-white rounded-md shadow-xl w-full max-w-md p-6"
            ticket={isToDelete}
            onCancel={() => SetIsToDelete(false)}
            onConfirm={() => {
              dispatch(deleteTicket(isToDelete.id));
              SetIsToDelete(false);
              navigate(-1)
            }}
          />
        </div>
      )}
    </div>
  );
}

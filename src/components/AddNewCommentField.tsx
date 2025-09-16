import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../slice/ticketSlice";
import type TicketType from "../types/types";

interface AddNewCommentFieldProps {
  ticketId: TicketType["id"];
}

export default function AddNewCommentField({
  ticketId,
}: AddNewCommentFieldProps) {
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const dispatch = useDispatch();
  // change on input field of comment field
  const handleOnChangeCommentField = (value: string) => {
    setNewComment(value);
    if (value.trim() === "") {
      setCommentError("Comment cannot be empty.");
      return;
    } else if (value.trim().length < 3) {
      setCommentError("Comment must be at least 3 characters.");
      return;
    } else if (value.length > 200) {
      setCommentError("Comment cannot exceed 200 characters.");
      return;
    } else if (/^[^a-zA-Z0-9]+$/.test(value)) {
      setCommentError("Comment must include letters or numbers.");
      return;
    } else {
      setCommentError("");
    }
  };

  const handleAddComment = () => {
    if (commentError.trim() === "" && newComment.trim() !== "") {
      dispatch(addComment({ id: ticketId, comment: newComment.trim() }));
      setNewComment("");
    } else {
      setCommentError("Comment cannot be empty.");
    }
  };

  return (
    <div>
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
      <span className="text-red-500 h-2"> {commentError}</span>
    </div>
  );
}

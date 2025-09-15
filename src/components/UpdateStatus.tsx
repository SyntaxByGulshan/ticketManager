import type TicketType from "../types/types";
import { useDispatch } from "react-redux";
import { updateStatus } from "../slice/ticketSlice";
import { CircleCheck } from "lucide-react";

interface UpdateStatusProps {
  ticket: TicketType;
  className?: string;
  onUpdate: (status: TicketType["status"]) => void;
}

export default function UpdateStatus({
  ticket,
  className,
  onUpdate,
}: UpdateStatusProps) {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TicketType["status"];
    console.log(newStatus)
    if (newStatus === "In Progress") {
      dispatch(updateStatus({ id: ticket.id, status: "In Progress" }));
      onUpdate("In Progress");
    } else if (newStatus === "Resolved") {
      dispatch(
        updateStatus({
          id: ticket.id,
          status: "Resolved",
          resolvedAt: new Date().toLocaleString(),
        })
      );
      onUpdate("Resolved");
    }
    
  };


  let options: TicketType["status"][] = [];
  if (ticket.status === "Open") {
    options = ["Open","In Progress", "Resolved"];
  } else if (ticket.status === "In Progress") {
    options = ["In Progress","Resolved"];
  } else if (ticket.status === "Resolved") {
    options = []; 
  }

  return (
    <>
      {options.length > 0 ? (
        <select
          className={`px-3 py-1 border rounded-md  w-32 outline-none ${className}`}
          onChange={handleChange}
          defaultValue={ticket.status}
          
        >
         
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <button title="Resolved" className="text-white text-sm italic w-32 bg-green-300 rounded-md flex items-center justify-center cursor-no-drop ">
          <span><CircleCheck className="h-5"/></span>
          <span className="">Resolved</span>
        </button>
      )}
    </>
  );
}

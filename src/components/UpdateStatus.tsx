import { useState } from "react";
import type TicketType from "../types/types";
import { useDispatch} from "react-redux";
import { updateStatus } from "../slice/ticketSlice";

interface UpdateStatusProps {
  ticket: TicketType;
  className?:string
}
export default function UpdateStatus({ ticket ,className}: UpdateStatusProps) {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch=useDispatch()
  return (
    <div
      className=""
       onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <button
      title={ticket.status==='Resolved' ? "this ticket is resolved":''}
      className={className}
      >
       <span> Update</span>
      
      </button>
    {/* update status if status is not Resolved */}
      {showOptions && ticket.status!=='Resolved' && (
        <div className="absolute  w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-auto px-2 ">
            {/* hide in progress status if it is already in In Progress */}
            {ticket.status!=='In Progress' && (
            <button
            className="w-full text-left px-3 py-2 text-gray-700 hover:bg-green-100 hover:text-green-700 rounded-t-lg transition"
            onClick={() => {
                setShowOptions(false)
                dispatch(updateStatus({
                    id:ticket.id,
                
                    status:'In Progress',
                  
                }))
            }}
          >
            In Progress
          </button>) }
          
          <button
            className="w-full text-left px-3 py-2 text-gray-700 hover:bg-green-100 hover:text-green-700 rounded-b-lg transition border-t"
            onClick={() =>{
                setShowOptions(false)
                dispatch(updateStatus({
                    id:ticket.id,
              
                    status:'Resolved',
                    
                }))
            }}
          >
            Resolved
          </button>
        </div>
      )}
    </div>
  );
}

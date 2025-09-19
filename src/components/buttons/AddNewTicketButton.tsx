import { TicketPlus } from "lucide-react"
interface AddNewTicketButtonProps{
    onClick:()=>void;
} 

export default function AddNewTicketButton({onClick}:AddNewTicketButtonProps) {
  return (
    <button
            onClick={onClick}
            className="px-3 py-2 bg-blue-500 text-gray-300  rounded-md shadow hover:bg-blue-600 "
          >
            <div className="flex gap-1 items-center justify-center">
              <span>
                <TicketPlus className="h-5" />
              </span>
              <span> AddTicket</span>
            </div>
          </button>
  )
}

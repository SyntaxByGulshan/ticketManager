import type TicketType from "../../types/types";

type StatusFilter='All'|TicketType['status']
interface StatusFilterButtonProps{
    statusFilter:string;
    setStatusFilter:(value:StatusFilter)=>void
}

export default function StatusFilterSelector({statusFilter,setStatusFilter}:StatusFilterButtonProps) {
  return (
    <select
            value={statusFilter}
            onChange={(e) =>{ 
                console.log(e.target.value)
                setStatusFilter(e.target.value as StatusFilter)}}
            className=" p-2 border-2 border-gray-400 rounded-md shadow-sm bg-gray-200 outline-none cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
  )
}

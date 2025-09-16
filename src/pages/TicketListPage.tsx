import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { deleteTicket } from "../slice/ticketSlice";
import DeleteMessage from "../components/DeleteConfMassage";
import type TicketType from "../types/types";
import Notification from "../components/Notification";
import type { NotificationProps } from "../components/Notification";
import ResetButton from "../components/buttons/ResetButton";
import SearchBar from "../components/applyFilters/SearchBar";
import StatusFilterSelector from "../components/applyFilters/StatusFilterSelector";
import PriorityFilterSelector from "../components/applyFilters/PriorityFilterSelector";
import AddNewTicketButton from "../components/buttons/AddNewTicketButton";
import TicketTable from "../components/ticket/TicketTable";
import filterTickets from "../utils/filterTickets";
interface TicketListProps {
  onCreateTicket: () => void;
}
export interface TicketNotifictionProps {
  notificationType: "Delete" | "In Progress" | "Resolved" | "Open";
  id: NotificationProps["id"];
  message: NotificationProps["notificationMessage"];
}

export default function TicketListPage({ onCreateTicket }: TicketListProps) {
  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "In Progress" | "Resolved" | "Open"
  >("All");
  const [priorityFilter, setPriorityFilter] = useState<
    "All" | "Low" | "Medium" | "High"
  >("All");
  const [isToDelete, setIsToDelete] = useState<TicketType | false>();
  const [showNotification, setShowNotification] = useState<
    TicketNotifictionProps | undefined
  >();
  const filteredTickets = filterTickets({
    tickets,
    search,
    priorityFilter,
    statusFilter,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-gray-700">
      {/* Search + Filters+ Add new Button section */}
      <div className="bg-gray-300 shadow-md rounded-md p-4 md:p-6 mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        {/* Search */}
        <SearchBar search={search} setSearch={setSearch} />

        {/* filter section  + add new ticket button */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto ">
          {/* this is status filter section */}
          <StatusFilterSelector
            setStatusFilter={setStatusFilter}
            statusFilter={statusFilter}
          />

          {/* this is priority filter section */}
          <PriorityFilterSelector
            setPriorityFilter={setPriorityFilter}
            priorityFilter={priorityFilter}
          />

          {/* Reset Or clear all button */}
          <ResetButton
            onClick={() => {
              setPriorityFilter("All");
              setStatusFilter("All");
              setSearch("");
            }}
          />

          {/* add new ticket  button*/}
          <AddNewTicketButton onClick={onCreateTicket} />
        </div>
      </div>

      {/* Ticket Table */}
      {filteredTickets.length === 0 ? (
        // if ticket is not present
        <p className="text-gray-600 mt-8 text-center text-lg">
          No tickets found
        </p>
      ) : (
        // if ticket is present
        // <div className="overflow-x-auto  rounded-md ">
        //   <table className="w-full border-collapse text-sm md:text-base">
        //     {/* table header */}
        //     <thead>
        //       <tr className="bg-gray-300 text-left ">
        //         <th className="p-4">ID</th>
        //         <th className="p-4">Title</th>
        //         <th className="p-4">Priority</th>
        //         <th className="p-4">Status</th>
        //         <th className="p-4">Created</th>
        //         <th className="p-4 text-center">Actions</th>
        //       </tr>
        //     </thead>
        //     {/* table Body */}
        //     <tbody>
        //       {filteredTickets.map((ticket) => (
        //         <tr
        //           key={ticket.id}
        //           className="hover:bg-gray-200  cursor-pointer even:bg-gray-100"
        //         >
        //           {/* ticket id */}
        //           <td className="p-4 border-t">{ticket.id}</td>
        //           {/* ticket title */}
        //           <td className="p-4 border-t ">{ticket.title}</td>
        //           {/* ticket priority */}
        //           <td
        //             className={`p-4 border-t border-black  ${
        //               ticket.priority === "High"
        //                 ? "text-[#d83646]"
        //                 : ticket.priority === "Medium"
        //                 ? "text-[#568ec0]"
        //                 : "text-[#30aa2e]"
        //             }`}
        //           >
        //             {ticket.priority}
        //           </td>
        //           {/* ticket status */}
        //           <td
        //             className={`p-4 border-t border-black  ${
        //               ticket.status === "Open"
        //                 ? "text-[#d83646]"
        //                 : ticket.status === "In Progress"
        //                 ? "text-yellow-500"
        //                 : "text-[#30aa2e]"
        //             }`}
        //           >
        //             <div className="flex gap-1 items-center">
        //               {ticket.status === "Resolved" ? (
        //                 <span>
        //                   {" "}
        //                   <CircleCheck className="h-5" />
        //                 </span>
        //               ) : ticket.status === "In Progress" ? (
        //                 <span>
        //                   {" "}
        //                   <CircleEllipsis className="h-5" />
        //                 </span>
        //               ) : (
        //                 <span>
        //                   {" "}
        //                   <ClockFading className="h-5" />
        //                 </span>
        //               )}
        //               <span>{ticket.status}</span>
        //             </div>
        //           </td>
        //           {/* created time */}
        //           <td className="p-4 border-t">{ticket.createdAt}</td>
        //           {/* actions on ticket */}
        //           <td className="p-4 border-t  gap-2 ">
        //             <div className="flex justify-center gap-4">
        //               {/* view button */}
        //               <button
        //                 onClick={() => navigate(`/ticket/${ticket.id}`)}
        //                 className="px-3 py-1 bg-blue-500 text-gray-200 rounded-md shadow hover:bg-[#267ac4] "
        //               >
        //                 View
        //               </button>
        //               {/* update button */}
        //               <UpdateStatus

        //                 onUpdate={(status)=>{
        //                  setShowNotification({
        //                    notificationType:status,
        //                     id:ticket.id,
        //                     message:`Status updated to ${status}`
        //                  })
        //                 }}
        //                 className={`bg-green-500 border-0 text-gray-100`}
        //                 ticket={ticket}
        //               />
        //               {/* delete button */}

        //               {ticket.status==='Resolved'?(<button
        //                 onClick={() => {
        //                   SetIsToDelete(ticket)

        //                 }}
        //                 className={`px-3 py-1 bg-[#d83646] text-gray-200 rounded-md shadow hover:bg-[#aa0919`}
        //               >
        //                 Delete
        //               </button>):(<button title="not Resolved" className="bg-red-300 px-3 py-1 rounded-md cursor-no-drop text-white">Delete</button>)}
        //             </div>
        //           </td>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </table>
        // </div>
        <TicketTable
          filteredTickets={filteredTickets}
          setIsToDelete={setIsToDelete}
          setShowNotification={setShowNotification}
        />
      )}

      {/* Delete Confirmation */}
      {isToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex justify-center items-center px-4">
          <DeleteMessage
            className="bg-white rounded-md shadow-xl w-full max-w-md p-6"
            ticket={isToDelete}
            onCancel={() => setIsToDelete(false)}
            onConfirm={() => {
              dispatch(deleteTicket(isToDelete.id));
              setIsToDelete(false);
              setShowNotification({
                notificationType: "Delete",
                id: isToDelete.id,
                message: `Deleted`,
              });
            }}
          />
        </div>
      )}
      {/* notification */}
      {showNotification && (
        <div className="fixed w-screen flex justify-center items-center  top-2 left-0">
          <Notification
            notificationMessage={showNotification.message}
            className={`relative text-gray-200  p-2 rounded-md text-center ${
              showNotification.notificationType === "Delete"
                ? "bg-red-500 "
                : showNotification.notificationType === "Resolved"
                ? "bg-green-500 "
                : showNotification.notificationType === "In Progress"
                ? "bg-yellow-500"
                : "bg-blue-500"
            }`}
            id={showNotification.id}
            onLoad={() => {
              setTimeout(() => {
                setShowNotification(undefined);
              }, 500);
            }}
          />
        </div>
      )}
    </div>
  );
}

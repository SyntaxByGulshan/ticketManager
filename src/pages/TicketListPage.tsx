import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { deleteTicket } from "../slice/ticketSlice";
import DeleteMessage from "../components/DeleteConfMassage";
import type TicketType from "../types/types";
import Notification from "../components/Notification";
import type { NotificationProps } from "../components/Notification";
import ResetButton from "../components/buttons/ResetButton";
import SearchBar from "../components/filterOptions/SearchBar";
import StatusFilterSelector from "../components/filterOptions/StatusFilterSelector";
import PriorityFilterSelector from "../components/filterOptions/PriorityFilterSelector";
import AddNewTicketButton from "../components/buttons/AddNewTicketButton";
import TicketTable from "../components/ticketComponents/TicketTable";
import filterTickets from "../utils/filterTickets";
import TicketCards from "../components/cards/TicketCards";
import DisplayTypeButton from "../components/buttons/DisplayTypeButton";
import { statusOfPriorityFilter } from "../utils/statusOfPriorityFilter";
import { statusOfStatusFilter } from "../utils/statusOfStatusFilter";
import statusOfSearchBar from "../utils/statusOfSearchBar";
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
  const currentUser=useSelector((state:RootState)=>state.user)

  const [search, setSearch] = useState(statusOfSearchBar||'');
  const [statusFilter, setStatusFilter] = useState<
    "All" | "In Progress" | "Resolved" | "Open"
  >(statusOfStatusFilter);
  const [priorityFilter, setPriorityFilter] = useState<
    "All" | "Low" | "Medium" | "High"
  >(statusOfPriorityFilter);
  const [isToDelete, setIsToDelete] = useState<TicketType | false>();
  const [showNotification, setShowNotification] = useState<
    TicketNotifictionProps | undefined
  >();
  const [displayTypeCard, setDisplayTypeCard] = useState(false);

const filteredTickets = useMemo(() => 
  filterTickets({
    tickets,
    search,
    priorityFilter,
    statusFilter,
    currentUser,
  }), 
  [tickets, search, priorityFilter, statusFilter,currentUser]
);

  return (
    <div className="max-w-7xl mx-auto px-2  text-gray-700">
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
          <div className="flex gap-2 w-full justify-center ">
            <ResetButton
            onClick={() => {
              sessionStorage.removeItem('statusFilter')
              sessionStorage.removeItem('priorityFilter')
              sessionStorage.removeItem('search')
              setPriorityFilter("All");
              setStatusFilter("All");
              setSearch("");
            }}
          />
          <DisplayTypeButton onClick={()=>{
             setDisplayTypeCard(!displayTypeCard)
          }}  displayTypeCard={displayTypeCard}/>
           </div>

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
      ) : displayTypeCard ? (
        <TicketCards
          filteredTickets={filteredTickets}
          setIsToDelete={setIsToDelete}
          setShowNotification={setShowNotification}
        />
      ) : (
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

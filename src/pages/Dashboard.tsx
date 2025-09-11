import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { deleteTicket } from "../slice/ticketSlice";
import { useNavigate } from "react-router-dom";
import UpdateStatus from "../components/UpdateStatus";
import DeleteMessage from "../components/DeleteMassage";
import type TicketType from "../types/types";
import { Search } from 'lucide-react';
import { CircleCheck ,CircleEllipsis,ClockFading} from 'lucide-react';

interface DashboardProps {
  onCreateTicket: () => void;
}

export default function Dashboard({ onCreateTicket }: DashboardProps) {
  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [isToDelete, SetIsToDelete] = useState<TicketType | false>();

  // apply search + filters
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || ticket.status === statusFilter;
    const matchesPriority =
      priorityFilter === "All" || ticket.priority === priorityFilter;
    return (
      !ticket.isDeleted && matchesSearch && matchesStatus && matchesPriority
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-gray-700">
      {/* Search + Filters */}
      <div className="bg-gray-300 shadow-md rounded-md p-4 md:p-6 mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        {/* Search */}
        <div className="flex justify-baseline items-center gap-1 rounded-md border-2 border-gray-400 shadow-sm bg-gray-200  md:w-1/3 py-1 px-4">
        <Search className="text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          className="w-full p-1 outline-none"
        />
        </div>

        {/* filter  */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto ">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border-2 border-gray-400 rounded-md shadow-sm bg-gray-200 outline-none cursor-pointer"
          >
            <option  value="All">All Status</option>
            <option  value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border-2 border-gray-400 rounded-md shadow-sm bg-gray-200 outline-none cursor-pointer"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {/* add new ticket */}
          <button
            onClick={onCreateTicket}
            className="px-5 py-2 bg-green-500 text-gray-200  rounded-md shadow hover:bg-green-600 "
          >
            + Add Ticket
          </button>
        </div>
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

      {/* Ticket Table */}
      {filteredTickets.length === 0 ? (
        <p className="text-gray-600 mt-8 text-center text-lg">
          No tickets found 
        </p>
      ) : (
        <div className="overflow-x-auto  shadow-md rounded-md ">
          <table className="w-full border-collapse text-sm md:text-base">
            {/* table header */}
            <thead>
              <tr className="bg-gray-300 text-left ">
                <th className="p-4">ID</th>
                <th className="p-4">Title</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4">Created</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            {/* table Body */}
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-gray-200 transition cursor-pointer even:bg-gray-100"
                >
                  {/* ticket id */}
                  <td className="p-4 border-t">{ticket.id}</td>
                  {/* ticket title */}
                  <td className="p-4 border-t ">{ticket.title}</td>
                  {/* ticket priority */}
                  <td
                    className={`p-4 border-t border-black  ${
                      ticket.priority === "High"
                        ? "text-red-500"
                        : ticket.priority === "Medium"
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  >
                    {ticket.priority}
                  </td>
                  {/* ticket status */}
                  <td 
                  className={`p-4 border-t border-black  ${
                      ticket.status === "Open"
                        ? "text-red-500"
                        : ticket.status === "In Progress"
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  >
                   <div className="flex gap-1">
                    {ticket.status==='Resolved'?<span className="h-0.5"> <CircleCheck /></span >:(ticket.status==='In Progress'?<span className="h-0.5"> <CircleEllipsis /></span>:<span className="h-0.5"> <ClockFading /></span>)} 
                    <span>{ticket.status}</span>
                   </div>
                    </td>
                  <td className="p-4 border-t">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </td>
                  <td className="p-4 border-t  gap-2 ">
                    <div className="flex justify-center gap-4">
                      <button
                      onClick={() => navigate(`/ticket/${ticket.id}`)}
                      className="px-3 py-1 bg-blue-500 text-gray-200 rounded-md shadow hover:bg-blue-600 "
                    >
                      View
                    </button>
                    <UpdateStatus className={`px-3 py-1 text-gray-200 rounded-md shadow ${ticket.status==='Resolved'?'bg-green-300 text-gray-50':'bg-green-500 hover:bg-gray-600 text-gray-200'}`} ticket={ticket} />
                    <button
                      onClick={() => SetIsToDelete(ticket)}
                      className="px-3 py-1 bg-red-500 text-gray-200 rounded-md shadow hover:bg-red-600"
                    >
                      Delete
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

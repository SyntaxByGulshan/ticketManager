import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function ReportPage() {
  const ticketsState = useSelector((state: RootState) => state.tickets);
  console.log(ticketsState)
  const ticketsArray = ticketsState.tickets  

  const totalTickets = ticketsArray.length;
  const activeTickets = ticketsArray.filter(
    (t) => t.status === "Open" || t.status === "In Progress"
  ).length;
  const resolvedTickets = ticketsArray.filter(
    (t) => t.status === "Resolved"
  ).length;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Ticket Report</h2>
      <div className="space-y-4">
        <div className="bg-blue-100 text-blue-800 p-4 rounded-xl shadow-sm flex justify-between">
          <span className="font-medium">Total Tickets</span>
          <span className="font-bold">{totalTickets}</span>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl shadow-sm flex justify-between">
          <span className="font-medium">Active Tickets</span>
          <span className="font-bold">{activeTickets}</span>
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow-sm flex justify-between">
          <span className="font-medium">Resolved Tickets</span>
          <span className="font-bold">{resolvedTickets}</span>
        </div>
      </div>
    </div>
  );
}

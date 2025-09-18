import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { MessageSquare, CheckCircle, Trash2, FolderOpen, Activity, Flag } from "lucide-react";
import type TicketType from "../types/types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import totalActiveTickets from "../utils/totalActiveTickets";
import totalResolvedTickets from "../utils/totalResolvedTickets";
import recentActivityFilter from "../utils/recentActivityFilter";
import recentCommentsFilter from "../utils/recentCommentsFilter";

export default function DashboardPage() {
  const navigate=useNavigate()
  const totalTickets = useSelector((state: RootState) => state.tickets.tickets);
  const currentUser=useSelector((state:RootState)=>state.user)
  const ticketsArray = totalTickets.filter((t:TicketType)=>{
     return t.userId===currentUser.userId || currentUser.authLeval==='admin'
  })
   useEffect(()=>{
      if(!currentUser.userId){
       navigate('/login')
    }
    })

  const ticketsArrayLength = ticketsArray.length;
  const activeTickets = totalActiveTickets(ticketsArray)
  const resolvedTickets = totalResolvedTickets(ticketsArray)
  const deletedTickets = ticketsArray.filter((t) => t.isDeleted).length;

  //  Priority counts 
  const lowPriority = ticketsArray.filter((t) => t.priority === "Low").length;
  const mediumPriority = ticketsArray.filter((t) => t.priority === "Medium").length;
  const highPriority = ticketsArray.filter((t) => t.priority === "High").length;

  // Collect recent comments 
  const recentComments = recentCommentsFilter(ticketsArray)

  //  Collect recent activity 
  const recentActivity = recentActivityFilter(ticketsArray)
  
  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-700">
      <h2 className="text-3xl font-bold mb-8 text-center"> Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 ">
        <StatCard  icon={<FolderOpen className="text-blue-500" />} label="Total" value={ticketsArrayLength}  />
        <StatCard icon={<Activity className="text-yellow-500" />} label="Active" value={activeTickets} />
        <StatCard icon={<CheckCircle className="text-green-500" />} label="Resolved" value={resolvedTickets} />
        <StatCard icon={<Trash2 className="text-red-500" />} label="Deleted" value={deletedTickets} />
      </div>

      {/* Priority Overview */}
      <div className="bg-gray-100 border-2 border-gray-200 rounded-md shadow-sm p-4 mb-8">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Flag className="h-5 w-5 text-purple-500" /> Tickets by Priority
        </h3>
        <div className="flex justify-between text-sm font-medium">
          <span className="text-green-600">Low: {lowPriority}</span>
          <span className="text-blue-500">Medium: {mediumPriority}</span>
          <span className="text-red-600">High: {highPriority}</span>
        </div>
      </div>

      {/* Recent Comments */}
      <div className=" border-2 border-gray-200 rounded-md shadow-sm p-4 mb-8">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-500" /> Recent Comments
        </h3>
        {recentComments.length > 0 ? (
          <ul className="space-y-3">
            {recentComments.map((c, i) => (
              <li key={i} className="border-b-2 last:border-b-0 pb-2 border-gray-200 text-sm text-gray-700">
                <span className="font-medium ">Ticket #{c.ticketId}:</span> {c.comment}
                <span className="block text-xs text-gray-500">{c.commentTime.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No recent comments</p>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-100 border-2 border-gray-200 rounded-md shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Activity className="h-5 w-5 text-indigo-500" /> Recent Activity
        </h3>
        {recentActivity.length > 0 ? (
          <ul className="space-y-3">
            {recentActivity.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-sm border-b-2 border-gray-200 last:border-b-0 pb-2">
                <span>
                  {a.type === "create" && <FolderOpen className="h-4 w-4 text-blue-500 inline" />}
                  {a.type === "delete" && <Trash2 className="h-4 w-4 text-red-500 inline" />}
                  {a.type === "resolve" && <CheckCircle className="h-4 w-4 text-green-500 inline" />}
                </span>
                <span className="flex-1">
                  <span className="font-medium">{a.message}</span>
                  <span className="block text-xs text-gray-500">{a.date.toLocaleString()}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No recent activity</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm flex flex-col items-center justify-center border-gray-200 border-2">
      <div className="mb-2">{icon}</div>
      <span className="font-medium text-gray-600">{label}</span>
      <span className="font-bold text-lg">{value}</span>
    </div>
  );
}

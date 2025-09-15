
import { useNavigate } from "react-router-dom";
import {Ticket ,LayoutDashboard} from 'lucide-react'
const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="md:text-2xl  font-bold text-gray-700 cursor-pointer" onClick={() => navigate("")}>
                IssueTrack
              </h1>
            </div>
          </div>
          <div className="space-x-2 flex items-center">
            <button
              onClick={() => navigate("report")}
              className="bg-blue-500 text-gray-200 px-2 py-1 md:px-3 md:py-2 rounded hover:bg-[#0a68bb] "
            > 
             <div className="flex items-center gap-1">
              <span><LayoutDashboard  className="h-5 m-2 md:m-0"/></span>
              <span className="hidden md:flex"> Dashbord</span>
             </div>
            </button>
            <button 
            onClick={()=>{
              navigate('')
            }}
            className="bg-[#1c7d36] text-gray-200 px-2 py-1 md:px-3 md:py-2 rounded hover:bg-gray-600 ">
               <div className="flex items-center gap-1">
                   <Ticket className='h-5 m-2 md:m-0' />
                <span className="hidden md:flex"> Tickets</span>
               </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import { useSelector } from "react-redux";
import "./App.css";
import TicketForm from "./components/TicketForm";
import TicketListPage from "./pages/TicketListPage";
import { useEffect, useState } from "react";
import type { UserType } from "./types/types";
import type { RootState } from "./store/store";
import { useNavigate } from "react-router-dom";
function App() {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const user:UserType=useSelector((state:RootState)=>state.user)
  const navigate=useNavigate()
  console.log(user)
  useEffect(()=>{
    if(!user.userId){
     navigate('/login')
  }
  })
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto p-4">
        <TicketListPage onCreateTicket={() => setShowTicketForm(true)} />
      </main>

      {/* Ticket Form Modal */}
      {showTicketForm && (
        <TicketForm
          onClose={() => setShowTicketForm(false)}
        />
      )}
    </div>
  );
}

export default App;

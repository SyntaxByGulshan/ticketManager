import "./App.css";
import TicketForm from "./components/TicketForm";
import TicketListPage from "./pages/TicketListPage";
import { useState } from "react";
function App() {
  const [showTicketForm, setShowTicketForm] = useState(false);

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

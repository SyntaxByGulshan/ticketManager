import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { deleteTicket} from "../slice/ticketSlice";
import UpdateStatusButton from "../components/buttons/UpdateStatusButton";
import { useState } from "react";
import type TicketType from "../types/types";
import DeleteMessage from "../components/DeleteConfMassage";
import type { NotificationProps } from "../components/Notification";
import Notification from "../components/Notification";
import DeleteButton from "../components/buttons/DeleteButton";
import AddNewCommentField from "../components/AddNewCommentField";
import BackButton from "../components/buttons/BackButton";
import TicketDetails from "../components/TicketDetails";
import TicketComments from "../components/TicketComments";
interface TicketNotifictionProps {
  notificationType: "Delete" | TicketType["status"];
  id: NotificationProps["id"];
  message: NotificationProps["notificationMessage"];
}

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isToDelete, SetIsToDelete] = useState<TicketType | false>();
  const [showNotification, setShowNotification] = useState<
    TicketNotifictionProps | undefined
  >();

  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const ticket = tickets.find((t) => t.id === id && t.isDeleted === false);
  // return if no ticket is present
  if (!ticket) {
    return (
      <div className="max-w-3xl w-full mx-auto py-12">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Ticket Not Found</h2>
          <BackButton/>
        </div>
      </div>
    );
  }
  // return this if ticket is present
  return (

    <div className="max-w-3xl mx-auto bg-gray-200 text-gray-700 shadow rounded-xl px-6 pb-10 pt-6 my-2 md:my-12">
      
      {/* back Button */}
      <BackButton/>

      {/* this is title */}
      <h2 className="text-2xl font-bold my-4 p-2">Ticket Details</h2>

      {/* ticket details section */}
      <TicketDetails ticket={ticket} />

      {/* stored comments section  + input comment field*/}
      <div className="mt-7 p-2">

        {/* title */}
        <h3 className="text-xl font-semibold mb-3">Comments</h3>

        {/* comments */}
        <TicketComments ticket={ticket} />

        {/* comment input section */}
        <AddNewCommentField ticketId={ticket.id} />
      </div>


      {/* Actions button section */}
      <div className="flex flex-wrap gap-3 mt-6 p-2">
        {/* update status button  */}
        <UpdateStatusButton
          onUpdate={(status) => {
            setShowNotification({
              notificationType: status,
              id: ticket.id,
              message: `update status to ${status}`,
            });
          }}
          className='bg-green-500 border-0 outline-none text-gray-200'
          ticket={ticket}
        />

        {/* delete button */}
        <DeleteButton
          onClick={() => SetIsToDelete(ticket)}
          className="px-4 py-2 bg-[#d83646] text-white rounded hover:bg-[#aa0919]"
        />
      </div>



      {/* Delete Confirmation  section*/}
      {isToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex justify-center items-center px-4">
          <DeleteMessage
            className="bg-white rounded-md shadow-xl w-full max-w-md p-6"
            ticket={isToDelete}
            onCancel={() => SetIsToDelete(false)}
            onConfirm={() => {
              dispatch(deleteTicket(isToDelete.id));
              SetIsToDelete(false);
              navigate(-1);
            }}
          />
        </div>
      )}


      {/* notification section */}
      {showNotification && (
              <div className="fixed w-screen flex justify-center items-center  top-2 left-0">
                <Notification
                notificationMessage={showNotification.message}
                className={`relative text-gray-200  p-2 rounded-md text-center ${showNotification.notificationType === 'Delete'
          ? 'bg-red-500 '
          : showNotification.notificationType === 'Resolved'
            ? 'bg-green-500 '
            : showNotification.notificationType === 'In Progress'
              ? 'bg-yellow-500'
              : 'bg-blue-500'}`}
                id={showNotification.id}
                onLoad={()=>{
                  setTimeout(() => {
                    setShowNotification(undefined)
                  }, 500);
                }}
      
              />
              </div>
            )}
    </div>
  );
}

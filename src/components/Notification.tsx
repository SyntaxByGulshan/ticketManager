import { useEffect } from "react";

export interface NotificationProps {
  className: string;
  notificationMessage: string;
  id: string;
  ticketId?: string;
  onLoad?: () => void;
}

export default function Notification({
  className,
  notificationMessage,
  id,
  onLoad,
}: NotificationProps) {
  useEffect(() => {
    if (onLoad) onLoad();
  }, [onLoad]);

  return (
    <div id={id} className={className} role="alert">
      {notificationMessage}{" "}
      {id && <span className="font-bold">(Ticket ID: {id})</span>}
    </div>
  );
}

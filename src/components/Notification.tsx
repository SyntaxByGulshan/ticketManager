import { useEffect } from "react";

export interface NotificationProps {
  className?: string;
  notificationMessage: string;
  id: string;
  notificationType?:'Delete'|"In Progress" | "Resolved" | 'Open',
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
    <div className="flex flex-col">
       <span> {notificationMessage}</span>
      {id && <span className="font-bold">(Ticket ID: {id})</span>}
    </div>
    </div>
  );
}

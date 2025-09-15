import { useEffect } from "react";

interface NotificationProps {
  className: string;
  notificationMessage: string;
  id: string;
  onLoad: () => void;
}

export default function Notification({
  className,
  notificationMessage,
  id,
  onLoad,
}: NotificationProps) {
  // Run onLoad once when component mounts
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <div id={id} className={className}>
      {notificationMessage}
    </div>
  );
}

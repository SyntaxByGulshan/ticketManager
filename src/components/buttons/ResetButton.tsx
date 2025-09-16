import { useState } from "react";
import { RotateCw } from "lucide-react";

interface ResetButtonProps {
  onClick: () => void;
}

export default function ResetButton({ onClick }: ResetButtonProps) {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    onClick();

    // stop spinning after 1 second
    setTimeout(() => setIsRotating(false), 1000);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-gray-200 rounded-md shadow-sm border-2 border-gray-400 py-2 px-4 flex items-center cursor-pointer hover:bg-gray-300"
    >
      <RotateCw
        className={`h-5 ${isRotating ? "animate-spin" : ""}`}
      />
      <span className="ml-2">Reset</span>
    </button>
  );
}

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
    setTimeout(() => setIsRotating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className="flex-1/2  rounded-md shadow-sm py-2 px-2 flex items-center justify-center cursor-pointer hover:bg-green-600 bg-green-500 text-gray-200"
    >
      <RotateCw
        className={`h-5 ${isRotating ? "animate-spin" : ""}`}
      />
      <span className="ml-2">Reset</span>
    </button>
  );
}

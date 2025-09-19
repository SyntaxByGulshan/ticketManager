

interface DisplayTypeButtonProps{
    onClick:()=>void;
    displayTypeCard:boolean
}

export default function DisplayTypeButton({onClick,displayTypeCard}:DisplayTypeButtonProps) {
  return (
    <button className="flex-1/2 rounded-md p-2 bg-gray-500 text-gray-300 hover:bg-gray-600"  onClick={onClick}>
        {displayTypeCard ? "TableView" : "CardView"}</button>
  );
}

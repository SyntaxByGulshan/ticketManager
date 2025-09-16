interface ViewDetailsButtonProps{
className:string;
onClick:()=>void
}
export default function ViewDetailsButton({className,onClick}:ViewDetailsButtonProps) {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      View
    </button>
  );
}

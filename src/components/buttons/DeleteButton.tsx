interface DeleteButtonProps {
  className: string;
  onClick?: () => void;
  title?:string;
}
export default function DeleteButton({
  className,
  onClick,
  title,
}: DeleteButtonProps) {
  return (
    <button
     title={title}
      onClick={onClick}
      className={className}
    >
      Delete
    </button>
  );
}

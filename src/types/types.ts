
interface commentType{
  comment:string;
  commentTime:string;
  commentStatus:"Open" | "In Progress" | "Resolved";
}


export default interface TicketType {
  userId:string
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status:"Open" | "In Progress" | "Resolved";
  createdAt: string;
  resolvedAt?:string;
  isDeleted:boolean;  
  comments?:commentType[];
}

export interface UserType{
  authLeval:'admin'|'user'
  userId:string;
  userName:string;
  email:string;
  password:string;
}


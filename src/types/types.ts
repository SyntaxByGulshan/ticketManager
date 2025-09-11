
interface commentType{
  comment:string;
  commentTime:string;
  commentStatus:"Open" | "In Progress" | "Resolved";
}
export default interface TicketType {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Resolved";
  createdAt: string;
  isDeleted:boolean;  
  comments?:commentType[];

}

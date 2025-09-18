export const  statusOfStatusFilter=(): "All" | "In Progress" | "Resolved" | "Open"=>{
  const data=sessionStorage.getItem('statusFilter')
    if(data==="All" ||  data==="In Progress" ||data=== "Resolved" || data==="Open"){
      return data
    }
    else{
      return "All"
    }
  }
export const statusOfPriorityFilter=(): "All" | "Low" | "Medium" | "High"=>{
  const data=sessionStorage.getItem('priorityFilter')
  if(data==="All" || data==="Low" || data==="Medium" || data==="High"){
    return data
  }
  else{
    return "All"
  }
}
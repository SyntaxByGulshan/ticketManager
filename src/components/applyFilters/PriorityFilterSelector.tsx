
 
type PriorityFilter="All"|"Low" | "Medium" | "High"

interface PriorityFilterSelectorProps{
    priorityFilter:PriorityFilter
    setPriorityFilter:(value:PriorityFilter)=>void
}

export default function PriorityFilterSelector({priorityFilter,setPriorityFilter}:PriorityFilterSelectorProps) {
  return (
    <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as PriorityFilter)}
            className="px-4 py-2 border-2 border-gray-400 rounded-md shadow-sm bg-gray-200 outline-none cursor-pointer"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
  )
}

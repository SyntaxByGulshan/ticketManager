import {useState} from 'react'
import { Search } from "lucide-react";
export default function SearchBar() {
   const [search, setSearch] = useState("");
  return (
    <div>
         <div className="flex justify-baseline items-center gap-1 rounded-md border-2 border-gray-400 shadow-sm bg-gray-200  md:w-1/3 py-1 px-4">
          <Search className="text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title..."
            className="w-full p-1 outline-none"
          />
        </div>

    </div>
  )
}

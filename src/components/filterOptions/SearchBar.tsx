import { Search } from "lucide-react";
interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}
export default function SearchBar({ setSearch, search }: SearchBarProps) {
  return (
    <div className="flex justify-baseline items-center gap-1 rounded-md border-2 border-gray-400 shadow-sm bg-gray-200  md:w-1/3 py-1
    px-2  md:mr-2.5">
      <Search className="text-gray-400" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title..."
        className="w-full p-1 outline-none"
      />
    </div>
  );
}

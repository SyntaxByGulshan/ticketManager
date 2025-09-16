import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
export default function BackButton() {
    const navigate=useNavigate()
  return (
    <button
        onClick={() => navigate(-1)}
        className=" mx-2 p-2 bg-gray-500 text-gray-200 rounded hover:bg-gray-700 flex items-center"
      >
        <ArrowLeft className="h-5 " />
        <span>Back</span>
      </button>
  )
}

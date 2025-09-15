import { useNavigate } from "react-router-dom";
import { Ticket } from "lucide-react";
export default function DefaultPage() {
    const navigate=useNavigate()
  return (
    <div>
     <div className="">
         <div className=" text-center mt-10 text-red-500 md:text-4xl  font-bold">
        <h1 >
          Error 404
        </h1>
          <br />
          <h2 >
          Page Not Found
           </h2>

      </div>
      <div className="flex justify-center items-center flex-col mt-10">
        <span className="text-center p-4">Go To Ticket Page</span>
        <button 
            onClick={()=>{
                console.log('hello')
              navigate('/')
            }}
            className="bg-[#1c7d36] text-gray-200 px-2 py-1 md:px-3 md:py-2 rounded hover:bg-gray-600 ">
               <div className="flex items-center gap-1">
                   <Ticket className='h-5' />
                <span> Tickets</span>
               </div>
            </button>
      </div>
     </div>
    </div>
  );
}

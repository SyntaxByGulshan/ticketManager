
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-700 cursor-pointer" onClick={() => navigate("")}>
                IssueTrack
              </h1>
            </div>
          </div>
          <div>
            <button
              onClick={() => navigate("report")}
              className="bg-blue-500 text-gray-200 px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Reports
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
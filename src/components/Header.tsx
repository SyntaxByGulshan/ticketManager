import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-lg border-b border-gray-200  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="md:text-2xl  font-bold text-gray-700 cursor-pointer" onClick={() => navigate("")}>
                IssueTrack
              </h1>
            </div>
          </div>
          {/* nav section */}
          <div>
            <nav className="space-x-2 flex items-center font-bold">
              <NavLink to="/dashboard" className={({isActive})=>isActive?'text-gray-900  underline ':' text-gray-700'} >
                Dashboard
              </NavLink>
            {/* home button */}
            <NavLink to="" className={({isActive})=>isActive?'text-gray-900 underline ':'text-gray-700'}>
              Home
            </NavLink>
            
            </nav>
          </div>
          {/* ticket appared formet */}
          
        </div>
      </div>
    </header>
  );
};

export default Header;
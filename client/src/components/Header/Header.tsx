import React from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useNavigate } from "react-router";
import { logoutApi } from "../../redux/login/loginApiCalls";
import { useDispatch } from "react-redux";

interface HeaderInterface {
  toggleOffcanvas: any;
}

const Header: React.FC<HeaderInterface> = ({ toggleOffcanvas }) => {
  const navigate = useNavigate()
  const disaptch: any = useDispatch()

  const handleLogout = async () => {
    try {
      await disaptch(logoutApi)
      localStorage.removeItem("timeOut")
      localStorage.removeItem("persist:dentist")      
      navigate("/login", { replace: true });
    } catch {}
  }

  return (
    <header className="bg-main p-4 mx-auto grid xs:grid-cols-1 lg:grid-cols-4">
      <div className="flex items-start">
        <button
          className={`bg-[#FFF] text-main 
              hover:bg-[#00b894] hover:text-[#FFF]
              border-2 border-[#FFF]
              font-bold py-2 px-4 rounded
              uppercase
            `}
          onClick={toggleOffcanvas}
        >
          navbar
        </button>
      </div>
      <h1 className="text-white text-3xl font-bold col-span-2 col-start-2 text-center uppercase">
        Atlas Software
      </h1>
      <div className="flex items-center justify-end">
        <AiOutlinePoweroff className="text-red font-bold text-3xl mr-2" onClick={handleLogout}/>
      </div>
    </header>
  );
};

export default Header;

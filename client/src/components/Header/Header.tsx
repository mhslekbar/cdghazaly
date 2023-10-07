import React from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useNavigate } from "react-router";
import { logoutApi } from "../../redux/login/loginApiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { State } from "../../redux/store";

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

  const { userData } = useSelector((state: State) => state.login)

  return (
    <header className="bg-main p-4 mx-auto flex justify-between items-center">
      {/* Left section */}
      <div>
        <button
          className={`bg-[#FFF] text-main 
              hover:bg-main hover:text-[#FFF]
              border-2 border-[#FFF]
              font-bold py-2 px-4 rounded
            `}
          onClick={() => navigate("/")}
          // onClick={toggleOffcanvas}
        >
          {userData?.username}
        </button>
      </div>

      {/* Middle section */}
      <h1 className="text-white lg:text-2xl font-bold col-span-2 col-start-2 text-center uppercase">
        Atlas Software
      </h1>

      {/* Right section */}
      <div className="flex items-center">
        <AiOutlinePoweroff className="text-red font-bold text-3xl mr-2" onClick={handleLogout} />
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { AiOutlinePoweroff } from "react-icons/ai";

interface HeaderInterface {
  toggleOffcanvas: any;
}

const Header: React.FC<HeaderInterface> = ({ toggleOffcanvas }) => {
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
      <h1 className="text-white text-3xl font-bold capitalize col-span-2 col-start-2 text-center">
        Atlas Software
      </h1>
      <div className="flex items-center justify-end">
        <AiOutlinePoweroff className="text-red font-bold text-3xl mr-2" />
      </div>
    </header>
  );
};

export default Header;

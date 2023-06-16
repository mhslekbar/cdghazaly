import React from "react";
import { Link, useLocation } from "react-router-dom";

export interface ButtonInterface {
  name: string;
  path?: string;
  toggleDropDown?: any;
  openDropdown?: boolean;
  icon?: any,
  pathDropDown?: string
}
const ButtonElement: React.FC<ButtonInterface> = ({
  name,
  path,
  toggleDropDown,
  openDropdown,
  icon,
  pathDropDown
}) => {
  const location = useLocation()

  return (
    <div
      className={`relative inline-block text-left w-full mb-2`}
    >
      {path ? (
        <Link
          to={path}
          className={`${location.pathname.split("/")[1] === path?.split("/")[1]  ? "btn-main" : "bg-transparent"} inline-flex w-full px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-[#00b894] `} // focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          // className={`${location.pathname.split("/")[1] === path  ? "btn-main" : "bg-transparent"} inline-flex w-full px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-[#00b894] `} // focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        >
          <span style={{fontSize: "22px"}} >
          {icon}
          </span>
          <span className="ml-2 mt-1">{name.toUpperCase()}</span>
        </Link>
      ) : (
        <button
          className={`${location.pathname.split("/")[1] === pathDropDown ? "btn-main" : "bg-transparent"} inline-flex justify-between w-full px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-[#00b894] `} // focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          onClick={() => {toggleDropDown(name);}}
          aria-expanded={openDropdown}
          aria-haspopup="true"
        >
          <p style={{
            display: "inherit"
          }}>
          <span style={{fontSize: "22px"}} >
            {icon}
          </span>
          <span className="ml-2 mt-1">{name.toUpperCase()}</span>
          </p>
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ButtonElement;

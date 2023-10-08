import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ManageAssuranceContext } from "./types";

export interface ButtonInterface {
  name: string;
  path?: string;
  toggleDropDown?: any;
  openDropdown?: boolean;
  pathDropDown?: string
}

const ButtonAssurance: React.FC<ButtonInterface> = ({
  name,
  path,
  toggleDropDown,
  openDropdown,
  pathDropDown
}) => {
  const location = useLocation()
  const { setOpenDropdown } = useContext(ManageAssuranceContext)
  const navigate = useNavigate()
  
  return (
    <React.Fragment>
      {path ? (
        <button
          onClick={() => {
            setOpenDropdown(false)
            navigate(path)
          }}
          className={`bg-white shadow ${location.pathname === path ? "bg-main" : ""}  text-start px-4 py-2 border-r text-gray-700 hover:bg-main`} 
        >
          <span className="ml-2 mt-1">
            {name.toUpperCase()}
          </span>
        </button>
      ) : (
        <button
          className={`bg-white shadow ${location.pathname.split("/")[3] === pathDropDown ? "bg-main" : ""} inline-flex justify-between w-full px-4 py-2 bg-white text-gray-700 hover:bg-main`} 
          onClick={() => {
            toggleDropDown(name)
          }}
          aria-expanded={openDropdown}
          aria-haspopup="true"
        >
          {name.toUpperCase()}
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
    </React.Fragment>
  );
};

export default ButtonAssurance;

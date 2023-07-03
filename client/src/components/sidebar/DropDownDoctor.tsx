import React from 'react';
import { InterfaceOfLink } from './OffCanvas';
import ButtonElement from './ButtonElement';
import { useLocation, useNavigate } from 'react-router';

interface DropdownProps {
  linkList: InterfaceOfLink[],
  openDropdown: boolean,
  selectedDropDown: string,
  name: string,
  toggleDropDown: any,
  pathDropDown: string
  icon?: any,
}

const DropdownDoctor:React.FC<DropdownProps> = ({ linkList, name, openDropdown, icon, selectedDropDown, toggleDropDown, pathDropDown }) => {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <div className="relative inline-block text-left w-full mb-2">
      <ButtonElement name={name} icon={icon} pathDropDown={pathDropDown} toggleDropDown={toggleDropDown} openDropdown={openDropdown} />
      
      {openDropdown && selectedDropDown === name && (
        <div className="w-full z-10 origin-top-right absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1 w-full"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-menu-button"
          >
            {linkList.map((link, index) => (
              <div 
                className=
                {`${location.pathname.split("/")[1] === pathDropDown && location.pathname.split("/")[2] === link.path  ? "bg-gray-200" : "bg-transparent"} relative text-start block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900`}
                key={index}
                onClick={() => navigate(`appointments/${link.path}`)}
              >
                {link.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownDoctor;

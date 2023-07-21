import React, { useState } from 'react';
import { InterfaceOfLink } from './OffCanvas';
import ButtonElement from './ButtonElement';
import PopOverChooseDoctor from './PopOverChooseDoctor';
import { useLocation } from 'react-router';

interface DropdownPropsInterface {
  linkList: InterfaceOfLink[],
  openDropdown: boolean,
  selectedDropDown: string,
  name: string,
  toggleDropDown: any,
  pathDropDown: string
  icon?: any,
  FromHomePage?: any
}

const Dropdown:React.FC<DropdownPropsInterface> = ({ linkList, name, openDropdown, icon, selectedDropDown, toggleDropDown, pathDropDown, FromHomePage }) => {
  const [popOverIsOpen, setPopOverIsOpen] = useState(false);
  const [selectedPopOver, setSelectedPopOver] = useState("")

  const location = useLocation()

  return (
    <div className={FromHomePage?.className + " relative inline-block text-left w-full mb-2"}>
      <ButtonElement FromHomePage={FromHomePage} name={name} icon={icon} pathDropDown={pathDropDown} toggleDropDown={toggleDropDown} openDropdown={openDropdown} />
      {openDropdown && selectedDropDown === name && (
        <div className="w-full z-10 origin-top-right absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" style={{ bottom: FromHomePage?.className ? "-75px" : 0 }}>
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
                onClick={() => {
                  setPopOverIsOpen(!popOverIsOpen)
                  setSelectedPopOver(link.title)
                }}
              >
                {link.title}
                {popOverIsOpen && selectedPopOver === link.title && 
                  <PopOverChooseDoctor link={link} pathDropDown={pathDropDown} popOverIsOpen={popOverIsOpen} togglePopover={() => setPopOverIsOpen(!popOverIsOpen)} />
                }
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

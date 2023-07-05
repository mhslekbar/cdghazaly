import React, { useContext, useState } from "react";
import { MainPageContext } from "../../pages/MainPage";
import MyLinks from "./MyLinks";

export interface InterfaceOfLink {
  title: string;
  path: string;
}

interface OffCanvasInterface {
  isOpen: boolean;
  onClose: any;
}

const Offcanvas: React.FC<OffCanvasInterface> = ({ isOpen, onClose }) => {
  const overlayClasses = isOpen
    ? "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"
    : "hidden";
  const offcanvasClasses = isOpen
    ? "fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl overflow-y-auto transition-transform transform ease-in-out duration-300 translate-x-0 z-10"
    : "hidden";


  const [selectedDropDown, setSelectedDropDown] = useState<string>("");
  const { openDropdown, setOpenDropDown } = useContext(MainPageContext)

  const toggleDropDown: any = (type: string) => {
    setOpenDropDown(!openDropdown)
    setSelectedDropDown(type)
  }

  return (
    <>
      <div className={overlayClasses} onClick={onClose}></div>
      <div className={offcanvasClasses}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Navbar</h2>
            <button
              className="p-2 rounded-md text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring"
              onClick={onClose}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <MyLinks openDropdown={openDropdown} selectedDropDown={selectedDropDown} toggleDropDown={toggleDropDown} />
        </div>
      </div>
    </>
  );
};

export default Offcanvas;

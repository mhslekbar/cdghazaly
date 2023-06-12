import React from "react";
import { LinksInterface } from "./types";
import ButtonLab from "./ButtonLab";
import NestedLinkDrop from "./NestedLinkDrop";

interface DropdownLabInterface {
  linkList: LinksInterface[];
  openDropdown: boolean;
  selectedDropDown: string;
  name: string;
  toggleDropDown: any;
  pathDropDown: string;
}

const DropdownLab: React.FC<DropdownLabInterface> = ({
  linkList,
  name,
  openDropdown,
  selectedDropDown,
  toggleDropDown,
  pathDropDown,
}) => {
  return (
    <div>
      <ButtonLab
        name={name}
        pathDropDown={pathDropDown}
        toggleDropDown={toggleDropDown}
        openDropdown={openDropdown}
      />
      <NestedLinkDrop 
        openDropdown={openDropdown}
        selectedDropDown={selectedDropDown}
        name={name}
        linkList={linkList}
        pathDropDown={pathDropDown}
      />
    </div>
  );
};

export default DropdownLab;

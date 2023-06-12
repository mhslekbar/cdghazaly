import React from "react";
import { LinksInterface } from "./types";
import ButtonAssurance from "./ButtonAssurance";
import NestedLinkDrop from "./NestedLinkDrop";

interface DropdownAssuranceInterface {
  linkList: LinksInterface[];
  openDropdown: boolean;
  selectedDropDown: string;
  name: string;
  toggleDropDown: any;
  pathDropDown: string;
}

const DropdownAssurance: React.FC<DropdownAssuranceInterface> = ({
  linkList,
  name,
  openDropdown,
  selectedDropDown,
  toggleDropDown,
  pathDropDown,
}) => {
  return (
    <div>
      <ButtonAssurance
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

export default DropdownAssurance;

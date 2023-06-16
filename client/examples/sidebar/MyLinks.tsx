import React from "react";
import Dropdown from "./Dropdown";
import ButtonElement from "./ButtonElement";
import { TfiUser } from "react-icons/tfi";
import { RiUserSettingsLine } from 'react-icons/ri';
import { FaBriefcaseMedical, FaTooth, FaUser } from 'react-icons/fa';
import { MdOutlineAssuredWorkload } from "react-icons/md";
import { listTypePatient } from "./types";

interface MyLinkInterface {
  openDropdown: boolean;
  selectedDropDown: string;
  toggleDropDown: any;
}

const MyLink: React.FC<MyLinkInterface> = ({
  toggleDropDown,
  openDropdown,
  selectedDropDown,
}) => {
  return (
    <div>
      <ButtonElement name="page d'acceuil" path="/" />
      <ButtonElement icon={<RiUserSettingsLine />} name="roles" path="/role" />
      <ButtonElement icon={<TfiUser />} name="utlisateurs" path="/user" />
      <ButtonElement icon={<FaBriefcaseMedical />} name="traitements" path="/treatment" />
      <ButtonElement icon={<FaTooth />} name="Laboratoires" path="/laboratory" />
      {/* <ButtonElement icon={<FaUser />} name="Patients" path="/patient" /> */}
      <Dropdown
        icon={<FaUser />}
        openDropdown={openDropdown}
        name="Patients"
        pathDropDown="patient"
        linkList={listTypePatient}
        selectedDropDown={selectedDropDown}
        toggleDropDown={toggleDropDown}
      />
      <ButtonElement icon={<MdOutlineAssuredWorkload />} name="Assurances" path="/assurance" />
    </div>
  );
};

export default MyLink;

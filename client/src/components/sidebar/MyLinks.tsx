import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import ButtonElement from "./ButtonElement";
import { FaBriefcaseMedical, FaCalendarCheck, FaChartLine, FaShieldAlt, FaTooth, FaUser, FaUsers, FaUsersCog } from "react-icons/fa";
import { MdOutlineAssuredWorkload } from "react-icons/md";
import { listTypePatient } from "./types";
import { useSelector } from "react-redux";
import { State } from "../../redux/store";
import { useDispatch } from "react-redux";
import { UserInterface } from "../users/types";
import { ShowUserApi } from "../../redux/users/UserApiCalls";
import DropdownDoctor from "./DropDownDoctor";
import { BsCart4 } from "react-icons/bs";

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
  const [listDoctors, setListDoctors] = useState<any[]>([]);
  const { users } = useSelector((state: State) => state.users);
  const dispatch: any = useDispatch();

  useEffect(() => {
    const filterDoctors = async () => {
      await dispatch(ShowUserApi());
    };
    filterDoctors();
  }, [dispatch]);

  useEffect(() => {
    setListDoctors(
      users
        .filter((user: UserInterface) => user.doctor?.cabinet)
        .map((user: UserInterface) => ({
          title: user.username,
          path: user._id,
        }))
    );
  }, [users]);

  return (
    <div>
      <ButtonElement name="page d'acceuil" path="/" />
      <ButtonElement icon={<FaUsersCog />} name="roles" path="/role" />
      <ButtonElement icon={<FaUsers />} name="utlisateurs" path="/user" />
      <ButtonElement
        icon={<FaBriefcaseMedical />}
        name="traitements"
        path="/treatment"
      />
      <ButtonElement
        icon={<FaTooth />}
        name="Laboratoires"
        path="/laboratory"
      />
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
      <ButtonElement
        icon={<MdOutlineAssuredWorkload />}
        name="Assurances"
        path="/assurance"
      />
      <DropdownDoctor
        icon={<FaCalendarCheck />}
        openDropdown={openDropdown}
        name="Rendez-vous"
        pathDropDown="appointments"
        linkList={listDoctors}
        selectedDropDown={selectedDropDown}
        toggleDropDown={toggleDropDown}
      />
      <DropdownDoctor
        icon={<FaChartLine />}
        openDropdown={openDropdown}
        name="Stats Financières"
        pathDropDown="statistics"
        linkList={listDoctors}
        nestedLink="payments"
        selectedDropDown={selectedDropDown}
        toggleDropDown={toggleDropDown}
      />
      <DropdownDoctor
        icon={<BsCart4 />}
        openDropdown={openDropdown}
        name="consommables"
        pathDropDown="consumables"
        linkList={listDoctors}
        selectedDropDown={selectedDropDown}
        toggleDropDown={toggleDropDown}
        nestedLink="consumptions"
      />
      <ButtonElement icon={<FaShieldAlt />}  name="Permissions" path="/permissions" />
    </div>
  );
};

export default MyLink;

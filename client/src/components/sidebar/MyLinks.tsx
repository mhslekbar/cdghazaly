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
import { UserData } from "../../requestMethods";
import { PermissionType } from "../roles/types";

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
  const { permissions } = useSelector((state: State) => state.permissions)

  const show = false

  return (
    <div>
      <ButtonElement name="page d'acceuil" path="/" />

      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "ASSURANCES"
      ) && (
        <ButtonElement
          icon={<FaTooth />}
          name="Laboratoires"
          path="/laboratory"
        />
      )}
      {/* <ButtonElement icon={<FaUser />} name="Patients" path="/patient" /> */}

      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "PATIENTS"
        ) && <Dropdown
        icon={<FaUser />}
        openDropdown={openDropdown}
        name="Patients"
        pathDropDown="patient"
        linkList={listTypePatient}
        selectedDropDown={selectedDropDown}
        toggleDropDown={toggleDropDown}
      /> }
      
      {permissions.find(
      (permission: PermissionType) =>
        permission.name === "AFFICHER" &&
        permission.collectionName === "LABORATOIRES"
    ) && (
      <ButtonElement
        icon={<MdOutlineAssuredWorkload />}
        name="Assurances"
        path="/assurance"
      />

    )}


      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "RDV"
      ) && (
        permissions.find(
          (permission: PermissionType) =>
            permission.name === "AFFICHER_GLOBAL" &&
            permission.collectionName === "RDV"
        ) ?           
        <DropdownDoctor
          icon={<FaCalendarCheck />}
          openDropdown={openDropdown}
          name="Rendez-vous"
          pathDropDown="appointments"
          linkList={listDoctors}
          selectedDropDown={selectedDropDown}
          toggleDropDown={toggleDropDown}
        />
          :
          <ButtonElement icon={<FaCalendarCheck />} name="Rendez-vous" path={`/appointments/${UserData()?._id}`} />
        )}

      
      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "STATISTIQUES_FINANCIERES"
      ) && (
        permissions.find(
          (permission: PermissionType) =>
            permission.name === "AFFICHER_GLOBAL" &&
            permission.collectionName === "STATISTIQUES_FINANCIERES"
        ) ? 
        <DropdownDoctor
        icon={<FaChartLine />}
        openDropdown={openDropdown}
        name="Stats Financières"
        pathDropDown="statistics"
        linkList={listDoctors}
        nestedLink="payments"
        selectedDropDown={selectedDropDown}
        toggleDropDown={toggleDropDown}
      /> :
        <ButtonElement icon={<FaChartLine />} name="Stats Financières" path={`/statistics/${UserData()?._id}/payments`} />
      )}


      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "CONSOMMABLES"
      ) && (
        permissions.find(
          (permission: PermissionType) =>
            permission.name === "AFFICHER_GLOBAL" &&
            permission.collectionName === "CONSOMMABLES"
        ) ? 
        <DropdownDoctor
        icon={<BsCart4 />}
        openDropdown={openDropdown}
        name="consommables"
        pathDropDown="consumables"
        linkList={listDoctors}
        selectedDropDown={selectedDropDown}
        toggleDropDown={toggleDropDown}
        nestedLink="consumptions"
      /> :     
        <ButtonElement icon={<BsCart4 />} name="consommables" path="/consumables/consumptions" />
      )}

      {permissions.find(
        (permission: PermissionType) =>
        permission.name === "AFFICHER" &&
        permission.collectionName === "UTILISATEURS"
        ) 
        && 
        <ButtonElement icon={<FaUsers />} name="utlisateurs" path="/user" />
      }

      {permissions.find(
        (permission: PermissionType) =>
        permission.name === "AFFICHER" &&
        permission.collectionName === "TRAITEMENTS"
        ) 
        && <ButtonElement icon={<FaBriefcaseMedical />} name="traitements" path="/treatment"/>
      }

      {show && <>
        {permissions.find(
          (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "ROLES"
          ) 
          && <ButtonElement icon={<FaUsersCog />} name="roles" path="/role" /> 
        }


        <ButtonElement icon={<FaShieldAlt />}  name="Permissions" path="/permissions" />
      </>}
    </div>
  );
};

export default MyLink;

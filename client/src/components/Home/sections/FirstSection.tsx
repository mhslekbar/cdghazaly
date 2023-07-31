import React from 'react'
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { FaUser, FaUserNurse, FaUsers } from 'react-icons/fa';
import { PermissionType } from '../../roles/types';
import DropdownDoctor from '../../sidebar/DropDownDoctor';
import { UserData } from '../../../requestMethods';
import { useNavigate } from 'react-router';

interface FirstSectionInterface {
  className: string,
  openDropdown: boolean,
  setOpenDropdown: (openDropdown: boolean) => void,
  selectedDropDown: string,
  setSelectedDropDown: (selectedDropDown: string) => void,
  listDoctors: any[]
}

const FirstSection:React.FC<FirstSectionInterface> = ({ className, openDropdown, setOpenDropdown, selectedDropDown, setSelectedDropDown, listDoctors }) => {
  const { permissions } = useSelector((state: State) => state.permissions);
  const navigate = useNavigate()

  return (
    <section className="grid grid-cols-3 gap-2 mt-3">
      {/* Start One */}
      {permissions.find(
          (permission: PermissionType) =>
            permission.name === "AFFICHER_GLOBAL" &&
            permission.collectionName === "PATIENTS"
        ) ? <DropdownDoctor
        linkList={listDoctors}
        openDropdown={openDropdown}
        selectedDropDown={selectedDropDown}
        name="Consultations"
        toggleDropDown={() => {
          setOpenDropdown(!openDropdown);
          setSelectedDropDown("Consultations");
        }}
        pathDropDown="patient/consultation"
        icon={<FaUserNurse className="mb-3 text-4xl" />}
        FromHomePage={{ className }}
      /> :
      permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "PATIENTS"
      ) &&  
      <div className={className} onClick={() => navigate(`/patient/consultation/${UserData()?._id}`)}>
        <FaUserNurse className="mb-3 text-4xl" />
        Consultations
      </div>}
      {/* End One */}

      {/* Start Two */}
      {permissions.find(
          (permission: PermissionType) =>
            permission.name === "AFFICHER_GLOBAL" &&
            permission.collectionName === "PATIENTS"
        ) ? <DropdownDoctor
        linkList={listDoctors}
        openDropdown={openDropdown}
        selectedDropDown={selectedDropDown}
        name="Patients Terminé"
        toggleDropDown={() => {
          setOpenDropdown(!openDropdown);
          setSelectedDropDown("Patients Terminé");
        }}
        pathDropDown="patient/finish"
        icon={<FaUser className="mb-3 text-4xl" />}
        FromHomePage={{ className }}
      /> :
      permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "PATIENTS"
      ) &&  
      <div className={className} onClick={() => navigate(`/patient/finish/${UserData()?._id}`)}>
        <FaUser className="mb-3 text-4xl" />
        Patients Terminé
      </div>}
      {/* END Two */}

      {/* Start Three */}
      {permissions.find(
          (permission: PermissionType) =>
            permission.name === "AFFICHER_GLOBAL" &&
            permission.collectionName === "PATIENTS"
        ) ? <DropdownDoctor
        linkList={listDoctors}
        openDropdown={openDropdown}
        selectedDropDown={selectedDropDown}
        name="Patients en cours"
        toggleDropDown={() => {
          setOpenDropdown(!openDropdown);
          setSelectedDropDown("Patients en cours");
        }}
        pathDropDown="patient/current"
        icon={<FaUsers className="mb-3 text-4xl" />}
        FromHomePage={{ className }}
      /> :
      permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "PATIENTS"
      ) &&  
      <div className={className} onClick={() => navigate(`/patient/current/${UserData()?._id}`)}>
        <FaUsers className="mb-3 text-4xl" />
        Patients en cours
      </div>}
      {/* END Three */}
    </section>
  )
}

export default FirstSection

// {/* {permissions.find(
//   (permission: PermissionType) =>
//     permission.name === "AFFICHER" &&
//     permission.collectionName === "PATIENTS"
// ) && <Dropdown
//   linkList={listTypePatient}
//   openDropdown={openDropdown}
//   selectedDropDown={selectedDropDown}
//   name="patients"
//   toggleDropDown={() => {
//     setOpenDropdown(!openDropdown);
//     setSelectedDropDown("patients");
//   }}
//   pathDropDown="patient"
//   icon={<FaUser className="mb-3 text-4xl" />}
//   FromHomePage={{ className }}
// />} */}
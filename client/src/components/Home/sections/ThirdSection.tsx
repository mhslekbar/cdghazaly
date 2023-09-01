import React from 'react'
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { useNavigate } from 'react-router';
import { FaBriefcaseMedical, FaShieldAlt, FaTooth, FaUsers, FaUsersCog } from 'react-icons/fa';
import DropdownDoctor from '../../sidebar/DropDownDoctor';
import { UserData } from '../../../requestMethods';
import { BsCart4 } from 'react-icons/bs';
import { PermissionType } from '../../roles/types';
import { MdOutlineAssuredWorkload } from 'react-icons/md';

interface ThirdSectionInterface {
  className: string,
  openDropdown: boolean,
  setOpenDropdown: (openDropdown: boolean) => void,
  selectedDropDown: string,
  setSelectedDropDown: (selectedDropDown: string) => void,
  listDoctors: any[]
}

const ThirdSection:React.FC<ThirdSectionInterface> = ({ className, openDropdown, setOpenDropdown, selectedDropDown, setSelectedDropDown, listDoctors }) => {
  const { permissions } = useSelector((state: State) => state.permissions);
  const navigate = useNavigate()

  const { userData } = useSelector((state: State) => state.login)

  return (
    <section className="grid grid-cols-3 gap-2 mt-3">
      {/* Start One */}
      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "ASSURANCES"
      ) && (
        <div className={className} onClick={() => navigate("/assurance")}>
          <MdOutlineAssuredWorkload className="mb-3 text-4xl" />
          Assurance
        </div>
      )}
      {/* END One */}

      {/* Start Two */}

      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "LABORATOIRES"
      ) && (
        <div className={className} onClick={() => navigate("/laboratory")}>
          <FaTooth className="mb-3 text-4xl" />
          Laboratoires
        </div>
      )}
      {/* End Two */}
      
      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "UTILISATEURS"
      ) && (
        <div className={className} onClick={() => navigate("/user")}>
          <FaUsers className="mb-3 text-4xl" />
          Utilisateurs
        </div>
      )}
      {((
        permissions.find(
          (permission: PermissionType) =>
            permission.name === "AFFICHER_GLOBAL" &&
            permission.collectionName === "CONSOMMABLES"
        )) ? 
        <DropdownDoctor
          linkList={listDoctors}
          openDropdown={openDropdown}
          selectedDropDown={selectedDropDown}
          name="Consommables"
          toggleDropDown={() => {
            setOpenDropdown(!openDropdown);
            setSelectedDropDown("Consommables");
          }}
          pathDropDown="Consumables"
          icon={<BsCart4 className="mb-3 text-4xl" />}
          FromHomePage={{ className }}
          nestedLink="consumptions"
        /> : 
        permissions.find(
          (permission: PermissionType) =>
            permission.name === "AFFICHER" &&
            permission.collectionName === "CONSOMMABLES"
        ) &&
        <div className={className} onClick={() => navigate(`/Consumables/${UserData()._id}/consumptions`)}>
          <BsCart4 className="mb-3 text-4xl" />
          Consommables
        </div>
      )}

      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "TRAITEMENTS"
      ) && (
        <div className={className} onClick={() => navigate("/treatment")}>
          <FaBriefcaseMedical className="mb-3 text-4xl" />
          Traitements
        </div>
      )}
      
      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "ROLES"
      ) && (
        <div className={className} onClick={() => navigate("role")}>
          <FaUsersCog className="mb-3 text-4xl" /> Roles
        </div>
      )}
      
      {userData.dev && <div className={className} onClick={() => navigate("/permissions")}>
        <FaShieldAlt className="mb-3 text-4xl" />
        Permissions
      </div>}

    </section>
  )
}

export default ThirdSection

import React from 'react'
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { useNavigate } from 'react-router';
import { FaBriefcaseMedical, FaShieldAlt, FaTooth, FaUsers, FaUsersCog } from 'react-icons/fa';
import DropdownDoctor from '../../sidebar/DropDownDoctor';
import { UserData } from '../../../requestMethods';
import { BsCart4 } from 'react-icons/bs';
import { PermissionType } from '../../roles/types';
import { MdOutlineAssuredWorkload, MdPayments } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

interface ThirdSectionInterface {
  className: string,
  openDropdown: boolean,
  setOpenDropdown: (openDropdown: boolean) => void,
  selectedDropDown: string,
  setSelectedDropDown: (selectedDropDown: string) => void,
  listDoctors: any[]
}

const ThirdSection: React.FC<ThirdSectionInterface> = ({ className, openDropdown, setOpenDropdown, selectedDropDown, setSelectedDropDown, listDoctors }) => {
  const { permissions } = useSelector((state: State) => state.permissions);
  const navigate = useNavigate()

  const { userData } = useSelector((state: State) => state.login)
  const { t } = useTranslation()

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
            {t("Assurances")}
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
            {t("Laboratoires")}
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
            {t("Utilisateurs")}
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
          name={t("Consommables")}
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
          {t("Consommables")}
        </div>
      )}

      {
        permissions.find(
          (permission: PermissionType) =>
            permission.name === "AFFICHER" &&
            permission.collectionName === "IMPLANTS"
        ) && (
          !userData.doctor?.cabinet ? <DropdownDoctor
            linkList={listDoctors}
            openDropdown={openDropdown}
            selectedDropDown={selectedDropDown}
            name={t("Implants")}
            toggleDropDown={() => {
              setOpenDropdown(!openDropdown);
              setSelectedDropDown("Implants");
            }}
            pathDropDown="/implants"
            icon={<img className="mb-3 w-20 h-20 rounded" src='/assets/images/implants.png' alt="implant" />}
            FromHomePage={{ className }}
          /> :
            <div className={className} onClick={() => navigate(`/implants/${UserData()?._id}`)}>
              <img className="mb-3 w-20 h-20 rounded" src='/assets/images/implants.png' alt="implant" />
              {t("Implants")}
            </div>
        )
      }


      {/* {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "IMPLANTS"
      ) && (

        <div className={className} onClick={() => navigate("/implants")}>
          <img className="mb-3 w-20 h-20 rounded" src='/assets/images/implants.png' alt="implant" />
          {t("Implants")}
        </div>
      )} */}

      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "TRAITEMENTS"
      ) && (
          <div className={className} onClick={() => navigate("/treatment")}>
            <FaBriefcaseMedical className="mb-3 text-4xl" />
            {t("Traitements")}
          </div>
        )}

      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "ROLES"
      ) && (
          <div className={className} onClick={() => navigate("role")}>
            <FaUsersCog className="mb-3 text-4xl" /> {t("Roles")}
          </div>
        )}

      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "MODE_PAIEMENT"
      ) && (
          <div className={className} onClick={() => navigate("paymentMode")}>
            <MdPayments className="mb-3 text-4xl" /> {t("Mode de paiements")}
          </div>
        )}
      {/*   */}
      {userData.dev && <div className={className} onClick={() => navigate("/permissions")}>
        <FaShieldAlt className="mb-3 text-4xl" />
        {t("Permissions")}
      </div>}

    </section>
  )
}

export default ThirdSection

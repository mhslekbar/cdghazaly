import React from 'react'
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { useNavigate } from 'react-router';
import { FaCalendarCheck, FaChartLine } from 'react-icons/fa';
import DropdownDoctor from '../../sidebar/DropDownDoctor';
import { UserData } from '../../../requestMethods';
import SearchPatient from '../SearchPatient';
import { PermissionType } from '../../roles/types';
import { useTranslation } from 'react-i18next';

interface SecondSectionInterface {
  className: string,
  openDropdown: boolean,
  setOpenDropdown: (openDropdown: boolean) => void,
  selectedDropDown: string,
  setSelectedDropDown: (selectedDropDown: string) => void,
  listDoctors: any[]
}

const SecondSection:React.FC<SecondSectionInterface> = ({ className, openDropdown, setOpenDropdown, selectedDropDown, setSelectedDropDown, listDoctors }) => {
  const { permissions } = useSelector((state: State) => state.permissions);
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <section className="grid grid-cols-3 gap-2 mt-3">
      {(
        permissions.find(
          (permission: PermissionType) =>
            permission.name === "AFFICHER_GLOBAL" &&
            permission.collectionName === "RDV"
        ) ?           
        <DropdownDoctor
          linkList={listDoctors}
          openDropdown={openDropdown}
          selectedDropDown={selectedDropDown}
          name={t("Rendez-Vous")}
          toggleDropDown={() => {
            setOpenDropdown(!openDropdown);
            setSelectedDropDown("Rendez-Vous");
          }}
          pathDropDown="appointments"
          icon={<FaCalendarCheck className="mb-3 text-4xl" />}
          FromHomePage={{ className }}
        />
        :
        (permissions.find(
          (permission: PermissionType) =>
            permission.name === "AFFICHER" &&
            permission.collectionName === "RDV"
        )) &&
        <div className={className} onClick={() => navigate(`/appointments/${UserData()?._id}`)}>
          <FaCalendarCheck className="mb-3 text-4xl" />
          {t("Rendez-Vous")}
        </div>
      )}

      <SearchPatient />
      {(
        permissions.find(
          (permission: PermissionType) =>
            permission.name === "AFFICHER_GLOBAL" &&
            permission.collectionName === "STATISTIQUES_FINANCIERES"
        )) ? 
        <DropdownDoctor
          linkList={listDoctors}
          openDropdown={openDropdown}
          selectedDropDown={selectedDropDown}
          name={t("Statistiques Financiéres")}
          toggleDropDown={() => {
            setOpenDropdown(!openDropdown);
            setSelectedDropDown("Statistiques Financiéres");
          }}
          pathDropDown="statistics"
          icon={<FaChartLine className="mb-3 text-4xl" />}
          FromHomePage={{ className }}
          nestedLink="payments"
        /> :
        permissions.find(
          (permission: PermissionType) =>
            permission.name === "AFFICHER" &&
            permission.collectionName === "STATISTIQUES_FINANCIERES"
        ) &&
        <div className={className} onClick={() => navigate(`/statistics/${UserData()?._id}/payments`)}>
          <FaCalendarCheck className="mb-3 text-4xl" />
          {t("Statistiques Financiéres")}
        </div>
      }
    </section>
  )
}

export default SecondSection

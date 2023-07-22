import React from 'react'
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { PermissionInterface } from '../../permissions/types';
import { useNavigate } from 'react-router';
import { FaCalendarCheck, FaChartLine } from 'react-icons/fa';
import DropdownDoctor from '../../sidebar/DropDownDoctor';
import { UserData } from '../../../requestMethods';
import SearchPatient from '../SearchPatient';

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

  return (
    <section className="grid grid-cols-3 gap-2 mt-3">
      {permissions.find(
        (permission: PermissionInterface) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "RDV"
      ) && (
        permissions.find(
          (permission: PermissionInterface) =>
            permission.name === "AFFICHER_GLOBAL" &&
            permission.collectionName === "RDV"
        ) ?           
        <DropdownDoctor
          linkList={listDoctors}
          openDropdown={openDropdown}
          selectedDropDown={selectedDropDown}
          name="Rendez-Vous"
          toggleDropDown={() => {
            setOpenDropdown(!openDropdown);
            setSelectedDropDown("Rendez-Vous");
          }}
          pathDropDown="appointments"
          icon={<FaCalendarCheck className="mb-3 text-4xl" />}
          FromHomePage={{ className }}
        />
        :
        <div className={className} onClick={() => navigate(`/appointments/${UserData()?._id}`)}>
          <FaCalendarCheck className="mb-3 text-4xl" />
          Rendez-Vous
        </div>
      )}

      <SearchPatient />
      {permissions.find(
        (permission: PermissionInterface) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "STATISTIQUES_FINANCIERES"
      ) && (
        permissions.find(
          (permission: PermissionInterface) =>
            permission.name === "AFFICHER_GLOBAL" &&
            permission.collectionName === "STATISTIQUES_FINANCIERES"
        ) ? 
        <DropdownDoctor
          linkList={listDoctors}
          openDropdown={openDropdown}
          selectedDropDown={selectedDropDown}
          name="Statistiques Financiéres"
          toggleDropDown={() => {
            setOpenDropdown(!openDropdown);
            setSelectedDropDown("Statistiques Financiéres");
          }}
          pathDropDown="statistics"
          icon={<FaChartLine className="mb-3 text-4xl" />}
          FromHomePage={{ className }}
          nestedLink="payments"
        /> :
        <div className={className} onClick={() => navigate(`/statistics/${UserData()?._id}/payments`)}>
          <FaCalendarCheck className="mb-3 text-4xl" />
          Statistiques Financiéres
        </div>
      )}
    </section>
  )
}

export default SecondSection

import React from 'react'
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { PermissionInterface } from '../../permissions/types';
import { useNavigate } from 'react-router';
import { FaTooth, FaUser } from 'react-icons/fa';
import Dropdown from '../../sidebar/Dropdown';
import { listTypePatient } from '../../sidebar/types';
import { MdOutlineAssuredWorkload } from 'react-icons/md';

interface FirstSectionInterface {
  className: string,
  openDropdown: boolean,
  setOpenDropdown: (openDropdown: boolean) => void,
  selectedDropDown: string,
  setSelectedDropDown: (selectedDropDown: string) => void,
}

const FirstSection:React.FC<FirstSectionInterface> = ({ className, openDropdown, setOpenDropdown, selectedDropDown, setSelectedDropDown }) => {
  const { permissions } = useSelector((state: State) => state.permissions);
  const navigate = useNavigate()

  return (
    <section className="grid grid-cols-3 gap-2 mt-3">
      {/* Start One */}
      {permissions.find(
        (permission: PermissionInterface) =>
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
        (permission: PermissionInterface) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "PATIENTS"
      ) && <Dropdown
      linkList={listTypePatient}
      openDropdown={openDropdown}
      selectedDropDown={selectedDropDown}
      name="patients"
      toggleDropDown={() => {
        setOpenDropdown(!openDropdown);
        setSelectedDropDown("patients");
      }}
      pathDropDown="patient"
      icon={<FaUser className="mb-3 text-4xl" />}
      FromHomePage={{ className }}
    />}
    {/* END Two */}
    {/* Start Three */}
    {permissions.find(
      (permission: PermissionInterface) =>
        permission.name === "AFFICHER" &&
        permission.collectionName === "LABORATOIRES"
    ) && (
      <div className={className} onClick={() => navigate("/laboratory")}>
        <FaTooth className="mb-3 text-4xl" />
        Laboratoires
      </div>
    )}
    {/* END Three */}
    </section>
  )
}

export default FirstSection

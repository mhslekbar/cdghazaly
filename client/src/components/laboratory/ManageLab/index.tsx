import React, { useContext, useEffect, useState } from "react";
import { laboratoryInterface } from "../types";
import { Outlet } from "react-router-dom";
import { ShowLaboratoryContext } from "../ShowLaboratory";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { UserInterface } from "../../users/types";
import { ManageLabContext } from "./types";
import ButtonLab from "./ButtonLab";
import { useDispatch } from "react-redux";
import { ShowUserApi } from "../../../redux/users/UserApiCalls";
import DropdownLab from "./DropDownLab";
import { UserData } from "../../../requestMethods";
import { PermissionType } from "../../roles/types";

interface ManageLabInterface {
  laboratory: laboratoryInterface;
}

const ManageLab: React.FC<ManageLabInterface> = ({ laboratory }) => {
  const { selectedLaboratory } = useContext(ShowLaboratoryContext);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedDropDown, setSelectedDropDown] = useState("");

  const { users } = useSelector((state: State) => state.users);
  const [doctors, setDoctors] = useState([]);

  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(ShowUserApi());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setDoctors(users.filter((user: UserInterface) => user.doctor?.cabinet));
  }, [users]);

  const toggleDropDown = (type: string) => {
    setOpenDropdown(!openDropdown);
    setSelectedDropDown(type);
  };
  const { permissions } = useSelector((state: State) => state.permissions);

  return (
    <ManageLabContext.Provider
      value={{
        openDropdown,
        setOpenDropdown,
      }}
    >
      <div className="bg-whit grid lg:grid-cols-5 sm:grid-cols-2 rounded border mt-2 font-bold text-center">
        {selectedLaboratory.name.length > 0 &&
        <>
          {permissions.find(
            (permission: PermissionType) =>
              permission.name === "AFFICHER_GLOBAL" &&
              permission.collectionName === "COMPTES_LABORATOIRE"
          ) && <ButtonLab
            name="Comptes"
            path={`/laboratory/${laboratory._id}/accounts`}
          />}

          {permissions.find(
            (permission: PermissionType) =>
              permission.name === "AFFICHER" &&
              permission.collectionName === "TRAITEMENTS_LABORATOIRES"
          ) && <ButtonLab
            name="Traitements"
            path={`/laboratory/${laboratory._id}/treatments`}
          />}
          
          {permissions.find(
            (permission: PermissionType) =>
              permission.name === "AFFICHER_GLOBAL" &&
              permission.collectionName === "CONSOMMATIONS_LABORATOIRE"
          ) ?
          <DropdownLab
            openDropdown={openDropdown}
            name="Consommations"
            pathDropDown="consumptions"
            linkList={doctors}
            selectedDropDown={selectedDropDown}
            toggleDropDown={toggleDropDown}
          /> : 
          permissions.find(
            (permission: PermissionType) =>
              permission.name === "AFFICHER" &&
              permission.collectionName === "CONSOMMATIONS_LABORATOIRE"
          ) &&
          <ButtonLab
            name="Consommations"
            path={`/laboratory/${laboratory._id}/consumptions/${UserData()._id}`}
          />}

          {permissions.find(
            (permission: PermissionType) =>
              permission.name === "AFFICHER_GLOBAL" &&
              permission.collectionName === "PATIENTS_LABORATOIRE"
          ) ?
          <DropdownLab
            openDropdown={openDropdown}
            name="Patients"
            pathDropDown="patients"
            linkList={doctors}
            selectedDropDown={selectedDropDown}
            toggleDropDown={toggleDropDown}
          /> : 
          permissions.find(
            (permission: PermissionType) =>
              permission.name === "AFFICHER" &&
              permission.collectionName === "PATIENTS_LABORATOIRE"
          ) &&
          <ButtonLab
            name="Patients"
            path={`/laboratory/${laboratory._id}/patients/${UserData()._id}`}
          />}

          {permissions.find(
            (permission: PermissionType) =>
              permission.name === "AFFICHER_GLOBAL" &&
              permission.collectionName === "PAIEMENTS_LABORATOIRES"
          ) ?
          <DropdownLab
            openDropdown={openDropdown}
            name="Paiements"
            pathDropDown="payments"
            linkList={doctors}
            selectedDropDown={selectedDropDown}
            toggleDropDown={toggleDropDown}
          /> : 
          permissions.find(
            (permission: PermissionType) =>
              permission.name === "AFFICHER" &&
              permission.collectionName === "PAIEMENTS_LABORATOIRES"
          ) &&
          <ButtonLab
            name="Paiements"
            path={`/laboratory/${laboratory._id}/payments/${UserData()._id}`}
          />}

        </>
        }
      </div>
      <Outlet />
    </ManageLabContext.Provider>
  );
};

export default ManageLab;



// {
//   linskLaboratory.map((link: LinksInterface, index) => (
//     <React.Fragment key={index}>
//       {link.type === "button" ? (
//         <ButtonLab
//           name={link.title}
//           path={`/laboratory/${laboratory._id}/${link.path}`}
//         />
//       ) : (
//         permissions.find(
//           (permission: PermissionType) =>
//             permission.name === "AFFICHER_GLOBAL" &&
//             permission.collectionName === "CONSOMMATIONS_LABORATOIRE"
//         ) ? 
//         <DropdownLab
//           openDropdown={openDropdown}
//           name={link.title}
//           pathDropDown={link.pathDrop || ""}
//           linkList={doctors}
//           selectedDropDown={selectedDropDown}
//           toggleDropDown={toggleDropDown}
//         /> : 
//         <ButtonLab
//           name={link.title}
//           path={`/laboratory/${laboratory._id}/${link.path}/${UserData()?._id}`}
//         />
//       )}
//     </React.Fragment>
//   ))
// }
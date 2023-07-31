import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import ButtonAssurance from "./ButtonAssurance";
import {
  ManageAssuranceContext,
  ManageAssuranceInterface,
} from "./types";
import DropdownAssurance from "./DropdownAssurance";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { ShowUserApi } from "../../../redux/users/UserApiCalls";
import { UserInterface } from "../../users/types";
import { UserData } from "../../../requestMethods";
import { PermissionType } from "../../roles/types";

const ManageAssurance: React.FC<ManageAssuranceInterface> = ({ Assurance }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedDropDown, setSelectedDropDown] = useState("");
  const [doctors, setDoctors] = useState([])

  const { users } = useSelector((state: State) => state.users);

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

  const { AssId } = useParams();
  const { permissions } = useSelector((state: State) => state.permissions);

  return (
    <ManageAssuranceContext.Provider
      value={{
        openDropdown,
        setOpenDropdown,
      }}
    >
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 rounded border mt-2 font-bold text-center">
        {AssId && <>
          
          {permissions.find(
              (permission: PermissionType) =>
                permission.name === "AFFICHER" &&
                permission.collectionName === "TRAITEMENTS"
            ) && <ButtonAssurance
            name="Traitements"
            path={`/assurance/${AssId}/treatments`}
          />}

          {permissions.find(
            (permission: PermissionType) =>
              permission.name === "AFFICHER_GLOBAL" &&
              permission.collectionName === "PATIENTS_ASSURANCE"
          ) ?
          <DropdownAssurance
            openDropdown={openDropdown}
            name="Patients"
            pathDropDown={`patients`}
            linkList={doctors}
            selectedDropDown={selectedDropDown}
            toggleDropDown={toggleDropDown}
          /> : 
          permissions.find(
            (permission: PermissionType) =>
              permission.name === "AFFICHER" &&
              permission.collectionName === "PATIENTS_ASSURANCE"
          ) &&
          <ButtonAssurance
            name="Patients"
            path={`/assurance/${AssId}/patients/${UserData()._id}`}
          />}

        </>}
      </div>
      <Outlet />
    </ManageAssuranceContext.Provider>
  );
};

export default ManageAssurance;

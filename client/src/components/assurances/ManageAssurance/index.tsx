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
import { useTranslation } from "react-i18next";
import { AssuranceInterface } from "../types";

const ManageAssurance: React.FC<ManageAssuranceInterface> = ({ Assurance }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedDropDown, setSelectedDropDown] = useState("");
  const [doctors, setDoctors] = useState([])

  const { users } = useSelector((state: State) => state.users);
  const { assurances } = useSelector((state: State) => state.assurances);

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

  const { t } = useTranslation()

  return (
    <ManageAssuranceContext.Provider
      value={{
        openDropdown,
        setOpenDropdown,
      }}
    >
      <h1 className="text-center font-bold md:text-3xl">{assurances?.find((assurance: AssuranceInterface) => assurance._id === AssId)?.name}</h1>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 rounded border mt-2 font-bold text-center">
        {AssId && <>
          
          {permissions.find(
              (permission: PermissionType) =>
                permission.name === "AFFICHER" &&
                permission.collectionName === "TRAITEMENTS"
            ) && <ButtonAssurance
            name={t("Traitements")}
            path={`/assurance/${AssId}/treatments`}
          />}

          {permissions.find(
            (permission: PermissionType) =>
              permission.name === "AFFICHER_GLOBAL" &&
              permission.collectionName === "PATIENTS_ASSURANCE"
          ) ?
          <DropdownAssurance
            openDropdown={openDropdown}
            name={t("Patients")}
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
            name={t("Patients")}
            path={`/assurance/${AssId}/patients/${UserData()._id}`}
          />}

        </>}
      </div>
      <Outlet />
    </ManageAssuranceContext.Provider>
  );
};

export default ManageAssurance;

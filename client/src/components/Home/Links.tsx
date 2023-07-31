import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { State } from "../../redux/store";
import { useDispatch } from "react-redux";
import { ShowUserApi } from "../../redux/users/UserApiCalls";
import { UserInterface } from "../users/types";
import { ShowPermissionApi } from "../../redux/permissions/permissionApiCalls";
import { UserData } from "../../requestMethods";
import FirstSection from "./sections/FirstSection";
import SecondSection from "./sections/SecondSection";
import ThirdSection from "./sections/ThirdSection";

const Links: React.FC = () => {
  const className = `px-10 py-6 bg-white hover:bg-main rounded-lg border flex flex-col justify-center items-center text-main`;
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [selectedDropDown, setSelectedDropDown] = useState<string>("");

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

  useEffect(() => {
    const fetchPermission = async () => {
      await dispatch(ShowPermissionApi(`?userId=${UserData()._id}`));
    };
    !localStorage.getItem("timeOut") && setTimeout(() => {
      fetchPermission();
      localStorage.setItem("timeOut", "true")
    }, 100)
  }, [dispatch]);

  return (
    <>
      <FirstSection listDoctors={listDoctors} className={className} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} selectedDropDown={selectedDropDown} setSelectedDropDown={setSelectedDropDown}/>
      <SecondSection listDoctors={listDoctors} className={className} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} selectedDropDown={selectedDropDown} setSelectedDropDown={setSelectedDropDown}/>
      <ThirdSection listDoctors={listDoctors} className={className} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} selectedDropDown={selectedDropDown} setSelectedDropDown={setSelectedDropDown}/>
    </>
  );
};

export default Links;

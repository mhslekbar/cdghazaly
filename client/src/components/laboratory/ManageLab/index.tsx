import React, { useContext, useEffect, useState } from "react";
import { laboratoryInterface } from "../types";
import { Outlet } from "react-router-dom";
import { ShowLaboratoryContext } from "../ShowLaboratory";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { UserInterface } from "../../users/types";
import { LinksInterface, ManageLabContext, linskLaboratory } from "./types";
import ButtonLab from "./ButtonLab";
import { useDispatch } from "react-redux";
import { ShowUserApi } from "../../../redux/users/UserApiCalls";
import DropdownLab from "./DropDownLab";

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

  return (
    <ManageLabContext.Provider
      value={{
        openDropdown,
        setOpenDropdown,
      }}
    >
      <div className="bg-white grid lg:grid-cols-5 sm:grid-cols-2 rounded border shadow mt-2 font-bold text-center">
        {selectedLaboratory.name.length > 0 &&
          linskLaboratory.map((link: LinksInterface, index) => (
            <React.Fragment key={index}>
              {link.type === "button" ? (
                <ButtonLab
                  name={link.title}
                  path={`/laboratory/${laboratory._id}/${link.path}`}
                />
              ) : (
                <DropdownLab
                  openDropdown={openDropdown}
                  name={link.title}
                  pathDropDown={link.pathDrop || ""}
                  linkList={doctors}
                  selectedDropDown={selectedDropDown}
                  toggleDropDown={toggleDropDown}
                />
              )}
            </React.Fragment>
          ))}
      </div>
      <Outlet />
    </ManageLabContext.Provider>
  );
};

export default ManageLab;

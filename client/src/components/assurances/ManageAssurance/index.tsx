import React, { useContext, useEffect, useState } from "react";
import { ShowAssurancesContext } from "../types";
import { Outlet, useParams } from "react-router";
import ButtonAssurance from "./ButtonAssurance";
import {
  LinksInterface,
  ManageAssuranceContext,
  ManageAssuranceInterface,
  linskAssurance,
} from "./types";
import DropdownAssurance from "./DropdownAssurance";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { ShowUserApi } from "../../../redux/users/UserApiCalls";
import { UserInterface } from "../../users/types";

const ManageAssurance: React.FC<ManageAssuranceInterface> = ({ Assurance }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const { selectedAssurance,  } = useContext(ShowAssurancesContext);
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

  return (
    <ManageAssuranceContext.Provider
      value={{
        openDropdown,
        setOpenDropdown,
        
      }}
    >
      <div className="bg-white grid lg:grid-cols-2 sm:grid-cols-1 rounded border shadow mt-2 font-bold text-center">
        {selectedAssurance.name.length > 0 &&
          linskAssurance.map((link: LinksInterface, index) => (
            <React.Fragment key={index}>
              {link.type === "button" ? (
                <ButtonAssurance
                  name={link.title}
                  path={`/assurance/${AssId}/${link.path}`}
                />
              ) : (
                <DropdownAssurance
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
    </ManageAssuranceContext.Provider>
  );
};

export default ManageAssurance;

import React, { useContext, useState } from "react";
import { FaChevronCircleLeft, FaPlus } from "react-icons/fa";
import InputsAddUser from "./forms/InputsAddUser";
import { AddUserContext, DoctorType } from "./types";
import { bindActionCreators } from "redux";
import { AddUserApi } from "../../redux/users/UserApiCalls";
import { useDispatch } from "react-redux";
import { Timeout, hideMsg } from "../../functions/functions";

import { ShowUserContext } from "./ShowUsers";
import { PermissionType } from "../roles/types";
import { useNavigate } from "react-router";
import ButtonsForm from "../../HtmlComponents/ButtonsForm";

const AddUser: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  let [doctor, setDoctor] = useState<DoctorType>({
    cabinet: "",
    percentage: "",
  });
  const [showDoctor, setShowDoctor] = useState(false);

  const [checkedRoles, setCheckedRoles] = useState<PermissionType[]>([]);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const { setSuccessMsg } = useContext(ShowUserContext);
  const [errors, setErrors] = useState<string[]>([]);

  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(!showDoctor) {
      doctor = {}
    }
    const data = {
      username,
      phone,
      password,
      doctor,
      roles: checkedRoles.map((role: any) => role._id),
    };
    const boundActions = bindActionCreators({ AddUserApi }, dispatch);
    const response = await boundActions.AddUserApi(data);
    if (typeof response === "boolean") {
      setUsername("");
      setPhone("");
      setPassword("");
      setDoctor({});
      setCheckedRoles([]);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), Timeout);
      toggle();
    } else if (Array.isArray(response)) {
      setErrors(response);
    }
  };
  
  const navigate = useNavigate()

  return (
    <AddUserContext.Provider
      value={{
        username,
        setUsername,
        phone,
        setPhone,
        password,
        setPassword,
        checkedRoles,
        setCheckedRoles,
        doctor,
        setDoctor,
        showDoctor,
        setShowDoctor
      }}
    >
      <div className="flex justify-start gap-2">
        <FaChevronCircleLeft style={{ fontSize: "30px" }} className="text-main" onClick={() => navigate(-1)}/>
        <button className="p-2 rounded btn-main" onClick={toggle}>
          <FaPlus />
        </button>
      </div>
      {modal && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={toggle}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3">
                  {errors.length > 0 &&
                    errors.map((err, index) => (
                      <p
                        className="p-3 my-2 rounded bg-red text-white msg"
                        key={index}
                        onClick={(e) => hideMsg(e, errors, setErrors)}
                      >
                        {err}
                      </p>
                    ))}
                  {/* Start Modal Body */}
                  <form
                    className="mt-2 sm:ml-4 sm:text-left"
                    onSubmit={handleSubmit}
                  >
                    <InputsAddUser />
                    <ButtonsForm toggle={toggle} typeBtn="Ajouter" />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AddUserContext.Provider>
  );
};

export default AddUser;

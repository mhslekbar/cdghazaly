import React, { useContext, useState } from "react";
import InputsAddUser from "./forms/InputsAddUser";
import { AddUserContext, DoctorType, UserInterface } from "./types";
import { bindActionCreators } from "redux";
import { EditUserApi } from "../../redux/users/UserApiCalls";
import { useDispatch } from "react-redux";
import { Timeout, hideMsg } from "../../functions/functions";

import { ShowUserContext } from "./ShowUsers";
import { PermissionType } from "../roles/types";
import ButtonsForm from "../../HtmlComponents/ButtonsForm";

interface EditUserInterface {
  modal: boolean,
  toggle: () => void,
  user: UserInterface
}

const EditUser: React.FC<EditUserInterface> = ({ modal, toggle, user }) => {
  const [username, setUsername] = useState<string>(user.username);
  const [phone, setPhone] = useState<string>(user.phone);
  const [password, setPassword] = useState<string>("");
  let [doctor, setDoctor] = useState<DoctorType>(user.doctor ? user.doctor : {
    cabinet: "",
    percentage: "",
  });

  const [showDoctor, setShowDoctor] = useState(Object.keys(user?.doctor || {}).length > 0);

  const [checkedRoles, setCheckedRoles] = useState<PermissionType[]>(user.roles);

  const { setSuccessMsg } = useContext(ShowUserContext);
  const [errors, setErrors] = useState<string[]>([]);

  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
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
      const boundActions = bindActionCreators({ EditUserApi }, dispatch);
      const response = await boundActions.EditUserApi(user._id, data);
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
    } catch(err) {
      console.log("Err: ", err)
    }
  };

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
                    <ButtonsForm toggle={toggle} typeBtn="Modifier" />
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

export default EditUser;

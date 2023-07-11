import React, { useContext, useEffect, useState } from "react";
import { get } from "../../../requestMethods";
import { AddUserContext } from "../types";
import Doctor from "./Doctor";
import { PermissionType } from "../../roles/types";

const InputsAddUser: React.FC = () => {
  const {
    username,
    setUsername,
    phone,
    setPhone,
    password,
    setPassword,
    checkedRoles,
    setCheckedRoles,
    showDoctor,
    setShowDoctor,
  } = useContext(AddUserContext);

  const [listRoles, setListRoles] = useState([]);

  useEffect(() => {
    try {
      const fetchRoles = async () => {
        const response = await get("role");
        const resData = response.data.success;
        if (resData) {
          setListRoles(resData);
        }
      };
      fetchRoles();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (showDoctor) {
      setShowDoctor(true);
    } else {
      setShowDoctor(false);
    }
  }, [showDoctor, setShowDoctor]);

  const handleChangeRole = (e: any, role: PermissionType) => {
    if (!e.target.checked) {
      setCheckedRoles(
        checkedRoles.filter((element: PermissionType) => element._id !== role._id)
      );
    } else {
      setCheckedRoles([...checkedRoles, role]);
    }
  };

  return (
    <React.Fragment>
      <div className="mb-2">
        <label htmlFor="Nom" className="block text-gray-700 font-bold">
          Nom
        </label>
        <input
          type="text"
          id="Nom"
          className="w-full shadow rounded border px-4 py-2 text-gray-700 focus:outline-none"
          placeholder="Nom"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="Phone" className="block text-gray-700 font-bold">
          Telephone
        </label>
        <input
          type="text"
          id="Phone"
          className="w-full shadow rounded border px-4 py-2 text-gray-700 focus:outline-none"
          placeholder="Telephone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="password" className="block text-gray-700 font-bold">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          className="w-full shadow rounded border px-4 py-2 text-gray-700 focus:outline-none"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Doctor showDoctor={showDoctor} setShowDoctor={setShowDoctor} />

      <div className="mb-2">
        <p id="block text-gray-700 font-bold">Roles</p>
        <div className="grid grid-cols-3">
          {listRoles.map((role: any, index) => (
            <div className="block" key={index}>
              <input
                type="checkbox"
                id={`role${role._id}`}
                className="shadow"
                checked={checkedRoles.some((elem) => elem._id === role._id)}
                value={role._id}
                onChange={(e) => handleChangeRole(e, role)}
              />{" "}
              <label
                htmlFor={`role${role._id}`}
                className="text-gray-700 font-bold"
              >
                {role.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default InputsAddUser;

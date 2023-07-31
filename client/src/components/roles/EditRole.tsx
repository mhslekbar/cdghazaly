import React, { useContext, useState } from "react";
import { Timeout, hideMsg } from "../../functions/functions";
import { RoleType } from "./types";
import { editRoleApi } from "../../redux/roles/roleApiCalls";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { ShowRoleContext } from "./ShowRoles";
import ButtonsForm from "../../HtmlComponents/ButtonsForm";

interface EditRoleInterface {
  modal: boolean;
  toggle: any;
  roleData: RoleType;
}

const EditRole: React.FC<EditRoleInterface> = ({ modal, toggle, roleData }) => {
  const [role, setRole] = useState<string>(roleData.name);
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { setShowSuccessMsg } = useContext(ShowRoleContext);

  const handleEditRole = async (e: any) => {
    e.preventDefault();
    try {
      const boundApi = bindActionCreators({ editRoleApi }, dispatch);
      const response = await boundApi.editRoleApi(roleData._id, {
        name: role.trim(),
      });
      if (typeof response === "boolean") {
        setShowSuccessMsg(true);
        toggle();
        setTimeout(() => setShowSuccessMsg(false), Timeout);
        setRole("");
      } else if (Array.isArray(response)) {
        setErrors(response);
      }
    } catch {}
  };

  return (
    <div>
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
                  {/* Start Modal Body */}
                  <form
                    className="mt-2 sm:ml-4 sm:text-left"
                    onSubmit={handleEditRole}
                  >
                    {/* My Inputs */}
                    {errors.length > 0 &&
                      errors.map((err, index) => (
                        <p
                          className="p-3 my-2 rounded bg-red-400 text-white msg"
                          key={index}
                          onClick={(e) => hideMsg(e, errors, setErrors)}
                        >
                          {err}
                        </p>
                      ))}
                    {/* My Inputs */}
                    <div className="mb-2">
                      <label
                        htmlFor="role"
                        className="block font-bold text-gray-700"
                      >
                        Role
                      </label>
                      <input
                        type="text"
                        id="role"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Nom du role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </div>
                    {/* START Modal Footer */}
                    <ButtonsForm typeBtn="Modifier" toggle={toggle} /> 
                    {/* End Modal Footer */}
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditRole;

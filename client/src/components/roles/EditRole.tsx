import React, { useContext, useState } from "react";
import { Timeout } from "../../functions/functions";
import { RoleType } from "./types";
import { editRoleApi } from "../../redux/roles/roleApiCalls";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { ShowRoleContext } from "./ShowRoles";
import ButtonsForm from "../../HtmlComponents/ButtonsForm";
import ShowErrorMsg from "../../HtmlComponents/ShowErrorMsg";

interface EditRoleInterface {
  modal: boolean;
  toggle: any;
  roleData: RoleType;
}

const EditRole: React.FC<EditRoleInterface> = ({ modal, toggle, roleData }) => {
  const [role, setRole] = useState<string>(roleData.name);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();
  const { setShowSuccessMsg } = useContext(ShowRoleContext);

  const handleEditRole = async (e: any) => {
    e.preventDefault();
    setLoading(true)
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
    } finally {
      setLoading(false)
    }
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
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
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
                    <ButtonsForm loading={loading} typeBtn="Modifier" toggle={toggle} /> 
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

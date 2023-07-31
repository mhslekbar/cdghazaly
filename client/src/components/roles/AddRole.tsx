import React, { useContext, useState } from "react";
import { FaChevronCircleLeft, FaPlus } from "react-icons/fa";
import { addRoleApi } from "../../redux/roles/roleApiCalls";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { ShowRoleContext } from "./ShowRoles";
import { Timeout, hideMsg } from "../../functions/functions";
import { useNavigate } from "react-router";
import ButtonsForm from "../../HtmlComponents/ButtonsForm";

const AddRole: React.FC = () => {
  const [role, setRole] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { setShowSuccessMsg } = useContext(ShowRoleContext);
  const [errors, setErrors] = useState<string[]>([]);

  const handleAddNewRole = async (e: any) => {
    e.preventDefault();
    try {
      const boundedApi = bindActionCreators({ addRoleApi }, dispatch);
      const response = await boundedApi.addRoleApi({ name: role.trim() });
      if (typeof response === "boolean") {
        setShowSuccessMsg(true);
        toggle()
        setTimeout(() => setShowSuccessMsg(false), Timeout);
        setRole("")
      } else if (Array.isArray(response)) {
        setErrors(response);
      }
    } catch {}
  };

  const toggle = () => {
    setModal(!modal);
  };

  const navigate = useNavigate()

  return (
    <div>
      <div className="flex justify-start gap-2">
        <FaChevronCircleLeft style={{ fontSize: "30px" }} className="text-main" onClick={() => navigate("/")}/>
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
                  {/* Start Modal Body */}
                  <form
                    className="mt-2 sm:ml-4 sm:text-left"
                    onSubmit={handleAddNewRole}
                  >
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
                    <ButtonsForm typeBtn="Ajouter" toggle={toggle} /> 
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

export default AddRole;

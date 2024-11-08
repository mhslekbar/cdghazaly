import React, { useContext, useState } from "react";
import { FaChevronCircleLeft, FaPlus } from "react-icons/fa";
import { addRoleApi } from "../../redux/roles/roleApiCalls";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { ShowRoleContext } from "./ShowRoles";
import { Timeout } from "../../functions/functions";
import { useNavigate } from "react-router";
import ButtonsForm from "../../HtmlComponents/ButtonsForm";
import { useTranslation } from "react-i18next";
import ShowErrorMsg from "../../HtmlComponents/ShowErrorMsg";

const AddRole: React.FC = () => {
  const [role, setRole] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { setShowSuccessMsg } = useContext(ShowRoleContext);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false)

  const handleAddNewRole = async (e: any) => {
    e.preventDefault();
    setLoading(true)
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
    } finally {
      setLoading(false)
    }
  };

  const toggle = () => {
    setModal(!modal);
  };

  const navigate = useNavigate()

  const { t } = useTranslation()

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
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    {/* My Inputs */}
                    <div className="mb-2">
                      <label
                        htmlFor="role"
                        className="block font-bold text-gray-700"
                      >
                        {t("Role")}
                      </label>
                      <input
                        type="text"
                        id="role"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={t("Nom du role")}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </div>
                    {/* START Modal Footer */}
                    <ButtonsForm loading={loading} typeBtn="Ajouter" toggle={toggle} /> 
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

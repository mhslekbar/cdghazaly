import React, { FormEvent, useContext, useState } from "react";
import InputsLaboratory from "./forms/InputsLaboratory";
import ButtonsLaboratory from "./forms/ButtonsLaboratory";
import { DataLaboratoryContext, laboratoryInterface } from "./types";
import { Timeout, hideMsg } from "../../functions/functions";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { EditLaboratoryApi } from "../../redux/laboratory/laboratoryApiCalls";
import { ShowLaboratoryContext } from "./ShowLaboratory";

interface EditLaboratoryInterface {
  modal: boolean;
  toggle: () => void;
  laboratory: laboratoryInterface;
}

const EditLaboratory: React.FC<EditLaboratoryInterface> = ({
  modal,
  toggle,
  laboratory,
}) => {
  const [name, setName] = useState<string>(laboratory.name);
  const [phone, setPhone] = useState<string>(laboratory.phone);
  const [errors, setErrors] = useState<string[]>([]);

  const dispatch = useDispatch();
  const boundActions = bindActionCreators({ EditLaboratoryApi }, dispatch);
  const { setShowSuccessMsg } = useContext(ShowLaboratoryContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await boundActions.EditLaboratoryApi(laboratory._id, {
        name,
        phone,
      });
      if (typeof response === "boolean") {
        setName("");
        setPhone("");
        toggle();
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), Timeout);
      } else if (Array.isArray(response)) {
        setErrors(response);
      }
    } catch {}
  };

  return (
    <DataLaboratoryContext.Provider
      value={{
        name,
        setName,
        phone,
        setPhone,
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
                  {/* Start Modal Body */}
                  <form className="mt-2 sm:ml-4 sm:text-left" onSubmit={handleSubmit}>
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
                    <InputsLaboratory />
                    <ButtonsLaboratory toggle={toggle} typeBtn="Modifier" />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataLaboratoryContext.Provider>
  );
};

export default EditLaboratory;

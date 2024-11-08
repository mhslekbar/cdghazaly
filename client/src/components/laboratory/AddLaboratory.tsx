import React, { FormEvent, useContext, useState } from "react";
import InputsLaboratory from "./forms/InputsLaboratory";
import { DataLaboratoryContext } from "./types";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { AddLaboratoryApi } from "../../redux/laboratory/laboratoryApiCalls";
import { ShowLaboratoryContext } from "./ShowLaboratory";
import { Timeout } from "../../functions/functions";
import ButtonsForm from "../../HtmlComponents/ButtonsForm";
import ShowErrorMsg from "../../HtmlComponents/ShowErrorMsg";

interface AddLaboratoryInterface {
  modal: boolean,
  toggle: () => void,
}

const AddLaboratory:React.FC<AddLaboratoryInterface> = ({ modal, toggle }) => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const [loading, setLoading] = useState(false)
  
  const dispatch = useDispatch();
  const boundActions = bindActionCreators({ AddLaboratoryApi }, dispatch);
  const { setShowSuccessMsg } = useContext(ShowLaboratoryContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await boundActions.AddLaboratoryApi({ name, phone });
      if (typeof response === "boolean") {
        setName("");
        setPhone("");
        toggle();
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), Timeout);
      } else if (Array.isArray(response)) {
        setErrors(response);
      }
    } finally {
      setLoading(false)
    }
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
                  <form
                    className="mt-2 sm:ml-4 sm:text-left"
                    onSubmit={handleSubmit}
                  >
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    <InputsLaboratory />
                    <ButtonsForm loading={loading} toggle={toggle} typeBtn="Ajouter" />
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

export default AddLaboratory;

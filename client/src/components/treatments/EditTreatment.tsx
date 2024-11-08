import React, { useContext, useState } from "react";
import {
  DataTreatmentContext,
  TreatmentType,
  careTypeInterface
} from "./types";
import InputsTreatment from "./forms/InputsTreatment";
import { Timeout } from "../../functions/functions";
import { bindActionCreators } from "redux";
import { EditTreatmentApi } from "../../redux/treatments/treatmentApiCalls"
import { useDispatch } from "react-redux";
import { ShowTreatmentContext } from "./ShowTreatments";
import ButtonsForm from "../../HtmlComponents/ButtonsForm";
import ShowErrorMsg from "../../HtmlComponents/ShowErrorMsg";

interface EditTreatmentInterface {
  modal: boolean;
  toggle: () => void;
  treatmentData: TreatmentType;
}

const EditTreatment: React.FC<EditTreatmentInterface> = ({
  modal,
  toggle,
  treatmentData,
}) => {
  
  const [treatment, setTreatment] = useState(treatmentData.name);
  const [price, setPrice] = useState(treatmentData.price);
  const [treatmentType, setTreatmentType] = useState<careTypeInterface>({
    name: "",
    type: treatmentData.type,
  });

  const { setShowSuccessMsg, setSelectedType } = useContext(ShowTreatmentContext)
  
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const data = { name: treatment, price, type: treatmentType.type }
    setLoading(true)
    try {
      const boundActions = bindActionCreators({ EditTreatmentApi }, dispatch)
      const response = await boundActions.EditTreatmentApi(treatmentData._id, data)
      if(typeof response === "boolean") {
        setTreatment("")
        setPrice("")
        setTreatmentType(treatmentType)
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
        if(treatmentType.name.length > 0) {
          setSelectedType(treatmentType)
        }
      } else if(Array.isArray(response)) {
        setErrors(response)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <DataTreatmentContext.Provider
      value={{
        treatment,
        setTreatment,
        price,
        setPrice,
        treatmentType,
        setTreatmentType,
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
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    {/* My Inputs */}
                    <InputsTreatment />
                    <ButtonsForm loading={loading} toggle={toggle} typeBtn="Modifier" />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataTreatmentContext.Provider>
  );
};

export default EditTreatment;

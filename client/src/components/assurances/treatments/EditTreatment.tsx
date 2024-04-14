import React, { useContext, useState } from "react";
import { careTypeInterface, DataTreatmentContext, TreatmentType } from "./types";
import InputsTreatment from "./forms/InputsTreatment";
import { Timeout } from "../../../functions/functions";
import { bindActionCreators } from "redux";
import { EditTreatmentApi } from "../../../redux/treatments/treatmentApiCalls";
import { useDispatch } from "react-redux";
import { ShowTreatmentContext } from "./ShowTreatAssurance";
import { useParams } from "react-router";
import ButtonsForm from "../../../HtmlComponents/ButtonsForm";
import ShowErrorMsg from "../../../HtmlComponents/ShowErrorMsg";

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

  const { setShowSuccessMsg } = useContext(ShowTreatmentContext);

  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useDispatch();

  const { AssId } = useParams();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    try {
      const boundActions = bindActionCreators({ EditTreatmentApi }, dispatch);
      const response = await boundActions.EditTreatmentApi(treatmentData._id, {
        name: treatment,
        price,
        type: treatmentType.type,
        assurance: AssId,
      });
      if (typeof response === "boolean") {
        setTreatment("");
        setPrice("");
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
    <DataTreatmentContext.Provider
      value={{
        treatment, setTreatment,
        treatmentType, setTreatmentType,
        price, setPrice,
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

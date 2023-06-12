import React, { useContext, useState } from "react";
import { DataTreatmentContext, TreatmentType } from "./types";
import InputsTreatment from "./forms/InputsTreatment";
import ButtonsTreatment from "./forms/ButtonsTreatment";
import { Timeout, hideMsg } from "../../../functions/functions";
import { bindActionCreators } from "redux";
import { EditTreatmentApi } from "../../../redux/treatments/treatmentApiCalls";
import { useDispatch } from "react-redux";
import { ShowTreatmentContext } from "./ShowTreatAssurance";
import { useParams } from "react-router";

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

  const { setShowSuccessMsg } = useContext(ShowTreatmentContext);

  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useDispatch();

  const { AssId } = useParams();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const boundActions = bindActionCreators({ EditTreatmentApi }, dispatch);
      const response = await boundActions.EditTreatmentApi(treatmentData._id, {
        name: treatment,
        price,
        type: "soins",
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
    } catch {}
  };

  return (
    <DataTreatmentContext.Provider
      value={{
        treatment,
        setTreatment,
        price,
        setPrice,
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
                    <InputsTreatment />
                    <ButtonsTreatment toggle={toggle} typeBtn="Modifier" />
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

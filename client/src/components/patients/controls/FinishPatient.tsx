import React, { FormEvent, useContext, useState } from "react";
import ButtonsForm from "../../../HtmlComponents/ButtonsForm";
import { PatientInterface, ShowPatientsContext } from "../types";
import { useDispatch } from "react-redux";
import { Timeout, hideMsg } from "../../../functions/functions";
import { FinishPatientsApi } from "../../../redux/patients/patientApiCalls";

type FinishPatientType = {
  patientData: PatientInterface;
  modal: boolean;
  toggle: () => void;
}

const FinishPatient:React.FC<FinishPatientType> = ({
  patientData,
  modal,
  toggle,
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { setShowSuccecMsg } = useContext(ShowPatientsContext);
  const dispatch: any = useDispatch();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await dispatch(FinishPatientsApi(patientData._id));
      if (response === true) {
        toggle();
        setShowSuccecMsg(true);
        setTimeout(() => setShowSuccecMsg(false), Timeout);
      } else {
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
                    <p className="text-gray-700 text-xl">Terminer <b>{patientData.name} </b>?</p>
                    <ButtonsForm toggle={toggle} typeBtn="Terminer" />
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

export default FinishPatient;
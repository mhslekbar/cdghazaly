import React, { FormEvent, useContext, useState } from "react";
import ButtonsForm from "../../../HtmlComponents/ButtonsForm";
import { PatientInterface, ShowPatientsContext } from "../types";
import { useDispatch } from "react-redux";
import { Timeout } from "../../../functions/functions";
import { FinishPatientsApi } from "../../../redux/patients/patientApiCalls";
import { useTranslation } from "react-i18next";
import ShowErrorMsg from "../../../HtmlComponents/ShowErrorMsg";

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
  const { setShowSuccessMsg } = useContext(ShowPatientsContext);
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await dispatch(FinishPatientsApi(patientData._id));
      if (response === true) {
        toggle();
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), Timeout);
      } else {
        setErrors(response);
      }
    } finally {
      setLoading(false)
    }
  };

  const { t } = useTranslation()

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
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    <p className="text-gray-700 text-xl">{t("Terminer")} <b>{patientData.name} </b>?</p>
                    <ButtonsForm loading={loading} toggle={toggle} typeBtn="Terminer" />
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

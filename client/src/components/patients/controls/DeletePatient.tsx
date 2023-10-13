import React, { FormEvent, useContext, useState } from "react";
import ButtonsForm from "../../../HtmlComponents/ButtonsForm";
import { PatientInterface, ShowPatientsContext } from "../types";
import { useDispatch } from "react-redux";
import { Timeout } from "../../../functions/functions";
import { DeletePatientsApi } from "../../../redux/patients/patientApiCalls";
import { useLocation, useNavigate } from "react-router";
import ShowErrorMsg from "../../../HtmlComponents/ShowErrorMsg";

interface DeletePatientInterface {
  patientData: PatientInterface;
  modal: boolean;
  toggle: () => void;
}

const DeletePatient: React.FC<DeletePatientInterface> = ({
  patientData,
  modal,
  toggle,
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { setShowSuccessMsg } = useContext(ShowPatientsContext);
  const dispatch: any = useDispatch();
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await dispatch(DeletePatientsApi(patientData._id));
      if (response === true) {
        toggle();
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), Timeout);
        if(location.pathname.split("/")[4] === "Manage") {
          navigate("/")
        }
      } else {
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
                  <form
                    className="mt-2 sm:ml-4 sm:text-left"
                    onSubmit={handleSubmit}
                  >
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    <ButtonsForm loading={loading} toggle={toggle} typeBtn="Supprimer" />
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

export default DeletePatient;

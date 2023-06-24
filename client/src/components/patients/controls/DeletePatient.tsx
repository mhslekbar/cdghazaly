import React, { FormEvent, useContext, useState } from "react";
import ButtonsForm from "../../../HtmlComponents/ButtonsForm";
import { PatientInterface, ShowPatientsContext } from "../types";
import { useDispatch } from "react-redux";
import { Timeout, hideMsg } from "../../../functions/functions";
import { DeletePatientsApi } from "../../../redux/patients/patientApiCalls";
import { useLocation, useNavigate } from "react-router";

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
                    <ButtonsForm toggle={toggle} typeBtn="Supprimer" />
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

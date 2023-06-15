import React, { FormEvent, useContext, useEffect, useState } from "react";
import ButtonsForm from "../../../HtmlComponents/ButtonsForm";
import { PatientInterface, ShowPatientsContext } from "../types";
import { useDispatch } from "react-redux";
import { Timeout, hideMsg } from "../../../functions/functions";
import { PassPatientsApi } from "../../../redux/patients/patientApiCalls";
import { SelectElement } from "../../../HtmlComponents/SelectElement";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { DefaultUserInterface, UserInterface } from "../../users/types";

type PasserPatientType = {
  patientData: PatientInterface;
  modal: boolean;
  toggle: () => void;
}

const PassPatient:React.FC<PasserPatientType> = ({
  patientData,
  modal,
  toggle,
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { setShowSuccecMsg } = useContext(ShowPatientsContext);
  const dispatch: any = useDispatch();
  const { users } = useSelector((state: State) => state.users)
  
  const [ArrayOfDoctors, setArrayOfDoctors] = useState<UserInterface[]>([DefaultUserInterface])

  useEffect(() => {
    setArrayOfDoctors(users.filter((user: UserInterface) => user.doctor?.cabinet))
  }, [users])

  const [doctor, setDoctor] = useState("")

  useEffect(() => {
    setDoctor(ArrayOfDoctors[0]._id)
  }, [ArrayOfDoctors])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await dispatch(PassPatientsApi(patientData._id, doctor));
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
                    <p className="text-gray-700 text-xl">Passer <b>{patientData.name} </b>?</p>
                    <SelectElement  id="doctor" value={doctor} setValue={setDoctor} options={ArrayOfDoctors.map((option: any) => ({...option, name: option.username}))} />

                    <ButtonsForm toggle={toggle} typeBtn="Passer" />
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

export default PassPatient;

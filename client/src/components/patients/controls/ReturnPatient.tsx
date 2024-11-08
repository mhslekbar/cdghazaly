import React, { FormEvent, useContext, useEffect, useState } from "react";
import ButtonsForm from "../../../HtmlComponents/ButtonsForm";
import { PatientInterface, ShowPatientsContext } from "../types";
import { useDispatch } from "react-redux";
import { Timeout } from "../../../functions/functions";
import { ReturnPatientsApi } from "../../../redux/patients/patientApiCalls";
import { SelectElement } from "../../../HtmlComponents/SelectElement";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { DefaultUserInterface, UserInterface } from "../../users/types";
import { UserData } from "../../../requestMethods";
import { InputElement } from "../../../HtmlComponents/InputElement";
import { ShowPaymentModeApi } from "../../../redux/paymentMode/paymentModeApiCalls";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import ShowErrorMsg from "../../../HtmlComponents/ShowErrorMsg";

type ReturnPatientType = {
  patientData: PatientInterface;
  modal: boolean;
  toggle: () => void;
}

const ReturnPatient:React.FC<ReturnPatientType> = ({
  patientData,
  modal,
  toggle,
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { setShowSuccessMsg } = useContext(ShowPatientsContext);
  const dispatch: any = useDispatch();
  const { users } = useSelector((state: State) => state.users)
  const [ArrayOfDoctors, setArrayOfDoctors] = useState<UserInterface[]>([DefaultUserInterface])
  
  const { paymentModes } = useSelector((state: State) => state.paymentModes)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setArrayOfDoctors(users.filter((user: UserInterface) => user.doctor?.cabinet))
  }, [users])

  const [doctor, setDoctor] = useState("")
  const [method, setMethod] = useState("")
  const [supported, setSupported] = useState("")
  
  useEffect(() => {
    const fetchPaymentMethod = async () => {
      await dispatch(ShowPaymentModeApi())
    }
    fetchPaymentMethod();
  }, [dispatch])
  
  const { doctorId } = useParams()

  useEffect(() => {
    setDoctor(doctorId || "")
  }, [doctorId])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await dispatch(ReturnPatientsApi({ user: UserData()._id, patient: patientData._id, doctor, method, supported }));
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
                    <p className="text-gray-700 text-xl">{t("Retourner")} <b>{patientData.name} </b>?</p>
                    <SelectElement valueType="object" id="doctor" value={doctor} setValue={setDoctor} options={ArrayOfDoctors.map((option: any) => ({...option, name: option.username}))} />
                    
                    {patientData?.assurance?.society.length > 0 ? 
                      <InputElement
                        type="number"
                        placeholder={t("Prise en charge")}
                        id="Prise en charge"
                        value={supported}
                        setValue={setSupported}
                      />
                    : 
                    <SelectElement  
                      valueType="string"
                      id="paymentMethod"
                      value={method}
                      setValue={setMethod}
                      options={ paymentModes
                        .map((option: any) => ({_id: option._id, name: option.name}))
                      }
                      defaultOption={<option>cash</option>} 
                    />
                    }
                    <ButtonsForm loading={loading} toggle={toggle} typeBtn="Retourner" />
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

export default ReturnPatient;

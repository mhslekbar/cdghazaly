import React, { useContext, useState } from 'react';
import InputsPayment from '../forms/InputsPayment';
import ButtonsForm from '../../../../HtmlComponents/ButtonsForm';
import { DataPaymentsContext, DefaultPaymentMethodInterface, PaymentInterface, PaymentMethodInterface, ShowPaymentsContext } from '../types';
import { UserInterface } from '../../../users/types';
import { Timeout, formattedDate } from '../../../../functions/functions';
import { EditPaymentsApi } from '../../../../redux/payments/paymentApiCalls';
import { useDispatch } from 'react-redux';
import { UserData } from '../../../../requestMethods';
import { useParams } from 'react-router';
import { ShowPatientsApi } from '../../../../redux/patients/patientApiCalls';
import ShowErrorMsg from '../../../../HtmlComponents/ShowErrorMsg';

interface props {
  modal: boolean,
  toggle: () => void,
  paymentData: PaymentInterface
}

const EditPayment:React.FC<props> = ({ modal, toggle, paymentData }) => {
  const { setShowSuccessMsg } = useContext(ShowPaymentsContext)
  
  const [amount, setAmount] = useState(paymentData.amount)
  const [doctor, setDoctor] = useState<UserInterface>(paymentData.doctor)
  const [type, setType] = useState(paymentData.type)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodInterface>(paymentData?.method || DefaultPaymentMethodInterface)
  const [supported, setSupported] = useState(paymentData?.supported ?? null)
  const [paymentDate, setPaymentDate] = useState(formattedDate(paymentData.paymentDate))

  const dispatch: any = useDispatch()
  const { patientId } = useParams()
  const [errors, setErrors] = useState<string[]>([])

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    setLoading(true)
    // if the user who will add this payment is a doctor 
    // i want to approve this payment directly
    const approved = UserData()?.doctor?.cabinet ? true : false

    const data = {
      user: UserData()._id,
      doctor: doctor._id,
      patient: patientId,
      amount,
      type,
      method: paymentMethod,
      supported,
      paymentDate,
      approved,
    }
    e.preventDefault()
    try {
      const response = await dispatch(EditPaymentsApi(paymentData._id, data)) 
      if(response === true) {
        toggle()
        setAmount(0)
        setSupported("")
        setPaymentDate(formattedDate(new Date().toString()))
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
        await dispatch(ShowPatientsApi())
      } else {
        setErrors(response)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <DataPaymentsContext.Provider value={{
      amount, setAmount,
      doctor, setDoctor,
      type, setType,
      paymentMethod, setPaymentMethod,
      supported, setSupported,
      paymentDate, setPaymentDate
    }}>
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
                    <InputsPayment />
                    <ButtonsForm loading={loading} toggle={toggle} typeBtn='Modifier'/>
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataPaymentsContext.Provider>
  );
}

export default EditPayment

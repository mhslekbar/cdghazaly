import React, { useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import InputsPayment from '../forms/InputsPayment';
import ButtonsForm from '../../../../HtmlComponents/ButtonsForm';
import { DataPaymentsContext, DefaultPaymentMethodInterface, EnumTypeModalPayment, PaymentMethodInterface, ShowPaymentsContext } from '../types';
import { DefaultUserInterface, UserInterface } from '../../../users/types';
import { Timeout, formattedDate } from '../../../../functions/functions';
import { AddPaymentsApi } from '../../../../redux/payments/paymentApiCalls';
import { useDispatch } from 'react-redux';
import { UserData } from '../../../../requestMethods';
import { useParams } from 'react-router';
import { ShowPatientsApi } from '../../../../redux/patients/patientApiCalls';
import ShowErrorMsg from '../../../../HtmlComponents/ShowErrorMsg';

const AddPayment:React.FC = () => {
  const [amount, setAmount] = useState(0)
  const [doctor, setDoctor] = useState<UserInterface>(DefaultUserInterface)
  const [type, setType] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodInterface>(DefaultPaymentMethodInterface)
  const [supported, setSupported] = useState("")
  const [paymentDate, setPaymentDate] = useState(formattedDate(new Date().toString()))

  const { setShowSuccessMsg, setModalType } = useContext(ShowPaymentsContext)

  const [modal, setModal] = useState(false)
  const toggle = () => {
    setModalType(EnumTypeModalPayment.ADD_MODAL)
    setModal(!modal)
  }

  const dispatch: any = useDispatch()
  const { patientId } = useParams()

  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    setLoading(true)
    const data = {
      user: UserData()._id,
      doctor: doctor._id,
      patient: patientId,
      amount,
      type,
      method: paymentMethod,
      supported,
      paymentDate
    }
    e.preventDefault()
    try {
      const response = await dispatch(AddPaymentsApi(data)) 
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
        <button className="p-2 rounded bg-main text-white mt-2" onClick={toggle}>
          <FaPlus />
        </button>
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
                    <ButtonsForm loading={loading} toggle={toggle} typeBtn='Ajouter'/>
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

export default AddPayment

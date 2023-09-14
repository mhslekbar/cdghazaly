import React, { FormEvent, useContext, useEffect, useState } from 'react';
import InputsPaymentLab from './forms/InputsPaymentLab';
import ButtonsPaymentLab from './forms/ButtonsPaymentLab';
import { DataPaymentLabContext, PaymentLabType } from './types';
import { useDispatch } from 'react-redux';
import { EditPaymentLabApi } from '../../../redux/laboratory/payments/paymentLabApiCalls';
import { useParams } from 'react-router';
import { ShowLaboratoryContext } from '../ShowLaboratory';
import { Timeout, hideMsg } from '../../../functions/functions';
import { ShowLaboratoryApi } from '../../../redux/laboratory/laboratoryApiCalls';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { DefaultLaboratoryInterface, laboratoryInterface } from '../types';

interface EditPaymentLabInterface {
  modal: boolean,
  toggle: () => void,
  PaymentData: PaymentLabType
}

const EditPaymentLab:React.FC<EditPaymentLabInterface> = ({ modal, toggle, PaymentData }) => {
  const [amount, setAmount] = useState(PaymentData.amount)
  const [comment, setComment] = useState(PaymentData.comment)
  const [createdAt, setCreatedAt] = useState(PaymentData.createdAt);

  const [errors, setErrors] = useState<string[]>([]);
 
  const { labId, doctorId } = useParams()
  const { setShowSuccessMsg, setSelectedLaboratory} = useContext(ShowLaboratoryContext)
  
  const dispatch: any = useDispatch()
  const { laboratory } = useSelector((state: State) => state.laboratory);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response: any = await dispatch(EditPaymentLabApi(labId || "", PaymentData._id, { amount, comment, doctor: doctorId, createdAt }))
      if(response === true) {
        setAmount("")
        setComment("")
        toggle();
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), Timeout);
        await dispatch(ShowLaboratoryApi())
      } else {
        setErrors(response);
      }
    } catch {}
  }

  useEffect(() => {
    setSelectedLaboratory(laboratory.find((lab: laboratoryInterface) => lab._id === labId) || DefaultLaboratoryInterface)
  }, [laboratory, setSelectedLaboratory, labId])

  return (
    <DataPaymentLabContext.Provider value={{
      amount, setAmount,
      comment, setComment,
      createdAt, setCreatedAt,
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
                    <InputsPaymentLab />
                    <ButtonsPaymentLab toggle={toggle} typeBtn='Modifier' />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataPaymentLabContext.Provider>
  );
}

export default EditPaymentLab

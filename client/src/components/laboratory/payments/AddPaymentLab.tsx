import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import InputsPaymentLab from './forms/InputsPaymentLab';
import ButtonsPaymentLab from './forms/ButtonsPaymentLab';
import { DataPaymentLabContext } from './types';
import { useDispatch } from 'react-redux';
import { AddPaymentLabApi } from '../../../redux/laboratory/payments/paymentLabApiCalls';
import { useParams } from 'react-router';
import { ShowLaboratoryContext } from '../ShowLaboratory';
import { Timeout, hideMsg } from '../../../functions/functions';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { DefaultLaboratoryInterface, laboratoryInterface } from '../types';
import { ShowLaboratoryApi } from '../../../redux/laboratory/laboratoryApiCalls';

const AddPaymentLab:React.FC = () => {
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date());
  const [errors, setErrors] = useState<string[]>([]);
 
  const { labId, doctorId } = useParams()
  const { setShowSuccessMsg, setSelectedLaboratory } = useContext(ShowLaboratoryContext)
  const [modal, setModal] = useState(false)
  
  const toggle = () => {
    setModal(!modal)
  }
  const dispatch: any = useDispatch()

  const { laboratory } = useSelector((state: State) => state.laboratory);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response: any = await dispatch(AddPaymentLabApi(labId || "", { amount, comment, doctor: doctorId, createdAt }))
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
      createdAt, setCreatedAt
    }}>
        <button className="p-2 rounded bg-main text-white mb-2" onClick={toggle}>
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
                    <ButtonsPaymentLab toggle={toggle} typeBtn='Ajouter' />
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

export default AddPaymentLab

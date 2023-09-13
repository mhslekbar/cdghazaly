import React, { FormEvent, useContext, useEffect, useState } from 'react';
import ButtonsPaymentLab from './forms/ButtonsPaymentLab';
import { PaymentLabType } from './types';
import { useDispatch } from 'react-redux';
import { DeletePaymentLabApi } from '../../../redux/laboratory/payments/paymentLabApiCalls';
import { useParams } from 'react-router';
import { ShowLaboratoryContext } from '../ShowLaboratory';
import { Timeout, hideMsg } from '../../../functions/functions';
import { ShowLaboratoryApi } from '../../../redux/laboratory/laboratoryApiCalls';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { DefaultLaboratoryInterface, laboratoryInterface } from '../types';

interface DeletePaymentLabInterface {
  modal: boolean,
  toggle: () => void,
  PaymentData: PaymentLabType
}

const DeletePaymentLab:React.FC<DeletePaymentLabInterface> = ({ modal, toggle, PaymentData }) => {
  const [errors, setErrors] = useState<string[]>([]);
 
  const { labId } = useParams()
  const { setShowSuccessMsg, setSelectedLaboratory} = useContext(ShowLaboratoryContext)
  
  const dispatch: any = useDispatch()
  const { laboratory } = useSelector((state: State) => state.laboratory);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response: any = await dispatch(DeletePaymentLabApi(labId || "", PaymentData._id))
      if(response === true) {
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
                    <ButtonsPaymentLab toggle={toggle} typeBtn='Supprimer' />
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
}

export default DeletePaymentLab

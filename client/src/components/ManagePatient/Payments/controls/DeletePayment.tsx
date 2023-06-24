import React, { useContext } from 'react';
import ButtonsForm from '../../../../HtmlComponents/ButtonsForm';
import { PaymentInterface, ShowPaymentsContext } from '../types';
import { Timeout } from '../../../../functions/functions';
import { DeletePaymentsApi } from '../../../../redux/payments/paymentApiCalls';
import { useDispatch } from 'react-redux';
import { ShowPatientsApi } from '../../../../redux/patients/patientApiCalls';

interface DeletePaymentInterface {
  modal: boolean,
  toggle: () => void,
  paymentData: PaymentInterface
}

const DeletePayment:React.FC<DeletePaymentInterface> = ({ modal, toggle, paymentData }) => {
  const { setShowSuccessMsg } = useContext(ShowPaymentsContext)

  const dispatch: any = useDispatch()

  const handleSubmit = async (e: any) => {
    
    e.preventDefault()
    try {
      const response = await dispatch(DeletePaymentsApi(paymentData._id)) 
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
        await dispatch(ShowPatientsApi())
      }
    } catch {}
  }

  return (
    <React.Fragment>
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
                    <ButtonsForm toggle={toggle} typeBtn='Supprimer'/>
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
}

export default DeletePayment

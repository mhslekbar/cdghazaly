import React, { useContext, useState } from 'react';
import { PaymentModeInterface, ShowPaymentModeContext } from './types';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import { useDispatch } from 'react-redux';
import { DeletePaymentModeApi } from '../../redux/paymentMode/paymentModeApiCalls';
import { Timeout, hideMsg } from '../../functions/functions';

interface props {
  modal: boolean,
  toggle: () => void,
  paymentModeData: PaymentModeInterface
}

const DeletePaymentMode: React.FC<props> = ({ modal, toggle, paymentModeData }) => {
  const [errors, setErrors] = useState<string[]>([])

  const dispatch: any = useDispatch()
  const { setShowSuccessMsg } = useContext(ShowPaymentModeContext)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response: any = await dispatch(DeletePaymentModeApi(paymentModeData._id))
      if(response === true) {
        setErrors([])
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      } else {
        setErrors(response)
      }
    } catch {}
  }

  return (
    <>
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
                    <ButtonsForm toggle={toggle} typeBtn="Supprimer"/>
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DeletePaymentMode

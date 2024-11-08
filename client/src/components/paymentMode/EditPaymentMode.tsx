import React, { useContext, useState } from 'react';
import { DataPaymentModeContext, PaymentModeInterface, ShowPaymentModeContext } from './types';
import InputsPaymentMode from './forms/InputsPaymentMode';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import { useDispatch } from 'react-redux';
import { EditPaymentModeApi } from '../../redux/paymentMode/paymentModeApiCalls';
import { Timeout } from '../../functions/functions';
import ShowErrorMsg from '../../HtmlComponents/ShowErrorMsg';

interface props {
  modal: boolean,
  toggle: () => void,
  paymentModeData: PaymentModeInterface
}

const EditPaymentMode: React.FC<props> = ({ modal, toggle, paymentModeData }) => {
  const [name, setName] = useState<string>(paymentModeData.name)
  const [code, setCode] = useState<number>(paymentModeData.code)
  const [archive, setArchive] = useState<boolean>(paymentModeData.archive)
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const dispatch: any = useDispatch()
  const { setShowSuccessMsg } = useContext(ShowPaymentModeContext)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response: any = await dispatch(EditPaymentModeApi(paymentModeData._id, { name, code }))
      if(response === true) {
        setName("")
        setCode(0)
        setArchive(false)
        setErrors([])
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      } else {
        setErrors(response)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <DataPaymentModeContext.Provider value={{
      name, setName,
      code, setCode,
      archive, setArchive
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
                    <InputsPaymentMode />
                    <ButtonsForm loading={loading} toggle={toggle} typeBtn="Modifier"/>
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataPaymentModeContext.Provider>
  );
}

export default EditPaymentMode

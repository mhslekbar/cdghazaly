import React, { useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { DataPaymentModeContext, ShowPaymentModeContext } from './types';
import InputsPaymentMode from './forms/InputsPaymentMode';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import { useDispatch } from 'react-redux';
import { AddPaymentModeApi } from '../../redux/paymentMode/paymentModeApiCalls';
import { Timeout, hideMsg } from '../../functions/functions';

const AddPaymentMode: React.FC = () => {
  const [name, setName] = useState<string>("")
  const [code, setCode] = useState<number>(0)
  const [archive, setArchive] = useState<boolean>(false)
  const [errors, setErrors] = useState<string[]>([])

  const [modal, setModal] = useState(false)
  const toggle = () => {
    setModal(!modal)
  }

  const dispatch: any = useDispatch()
  const { setShowSuccessMsg } = useContext(ShowPaymentModeContext)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response: any = await dispatch(AddPaymentModeApi({ name, code }))
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
    } catch {}
  }

  return (
    <DataPaymentModeContext.Provider value={{
      name, setName,
      code, setCode,
      archive, setArchive
    }}>
        <button className="p-2 rounded bg-main text-white" onClick={toggle}>
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
                    <InputsPaymentMode />
                    <ButtonsForm toggle={toggle} typeBtn="Ajouter"/>
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

export default AddPaymentMode

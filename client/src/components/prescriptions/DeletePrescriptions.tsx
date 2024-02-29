import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PrescriptionInterface, ShowPrescriptionContext } from './types';
import { DeletePrescriptionApi } from '../../redux/prescriptions/prescriptionApiCalls';
import { Timeout } from '../../functions/functions';
import ShowErrorMsg from '../../HtmlComponents/ShowErrorMsg';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';

export interface props {
  modal: boolean,
  toggle: () => void,
  PrescriptionData: PrescriptionInterface
}

const DeleteConsumableList:React.FC<props> = ({ modal, toggle, PrescriptionData  }) => {
  const [errors, setErrors] = useState<string[]>([])

  const { setShowSuccessMsg } = useContext(ShowPrescriptionContext)
  const dispatch: any = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await dispatch(DeletePrescriptionApi(PrescriptionData._id))
      if(response === true) {
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
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    <ButtonsForm loading={loading} typeBtn='Supprimer' toggle={toggle} />
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

export default DeleteConsumableList

import React, { useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { DataPrescriptionContext, ShowPrescriptionContext } from './types';
import { useParams } from 'react-router';
import { AddPrescriptionApi } from '../../redux/prescriptions/prescriptionApiCalls';
import { Timeout } from '../../functions/functions';
import ShowErrorMsg from '../../HtmlComponents/ShowErrorMsg';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import InputPrescription from './forms/InputPrescription';

const AddPrescription:React.FC = () => {
  const [content, setContent] = useState("")
  const [errors, setErrors] = useState<string[]>([])
  
  const [loading, setLoading] = useState(false)

  const [modal, setModal] = useState(false)
  const toggle = () => {
    setModal(!modal)
  }

  const { setShowSuccessMsg } = useContext(ShowPrescriptionContext)
  const dispatch: any = useDispatch()

  const { patientId } = useParams()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await dispatch(AddPrescriptionApi({ patient: patientId, content, }))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setContent("")
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      } else {
        setErrors(response)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <DataPrescriptionContext.Provider value={{
      content, setContent
    }}>
      <div className="flex justify-start gap-2 mt-2">
        <button className="p-2 rounded btn-main" onClick={toggle}>
          <FaPlus />
        </button>
      </div>
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
                    <InputPrescription />
                    <ButtonsForm loading={loading} typeBtn='Ajouter' toggle={toggle} />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataPrescriptionContext.Provider>
  );
}

export default AddPrescription

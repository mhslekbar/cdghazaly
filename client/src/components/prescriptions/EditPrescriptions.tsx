import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DataPrescriptionContext, PrescriptionInterface, ShowPrescriptionContext } from './types';
import { EditPrescriptionApi } from '../../redux/prescriptions/prescriptionApiCalls';
import { Timeout } from '../../functions/functions';
import ShowErrorMsg from '../../HtmlComponents/ShowErrorMsg';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import { useParams } from 'react-router';
import InputPrescription from './forms/InputPrescription';

export interface props {
  modal: boolean,
  toggle: () => void,
  PrescriptionData: PrescriptionInterface
}

const EditPrescriptionList:React.FC<props> = ({ modal, toggle, PrescriptionData  }) => {
  const [content, setContent] = useState(PrescriptionData.content)
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const { setShowSuccessMsg } = useContext(ShowPrescriptionContext)
  const dispatch: any = useDispatch()
  const { patientId } = useParams()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await dispatch(EditPrescriptionApi(PrescriptionData._id, { patient: patientId,content }))
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
                    <ButtonsForm loading={loading} typeBtn='Modifier' toggle={toggle} />
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

export default EditPrescriptionList

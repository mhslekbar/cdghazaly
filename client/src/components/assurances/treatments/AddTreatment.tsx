import React, { useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { careTypeInterface, DataTreatmentContext, defaultcareTypeInterface } from './types';
import InputsTreatment from './forms/InputsTreatment';
import { useDispatch } from 'react-redux';
import { AddTreatmentApi } from '../../../redux/treatments/treatmentApiCalls';
import { bindActionCreators } from 'redux';
import { Timeout } from '../../../functions/functions';
import { ShowTreatmentContext } from './ShowTreatAssurance';
import { useParams } from 'react-router';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import ShowErrorMsg from '../../../HtmlComponents/ShowErrorMsg';

const AddTreatment:React.FC = () => {
  const [treatment, setTreatment] = useState("")
  const [treatmentType, setTreatmentType] = useState<careTypeInterface>(defaultcareTypeInterface)
  const [price, setPrice] = useState("")

  const [modal, setModal] = useState(false)
  const [errors, setErrors] = useState<string[]>([]);

  const { setShowSuccessMsg } = useContext(ShowTreatmentContext)

  const dispatch = useDispatch()
  
  const toggle = () => {
    setModal(!modal)
  }

  const [loading, setLoading] = useState(false)

  const { AssId } = useParams()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const boundActions = bindActionCreators({ AddTreatmentApi }, dispatch)
      const response = await boundActions.AddTreatmentApi({ name: treatment, price, type: treatmentType.type, assurance: AssId })
      if(typeof response === "boolean") {
        setTreatment("")
        setPrice("")
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      } else if(Array.isArray(response)) {
        setErrors(response)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <DataTreatmentContext.Provider value={{
      treatment, setTreatment,
      treatmentType, setTreatmentType,
      price, setPrice
    }}>
      <button className="p-2 rounded bg-main text-white mt-2" onClick={toggle}>
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
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    {/* My Inputs */}
                    <InputsTreatment />
                    <ButtonsForm loading={loading} toggle={toggle} typeBtn="Ajouter" />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataTreatmentContext.Provider>
  );
}

export default AddTreatment

import React, { useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AddTreatLabApi } from "../../../redux/laboratory/treatments/labTreatApiCalls"
import { useParams } from 'react-router';
import { DataTreatLabContext } from './types';
import InputsTreatLab from './forms/InputsTreatLab';
import { Timeout } from '../../../functions/functions';
import { ShowLaboratoryContext } from '../ShowLaboratory';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import ShowErrorMsg from '../../../HtmlComponents/ShowErrorMsg';

const AddTreatLab:React.FC = () => {
  const { labId } = useParams()

  const [treatment, setTreatment] = useState<any>("")
  const [price, setPrice] = useState("")
  const [errors, setErrors] = useState<string[]>([]);
  const { setShowSuccessMsg } = useContext(ShowLaboratoryContext)
  
  const [modal, setModal] = useState(false)
  const toggle = () => {
    setModal(!modal)
  }

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const boundActions = bindActionCreators({ AddTreatLabApi }, dispatch)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await boundActions.AddTreatLabApi(labId || "", { treatment: treatment.value, price })
      if(typeof response === "boolean") {
        setTreatment("")
        setPrice("")
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
        toggle()
      } else if(Array.isArray(response)) {
        setErrors(response)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <DataTreatLabContext.Provider value={{
      treatment, setTreatment,
      price, setPrice
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
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    <InputsTreatLab />
                    <ButtonsForm loading={loading} toggle={toggle} typeBtn='Ajouter' />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataTreatLabContext.Provider>
  );
}

export default AddTreatLab

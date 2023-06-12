import React, { useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { DataTreatmentContext, careTypeInterface, defaultcareTypeInterface } from './types';
import InputsTreatment from './forms/InputsTreatment';
import ButtonsTreatment from './forms/ButtonsTreatment';
import { useDispatch } from 'react-redux';
import { AddTreatmentApi } from '../../redux/treatments/treatmentApiCalls';
import { bindActionCreators } from 'redux';
import { Timeout, hideMsg } from '../../functions/functions';
import { ShowTreatmentContext } from './ShowTreatments';

const AddTreatment:React.FC = () => {
  const [treatment, setTreatment] = useState("")
  const [price, setPrice] = useState("")
  const [modal, setModal] = useState(false)
  const [treatmentType, setTreatmentType] = useState<careTypeInterface>(defaultcareTypeInterface)
  const [errors, setErrors] = useState<string[]>([]);

  const { setShowSuccessMsg, setSelectedType } = useContext(ShowTreatmentContext)

  const dispatch = useDispatch()
  
  const toggle = () => {
    setModal(!modal)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const data = { name: treatment, price, type: treatmentType.type }
    try {
      const boundActions = bindActionCreators({ AddTreatmentApi }, dispatch)
      const response = await boundActions.AddTreatmentApi(data)
      if(typeof response === "boolean") {
        setTreatment("")
        setPrice("")
        setTreatmentType(defaultcareTypeInterface)
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
        setSelectedType(treatmentType)
      } else if(Array.isArray(response)) {
        setErrors(response)
      }
    } catch {}
  }

  return (
    <DataTreatmentContext.Provider value={{
      treatment, setTreatment,
      price, setPrice,
      treatmentType, setTreatmentType
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
                    {/* My Inputs */}
                    <InputsTreatment />
                    <ButtonsTreatment toggle={toggle} typeBtn="Ajouter" />
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

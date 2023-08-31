import React, { useContext, useEffect, useState } from 'react';
import { FaChevronCircleLeft, FaPlus } from 'react-icons/fa';
import { DataTreatmentContext, careTypeInterface, defaultcareTypeInterface } from './types';
import InputsTreatment from './forms/InputsTreatment';
import { useDispatch } from 'react-redux';
import { AddTreatmentApi } from '../../redux/treatments/treatmentApiCalls';
import { bindActionCreators } from 'redux';
import { Timeout, hideMsg } from '../../functions/functions';
import { ShowTreatmentContext } from './ShowTreatments';
import { useNavigate } from 'react-router';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';

const AddTreatment:React.FC = () => {
  const [treatment, setTreatment] = useState("")
  const [price, setPrice] = useState("")
  const [modal, setModal] = useState(false)
  const [treatmentType, setTreatmentType] = useState<careTypeInterface>(defaultcareTypeInterface)
  const [errors, setErrors] = useState<string[]>([]);

  const { setShowSuccessMsg, setSelectedType, selectedType } = useContext(ShowTreatmentContext)

  useEffect(() => {
    setTreatmentType(selectedType)
  }, [selectedType])


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
        setTreatmentType(selectedType)
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
        setSelectedType(treatmentType)
      } else if(Array.isArray(response)) {
        setErrors(response)
      }
    } catch {}
  }

  const navigate = useNavigate()

  return (
    <DataTreatmentContext.Provider value={{
      treatment, setTreatment,
      price, setPrice,
      treatmentType, setTreatmentType
    }}>
      <div className="flex justisy-start gap-2">
        <FaChevronCircleLeft style={{ fontSize: "30px" }} className="text-main" onClick={() => navigate(-1)}/>
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
                    <ButtonsForm toggle={toggle} typeBtn="Ajouter" />
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

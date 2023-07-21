import React, { useContext, useState } from 'react';
import { FaChevronCircleLeft, FaPlus } from 'react-icons/fa';
import { DefaultUserInterface, UserInterface } from '../../users/types';
import { DataConsumptionContext } from './types';
import InputsConsumptions from './forms/InputsConsumptions';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import { useDispatch } from 'react-redux';
import { AddConsumptionsApi } from '../../../redux/consumptions/consumptionApiCalls';
import { ShowConsumableContext } from '../types';
import { Timeout, hideMsg } from '../../../functions/functions';
import { useNavigate } from 'react-router';

const AddConsumption:React.FC = () => {
  const [amount, setAmount] = useState(0)
  const [note, setNote] = useState("")
  const [doctor, setDoctorId] = useState<UserInterface>(DefaultUserInterface)
  const [errors, setErrors] = useState<string[]>([])

  const [modal, setModal] = useState(false)
  const toggle = () => {
    setModal(!modal)
  }

  const { setShowSuccessMsg } = useContext(ShowConsumableContext)
  const dispatch: any = useDispatch()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await dispatch(AddConsumptionsApi({amount, note, doctor}))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setAmount(0)
        setNote("")
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      } else {
        setErrors(response)
      }
    } catch { }
  }

  const navigate = useNavigate()

  return (
    <DataConsumptionContext.Provider value={{
      amount, setAmount,
      note, setNote,
      doctor, setDoctorId
    }}>
      <div className="flex justify-start gap-2 mt-2">
        <FaChevronCircleLeft style={{ fontSize: "30px" }} className="text-main" onClick={() => navigate("/")}/>
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
                    <InputsConsumptions />
                    <ButtonsForm typeBtn='Ajouter' toggle={toggle} />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataConsumptionContext.Provider>
  );
}

export default AddConsumption

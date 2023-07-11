import React, { useContext, useState } from 'react';
import { UserInterface } from '../../users/types';
import { DataConsumptionContext, MyConsumptionsInterface } from './types';
import InputsConsumptions from './forms/InputsConsumptions';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import { useDispatch } from 'react-redux';
import { EditConsumptionsApi } from '../../../redux/consumptions/consumptionApiCalls';
import { ShowConsumableContext } from '../types';
import { Timeout, hideMsg } from '../../../functions/functions';

export interface EditConsumptionInterface {
  modal: boolean,
  toggle: () => void,
  ConsumptionData: MyConsumptionsInterface
}

const EditConsumption:React.FC<EditConsumptionInterface> = ({ modal, toggle, ConsumptionData  }) => {
  const [amount, setAmount] = useState(ConsumptionData.amount)
  const [note, setNote] = useState(ConsumptionData.note)
  const [doctor, setDoctorId] = useState<UserInterface>(ConsumptionData.doctor)
  const [errors, setErrors] = useState<string[]>([])

  const { setShowSuccessMsg } = useContext(ShowConsumableContext)
  const dispatch: any = useDispatch()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await dispatch(EditConsumptionsApi(ConsumptionData._id, {amount, note, doctor}))
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

  return (
    <DataConsumptionContext.Provider value={{
      amount, setAmount,
      note, setNote,
      doctor, setDoctorId
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
                    <ButtonsForm typeBtn='Modifier' toggle={toggle} />
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

export default EditConsumption

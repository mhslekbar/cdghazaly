import React, { useContext, useState } from 'react';
import { DataSetAppointmentContext, SetAppointmentInterface } from './types';
import ButtonsForm from '../../../../HtmlComponents/ButtonsForm';
import InputsSetAppointment from './forms/InputsSetAppointment';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { EditSetAppointApi } from '../../../../redux/setAppoint/setAppointApiCalls';
import { ConfigAppointmentContext } from '../ConfigAppointment';
import { Timeout } from '../../../../functions/functions';

interface EditSetAppointmentInterface {
  modal: boolean,
  toggle: () => void,
  setAppointmentData: SetAppointmentInterface
}

const EditSetAppointment:React.FC<EditSetAppointmentInterface> = ({ modal, toggle, setAppointmentData }) => {
  const [startTime, setStartTime] = useState(setAppointmentData.start)
  const [endTime, setEndTime] = useState(setAppointmentData.end)
  const [countSeance, setCountSeance] = useState(setAppointmentData.countSeance)
  const { doctorId } = useParams()
  const dispatch: any = useDispatch()

  const { setShowSuccessMsg } = useContext(ConfigAppointmentContext)
  
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await dispatch(EditSetAppointApi(doctorId, setAppointmentData._id, {
        start: startTime, end: endTime, partOfTime: setAppointmentData.partOfTime, countSeance
      }))

      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      }
    } catch (err) {
      console.log("err: ", err)
    }
  }

  return (
    <DataSetAppointmentContext.Provider value={{
      startTime, setStartTime,
      endTime, setEndTime,
      countSeance, setCountSeance
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
                {/* Start Modal Body */}
                <form
                  className="mt-2 sm:ml-4 sm:text-left"
                  onSubmit={handleSubmit}
                >
                  <InputsSetAppointment />
                  <ButtonsForm typeBtn='Modifier' toggle={toggle} />
                </form>
                {/* End Modal Body */}
              </div>
            </div>
          </div>
        </>
      )}
    </DataSetAppointmentContext.Provider>
  );
}

export default EditSetAppointment

import React, { useContext } from 'react';
import { DataDayOfWorkContext } from './types';
import ButtonsForm from '../../../../HtmlComponents/ButtonsForm';
import InputsDayOfWork from './forms/InputsDayOfWork';
import { useParams } from 'react-router';
import { Timeout } from '../../../../functions/functions';
import { ConfigAppointmentContext } from '../ConfigAppointment';
import { useDispatch } from 'react-redux';
import { UpdateDayOfWorkApi } from '../../../../redux/dayOfWork/dayOfWorkApiCalls';

interface AddDayOfWorkInterface {
  modal: boolean,
  toggle: () => void,
}

const AddDayOfWork:React.FC<AddDayOfWorkInterface> = ({ modal, toggle }) => {
  const { doctorId } = useParams()
  const { setShowSuccessMsg } = useContext(ConfigAppointmentContext)
  
  const { selectedDay } = useContext(DataDayOfWorkContext)
  const dispatch: any = useDispatch()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      // const response = await post(`appointment/dayOfWork/${doctorId}`, {dayOfWork: selectedDay})
      const response = await dispatch(UpdateDayOfWorkApi(doctorId, {dayOfWork: selectedDay}))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      }
    } catch (err){
      console.log("err: ", err)
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
                {/* Start Modal Body */}
                <form
                  className="mt-2 sm:ml-4 sm:text-left mt-3"
                  onSubmit={handleSubmit}
                >
                  <h3 className='text-center text-xl font-bold text-gray-700'>Jour du travail.</h3>
                  <InputsDayOfWork />
                  <ButtonsForm typeBtn="Ajouter" toggle={toggle}/>
                </form>
                {/* End Modal Body */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AddDayOfWork

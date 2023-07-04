import React, { useContext } from 'react'
import { InputElement } from '../../../../../HtmlComponents/InputElement'
import { DataSetAppointmentContext } from '../types'

const InputsSetAppointment:React.FC = () => {
  const {
    startTime, setStartTime,
    endTime, setEndTime,
    countSeance, setCountSeance
  } = useContext(DataSetAppointmentContext)
  return (
    <>
      <InputElement type='time' name="Debut" value={startTime} setValue={setStartTime} /> 
      <InputElement type='time' name="Fin" value={endTime} setValue={setEndTime} /> 
      <InputElement type='number' name="Nombre de seance" placeholder='Nombre de seance' value={countSeance} setValue={setCountSeance} /> 
    </>
  )
}

export default InputsSetAppointment

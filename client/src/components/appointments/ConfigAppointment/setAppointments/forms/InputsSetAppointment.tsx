import React, { useContext } from 'react'
import { InputElement } from '../../../../../HtmlComponents/InputElement'
import { DataSetAppointmentContext } from '../types'
import { useTranslation } from 'react-i18next'

const InputsSetAppointment:React.FC = () => {
  const {
    startTime, setStartTime,
    endTime, setEndTime,
    countSeance, setCountSeance
  } = useContext(DataSetAppointmentContext)

  const { t } = useTranslation()

  return (
    <>
      <InputElement type='time' name={t("Debut")} value={startTime} setValue={setStartTime} /> 
      <InputElement type='time' name={t("Fin")} value={endTime} setValue={setEndTime} /> 
      <InputElement type='number' name={t("Nombre de seance")} placeholder={t("Nombre de seance")} value={countSeance} setValue={setCountSeance} /> 
    </>
  )
}

export default InputsSetAppointment

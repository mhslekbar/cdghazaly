import React, { useContext, useState } from 'react'
import { BsGearFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router'
import { formattedDate } from '../../functions/functions'
import { InputElement } from '../../HtmlComponents/InputElement'
import { ShowAppointmentContext } from './types'
import { FaPrint } from 'react-icons/fa'
import { PatientLab } from '../laboratory/patients/types'
import { useTranslation } from 'react-i18next'

interface props {
  selectedPatientLab?: PatientLab
}

const HeaderAppointment:React.FC<props> = ({ selectedPatientLab }) => {
  const navigate = useNavigate()
  const { setFilterByDate } = useContext(ShowAppointmentContext)
  const { patientId } = useParams()
  const { t } = useTranslation()

  const [date, setDate] = useState<any>(formattedDate(new Date().toString()))

  return (
    <div className='mt-2 flex justify-between'>
      {!patientId && !selectedPatientLab?.consumptionLab?.patient?._id ? 
        <button className='shadow rounded bg-white text-blue-400 focus:outline-none px-2 py-2' onClick={() => window.print()}>
          <FaPrint style={{ fontSize: "22px"}} />
        </button>
        : <span></span> // because my div is set to flex and i want keep space between each button
      }
      <div className='flex items-center justify-center gap-2'>
        <InputElement type="date" value={formattedDate(date.toString())} setValue={setDate}/>
        <button 
          className="bg-main rounded p-2 cursor-pointer border hover:bg-white"
          onClick={() => setFilterByDate(date)}
        >
          {t("Filter")}</button>
      </div>
      {!patientId && !selectedPatientLab?.consumptionLab?.patient?._id ?
        <button className='shadow rounded bg-blue focus:outline-none px-2 py-2' onClick={() => navigate(`config`)}>
          <BsGearFill style={{
            fontSize: "22px"
          }} />
        </button>
      : <span></span> // because my div is set to flex and i want keep space between each button
      }
    </div>
  )
}

export default HeaderAppointment

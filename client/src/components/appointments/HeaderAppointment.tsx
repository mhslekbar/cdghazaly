import React, { useContext } from 'react'
import { BsGearFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router'
import { formattedDate } from '../../functions/functions'
import { InputElement } from '../../HtmlComponents/InputElement'
import { ShowAppointmentContext } from './types'
import { FaPrint } from 'react-icons/fa'
import { PatientLab } from '../laboratory/patients/types'

interface HeaderAppointmentInterface {
  selectedPatientLab?: PatientLab
}

const HeaderAppointment:React.FC<HeaderAppointmentInterface> = ({ selectedPatientLab }) => {
  const navigate = useNavigate()
  const { filterByDate, setFilterByDate } = useContext(ShowAppointmentContext)
  const { patientId } = useParams()
  return (
    <div className='mt-2 flex justify-between'>
      {!patientId && !selectedPatientLab?.consumptionLab?.patient?._id ? 
        <button className='shadow rounded bg-white text-blue-400 focus:outline-none px-2 py-2' onClick={() => window.print()}>
          <FaPrint style={{ fontSize: "22px"}} />
        </button>
        : <span></span> // because my div is set to flex and i want keep space between each button
      }
      <div className='flex items-center justify-center gap-2'>
        <span>Filter</span>
        <InputElement type="date" value={formattedDate(filterByDate.toString())} setValue={setFilterByDate}/>
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

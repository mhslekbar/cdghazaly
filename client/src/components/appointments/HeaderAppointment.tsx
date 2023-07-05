import React, { useContext } from 'react'
import { BsGearFill } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import { formattedDate } from '../../functions/functions'
import { InputElement } from '../../HtmlComponents/InputElement'
import { ShowAppointmentContext } from './types'
import { FaPrint } from 'react-icons/fa'

const HeaderAppointment:React.FC = () => {
  const navigate = useNavigate()
  const { filterByDate, setFilterByDate } = useContext(ShowAppointmentContext)

  return (
    <div className='mt-2 flex justify-between'>
      <button className='shadow rounded bg-white text-blue-400 focus:outline-none px-2 py-2' onClick={() => window.print()}>
        <FaPrint style={{ fontSize: "22px"}} />
      </button>
      <div className='flex items-center justify-center gap-2'>
        <span>Filter</span>
        <InputElement type="date" value={formattedDate(filterByDate.toString())} setValue={setFilterByDate}/>
      </div>
      <button className='shadow rounded bg-blue focus:outline-none px-2 py-2' onClick={() => navigate(`config`)}>
        <BsGearFill style={{
          fontSize: "22px"
        }} />
      </button>
    </div>
  )
}

export default HeaderAppointment

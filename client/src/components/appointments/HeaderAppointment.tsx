import React, { useState } from 'react'
import { BsGearFill } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import { formattedDate } from '../../functions/functions'
import { InputElement } from '../../HtmlComponents/InputElement'

const HeaderAppointment:React.FC = () => {
  const navigate = useNavigate()
  const [date, setDate] = useState(new Date())
  return (
    <div className='mt-2 flex justify-between'>
      <span></span>
      <div className='flex items-center justify-center gap-2'>
        <span>Filter</span>
        <InputElement type="date" value={formattedDate(date.toString())} setValue={setDate}/>
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

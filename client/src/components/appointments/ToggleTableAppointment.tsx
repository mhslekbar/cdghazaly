import React, { useContext } from 'react'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
import { ShowAppointmentContext } from './types'

const ToggleTableAppointment:React.FC = () => {
  const { setFilterByDate, filterByDate } = useContext(ShowAppointmentContext)
  
  const updateDate = (type: string) => {
    switch(type) {
      case "decrease": 
        setFilterByDate(new Date(filterByDate.setDate(filterByDate.getDate() - 7)))
      break
      case "increase": 
        setFilterByDate(new Date(filterByDate.setDate(filterByDate.getDate() + 7)))
      break
    }
  }

  return (
    <div className='flex justify-between m-2'>
      <FaChevronCircleLeft  className='text-main' style={{ fontSize: "24px" }} onClick={() => updateDate("decrease")}/> 
      <FaChevronCircleRight className='text-main' style={{ fontSize: "24px" }} onClick={() => updateDate("increase")}/> 
    </div>
  )
}

export default ToggleTableAppointment

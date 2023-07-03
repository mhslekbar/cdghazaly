import React, { useState } from 'react'
import AddDayOfWork from './AddDayOfWork'
import { FaChevronCircleLeft, FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router'

const ShowDayOfWork:React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const navigate = useNavigate()

  return (
    <div>
      <div className='flex justify-start gap-1'>
        <FaChevronCircleLeft
          className='text-main hover:text-white hover:bg-main hover:rounded-full' 
          style={{
            fontSize: "30px"
          }}
          onClick={() => navigate(-1)}
        />
        <button className="p-1 rounded bg-main text-white" onClick={() => setShowAddModal(!showAddModal)}>
          <FaPlus style={{ fontSize: "20px" }} />
        </button>
      </div>
      <AddDayOfWork modal={showAddModal} toggle={() => setShowAddModal(!showAddModal)}/>
      Hello From ShowDayOfWork
    </div>
  )
}

export default ShowDayOfWork

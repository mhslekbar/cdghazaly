import React from 'react'
import ShowConsumables from '../components/consumables/ShowConsumables'

const Consumables:React.FC = () => {
  return (
    <div>
      <h1 className='text-center text-4xl'>Consommables</h1>
      <ShowConsumables />
    </div>
  )
}

export default Consumables

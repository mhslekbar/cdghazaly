import React from 'react'
import ShowPermissions from '../components/permissions/ShowPermissions'

const Permissions:React.FC = () => {
  return (
    <div>
      <h1 className='text-center text-3xl mb-4'>Permissions</h1>
      <ShowPermissions />
    </div>
  )
}

export default Permissions

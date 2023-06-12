import React from 'react'
import ShowUsers from '../components/users/ShowUsers'

const Users:React.FC = () => {
  return (
    <div>
      <h1 className='text-center text-3xl'>Users</h1>
      <ShowUsers />
    </div>
  )
}

export default Users

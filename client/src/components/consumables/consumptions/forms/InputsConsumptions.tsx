import React, { useContext, useEffect, useState } from 'react'
import { InputElement } from '../../../../HtmlComponents/InputElement'
import { DataConsumptionContext } from '../types'
import { SelectElement } from '../../../../HtmlComponents/SelectElement'
import { useSelector } from 'react-redux'
import { State } from '../../../../redux/store'
import { DefaultUserInterface, UserInterface } from '../../../users/types'
import { useParams } from 'react-router'

const InputsConsumptions:React.FC = () => {
  const { 
    amount, setAmount,
    note, setNote,
    doctor, setDoctorId
  } = useContext(DataConsumptionContext)
  const { users } = useSelector((state: State) => state.users)
  const [doctors, setDoctors] = useState<UserInterface[]>([DefaultUserInterface])
  const { doctorId } = useParams()
  
  useEffect(() => {
    setDoctorId(users.find((user: UserInterface) => user._id === doctorId) || DefaultUserInterface)
  }, [users, setDoctorId, doctorId])
  
  useEffect(() => {
    setDoctors(users.filter((user: UserInterface) => user.doctor).map((user: UserInterface) => ({ ...user, name: user.username })))
  }, [users])

  const hide = true

  return (
    <>
      <InputElement name="Montant" value={amount} setValue={setAmount} />
      <InputElement name="Note" placeholder='donner une note si vous voulez.' value={note} setValue={setNote} />
      {hide && 
        <SelectElement name="Doctor" id="doctor" value={doctor} setValue={setDoctorId} defaultOption={<option data-element={JSON.stringify(DefaultUserInterface)} value={DefaultUserInterface._id}>Cabinet Centrale</option>} options={doctors} valueType={"object"} />
      }
    </>
  )
}

export default InputsConsumptions

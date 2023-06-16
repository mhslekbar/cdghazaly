import React, { useContext, useEffect, useState } from 'react'
import { InputElement } from '../../HtmlComponents/InputElement'
import { ShowPatientsContext } from './types'

const SearchPatients:React.FC = () => {
  const [RegNo, setRegNo] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  
  const { setFilterPatient } = useContext(ShowPatientsContext)

  useEffect(() => {
    setFilterPatient({ type: "RegNo", value: RegNo })
    setName("")
    setPhone("")
  }, [RegNo, setFilterPatient])

  useEffect(() => {
    setFilterPatient({ type: "name", value: name })
    setPhone("")
    setRegNo("")
  }, [name, setFilterPatient])

  useEffect(() => {
    setFilterPatient({ type: "phone", value: phone })
    setName("")
    setRegNo("")
  }, [phone, setFilterPatient])

  return (
    <div className='w-full bg-white px-6 pt-4 pb-2 mb-4 rounded border grid sm:grid-cols-1 lg:grid-cols-3 gap-2 shadow-md'>
      <InputElement
        type='number'
        // name="DOSS.NO"
        placeholder='Chercher par Doss.NO ...'
        value={RegNo}
        setValue={setRegNo}
      />
      <InputElement
        // name="Nom"
        placeholder='Chercher par nom...'
        value={name}
        setValue={setName}
      />
      <InputElement
        // name="Telephone"
        placeholder='Chercher par numero telephone...'
        value={phone}
        setValue={setPhone}
      />
    </div>
  )
}

export default SearchPatients

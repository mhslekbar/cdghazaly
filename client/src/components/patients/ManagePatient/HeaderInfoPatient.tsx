import React, { useEffect, useState } from 'react'
import { DefaultPatientInterface, PatientInterface } from '../types'
import { useNavigate, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { State } from '../../../redux/store'
import { RegNo } from '../../../functions/functions'
import { FaChevronCircleLeft } from "react-icons/fa"

const HeaderInfoPatient:React.FC = () => {
  const { patientId } = useParams()
  const { patients } = useSelector((state: State) => state.patients)
  const [patientData, setPatientData] = useState<PatientInterface>(DefaultPatientInterface)
  
  useEffect(() => {
    setPatientData(patients.find((patient: PatientInterface) => patient._id === patientId) || DefaultPatientInterface)
  }, [patients, patientId])
  
  const navigate = useNavigate();

  return (
    <>
    <header className='flex justify-between mb-2'>
      <FaChevronCircleLeft 
        className='text-main hover:text-white hover:bg-main hover:rounded-full' 
        style={{
          fontSize: "30px"
        }}
        onClick={() => navigate(-1)}
      />
      <p className='bg-main px-4 py-2 rounded shadow w-fit'>balance: {patientData.balance}</p>
    </header>
    <section className='w-full bg-white px-6 py-6 mb-4 rounded border grid sm:grid-cols-1 lg:grid-cols-3 gap-2 shadow-lg'>
      <div className='border-r border-r-2'>
        <p>DOSS.NO: <b>{RegNo(patientData.RegNo)}</b></p>
        <p>Nom: <b>{patientData.name}</b></p>
      </div>
      <div className='border-r border-r-2'>
        <p>Age: <b>{new Date().getFullYear() - new Date(patientData.dob).getFullYear()}</b></p>
        <p>Etat de santé: <b>{patientData.HealthCondition}</b></p>
      </div>
      <div>
        <p>Telephone: <b>{patientData.contact.phone}</b></p>
        <p>WhatsApp: <b>{patientData.contact.whatsApp}</b></p>
      </div>
    </section>
    </>
  )
}

export default HeaderInfoPatient

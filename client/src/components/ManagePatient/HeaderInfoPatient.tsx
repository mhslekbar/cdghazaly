import React, { useEffect, useState } from 'react'
import { DefaultPatientInterface, PatientInterface } from '../patients/types'
import { useNavigate, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { State } from '../../redux/store'
import { RegNo } from '../../functions/functions'
import { FaBirthdayCake, FaChevronCircleLeft } from "react-icons/fa"
import ControlButtons from './ControlButtons/Buttons'
import { MdOutlinePermContactCalendar } from 'react-icons/md'
import { BsPerson, BsTelephone, BsWhatsapp } from 'react-icons/bs'
import { BiHealth } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'

const HeaderInfoPatient:React.FC = () => {
  const { patientId } = useParams()
  const { patients } = useSelector((state: State) => state.patients)
  const [patientData, setPatientData] = useState<PatientInterface>(DefaultPatientInterface)
  
  useEffect(() => {
    setPatientData(patients.find((patient: PatientInterface) => patient._id === patientId) || DefaultPatientInterface)
  }, [patients, patientId])
  
  const navigate = useNavigate();
  
  const { t } = useTranslation()

  return (
    <>
    <header className='flex justify-between mb-2'>
      <FaChevronCircleLeft 
        className='text-main hover:text-white hover:bg-main hover:rounded-full' 
        style={{
          fontSize: "30px"
        }}
        onClick={() => navigate(localStorage.getItem("patientMgtPrevLink") || "")}
      />
      <p className='bg-main px-4 py-2 rounded shadow w-fit'>{t("Balance")}: <b className={`lg:text-xl ${patientData.balance < 0 ? "text-red" : "text-white" }`}>{patientData.balance}</b></p>
    </header>
    
    {/* START ControlButtons */}

    <ControlButtons />

    {/* END ControlButtons */}

    <section className='w-full bg-white mb-4 rounded border grid sm:grid-cols-1 lg:grid-cols-3 gap-2 shadow-lg'>
      <div className='border-r-2 px-6 py-6 xs:border-b lg:border-b-0 '>
        <p className='flex'>
          <MdOutlinePermContactCalendar className='text-main mr-2' style={{ fontSize: "22px" }} />
          <span>{t("DOSS.NO")}: </span>
          <b className='ml-2'>{RegNo(patientData.RegNo)}</b>
        </p>
        <p className='flex'>
          <BsPerson className='text-main mr-2' style={{ fontSize: "22px" }} />
          <span>{t("Nom")}: </span>
          <b className='ml-2'>{patientData.name}</b>
        </p>
      </div>
      <div className='border-r-2 px-6 py-6 xs:border-b lg:border-b-0 '>
        <p className='flex'>
          <FaBirthdayCake className='text-main mr-2' style={{ fontSize: "22px" }} />
          <span>{t("Age")}:</span>
          <b className='ml-2'>{new Date().getFullYear() - (patientData.dob ? new Date(patientData.dob).getFullYear() : 0)}</b>
        </p>
        <p className='flex'>
          <BiHealth className='text-main mr-2' style={{ fontSize: "22px" }} />
          <span>{t("Etat de Santé")}: </span>
          <b className='ml-2'>{patientData.HealthCondition}</b>
        </p>
      </div>
      <div className='px-6 py-6'>
        <p className='flex'>
          <BsTelephone className='text-main mr-2' style={{ fontSize: "22px" }} />
          <span>{t("Telephone")}: </span>
          <b className='ml-2'>{patientData.contact.phone}</b>
        </p>
        <p className='flex'>
          <BsWhatsapp className='text-main mr-2' style={{ fontSize: "22px" }} />
          <span>{t("WhatsApp")}: </span>
          <b className='ml-2'>{patientData.contact.whatsApp}</b>
        </p>
      </div>
    </section>
    </>
  )
}

export default HeaderInfoPatient

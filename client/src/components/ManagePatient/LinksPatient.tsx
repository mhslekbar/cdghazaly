import React, { useContext, useEffect, useState } from 'react'
import { ManagePatientContext } from './types'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { State } from '../../redux/store'
import { DefaultPatientInterface, PatientInterface } from '../patients/types'

type dataLinksType = {
  path: string, 
  title: string,
}

const dataLinks: dataLinksType[] = [
  { path: "devis", title: "Devis" },
  { path: "invoices", title: "Factures" },
  { path: "labo", title: "Labo" },
  // { path: "compte", title: "Compte" },
  { path: "payments", title: "Paiements" },
  { path: "paymentsAssurance", title: "pay Assuré" },
  { path: "soins", title: "Soins" },
  { path: "consultations", title: "Consultations" },
  { path: "fiches", title: "Fiches" },
]

const LinksPatient:React.FC = () => {
  const { setSelectedLink } = useContext(ManagePatientContext);
  const location = useLocation();
  const navigate = useNavigate()

  const changeLink = (path: string) => {
    setSelectedLink(path)
    navigate(path)
  }

  const { patientId } = useParams()
  const { patients } = useSelector((state: State) => state.patients)

  const [activePatient, setActivePatient] = useState<PatientInterface>(DefaultPatientInterface)

  useEffect(() => {
    setActivePatient(patients.find((patient: PatientInterface) => patient._id === patientId) || DefaultPatientInterface)
  }, [patients, patientId])

  const [numOfGrid, setNumOfGrid] = useState("lg:grid-cols-7")

  useEffect(() => {
    setNumOfGrid(activePatient.assurance?.society ? "lg:grid-cols-8" : "lg:grid-cols-7")
  }, [activePatient])

  return (
    <>
    <section className={`bg-white grid sm:grid-cols-1 ${numOfGrid} text-gray-700 text-center font-bold shadow-md mt-6`}>
      {dataLinks
      .filter((link: dataLinksType) => {
        return !activePatient.assurance?.society && link.path === "paymentsAssurance" ? false : true
      })
      .map((link: dataLinksType, index) => {
        return (
          <div 
            key={index}
            className={`${link.path === location.pathname.split("/")[5] ? "bg-main" : ""} border-r hover:bg-main px-6 py-3`}
            onClick={() => changeLink(link.path)}
          >
            {link.title}
          </div>
        )
      })}
    </section>
    <Outlet/>
    </>
  )
}

export default LinksPatient

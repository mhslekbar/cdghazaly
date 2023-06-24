import React, { useContext } from 'react'
import { ManagePatientContext } from './types'
import { Outlet, useLocation, useNavigate } from 'react-router'

type dataLinksType = {
  path: string, 
  title: string,
}

const dataLinks: dataLinksType[] = [
  { path: "devis", title: "Devis" },
  { path: "invoices", title: "Factures" },
  { path: "labo", title: "Labo" },
  // { path: "compte", title: "Compte" },
  { path: "payments", title: "Payments" },
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

  return (
    <>
    <section className='bg-white grid sm:grid-cols-1 lg:grid-cols-7 text-gray-700 text-center font-bold shadow-md mt-6'>
      {dataLinks.map((link: dataLinksType, index) => (
        <div 
          key={index}
          className={`${link.path === location.pathname.split("/")[5] ? "bg-main" : ""} border-r hover:bg-main px-6 py-3`}
          onClick={() => changeLink(link.path)}
        >
          {link.title}
        </div>
      ))}
    </section>
    <Outlet/>
    </>
  )
}

export default LinksPatient

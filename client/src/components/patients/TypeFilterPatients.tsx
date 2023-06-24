import React, { useContext, useEffect, useState } from 'react'
import { PatientTypePath } from '../sidebar/types'
import { useParams } from 'react-router'
import { ShowPatientsContext } from './types'

const TypeFilterPatients:React.FC = () => {
  const { ptType } = useParams()
  const [TypeFilter, setTypeFilter] = useState<any[]>([]) 
  const { selectedFilter, setSelectedFilter } = useContext(ShowPatientsContext)

  useEffect(() => {
    switch(ptType) {
      case PatientTypePath.CONSULTATION: 
        setTypeFilter([ {title: "Non Archivé", path:"notArchive"}, { title: "Archivé", path: "archive" }])
        setSelectedFilter({title: "Non Archivé", path:"notArchive"})
      break
      case PatientTypePath.CURRENT: 
        setTypeFilter([ {title: "Patients", path:"patients"}, { title: "Patients en commun", path: "ptInCommon" }])
        setSelectedFilter({title: "Patients", path:"patients"})
      break
      case PatientTypePath.FINISH: 
        setTypeFilter([ 
          { title: "Débiteur", path:"debiteur" },
          { title: "Régulariser", path: "regulariser" },
          { title: "Créancier", path: "creancier" },
        ])
        setSelectedFilter({title: "Débiteur", path:"debiteur"})
      break
    }
  }, [ptType, setSelectedFilter])

  return (
    <section className={`my-2 grid sm:grid-cols-1 lg:grid-cols-${TypeFilter.length} gap-2`}>
      {TypeFilter.map((filter: any, index) => 
      <div 
        className={`${selectedFilter.path === filter.path ? "bg-main" : ""} bg-white border rounde px-6 py-2 shadow text-center hover:bg-main font-bold`}
        onClick={() => setSelectedFilter(filter)}
        key={index}
      >
        {filter.title}
      </div>)}
    </section>
  )
}

export default TypeFilterPatients

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ShowPatientsApi } from '../../redux/patients/patientApiCalls'
import { InputElement } from '../../HtmlComponents/InputElement'
import { SelectElement } from '../../HtmlComponents/SelectElement'
import { useSelector } from 'react-redux'
import { State } from '../../redux/store'
import { PatientInterface } from '../patients/types'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import AddNewPatient from '../patients/controls/AddNewPatient'

const listTypePatient = [
  { _id: "name", name: "Nom" },
  { _id: "RegNo", name: "Matricule" },
  { _id: "phone", name: "Telephone" },
]

const SearchPatient:React.FC = () => {
  const [patient, setPatient] = useState<string>("")
  const [typePatient, setTypePatient] = useState({ _id: "name", name: "Nom" })
  const dispatch: any = useDispatch()
  const { patients } = useSelector((state: State) => state.patients)
  const [listPatient, setListPatient] = useState<PatientInterface[]>([])

  useEffect(() => {
    const fetchPatient = async () => {
      await dispatch(ShowPatientsApi())
    }
    fetchPatient()
  }, [dispatch])

  useEffect(() => {
    if(patient.length > 0) {
      switch(typePatient._id) {
        case "name": 
          setListPatient(patients.filter((pat: PatientInterface) => pat.name.toUpperCase().startsWith(patient.toUpperCase())))
        break;
        case "RegNo": 
          setListPatient(patients.filter((pat: PatientInterface) => pat?.RegNo?.toString()?.startsWith(patient)))
        break;
        case "phone": 
          setListPatient(patients.filter((pat: PatientInterface) => pat.contact.phone.startsWith(patient) || pat.contact.whatsApp.startsWith(patient)))
        break;
        default:
          setListPatient(patients.filter((pat: PatientInterface) => pat.name.toUpperCase().startsWith(patient.toUpperCase())))
      }
    } else {
      setListPatient([])
    }
  }, [patient, patients, typePatient])

  const navigate = useNavigate()
  const [showAddPatient, setShowAddPatient] = useState(false)

  return (
    <section className='mt-4 relative col-start-2'>
        <InputElement divClass='w-full' placeholder="Nom ou numero du patient" value={patient} setValue={setPatient} />
        <SelectElement
          divClass='w-full'
          value={typePatient}
          setValue={setTypePatient}
          options={listTypePatient}
          valueType= "object"
        />
        {listPatient.length > 0 && 
          <div className='absolute w-full'>
            {listPatient.slice(0, 5).map((pat: PatientInterface, index) => (<p className='bg-white hover:bg-main px-4 py-2 rounded border border-b' key={index}
              onClick={() => {
                navigate(`/patient/${pat.doctor[0]._id}/${pat._id}/Manage/devis`)
                localStorage.setItem("patientMgtPrevLink", "/")
              }}
            >{pat.name}</p>))}
          </div>
        }
        <div className='flex justify-center'>
          <button className='rounded-full bg-main p-2 text-center' style={{ borderRadius: "50%" }} onClick={() => setShowAddPatient(!showAddPatient)}>
            <FaPlus style={{ fontSize: "30px" }} />
          </button>
          <AddNewPatient modal={showAddPatient} toggle={() => setShowAddPatient(!showAddPatient)}/>
        </div>
    </section>
  )
}

export default SearchPatient

import React, { useEffect, useState } from 'react'
import DataImplants from './DataImplants'
import { useDispatch } from 'react-redux'
import { ShowImplantsApi } from '../../redux/implants/implantApiCalls'
import { useNavigate, useParams } from 'react-router'
import { FaChevronCircleLeft } from 'react-icons/fa'
import AppointmentModal from '../ManagePatient/Fiches/controls/AppointmentModal'
import { DefaultImplantInterface, ImplantInterface, ShowImplantContext } from './types'
import FinishImplants from './FinishImplants'
import SuccessMsg from '../../Messages/SuccessMsg'
import FilterTypeImplants from './FilterTypeImplants'

const ShowImplants = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [showFinishImplant, setShowFinishImplant] = useState(false)
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  const [implantData, setImplantData] = useState<ImplantInterface>(DefaultImplantInterface)
  const [typeFilterImplant, setTypeFilterImplant] = useState(false)

  const dispatch: any = useDispatch()
  const { doctorId } = useParams()

  useEffect(() => {
    const fetchApis = async () => {
      await dispatch(ShowImplantsApi(`?doctor=${doctorId}`))
    }
    fetchApis()
  }, [dispatch, doctorId])
  const navigate = useNavigate()

  return (
    <ShowImplantContext.Provider value={{
      showAppointmentModal, setShowAppointmentModal,
      implantData, setImplantData,
      showFinishImplant, setShowFinishImplant,
      showSuccessMsg, setShowSuccessMsg,
      typeFilterImplant, setTypeFilterImplant,
    }}>
      <div>
        <FaChevronCircleLeft
          className="text-main"
          style={{ fontSize: "30px" }}
          onClick={() => {
            navigate(-1);
          }}
          />
        {showSuccessMsg && (
          <SuccessMsg
            modal={showSuccessMsg}
            toggle={() => setShowSuccessMsg(!showSuccessMsg)}
          />
        )}
        <FilterTypeImplants />
        <DataImplants />
        {showFinishImplant && <FinishImplants implantData={implantData} modal={showFinishImplant} toggle={() => setShowFinishImplant(!showFinishImplant)}/>}
        {showAppointmentModal && 
          <AppointmentModal implantData={implantData} modal={showAppointmentModal} toggle={() => setShowAppointmentModal(!showAppointmentModal)} />
        }
      </div>
    </ShowImplantContext.Provider>
  )
}

export default ShowImplants
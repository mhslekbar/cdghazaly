import React, { useContext, useEffect, useState } from 'react'
import { dateIsEqualToCurrentDate } from '../../functions';
import { DayInfo } from '../../ConfigAppointment/DayOfWork/types';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { ShowAppointmentContext } from '../../types';
import { useLocation, useNavigate, useParams } from 'react-router';
import WhatsAppMsg from './WhatsAppMsg';
import { AppointmentInterface } from '../types';
import { formatDate } from '../../../../functions/functions';

interface TdCheckedAppointInterface {
  day: DayInfo;
  findDate: AppointmentInterface,
  tdTime: any
}

const TdCheckedAppoint:React.FC<TdCheckedAppointInterface> = ({ day, findDate, tdTime }) => {
  const { setShowDeleteModal, setSelectedAppointment, filterByDate } = useContext(ShowAppointmentContext);
  const [desiredDate, setDesiredDate] = useState(new Date())
  const navigate = useNavigate()
  const { doctorId } = useParams()

  useEffect(() => {
    setDesiredDate(filterByDate)
  }, [filterByDate])
  const location = useLocation()

  return (
    <td className={`${dateIsEqualToCurrentDate(day.order + 1, desiredDate)
          ? "bg-main"
          : ""
      } bg-yellow-light whitespace-nowrap py-4 border-r font-medium relative`}
      key={day.order}      
    >
      <MdRemoveCircleOutline
        onClick={() => {
          setShowDeleteModal(true);
          setSelectedAppointment(findDate);
        }}
        className="text-red absolute top-2 right-2"
        style={{ fontSize: "22px" }}
      />
      {(new Date().getDay().toString() === "0" ? 7 : new Date().getDay()) - (new Date(findDate.date).getDay().toString() === "0" ? 7 : new Date(findDate.date).getDay()) === -1 && 
        <WhatsAppMsg date={formatDate(findDate.date.toString())} time={tdTime} phone={findDate.patient.contact?.whatsApp}/> 
      } 
      <span
        className="block"
        onClick={() => {
          localStorage.setItem("patientMgtPrevLink", location.pathname)
          navigate(`/patient/${doctorId}/${findDate.patient._id}/Manage/devis`)
        }}
      >{findDate.patient.name?.slice(0, 12) ?? ""}</span>
      <span className="block">{findDate.patient.contact?.phone}</span>
      <span className="block">{tdTime}</span>
    </td>
  )
}

export default TdCheckedAppoint

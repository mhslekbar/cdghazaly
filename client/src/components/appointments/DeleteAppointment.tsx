import React, { FormEvent, useContext, useState } from 'react';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import { ShowAppointmentContext } from './types';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { DeleteAppointmentApi } from '../../redux/appointments/appointmentApiCalls';
import { Timeout } from '../../functions/functions';
import { AppointmentInterface } from './AppointmentsTable/types';
import ShowErrorMsg from '../../HtmlComponents/ShowErrorMsg';
import { ShowFicheApi } from '../../redux/fiches/ficheApiCalls';
import { useTranslation } from 'react-i18next';
import { State } from '../../redux/store';
import { useSelector } from 'react-redux';

interface DeleteAppointmentInterface {
  modal: boolean,
  toggle: () => void,
  AppointmentData: AppointmentInterface
}

const DeleteAppointment:React.FC<DeleteAppointmentInterface> = ({ modal, toggle, AppointmentData}) => {
  const { doctorId, patientId } = useParams()
  const { setShowSuccessMsg } = useContext(ShowAppointmentContext)

  const [errors, setErrors] = useState<string[]>([]);

  const dispatch: any = useDispatch()
  const [loading, setLoading] = useState(false)

  const { daysOfWork } = useSelector((state: State) => state.daysOfWork)
  const { setAppointment } = useSelector((state: State) => state.setAppointment)


  const handleSubmit = async (e: FormEvent) => {
    const limit = setAppointment.reduce((acc: number, currVal: any) => acc + currVal.countSeance, 0) * daysOfWork.dayOfWork.length

    e.preventDefault()
    setLoading(true)
    try {
      const response = await dispatch(DeleteAppointmentApi(doctorId, AppointmentData._id, `?limit=${limit}`))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
        patientId && await dispatch(ShowFicheApi(patientId));

      } else {
        setErrors(response)
      }
    } finally { 
      setLoading(false)
    }
  }

  const { t } = useTranslation()

  return (
    <div>
      {modal && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={toggle}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3">
                  {/* Start Modal Body */}
                  <form
                    className="mt-2 sm:ml-4 sm:text-left"
                    onSubmit={handleSubmit}
                  >
                    <h3 className='text-center text-xl text-black font-bold'>{t("Supprimer le rendez-vous")}</h3>
                    <ShowErrorMsg errors={errors} setErrors={setErrors}/>
                    <ButtonsForm loading={loading} typeBtn='Supprimer' toggle={toggle} />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DeleteAppointment

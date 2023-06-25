import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteLineFicheApi } from '../../../../redux/fiches/ficheApiCalls';
import { useParams } from 'react-router';
import ButtonsForm from '../../../../HtmlComponents/ButtonsForm';
import { LineFicheInterface, ShowFichesContext } from '../types';
import { Timeout } from '../../../../functions/functions';
import { ShowPatientsApi } from '../../../../redux/patients/patientApiCalls';
import { ShowPaymentsApi } from '../../../../redux/payments/paymentApiCalls';

interface DeleteLineFicheInterface {
  modal: boolean,
  toggle: () => void,
  LineFicheData: LineFicheInterface
}

const DeleteLineFiche:React.FC<DeleteLineFicheInterface> = ({ modal, toggle, LineFicheData }) => {
  const dispatch: any = useDispatch()
  const { patientId } = useParams()
  const { setShowSuccessMsg, selectedFiche } = useContext(ShowFichesContext)
  const HandlSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await dispatch(DeleteLineFicheApi(patientId, selectedFiche._id, LineFicheData._id))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
        await dispatch(ShowPatientsApi())
        await dispatch(ShowPaymentsApi(patientId))
      }
    } catch {}
  }

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
                    onSubmit={HandlSubmit}
                  >
                    <ButtonsForm typeBtn='Supprimer' toggle={toggle} />
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

export default DeleteLineFiche

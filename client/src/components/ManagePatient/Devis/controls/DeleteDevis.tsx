import React, { useContext } from 'react';
import { DevisInterface, ShowDevisInterfaceContext } from '../types';
import ButtonsForm from '../../../../HtmlComponents/ButtonsForm';
import { DeleteDevisApi } from '../../../../redux/devis/devisApiCalls';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Timeout } from '../../../../functions/functions';


interface DeleteDevisInterface {
  modal: boolean,
  toggle: () => void,
  DevisData: DevisInterface
}

const DeleteDevis:React.FC<DeleteDevisInterface> = ({ modal, toggle, DevisData}) => {
  const dispatch: any = useDispatch()
  const { patientId } = useParams()
  const { setShowSuccessMsg } = useContext(ShowDevisInterfaceContext)

  const HandleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await dispatch(DeleteDevisApi(patientId, DevisData._id))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
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
                    onSubmit={HandleSubmit}
                  >
                  {/* My Inputs */}
                  <ButtonsForm toggle={toggle} typeBtn="Supprimer" />
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

export default DeleteDevis

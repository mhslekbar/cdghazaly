import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteFicheApi } from '../../../../redux/fiches/ficheApiCalls';
import { useParams } from 'react-router';
import ButtonsForm from '../../../../HtmlComponents/ButtonsForm';
import { FicheInterface, ShowFichesContext } from '../types';
import { Timeout } from '../../../../functions/functions';

interface DeleteFicheInterface {
  modal: boolean,
  toggle: () => void,
  FicheData: FicheInterface
}

const DeleteFiche:React.FC<DeleteFicheInterface> = ({ modal, toggle, FicheData }) => {
  const dispatch: any = useDispatch()
  const { patientId } = useParams()
  const { setShowSuccessMsg } = useContext(ShowFichesContext)
  const [loading, setLoading] = useState(false)

  const HandlSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await dispatch(DeleteFicheApi(patientId, FicheData._id))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      }
    } finally {
      setLoading(false)
    }
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
                    <h3 className='text-xl'>Voulez-Vous Supprimer la Fiche Numero {FicheData.numFiche} ?</h3>
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

export default DeleteFiche

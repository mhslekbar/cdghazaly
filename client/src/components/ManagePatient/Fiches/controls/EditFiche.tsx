import React, { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { EditFicheApi } from '../../../../redux/fiches/ficheApiCalls';
import { useParams } from 'react-router';
import ButtonsForm from '../../../../HtmlComponents/ButtonsForm';
import { FicheInterface, ShowFichesContext } from '../types';
import { Timeout } from '../../../../functions/functions';

interface EditFicheInterface {
  modal: boolean,
  toggle: () => void,
  FicheData: FicheInterface
}

const EditFiche:React.FC<EditFicheInterface> = ({
  modal,
  toggle,
  FicheData
}) => {

  const dispatch: any = useDispatch()
  const { patientId } = useParams()
  const { setShowSuccessMsg } = useContext(ShowFichesContext)


  const HandlSubmit = async (e: any) => {
    e.preventDefault()
    try {
      console.log("FicheData.LineFiche: ", FicheData.LineFiche)
      const response = true
      // const response = await dispatch(EditFicheApi(patientId, FicheData._id, FicheData.LineFiche))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      }
    } catch {}
  }

  return (
    <div>
        <button className="p-2 rounded bg-main text-white" onClick={toggle}>
          <FaPlus />
        </button>
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
                    <ButtonsForm typeBtn='Modifier' toggle={toggle} />
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

export default EditFiche

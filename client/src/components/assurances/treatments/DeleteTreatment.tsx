import React, { useContext, useState } from 'react';
import { TreatmentType } from './types';
import { bindActionCreators } from 'redux';
import { DeleteTreatmentApi } from "../../../redux/treatments/treatmentApiCalls"
import { useDispatch } from 'react-redux';
import { ShowTreatmentContext } from './ShowTreatAssurance';
import { Timeout, hideMsg } from '../../../functions/functions';
import ButtonsTreatment from './forms/ButtonsTreatment';

interface DeleteTreatmentInterface {
  modal: boolean,
  toggle: () => void,
  treatmentData: TreatmentType
}

const DeleteTreatment:React.FC<DeleteTreatmentInterface> = ({ modal, toggle, treatmentData}) => {
  const dispatch = useDispatch()
  const { setShowSuccessMsg } = useContext(ShowTreatmentContext)
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const boundActions = bindActionCreators({ DeleteTreatmentApi }, dispatch)
      const response:any = await boundActions.DeleteTreatmentApi(treatmentData._id)
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      } else {
        setErrors(response)
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
                    onSubmit={handleSubmit}
                  >

                    {errors.length > 0 &&
                      errors.map((err, index) => (
                        <p
                          className="p-3 my-2 rounded bg-red text-white msg"
                          key={index}
                          onClick={(e) => hideMsg(e, errors, setErrors)}
                        >
                          {err}
                        </p>
                      ))}
                    <p>Vous etes sur de vouloir supprimer <b className='text-red'>{treatmentData.name}</b> ?</p>
                    <ButtonsTreatment toggle={toggle} typeBtn="Supprimer" />
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

export default DeleteTreatment

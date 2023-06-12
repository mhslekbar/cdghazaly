import React, { FormEvent, useContext, useState } from 'react';
import ButtonsLaboratory from './forms/ButtonsLaboratory';
import { laboratoryInterface } from './types';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DeleteLaboratoryApi } from "../../redux/laboratory/laboratoryApiCalls"
import { Timeout, hideMsg } from '../../functions/functions';
import { ShowLaboratoryContext } from './ShowLaboratory';

interface DeleteLaboratoryInterface {
  modal: boolean, 
  toggle: () => void,
  laboratory: laboratoryInterface
}

const DeleteLaboratory:React.FC<DeleteLaboratoryInterface> = ({ modal, toggle, laboratory }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { setShowSuccessMsg } = useContext(ShowLaboratoryContext)

  const dispatch = useDispatch()
  const boundAction = bindActionCreators({ DeleteLaboratoryApi }, dispatch)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await boundAction.DeleteLaboratoryApi(laboratory._id)
      if(typeof response === "boolean") {
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), Timeout);
        toggle()
      } else if(Array.isArray(response)) {
        setErrors(response);
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
                    <ButtonsLaboratory toggle={toggle} typeBtn='Supprimer' />
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

export default DeleteLaboratory

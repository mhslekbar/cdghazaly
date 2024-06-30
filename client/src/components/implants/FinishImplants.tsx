import React, { FormEvent, useContext, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { ImplantInterface, ShowImplantContext } from './types';
import { hideMsg, Timeout } from '../../functions/functions';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import { FinishImplantApi, ShowImplantsApi } from '../../redux/implants/implantApiCalls';

interface FinishImplantsInterface {
  modal: boolean,
  toggle: () => void, 
  implantData: ImplantInterface
}

const FinishImplants:React.FC<FinishImplantsInterface> = ({ modal, toggle, implantData }) => {
  const { setShowSuccessMsg } = useContext(ShowImplantContext)
  const dispatch: any = useDispatch()
  const [errors, setErrors] = useState<string[]>([])

  const { doctorId } = useParams()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await dispatch(FinishImplantApi(implantData._id)) 
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
        await dispatch(ShowImplantsApi(`?doctor=${doctorId}`))
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
                    <ButtonsForm typeBtn='Terminer' toggle={toggle} />
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

export default FinishImplants

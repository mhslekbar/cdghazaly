import React, { useContext, useState } from 'react';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import { useDispatch } from 'react-redux';
import { ShowConsumableContext } from '../types';
import { Timeout, hideMsg } from '../../../functions/functions';
import { DeleteSuppliersApi } from '../../../redux/suppliers/supplierApiCalls';
import { SupplierInterface } from './types';

export interface DeleteSupplierInterface {
  modal: boolean,
  toggle: () => void,
  SupplierData: SupplierInterface
}

const DeleteSupplier:React.FC<DeleteSupplierInterface> = ({ modal, toggle, SupplierData  }) => {
  const [errors, setErrors] = useState<string[]>([])

  const { setShowSuccessMsg } = useContext(ShowConsumableContext)
  const dispatch: any = useDispatch()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await dispatch(DeleteSuppliersApi(SupplierData._id))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      } else {
        setErrors(response)
      }
    } catch { }
  }

  return (
    <>
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
                    <ButtonsForm typeBtn='Supprimer' toggle={toggle} />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DeleteSupplier

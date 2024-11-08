import React, { useContext, useState } from 'react';
import { DataSuppliersContext, SupplierInterface } from './types';
import InputsConsumptions from './forms/InputsConsumptions';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import { useDispatch } from 'react-redux';
import { EditSuppliersApi } from '../../../redux/suppliers/supplierApiCalls';
import { ShowConsumableContext } from '../types';
import { Timeout } from '../../../functions/functions';
import ShowErrorMsg from '../../../HtmlComponents/ShowErrorMsg';

export interface EditSupplierInterface {
  modal: boolean,
  toggle: () => void,
  SupplierData: SupplierInterface
}

const EditSupplier:React.FC<EditSupplierInterface> = ({ modal, toggle, SupplierData  }) => {
  const [name, setName] = useState(SupplierData.name)
  const [phone, setPhone] = useState(SupplierData.phone)
  const [errors, setErrors] = useState<string[]>([])

  const { setShowSuccessMsg } = useContext(ShowConsumableContext)
  const dispatch: any = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await dispatch(EditSuppliersApi(SupplierData._id, {name, phone}))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setName("")
        setPhone("")
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      } else {
        setErrors(response)
      }
    } finally { 
      setLoading(false)
    }
  }

  return (
    <DataSuppliersContext.Provider value={{
      name, setName,
      phone, setPhone
    }}>
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
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    <InputsConsumptions />
                    <ButtonsForm loading={loading} typeBtn='Modifier' toggle={toggle} />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataSuppliersContext.Provider>
  );
}

export default EditSupplier

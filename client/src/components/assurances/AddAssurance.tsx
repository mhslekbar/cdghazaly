import React, {  useContext, useState } from 'react';
import { DataAssuranceContext, ShowAssurancesContext } from './types';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import InputsAssurance from './forms/InputsAssurance';
import { useDispatch } from 'react-redux';
import { AddAssuranceApi } from '../../redux/assurances/assuranceApiCalls';
import { Timeout } from '../../functions/functions';
import ShowErrorMsg from '../../HtmlComponents/ShowErrorMsg';

interface AddAssuranceInterface {
  modal: boolean,
  toggle: () => void,
}

const AddAssurance:React.FC<AddAssuranceInterface> = ({ modal, toggle }) => {
  const [name, setName] = useState("")
  const [cons_price, setConsPrice] = useState(0)
  const [color, setColor] = useState("")

  const [errors, setErrors] = useState<string[]>([])

  const [loading, setLoading] = useState(false)

  const { setShowSuccessMsg } = useContext(ShowAssurancesContext)
  const dispatch:any = useDispatch()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response: any = await dispatch(AddAssuranceApi({ name, cons_price, color }))
        if(response === true) {
          setName("")
          setConsPrice(0)
          setColor("")
          setShowSuccessMsg(true)
          setErrors([])
          toggle()
          setTimeout(() => setShowSuccessMsg(false), Timeout)
        } else {
          setErrors(response)
        }
    } finally {
      setLoading(false)
    }
  }

  return (
    <DataAssuranceContext.Provider 
      value={{
        name, setName,
        cons_price, setConsPrice,
        color, setColor
      }}
    >      
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
                    <InputsAssurance />
                    <ButtonsForm loading={loading} toggle={toggle} typeBtn='Ajouter' />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataAssuranceContext.Provider>
  );
}

export default AddAssurance

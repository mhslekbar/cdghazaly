import React, {  useContext, useState } from 'react';
import { AssuranceInterface, DataAssuranceContext, ShowAssurancesContext } from './types';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import InputsAssurance from './forms/InputsAssurance';
import { useDispatch } from 'react-redux';
import { EditAssuranceApi } from '../../redux/assurances/assuranceApiCalls';
import { Timeout } from '../../functions/functions';
import ShowErrorMsg from '../../HtmlComponents/ShowErrorMsg';

interface EditAssuranceInterface {
  modal: boolean, 
  toggle: () => void,
  AssuranceData: AssuranceInterface
}

const EditAssurance:React.FC<EditAssuranceInterface> = ({ modal, toggle, AssuranceData }) => {
  const [name, setName] = useState(AssuranceData.name)
  const [cons_price, setConsPrice] = useState(AssuranceData.cons_price)
  const [color, setColor] = useState(AssuranceData.color)

  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState<string[]>([])

  const { setShowSuccessMsg } = useContext(ShowAssurancesContext)
  const dispatch:any = useDispatch()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response: any = await dispatch(EditAssuranceApi(AssuranceData._id, { name, cons_price, color }))
        if(response === true) {
          setName("")
          setConsPrice(0)
          setColor("")
          setShowSuccessMsg(true)
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
                    <ButtonsForm loading={loading} toggle={toggle} typeBtn='Modifier' />
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

export default EditAssurance

// {/* {errors.length > 0 &&
// errors.map((err, index) => (
//   <p
//     className="p-3 my-2 rounded bg-red text-white msg"
//     key={index}
//     onClick={(e) => hideMsg(e, errors, setErrors)}
//   >
//     {err}
//   </p>
// ))} */}
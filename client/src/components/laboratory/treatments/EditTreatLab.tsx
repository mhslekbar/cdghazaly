import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EditTreatLabApi } from "../../../redux/laboratory/treatments/labTreatApiCalls"
import { useParams } from 'react-router';
import { DataTreatLabContext, TreatmentLabInterface } from './types';
import InputsTreatLab from './forms/InputsTreatLab';
import ButtonsTreatLab from './forms/ButtonsTreatLab';
import { Timeout, hideMsg } from '../../../functions/functions';
import { ShowLaboratoryContext } from '../ShowLaboratory';

interface EditTreatLabInterface {
  modal: boolean,
  toggle: () => void,
  TreatmentData: TreatmentLabInterface
}

const EditTreatLab:React.FC<EditTreatLabInterface> = ({ modal, toggle, TreatmentData }) => {
  const { labId } = useParams()

  const [treatment, setTreatment] = useState<any>({value: TreatmentData.treatment._id, label: TreatmentData.treatment.name})
  const [price, setPrice] = useState(TreatmentData.price)
  const [errors, setErrors] = useState<string[]>([]);
  const { setShowSuccessMsg } = useContext(ShowLaboratoryContext)
  
  const dispatch = useDispatch()
  const boundActions = bindActionCreators({ EditTreatLabApi }, dispatch)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await boundActions.EditTreatLabApi(labId || "", TreatmentData._id, { treatment: treatment.value, price })
      if(typeof response === "boolean") {
        setTreatment("")
        setPrice("")
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
        toggle()
      } else if(Array.isArray(response)) {
        setErrors(response)
      }
    } catch {}
  }

  return (
    <DataTreatLabContext.Provider value={{
      treatment, setTreatment,
      price, setPrice
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
                    <InputsTreatLab />
                    <ButtonsTreatLab toggle={toggle} typeBtn='Modifier' />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataTreatLabContext.Provider>
  );
}

export default EditTreatLab

import React, { useContext, useEffect, useState } from 'react';
import ButtonsForm from '../../../../HtmlComponents/ButtonsForm';
import { DataDevisContext, DefaultLineDevisType, DevisInterface, EnumTypeModal, LineDevisType, ShowDevisInterfaceContext } from '../types';
import InputsDevis from '../forms/InputsDevis';
import { DefaultTreatmentType, TreatmentType } from '../../../treatments/types';
import DataLineDevis from './DataLineDevis';
import { DefaultUserInterface, UserInterface } from '../../../users/types';
import { useSelector } from 'react-redux';
import { State } from '../../../../redux/store';
import { useParams } from 'react-router';
import { EditDevisApi } from '../../../../redux/devis/devisApiCalls';
import { useDispatch } from 'react-redux';
import { Timeout, hideMsg } from '../../../../functions/functions';
import { UserData } from '../../../../requestMethods';

type EditDevisType = {
  modal: boolean, 
  toggle: () => void,
  DevisData: DevisInterface
}

const EditDevis:React.FC<EditDevisType> = ({ modal, toggle, DevisData }) => {
  const [doctor, setDoctor] = useState<UserInterface>(DefaultUserInterface)
  const [ArrayDoctor, setArrayDoctor] = useState<UserInterface[]>([DefaultUserInterface])
  const [price, setPrice] = useState(0)
  const [treat, setTreat] = useState("")
  const [reduce, setReduce] = useState(DevisData.reduce?.toString())
  const [selectedTreat, setSelectedTreat] = useState<TreatmentType>(DefaultTreatmentType)
  const [LineDevis, setLineDevis] = useState<LineDevisType[]>(DevisData.LineDevis)

  const [selectedTeeth, setSelectedTeeth] = useState<string[]>([])
  const [selectedSurface, setSelectedSurface] = useState<string>("")

  const [TeethBoardData, setTeethBoardData] = useState<LineDevisType>(DefaultLineDevisType)
  const [TypeTeethBoard, setTypeTeethBoard] = useState("");
  const [TypeModal, setTypeModal] = useState<EnumTypeModal>(EnumTypeModal.EDIT_DEVIS_MODAL);
  const [errors, setErrors] = useState<string[]>([])

  const { users } = useSelector((state: State) => state.users)
  
  const { patientId } = useParams()
  const { setShowSuccessMsg , selectedDevis} = useContext(ShowDevisInterfaceContext)
  const dispatch: any = useDispatch()

  useEffect(() => {
    setArrayDoctor(users.filter((user: UserInterface) => user.doctor?.cabinet))
  }, [users])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await dispatch(EditDevisApi(patientId, DevisData._id, { user: UserData()._id, reduce }))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
        setLineDevis([])
        setReduce("")
      } else {
        setErrors(response)
      }
    } catch {}

  }

  return (
    <DataDevisContext.Provider value={{
      doctor, setDoctor,
      treat, setTreat,
      reduce, setReduce,
      selectedTeeth, setSelectedTeeth,
      selectedTreat, setSelectedTreat,
      price, setPrice,
      LineDevis, setLineDevis,
      selectedSurface, setSelectedSurface,
      ArrayDoctor, setArrayDoctor,
      TeethBoardData, setTeethBoardData,
      TypeTeethBoard, setTypeTeethBoard,
      TypeModal, setTypeModal
    }}>
      {modal && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={toggle}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg" style={{
                minWidth: "800px"
              }}>
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
                    <InputsDevis />
                    {LineDevis.length > 0 && 
                      <DataLineDevis LineDevis={selectedDevis.LineDevis} setLineDevis={setLineDevis} />
                    }
                    <ButtonsForm toggle={toggle} typeBtn='Modifier' />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataDevisContext.Provider>
  );
}


export default EditDevis

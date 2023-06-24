import React, { useContext, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ButtonsForm from '../../../../HtmlComponents/ButtonsForm';
import { DataDevisContext, DefaultLineDevisType, EnumTypeModal, LineDevisType, ShowDevisInterfaceContext } from '../types';
import InputsDevis from '../forms/InputsDevis';
import { DefaultTreatmentType, TreatmentType } from '../../../treatments/types';
import DataLineDevis from './DataLineDevis';
import { DefaultUserInterface, UserInterface } from '../../../users/types';
import { useSelector } from 'react-redux';
import { State } from '../../../../redux/store';
import { useParams } from 'react-router';
import { UserData } from '../../../../requestMethods';
import { AddDevisApi } from '../../../../redux/devis/devisApiCalls';
import { useDispatch } from 'react-redux';
import { Timeout, hideMsg } from '../../../../functions/functions';


const AddNewDevis:React.FC = () => {
  const [doctor, setDoctor] = useState<UserInterface>(DefaultUserInterface)
  const [ArrayDoctor, setArrayDoctor] = useState<UserInterface[]>([DefaultUserInterface])
  const [price, setPrice] = useState(0)
  const [treat, setTreat] = useState("")
  const [reduce, setReduce] = useState("")
  const [selectedTreat, setSelectedTreat] = useState<TreatmentType>(DefaultTreatmentType)
  const [LineDevis, setLineDevis] = useState<LineDevisType[]>([])

  const [selectedTeeth, setSelectedTeeth] = useState<string[]>([])
  const [selectedSurface, setSelectedSurface] = useState<string>("")
  const [TeethBoardData, setTeethBoardData] = useState<LineDevisType>(DefaultLineDevisType)
  const [TypeTeethBoard, setTypeTeethBoard] = useState("");
  const [TypeModal, setTypeModal] = useState<EnumTypeModal>(EnumTypeModal.ADD_DEVIS_MODAL);

  const { users } = useSelector((state: State) => state.users)
  
  const { patientId } = useParams()
  const { setShowSuccessMsg } = useContext(ShowDevisInterfaceContext)

  useEffect(() => {
    setArrayDoctor(users.filter((user: UserInterface) => user.doctor?.cabinet))
  }, [users])

  const [modal, setModal] = useState(false)
  const toggle = () => {
    setModal(!modal)
  }
  const dispatch: any = useDispatch()
  const [errors, setErrors] = useState<string[]>([])
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(LineDevis.length > 0) {
      try {
        const response = await dispatch(AddDevisApi(patientId, {
          user: UserData()._id, reduce, LineDevis
        }))
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
    } else {
      setErrors(["Ajouter un traitment pour creer un devis"])
    }

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
        <button className="p-2 rounded bg-main text-white h-fit" onClick={toggle}>
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
                      <DataLineDevis LineDevis={LineDevis} setLineDevis={setLineDevis} />
                    }
                    <ButtonsForm toggle={toggle} typeBtn='Ajouter' />
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

export default AddNewDevis

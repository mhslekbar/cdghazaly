import React, { useContext, useEffect, useState } from 'react';
import ButtonsDevis from '../../../../HtmlComponents/ButtonsDevis';
import Mouth from './Mouth';
import ChildMouth from './ChildMouth';
import { DataDevisContext, DefaultLineDevisType, DevisInterface, EnumTypeModal, EnumTypeTeethBoard, LineDevisType, ShowDevisInterfaceContext } from '../types';
import { InputElement } from '../../../../HtmlComponents/InputElement';
import { SelectElement } from '../../../../HtmlComponents/SelectElement';
import { UserData } from '../../../../requestMethods';
import { useDispatch } from 'react-redux';
import { AppendDevisApi, editLineDevisApi } from '../../../../redux/devis/devisApiCalls';
import { useParams } from 'react-router';
import { ShowFichesContext } from '../../Fiches/types';
import { AppendFicheApi } from '../../../../redux/fiches/ficheApiCalls';
import { ShowPatientsApi } from '../../../../redux/patients/patientApiCalls';
import { ShowPaymentsApi } from '../../../../redux/payments/paymentApiCalls';
import { Timeout } from '../../../../functions/functions';
import { DefaultLaboratoryInterface, laboratoryInterface } from '../../../laboratory/types';
import { State } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { ShowLaboratoryApi } from '../../../../redux/laboratory/laboratoryApiCalls';

interface TeethBoardInterface {
  modal: boolean,
  toggle: () => void,
}

const TeethBoard:React.FC<TeethBoardInterface> = ({ modal, toggle }) => {
  const { 
    selectedTeeth, setSelectedTeeth, selectedTreat, setSelectedTreat, price, setPrice, setLineDevis, 
    LineDevis, setSelectedSurface, selectedSurface, doctor,
    setDoctor, ArrayDoctor, TeethBoardData, TypeTeethBoard, TypeModal } = useContext(DataDevisContext)
  
  const { selectedDevis, setIsShowingAllDevis, setShowSuccessMsg } = useContext(ShowDevisInterfaceContext)
  
  const dispatch: any = useDispatch()
  const { doctorId, patientId } = useParams()
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if(TypeTeethBoard === EnumTypeTeethBoard.EDIT_NEW_TEETH) {
      setSelectedSurface(TeethBoardData.teeth.surface)
      setSelectedTreat(TeethBoardData.treatment)
      setSelectedTeeth(TeethBoardData.teeth.nums)
      setDoctor(TeethBoardData.doctor)
    } 
    if(TypeTeethBoard === EnumTypeTeethBoard.APPEND_TEETH_FICHE) {
      setSelectedTeeth([])
      setSelectedSurface("")
    }
    // eslint-disable-next-line
  }, [TeethBoardData, TypeTeethBoard])

  useEffect(() => {
    // TypeTeethBoard !== EnumTypeTeethBoard.APPEND_TEETH_FICHE && setPrice(Number(selectedTreat.price))
    // TypeTeethBoard !== EnumTypeTeethBoard.EDIT_TEETH_FICHE && setPrice(Number(selectedTreat.price))
    if(TypeTeethBoard !== EnumTypeTeethBoard.EDIT_TEETH_FICHE && TypeTeethBoard !== EnumTypeTeethBoard.APPEND_TEETH_FICHE) {
      setPrice(Number(selectedTreat.price))
    }
  }, [selectedTreat, setPrice, TypeTeethBoard])

  useEffect(() => {
    const doctorData = UserData().doctor.cabinet
    setDoctor(doctorData ? UserData() : ArrayDoctor.find(doctor => doctor._id === doctorId))
   }, [doctorId, setDoctor, ArrayDoctor])

  const { selectedLineFiche, selectedFiche } = useContext(ShowFichesContext);

  const [MyLaboratory, setMyLaboratory] = useState<laboratoryInterface>(DefaultLaboratoryInterface)
  
  const { laboratory } = useSelector((state: State) => state.laboratory)
  const [filteredLabo, setFilteredLabo] = useState<laboratoryInterface[]>([DefaultLaboratoryInterface])

  useEffect(() => {
    const fetchLab = async () => {
      await dispatch(ShowLaboratoryApi())
    }
    fetchLab()
  }, [dispatch])

  useEffect(() => {
    if(TypeTeethBoard === EnumTypeTeethBoard.APPEND_TEETH_FICHE) {
      const filteredLaboratories = laboratory.filter((labo) => labo.treatments?.some((treat: any) => treat.treatment._id === selectedTreat._id));
      setFilteredLabo(filteredLaboratories.length > 0 ? filteredLaboratories : [DefaultLaboratoryInterface])
    }
  }, [laboratory, TypeTeethBoard, selectedTreat])

  useEffect(() => {
    setMyLaboratory(filteredLabo[0] ?? DefaultLaboratoryInterface)
  }, [filteredLabo])

  const { devis } = useSelector((state: State) => state.devis)
  useEffect(() => {
    if(TypeModal === EnumTypeModal.ADD_DEVIS_MODAL) {
      setLineDevis([])
    } else {
      setLineDevis(devis.find((dev: DevisInterface) => dev._id === selectedDevis._id)?.LineDevis || [DefaultLineDevisType])
    }
  }, [devis, selectedDevis, setLineDevis, TypeModal])

  const handleAppendTreatToTable = async (e: any) => {
    const TeethBoardErrors = []
    if(selectedTeeth.length === 0) {
      TeethBoardErrors.push("Selectionner les dents !!")
    }
    if(selectedTreat.type === "conservative" && selectedSurface.length === 0) {
      TeethBoardErrors.push("Donner la surface")
    }
    
    if(TeethBoardErrors.length === 0) {
      e.preventDefault()
      toggle();
      const data: LineDevisType = {
        doctor,
        treatment: selectedTreat,
        price,
        teeth: {
          nums: selectedTeeth,
          surface: selectedSurface
        }
      }

      const findIndex = LineDevis.findIndex((ln: LineDevisType) => ln.doctor._id === doctor._id && ln.treatment._id === selectedTreat._id)

      if(TypeTeethBoard === EnumTypeTeethBoard.ADD_NEW_TEETH) {
        if(findIndex === -1) {
          setLineDevis([...LineDevis, data])
        } else {
          const Line: LineDevisType = LineDevis[findIndex]
          Line.doctor = doctor
          Line.treatment = selectedTreat
          Line.price = Number(price)
          const newTeeth = Line.teeth.nums.concat(selectedTeeth)
          Line.teeth = {
            nums: newTeeth.sort((a: string, b: string) => a.localeCompare(b)),
            surface: Line.teeth.surface.concat(selectedSurface)
          }
          setLineDevis(LineDevis)
        }
      } else if(TypeTeethBoard === EnumTypeTeethBoard.EDIT_NEW_TEETH) {
        // const findIndex = LineDevis.findIndex((ln: LineDevisType) => ln.treatment._id === selectedTreat._id)
        const Line: LineDevisType = {...LineDevis[findIndex]}
        Object.assign(Line, {
          doctor,
          treatment: selectedTreat,
          price: Number(price),
          teeth: {
            // nums: Object.assign(Line.teeth, selectedTeeth),
            nums: selectedTeeth ? [...selectedTeeth].sort((a: string, b: string) => a.localeCompare(b)) : [],
            surface: selectedSurface
          }
        })

        if(TypeModal === EnumTypeModal.EDIT_DEVIS_MODAL) {
          setLoading(true)
          try {
            await dispatch(editLineDevisApi(patientId, selectedDevis._id, Line._id, Line))
          } finally {
            setLoading(false)
          }
        } else {
          LineDevis[findIndex] = Line
          setLineDevis(LineDevis)
        }
      } else if(TypeTeethBoard === EnumTypeTeethBoard.APPEND_TEETH) {
        // Add it into data base
        setLoading(true)
        try {
          await dispatch(AppendDevisApi(patientId, selectedDevis._id, data))
        } finally {
          setLoading(false)
        }
      } else if(TypeTeethBoard === EnumTypeTeethBoard.APPEND_TEETH_FICHE || TypeTeethBoard === EnumTypeTeethBoard.EDIT_TEETH_FICHE) { 
        const data = {
          user: UserData()._id,
          doctor,
          treatment: selectedTreat._id,
          acte: selectedTreat.name + "( " + selectedTeeth + " )",
          price,
          teeth: {
            nums: selectedTeeth,
            surface: selectedSurface
          },
          dateAppointment: selectedLineFiche.dateAppointment, // "2023-06-24T01:04:43.635+00:00" 
          devis: selectedDevis._id,
          lineFicheId: selectedLineFiche._id,
          laboratory: MyLaboratory._id
        }
        setLoading(true)
        try {
          const response = await dispatch(AppendFicheApi(patientId, selectedFiche._id, data))
          if(response === true) {
            await dispatch(ShowPatientsApi())
            await dispatch(ShowPaymentsApi(`?patient=${patientId}`))
            setIsShowingAllDevis(false)
            setShowSuccessMsg(true)
            setTimeout(() => {
              setShowSuccessMsg(false)
            }, Timeout)
          }
        } finally {
          setLoading(false)
        }

      }
    }
  }

  const [showChildMouth, setShowChildMouth] = useState(false)
  
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
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg" style={{
                minWidth: "800px"
              }}>
                <p className='my-4 text-center text-gray-700 text-xl font-bold'>{selectedTreat.name}</p>
                <div className="grid grid-cols-2">
                  <section>
                    <div className='w-1/2'>
                      <InputElement type='number' name="Prix" value={price} setValue={setPrice} /> 
                    </div>
                    <p>Dents: {selectedTeeth.map((tooth: any, index) => tooth + (index < selectedTeeth.length - 1 ? ", " : ""))}</p>
                    {selectedTreat.type === "conservative" && 
                      <div className='w-1/2'>
                        <InputElement type='text' name="surface" value={selectedSurface} setValue={setSelectedSurface} /> 
                      </div>
                    }
                    <p>Qty: {selectedTeeth.length}</p>
                    <div className='w-1/2'>
                      <SelectElement valueType="object" id="doctor" value={doctor} setValue={setDoctor} options={ArrayDoctor.map((option: any) => ({...option, name: option.username}))} />
                      {
                        selectedTreat.type === "prothese" &&
                        TypeTeethBoard === EnumTypeTeethBoard.APPEND_TEETH_FICHE &&
                        <SelectElement showPrice={true} valueType="object" id="laboratory" value={MyLaboratory} setValue={setMyLaboratory} options={filteredLabo.map((option: any) => ({...option, name: option.name}))} />
                      }
                    </div>
                    <span className="shadow p-2 rounded bg-blue mt-2" onClick={() => setShowChildMouth(!showChildMouth)}>Dents Pediatre</span>
                    {/* <span >sniper</span> */}
                    {showChildMouth && <ChildMouth />}
                  </section>
                  <section className='text-end'>
                    <Mouth />
                    <ButtonsDevis loading={loading} toggle={toggle} onClick={handleAppendTreatToTable} typeBtn='Ajouter'/>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TeethBoard

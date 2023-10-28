import React, { useContext, useEffect, useState } from 'react';
import { LineFicheInterface, ShowFichesContext, compareByDateAppointment } from './types';
import { InputFiche } from './controls/InputFiche';
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdRemoveCircle } from 'react-icons/md';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import TeethBoard from '../Devis/controls/TeethBoard';
import { DataDevisContext, DefaultLineDevisType, EnumTypeTeethBoard, LineDevisType, ShowDevisInterfaceContext } from '../Devis/types';
import { UserInterface } from '../../users/types';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { useTranslation } from 'react-i18next';
import { CiCircleRemove } from 'react-icons/ci';

interface props {
  Line: LineFicheInterface;
  modal: boolean;
  toggle: () => void;
  myIndex: number
}

const DataLineFiche: React.FC<props> = ({ Line, toggle, myIndex }) => {
  const { setSelectedLineDevis, setSelectedLineFiche, selectedLineDevis, selectedFiche, showDeleteLineFiche, setShowDeleteLineFiche, setShowAppointmentModal, showDeleteAppointmentModal, setShowDeleteAppointmentModal } = useContext(ShowFichesContext);
  const [firstEmptyDateIndex, setFirstEmptyDateIndex] = useState(-1);

  
  useEffect(() => {
    const emptyDateIndex = selectedFiche.LineFiche?.slice()?.sort(compareByDateAppointment)?.findIndex((line) => !line.dateAppointment);
    setFirstEmptyDateIndex(emptyDateIndex);
  }, [selectedFiche]);

  const [dateModal, setDateModal] = useState(true)
  const [showTeethBoard, setShowTeethBoard] = useState(false)
  const { setSelectedTeeth, setSelectedSurface, setPrice, setTreat, setSelectedTreat, setArrayDoctor, setDoctor, setTypeTeethBoard } = useContext(DataDevisContext)
  const { setSelectedDevis } = useContext(ShowDevisInterfaceContext)

  const { users } = useSelector((state: State) => state.users);

  useEffect(() => {
    setArrayDoctor(users.filter((user: UserInterface) => user.doctor?.cabinet));
  }, [users, setArrayDoctor]);

  const setChangeLine = (line: LineFicheInterface) => {
    setTypeTeethBoard(EnumTypeTeethBoard.EDIT_TEETH_FICHE)

    setSelectedLineDevis(line.lineInvoice?.devis?.LineDevis?.find((lineDv: LineDevisType) => 
      lineDv.treatment.toString() === line.lineInvoice?.treatment?._id) 
      ?? DefaultLineDevisType)
    setShowTeethBoard(!showTeethBoard)
    // teethBoard
    setSelectedTeeth(line.lineInvoice?.teeth?.nums)
    setSelectedSurface(line.lineInvoice?.teeth?.surface)
    // setPrice(line.amount)
    setPrice(line.amount / line.lineInvoice?.teeth?.nums.length)
    setTreat(line.lineInvoice?.treatment?._id)
    setSelectedTreat(line.lineInvoice?.treatment)
    setSelectedDevis(line.lineInvoice?.devis)
    setDoctor(line.doctor)
  }
  const { t } = useTranslation()
  return (
    <>
    
      {showTeethBoard && selectedLineDevis && (
        <TeethBoard
          modal={showTeethBoard}
          toggle={() => setShowTeethBoard(!showTeethBoard)}
        />
      )}

    <tr className="border border-black">
      <td className='hidden'>
        <InputFiche type="hidden" Line={Line} kind="lineFicheId" />
      </td>
      <td className="whitespace-nowrap border-r border-black bg-white font-medium w-6 relative print:static">
        {firstEmptyDateIndex > myIndex &&  (
          <>
            {/* disabled={Line.appointment ? true : false} */}
            <InputFiche type="date" Line={Line} kind="date" />
            {Line.appointment && <CiCircleRemove onClick={() => {
              setShowDeleteAppointmentModal(!showDeleteAppointmentModal)
              setSelectedLineFiche(Line)
            }} className='absolute top-3 right-2 text-red hidden' style={{ fontSize: "22px" }} /> }
          </>
        )
        }
        {/* && !Line.appointment */}
        {(firstEmptyDateIndex === myIndex ) && (<>
          {dateModal ? 
            <>
              <BiChevronDown onClick={() => setDateModal(!dateModal)} className='absolute top-0 right-0 text-white' style={{ fontSize: "22px" }} />
              <button type='button' className='bg-blue-400 text-white px-4 py-2 rounded border w-full print:hidden ' onClick={() => setShowAppointmentModal(true)}>{t("RDV")}</button>
            </>
            : 
            <>
              <BiChevronUp onClick={() => setDateModal(!dateModal)} className='absolute top-0 right-0 bg-blue z-10' style={{ borderRadius: "50%", fontSize: "22px" }} />
              {/* disabled={Line.appointment ? true : false} */}
              <InputFiche type="date" Line={Line} kind="date" />
            </>
          }
        </>)
        }
      </td>
      <td className="whitespace-nowrap border-r border-black bg-white font-medium relative print:static">
        <InputFiche
          className="disabled:bg-white pr-9"
          disabled={Line.finish === 1 && true}
          Line={Line}
          kind="acte"
        />
        {((firstEmptyDateIndex === myIndex && Line.dateAppointment) || (firstEmptyDateIndex > myIndex && !Line.acte)) ? (
          <FaEye
            className="hover:text-main print:hidden"
            style={{
              fontSize: "22px",
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
            onClick={() => {
              toggle();
              setSelectedLineFiche(Line);
            }}
          />
        ) :
        Line?.lineInvoice?.treatment.name &&
        firstEmptyDateIndex > myIndex && <>
          <FaEdit
            className="text-blue hover:text-main print:hidden"
            style={{
              fontSize: "22px",
              position: "absolute",
              top: "10px",
              right: "65px",
            }}
            onClick={() => {
              toggle();
              setSelectedLineFiche(Line);
            }}
          />
          <FaEye
            className="text-main print:hidden"
            style={{
              fontSize: "22px",
              position: "absolute",
              top: "10px",
              right: "35px",
            }}
            onClick={() => {
              setChangeLine(Line)
              setSelectedLineFiche(Line);
              // toggle();
              // setShowTeethBoard(!showTeethBoard)
            }}
          />
          <MdRemoveCircle
            className="text-red hover:text-main print:hidden"
            style={{
              fontSize: "22px",
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
            onClick={() => {
              setShowDeleteLineFiche(!showDeleteLineFiche)
              setSelectedLineFiche(Line);
            }}
          />
        </>} 
      </td>
      <td className={`whitespace-nowrap border-r border-black bg-white w-9 font-medium`}>
        <InputFiche
          disabled={Line.finish === 1 && true}
          className={`${Line.finish === 1 ? "bg-main text-white print:bg-white print:text-black" : ""} text-center font-bold`}
          Line={Line}
          kind="amount"
        />
      </td>
      <td className="bg-white w-3 print:hidden"></td>
    </tr>
  </>
  );
};

export default DataLineFiche;

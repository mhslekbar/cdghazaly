import React, { useContext, useEffect, useState } from 'react';
import { LineFicheInterface, ShowFichesContext } from './types';
import { InputFiche } from './controls/InputFiche';
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdRemoveCircle } from 'react-icons/md';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';


interface DataLineFicheInterface {
  Line: LineFicheInterface;
  modal: boolean;
  toggle: () => void;
  myIndex: number
}

const DataLineFiche: React.FC<DataLineFicheInterface> = ({ Line, toggle, myIndex }) => {
  const { setSelectedLineFiche, selectedFiche, showDeleteLineFiche, setShowDeleteLineFiche, setShowAppointmentModal } = useContext(ShowFichesContext);
  const [firstEmptyDateIndex, setFirstEmptyDateIndex] = useState(-1);

  useEffect(() => {
    const emptyDateIndex = selectedFiche.LineFiche.findIndex((line) => !line.dateAppointment);
    setFirstEmptyDateIndex(emptyDateIndex);
  }, [selectedFiche]);

  const [dateModal, setDateModal] = useState(true)

  return (
    <tr className="border-b border-[#95a5a6]">
      <td className='hidden'>
        <InputFiche type="hidden" Line={Line} kind="lineFicheId" />
      </td>
      <td className="whitespace-nowrap border-r border-[#95a5a6] bg-white font-medium w-6 relative">
        {firstEmptyDateIndex > myIndex &&  (
          <InputFiche type="date" Line={Line} kind="date" />
        )
        }
        {firstEmptyDateIndex === myIndex && !Line.appointment &&  (<>
          {dateModal ? 
            <>
              <BiChevronDown onClick={() => setDateModal(!dateModal)} className='absolute top-0 right-0 text-white' style={{ fontSize: "22px" }} />
              <button type='button' className='bg-blue-400 text-white px-4 py-2 rounded border w-full' onClick={() => setShowAppointmentModal(true)}>RDV</button>
            </>
            : 
            <>
              <BiChevronUp onClick={() => setDateModal(!dateModal)} className='absolute top-0 right-0 bg-blue' style={{ borderRadius: "50%", fontSize: "22px" }} />
              <InputFiche type="date" Line={Line} kind="date" />
            </>
          }
        </>)
        }
      </td>
      <td className="whitespace-nowrap border-r border-[#95a5a6] bg-white font-medium relative">
        <InputFiche
          className="disabled:bg-white pr-9"
          disabled={Line.finish === 1 && true}
          Line={Line}
          kind="acte"
        />
        {((firstEmptyDateIndex === myIndex && Line.dateAppointment) || (firstEmptyDateIndex > myIndex && !Line.acte)) ? (
          <FaEye
            className="hover:text-main"
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
        firstEmptyDateIndex > myIndex && <>
          <FaEdit
            className="text-blue hover:text-main"
            style={{
              fontSize: "22px",
              position: "absolute",
              top: "10px",
              right: "35px",
            }}
            onClick={() => {
              toggle();
              setSelectedLineFiche(Line);
            }}
          />
          <MdRemoveCircle
            className="text-red hover:text-main"
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
      <td className={`whitespace-nowrap border-r border-[#95a5a6] bg-white w-9 font-medium`}>
        <InputFiche
          disabled={Line.finish === 1 && true}
          className={`${Line.finish === 1 ? "bg-main text-white" : ""} text-center font-bold`}
          Line={Line}
          kind="amount"
        />
      </td>
      <td className="bg-white w-3 print:hidden"></td>
    </tr>
  );
};

export default DataLineFiche;

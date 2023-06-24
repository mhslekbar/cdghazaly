import React, { useContext, useEffect, useState } from 'react';
import { LineFicheInterface, ShowFichesContext } from './types';
import { InputFiche } from './controls/InputFiche';
import { FaEye } from 'react-icons/fa';

interface DataLineFicheInterface {
  Line: LineFicheInterface;
  modal: boolean;
  toggle: () => void;
  myIndex: number
}

const DataLineFiche: React.FC<DataLineFicheInterface> = ({ Line, toggle, myIndex }) => {
  const { setSelectedLineFiche, selectedFiche } = useContext(ShowFichesContext);
  const [firstEmptyDateIndex, setFirstEmptyDateIndex] = useState(-1);

  useEffect(() => {
    const emptyDateIndex = selectedFiche.LineFiche.findIndex((line) => !line.dateAppointment);
    setFirstEmptyDateIndex(emptyDateIndex);
  }, [selectedFiche]);


  return (
    <tr className="border-b border-[#95a5a6]">
      <td className="whitespace-nowrap border-r border-[#95a5a6] bg-white font-medium w-6">        
        {firstEmptyDateIndex === myIndex ? (
          <InputFiche type="date" Line={Line} kind="date" />
        ) : (
          <span>{Line.dateAppointment}</span>
        )}
      </td>
      <td className="whitespace-nowrap border-r border-[#95a5a6] bg-white font-medium relative">
        <InputFiche
          className="disabled:bg-white"
          disabled={Line.finish}
          Line={Line}
          kind="acte"
        />
        {/* {Line.dateAppointment && ( */}
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
        {/* )} */}
      </td>
      <td className={`whitespace-nowrap border-r border-[#95a5a6] bg-white w-9 font-medium`}>
        <InputFiche
          disabled={Line.finish}
          className={`${Line.finish === true ? "bg-main text-white" : ""} text-center font-bold`}
          Line={Line}
          kind="amount"
        />
      </td>
      <td className="bg-white w-3"></td>
    </tr>
  );
};

export default DataLineFiche;

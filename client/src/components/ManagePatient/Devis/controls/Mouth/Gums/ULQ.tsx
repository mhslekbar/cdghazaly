import React, { useContext } from "react";
import { DataDevisContext } from "../../../types";
import { handleSelectedTeeth } from "../functions";

const ULQ: React.FC = () => {
  const { selectedTeeth, setSelectedTeeth } = useContext(DataDevisContext);
  
  const chooseClass = (num: string) => selectedTeeth.includes(num) ? "bg-main text-white": ""

  const configSelectedTeeth = (num: string) => handleSelectedTeeth(num, selectedTeeth, setSelectedTeeth)


  return (
    <div className="relative">
      <div
        className={`${chooseClass("ULQ")} ULQ Gums`}
        id="ULQ-Gums"
        onClick={() => configSelectedTeeth("ULQ")}
      ></div>
    </div>
  );
};

export default ULQ;

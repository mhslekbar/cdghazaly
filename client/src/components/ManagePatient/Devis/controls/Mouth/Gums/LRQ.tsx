import React, { useContext } from "react";
import { DataDevisContext } from "../../../types";
import { handleSelectedTeeth } from "../functions";

const LRQ: React.FC = () => {
  const { selectedTeeth, setSelectedTeeth } = useContext(DataDevisContext);
  
  const chooseClass = (num: string) => selectedTeeth.includes(num) ? "bg-main text-white": ""

  const configSelectedTeeth = (num: string) => handleSelectedTeeth(num, selectedTeeth, setSelectedTeeth)


  return (
    <div className="relative">
      <div
        className={`${chooseClass("LRQ")} LRQ Gums`}
        id="LRQ-Gums"
        onClick={() => configSelectedTeeth("LRQ")}
      ></div>
    </div>
  );
};

export default LRQ;

import React, { useContext } from "react";
import { DataDevisContext } from "../../../types";
import { handleSelectedTeeth } from "../functions";

const URQ: React.FC = () => {
  const { selectedTeeth, setSelectedTeeth } = useContext(DataDevisContext);
  
  const chooseClass = (num: string) => selectedTeeth.includes(num) ? "bg-main text-white": ""

  const configSelectedTeeth = (num: string) => handleSelectedTeeth(num, selectedTeeth, setSelectedTeeth)


  return (
    <div className="relative">
      <div
        className={`${chooseClass("URQ")} URQ Gums`}
        onClick={() => configSelectedTeeth("URQ")}
      ></div>
    </div>
  );
};

export default URQ;
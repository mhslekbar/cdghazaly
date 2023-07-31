import React, { useContext } from "react";
import { DataDevisContext } from "../../../types";
import { handleSelectedTeeth } from "../functions";

const U: React.FC = () => {
  const { selectedTeeth, setSelectedTeeth } = useContext(DataDevisContext);
  
  const chooseClass = (num: string) => selectedTeeth.includes(num) ? "bg-main text-white": ""

  const configSelectedTeeth = (num: string) => handleSelectedTeeth(num, selectedTeeth, setSelectedTeeth)


  return (
    <div className="relative">
      <div
        className={`${chooseClass("U")} U Gums`}
        id="U-Gums"
        onClick={() => configSelectedTeeth("U")}
      ></div>
    </div>
  );
};

export default U;

import React, { useContext } from "react";
import { SelectElement } from "../../HtmlComponents/SelectElement";
import { BiChevronDownCircle, BiChevronUpCircle } from "react-icons/bi";
import { InputElement } from "../../HtmlComponents/InputElement";
import { formattedDate } from "../../functions/functions";
import { Days, Months, Years } from "../statistics/types";
import { ShowConsumableContext } from "./types";
import { FaPrint } from "react-icons/fa";
import { useLocation } from "react-router";

const FilterConsumable: React.FC = () => {
  const {
    day, setDay,
    month, setMonth,
    year, setYear,
    showSwitchDate, setShowSwitchDate,
    startDate, setStartDate,
    endDate, setEndDate,
  } = useContext(ShowConsumableContext);

  const location = useLocation()

  return (
    <div className="flex justify-start gap-2 mt-3">
      {showSwitchDate ? (
        <>
          <BiChevronUpCircle className="text-main" style={{ fontSize: "22px" }} onClick={() => setShowSwitchDate(!showSwitchDate)} />
          <InputElement divClass="flex justify-center items-center gap-1" type="date" name="Debut" value={formattedDate(startDate.toString())} setValue={setStartDate} />
          <InputElement divClass="flex justify-center items-center gap-1" type="date" name="Fin" value={formattedDate(endDate.toString())} setValue={setEndDate} />
        </>
      ) : (
        <>
          <BiChevronDownCircle className="text-main" style={{ fontSize: "22px" }} onClick={() => setShowSwitchDate(!showSwitchDate)} />
          <SelectElement valueType="string" value={day} setValue={setDay} defaultOption={<option>jour</option>} options={Days} />
          <SelectElement valueType="string" value={month} setValue={setMonth} defaultOption={<option>mois</option>} options={Months} />
          <SelectElement valueType="string" value={year} setValue={setYear} options={Years} />
        </>
      )}
      {location.pathname.split("/")[3] !== "purchase-order" && 
        <FaPrint onClick={() => {
          window.print()
        }} className="text-blue" style={{ fontSize: "22px" }} />
      }
    </div>
  );
};

export default FilterConsumable;

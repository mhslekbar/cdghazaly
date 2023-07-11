import React, { useContext } from "react";
import { SelectElement } from "../../HtmlComponents/SelectElement";
import { Days, Months, ShowStatisticContext, Years } from "./types";
import { BiChevronDownCircle, BiChevronUpCircle } from "react-icons/bi";
import { InputElement } from "../../HtmlComponents/InputElement";
import { formattedDate } from "../../functions/functions";

const FilterStatistics: React.FC = () => {
  const {
    day,
    setDay,
    month,
    setMonth,
    year,
    setYears,
    showSwitchDate,
    setShowSwitchDate,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useContext(ShowStatisticContext);

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
          <SelectElement valueType="string" value={year} setValue={setYears} options={Years} />
        </>
      )}
    </div>
  );
};

export default FilterStatistics;

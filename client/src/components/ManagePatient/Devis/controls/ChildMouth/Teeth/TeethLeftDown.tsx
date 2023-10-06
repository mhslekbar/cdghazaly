import React, { useContext } from 'react';
import { DataDevisContext } from '../../../types'
import { handleSelectedTeeth } from '../functions';

const TeethLeftDown = () => {
  const { selectedTeeth, setSelectedTeeth } = useContext(DataDevisContext)
  
  const chooseClass = (num: string) => selectedTeeth.includes(num) ? "bg-main text-white": ""

  const configSelectedTeeth = (num: string) => handleSelectedTeeth(num, selectedTeeth, setSelectedTeeth)

  return (
    <React.Fragment>
      <div className={`tooth ${chooseClass("81")}`} onClick={() => configSelectedTeeth("81")}  id="tooth-81"><b>81</b></div>
      <div className={`tooth ${chooseClass("82")}`} onClick={() => configSelectedTeeth("82")}  id="tooth-82"><b>82</b></div>
      <div className={`tooth ${chooseClass("83")}`} onClick={() => configSelectedTeeth("83")}  id="tooth-83"><b>83</b></div>
      <div className={`tooth ${chooseClass("84")}`} onClick={() => configSelectedTeeth("84")}  id="tooth-84"><b>84</b></div>
      <div className={`tooth ${chooseClass("85")}`} onClick={() => configSelectedTeeth("85")}  id="tooth-85"><b>85</b></div>
    </React.Fragment>
  )
}

export default TeethLeftDown

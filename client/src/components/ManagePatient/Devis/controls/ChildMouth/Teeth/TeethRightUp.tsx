import React, { useContext } from 'react';
import { DataDevisContext } from '../../../types'
import { handleSelectedTeeth } from '../functions';

const TeethLeftDown = () => {
  const { selectedTeeth, setSelectedTeeth } = useContext(DataDevisContext)
  
  const chooseClass = (num: string) => selectedTeeth.includes(num) ? "bg-main text-white": ""

  const configSelectedTeeth = (num: string) => handleSelectedTeeth(num, selectedTeeth, setSelectedTeeth)

  return (
    <React.Fragment>
      <div className={`tooth ${chooseClass("51")}`} onClick={() => configSelectedTeeth("51")} id="tooth-51"><b>51</b></div>
      <div className={`tooth ${chooseClass("52")}`} onClick={() => configSelectedTeeth("52")} id="tooth-52"><b>52</b></div>
      <div className={`tooth ${chooseClass("53")}`} onClick={() => configSelectedTeeth("53")} id="tooth-53"><b>53</b></div>
      <div className={`tooth ${chooseClass("54")}`} onClick={() => configSelectedTeeth("54")} id="tooth-54"><b>54</b></div>
      <div className={`tooth ${chooseClass("55")}`} onClick={() => configSelectedTeeth("55")} id="tooth-55"><b>55</b></div>
    </React.Fragment>
  )
}

export default TeethLeftDown

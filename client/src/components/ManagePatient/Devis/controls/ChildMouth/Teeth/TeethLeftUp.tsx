import React, { useContext } from 'react';
import { DataDevisContext } from '../../../types'
import { handleSelectedTeeth } from '../functions';

const TeethLeftDown = () => {
  const { selectedTeeth, setSelectedTeeth } = useContext(DataDevisContext)
  
  const chooseClass = (num: string) => selectedTeeth.includes(num) ? "bg-main text-white": ""

  const configSelectedTeeth = (num: string) => handleSelectedTeeth(num, selectedTeeth, setSelectedTeeth)

  return (
    <React.Fragment>
      <div className={`tooth ${chooseClass("61")}`} onClick={() => configSelectedTeeth("61")}  id="tooth-61"><b>61</b></div>
      <div className={`tooth ${chooseClass("62")}`} onClick={() => configSelectedTeeth("62")}  id="tooth-62"><b>62</b></div>
      <div className={`tooth ${chooseClass("63")}`} onClick={() => configSelectedTeeth("63")}  id="tooth-63"><b>63</b></div>
      <div className={`tooth ${chooseClass("64")}`} onClick={() => configSelectedTeeth("64")}  id="tooth-64"><b>64</b></div>
      <div className={`tooth ${chooseClass("65")}`} onClick={() => configSelectedTeeth("65")}  id="tooth-65"><b>65</b></div>

    </React.Fragment>
  )
}

export default TeethLeftDown

import React, { useContext } from 'react';
import { DataDevisContext } from '../../../types'
import { handleSelectedTeeth } from '../functions';

const TeethLeftDown = () => {
  const { selectedTeeth, setSelectedTeeth } = useContext(DataDevisContext)
  
  const chooseClass = (num: string) => selectedTeeth.includes(num) ? "bg-main text-white": ""

  const configSelectedTeeth = (num: string) => handleSelectedTeeth(num, selectedTeeth, setSelectedTeeth)

  return (
    <React.Fragment>
      <div className={`tooth ${chooseClass("71")}`} onClick={() => configSelectedTeeth("71")} id="tooth-71"><b>71</b></div>
      <div className={`tooth ${chooseClass("72")}`} onClick={() => configSelectedTeeth("72")} id="tooth-72"><b>72</b></div>
      <div className={`tooth ${chooseClass("73")}`} onClick={() => configSelectedTeeth("73")} id="tooth-73"><b>73</b></div>
      <div className={`tooth ${chooseClass("74")}`} onClick={() => configSelectedTeeth("74")} id="tooth-74"><b>74</b></div>
      <div className={`tooth ${chooseClass("75")}`} onClick={() => configSelectedTeeth("75")} id="tooth-75"><b>75</b></div>
      {/* <div className={`tooth ${chooseClass("76")}`} onClick={() => configSelectedTeeth("76")} id="tooth-76"><b>76</b></div>
      <div className={`tooth ${chooseClass("77")}`} onClick={() => configSelectedTeeth("77")} id="tooth-77"><b>77</b></div>
      <div className={`tooth ${chooseClass("78")}`} onClick={() => configSelectedTeeth("78")} id="tooth-78"><b>78</b></div> */}
    </React.Fragment>
  )
}

export default TeethLeftDown

import React, { useContext } from 'react';
import { DataDevisContext } from '../../../types'
import { handleSelectedTeeth } from '../functions';

const TeethLeftDown = () => {
  const { selectedTeeth, setSelectedTeeth } = useContext(DataDevisContext)
  
  const chooseClass = (num: string) => selectedTeeth.includes(num) ? "bg-main text-white": ""

  const configSelectedTeeth = (num: string) => handleSelectedTeeth(num, selectedTeeth, setSelectedTeeth)

  return (
    <React.Fragment>
      <div className={`tooth ${chooseClass("11")}`} onClick={() => configSelectedTeeth("11")} id="tooth-11"><b>11</b></div>
      <div className={`tooth ${chooseClass("12")}`} onClick={() => configSelectedTeeth("12")} id="tooth-12"><b>12</b></div>
      <div className={`tooth ${chooseClass("13")}`} onClick={() => configSelectedTeeth("13")} id="tooth-13"><b>13</b></div>
      <div className={`tooth ${chooseClass("14")}`} onClick={() => configSelectedTeeth("14")} id="tooth-14"><b>14</b></div>
      <div className={`tooth ${chooseClass("15")}`} onClick={() => configSelectedTeeth("15")} id="tooth-15"><b>15</b></div>
      <div className={`tooth ${chooseClass("16")}`} onClick={() => configSelectedTeeth("16")} id="tooth-16"><b>16</b></div>
      <div className={`tooth ${chooseClass("17")}`} onClick={() => configSelectedTeeth("17")} id="tooth-17"><b>17</b></div>
      <div className={`tooth ${chooseClass("18")}`} onClick={() => configSelectedTeeth("18")} id="tooth-18"><b>18</b></div>
    </React.Fragment>
  )
}

export default TeethLeftDown

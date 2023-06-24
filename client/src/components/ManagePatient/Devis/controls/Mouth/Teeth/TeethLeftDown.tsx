import React, { useContext } from 'react';
import { DataDevisContext } from '../../../types'
import { handleSelectedTeeth } from '../functions';

const TeethLeftDown = () => {
  const { selectedTeeth, setSelectedTeeth } = useContext(DataDevisContext)
  
  const chooseClass = (num: string) => selectedTeeth.includes(num) ? "bg-main text-white": ""

  const configSelectedTeeth = (num: string) => handleSelectedTeeth(num, selectedTeeth, setSelectedTeeth)

  return (
    <React.Fragment>
      <div className={`tooth ${chooseClass("41")}`} onClick={() => configSelectedTeeth("41")}  id="tooth-41"><b>41</b></div>
      <div className={`tooth ${chooseClass("42")}`} onClick={() => configSelectedTeeth("42")}  id="tooth-42"><b>42</b></div>
      <div className={`tooth ${chooseClass("43")}`} onClick={() => configSelectedTeeth("43")}  id="tooth-43"><b>43</b></div>
      <div className={`tooth ${chooseClass("44")}`} onClick={() => configSelectedTeeth("44")}  id="tooth-44"><b>44</b></div>
      <div className={`tooth ${chooseClass("45")}`} onClick={() => configSelectedTeeth("45")}  id="tooth-45"><b>45</b></div>
      <div className={`tooth ${chooseClass("46")}`} onClick={() => configSelectedTeeth("46")}  id="tooth-46"><b>46</b></div>
      <div className={`tooth ${chooseClass("47")}`} onClick={() => configSelectedTeeth("47")}  id="tooth-47"><b>47</b></div>
      <div className={`tooth ${chooseClass("48")}`} onClick={() => configSelectedTeeth("48")}  id="tooth-48"><b>48</b></div>
    </React.Fragment>
  )
}

export default TeethLeftDown

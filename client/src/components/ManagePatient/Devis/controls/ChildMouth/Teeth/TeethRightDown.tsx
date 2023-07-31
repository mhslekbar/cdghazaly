import React, { useContext } from 'react';
import { DataDevisContext } from '../../../types'
import { handleSelectedTeeth } from '../functions';

const TeethLeftDown = () => {
  const { selectedTeeth, setSelectedTeeth } = useContext(DataDevisContext)
  
  const chooseClass = (num: string) => selectedTeeth.includes(num) ? "bg-main text-white": ""

  const configSelectedTeeth = (num: string) => handleSelectedTeeth(num, selectedTeeth, setSelectedTeeth)

  return (
    <React.Fragment>
      <div className={`tooth ${chooseClass("31")}`} onClick={() => configSelectedTeeth("31")} id="tooth-31"><b>31</b></div>
      <div className={`tooth ${chooseClass("32")}`} onClick={() => configSelectedTeeth("32")} id="tooth-32"><b>32</b></div>
      <div className={`tooth ${chooseClass("33")}`} onClick={() => configSelectedTeeth("33")} id="tooth-33"><b>33</b></div>
      <div className={`tooth ${chooseClass("34")}`} onClick={() => configSelectedTeeth("34")} id="tooth-34"><b>34</b></div>
      <div className={`tooth ${chooseClass("35")}`} onClick={() => configSelectedTeeth("35")} id="tooth-35"><b>35</b></div>
      <div className={`tooth ${chooseClass("36")}`} onClick={() => configSelectedTeeth("36")} id="tooth-36"><b>36</b></div>
      <div className={`tooth ${chooseClass("37")}`} onClick={() => configSelectedTeeth("37")} id="tooth-37"><b>37</b></div>
      <div className={`tooth ${chooseClass("38")}`} onClick={() => configSelectedTeeth("38")} id="tooth-38"><b>38</b></div>
    </React.Fragment>
  )
}

export default TeethLeftDown

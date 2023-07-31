import React, { useContext } from 'react';
import { DataDevisContext } from '../../../types'
import { handleSelectedTeeth } from '../functions';

const TeethLeftDown = () => {
  const { selectedTeeth, setSelectedTeeth } = useContext(DataDevisContext)
  
  const chooseClass = (num: string) => selectedTeeth.includes(num) ? "bg-main text-white": ""

  const configSelectedTeeth = (num: string) => handleSelectedTeeth(num, selectedTeeth, setSelectedTeeth)

  return (
    <React.Fragment>
      <div className={`tooth ${chooseClass("21")}`} onClick={() => configSelectedTeeth("21")}  id="tooth-21"><b>21</b></div>
      <div className={`tooth ${chooseClass("22")}`} onClick={() => configSelectedTeeth("22")}  id="tooth-22"><b>22</b></div>
      <div className={`tooth ${chooseClass("23")}`} onClick={() => configSelectedTeeth("23")}  id="tooth-23"><b>23</b></div>
      <div className={`tooth ${chooseClass("24")}`} onClick={() => configSelectedTeeth("24")}  id="tooth-24"><b>24</b></div>
      <div className={`tooth ${chooseClass("25")}`} onClick={() => configSelectedTeeth("25")}  id="tooth-25"><b>25</b></div>
      <div className={`tooth ${chooseClass("26")}`} onClick={() => configSelectedTeeth("26")}  id="tooth-26"><b>26</b></div>
      <div className={`tooth ${chooseClass("27")}`} onClick={() => configSelectedTeeth("27")}  id="tooth-27"><b>27</b></div>
      <div className={`tooth ${chooseClass("28")}`} onClick={() => configSelectedTeeth("28")}  id="tooth-28"><b>28</b></div>
    </React.Fragment>
  )
}

export default TeethLeftDown

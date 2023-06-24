import React, { useContext, useEffect } from 'react'
import "./mouth.css"

import URQ from './Gums/URQ'
import TeethLeftUp from './Teeth/TeethLeftUp'
import TeethLeftDown from './Teeth/TeethLeftDown'
import TeethRightUp from './Teeth/TeethRightUp'
import TeethRightDown from './Teeth/TeethRightDown'
import ULQ from './Gums/ULQ'
import LLQ from './Gums/LLQ'
import LRQ from './Gums/LRQ'
import L from './Gums/L'
import U from './Gums/U'
import { DataDevisContext, EnumTypeTeethBoard } from '../../types'
import { ShowFichesContext } from '../../../Fiches/types'

const Tooth:React.FC = () => {
  const { selectedTreat, TypeTeethBoard } = useContext(DataDevisContext)
  
  useEffect(() => {
    document.querySelectorAll(".tooth").forEach((element: any) => {
      element.style.cursor = selectedTreat.type === "gencive" ? "not-allowed" : "allowed"
      element.style.pointerEvents = selectedTreat.type === "gencive" ? "none" : "auto"
    })
  }, [selectedTreat])

  const { selectedLineDevis } = useContext(ShowFichesContext)

  useEffect(() => {
    if(TypeTeethBoard === EnumTypeTeethBoard.APPEND_TEETH_FICHE) {

      let previousTeeth:any = []; // Array to store previous teeth IDs

      selectedLineDevis.teeth.nums.forEach((tooth: string) => {
        document.querySelectorAll(".tooth").forEach((element: any) => {
          const toothId = element.getAttribute("id");
          
          element.style.cursor = "allowed";
          element.style.pointerEvents = "auto";

          if (toothId === `tooth-${tooth}`) {
            element.style.backgroundColor = "#e84393";
            element.style.color = "#FFF";
          } else {
            
            if (previousTeeth.includes(toothId)) {
              element.style.backgroundColor = "#e84393"; // Example: set a different color for previous teeth
              element.style.c = "#FFF"; // Example: set a different color for previous teeth
            } else {
              element.style.backgroundColor = "#9b9b9b"; // Example: set the initial color for non-matching teeth
              // element.style.cursor = "not-allowed";
              element.style.pointerEvents = "none";
            }
          }

        });

        previousTeeth.push(`tooth-${tooth}`); // Store the current tooth ID in the previousTeeth array
      });

    }
  }, [TypeTeethBoard, selectedLineDevis, selectedTreat])

  useEffect(() => {
    document.querySelectorAll(".Gums").forEach((element: any) => {
      element.style.cursor = selectedTreat.type !== "gencive" ? "not-allowed" : "allowed"
      element.parentNode.style.pointerEvents = selectedTreat.type !== "gencive" ? "none" : "auto"
    })  
  }, [selectedTreat])

  return (
      <div className='border mouth'>
        <div className='horizontal-line'></div>
        <div className='vertical-line'></div>
        <TeethRightUp />
        <TeethLeftUp />
        <TeethRightDown />
        <TeethLeftDown />

        <URQ />
        <ULQ />
        <LRQ />
        <LLQ />
        <L />
        <U />
      </div>

  )
}

export default Tooth

import React, { useContext, useEffect } from 'react'
import "./ChildMouth.css"

import TeethLeftUp from './Teeth/TeethLeftUp'
import TeethLeftDown from './Teeth/TeethLeftDown'
import TeethRightUp from './Teeth/TeethRightUp'
import TeethRightDown from './Teeth/TeethRightDown'
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
    if(TypeTeethBoard === EnumTypeTeethBoard.APPEND_TEETH_FICHE || TypeTeethBoard === EnumTypeTeethBoard.EDIT_TEETH_FICHE) {
      let previousTeeth:any = []; // Array to store previous teeth IDs
      let previousGums:any = []; // Array to store previous Gums IDs
      
      selectedLineDevis.teeth.nums.forEach((tooth: string) => {
        // START Teeth 
        document.querySelectorAll(".tooth").forEach((element: any) => {
          const toothId = element.getAttribute("id");
          
          element.style.cursor = "allowed";
          element.style.pointerEvents = "auto";

          if (toothId === `tooth-${tooth}`) {
            element.style.backgroundColor = "#FFF";
            element.style.color = "#f78fb3";
          } else {
            if (previousTeeth.includes(toothId)) { // #f78fb3 || #e84393
              element.style.backgroundColor = "#FFF"; // Example: set a different color for previous teeth
              element.style.color = "#f78fb3"; // Example: set a different color for previous teeth
            } else {
              element.style.backgroundColor = "#9b9b9b"; // Example: set the initial color for non-matching teeth
              // element.style.cursor = "not-allowed";
              element.style.pointerEvents = "none";
            }
          }
        });
        // END Teeth

        // START Gums
        document.querySelectorAll(".Gums").forEach((element: any) => {
          const gumsId = element.getAttribute("id");

          element.style.cursor = "allowed";
          element.style.pointerEvents = "auto";

          if (gumsId === `${tooth}-Gums`) {
            element.style.backgroundColor = "#FFF";
            element.style.color = "#f78fb3";
          } else {
            if (previousGums.includes(gumsId)) { // #f78fb3 || #e84393
              element.style.backgroundColor = "#FFF"; // Example: set a different color for previous teeth
              element.style.color = "#f78fb3"; // Example: set a different color for previous teeth
            } else {
              element.style.backgroundColor = "#9b9b9b"; // Example: set the initial color for non-matching teeth
              // element.style.cursor = "not-allowed";
              element.style.pointerEvents = "none";
            }
          }
        });
        // END Gums
        previousGums.push(`${tooth}-Gums`); // Store the current Gum ID in the previousGums array
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
      <div className='border child-mouth'>
        <div className='horizontal-line'></div>
        <div className='vertical-line'></div>
        <TeethRightUp />
        <TeethLeftUp />
        <TeethRightDown />
        <TeethLeftDown />
      </div>

  )
}

export default Tooth

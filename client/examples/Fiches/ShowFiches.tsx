import React, { useState } from 'react'
import { DefaultFicheInterface, FicheInterface, ShowFichesContext } from './types'
import SelectFiche from './SelectFiche'
import DataFiches from './DataFiches'
import CreateFiche from './controls/CreateFiche'
import DeleteFiche from './controls/DeleteFiche'
import { MdRemoveCircleOutline } from 'react-icons/md'
import SuccessMsg from '../../../Messages/SuccessMsg'

const ShowFiches:React.FC = () => {
  const [selectedFiche, setSelectedFiche] = useState<FicheInterface>(DefaultFicheInterface)
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  const [showDeleteFiche, setShowDeleteFiche] = useState(false)

  return (
    <ShowFichesContext.Provider value={{
      selectedFiche, setSelectedFiche,
      showSuccessMsg, setShowSuccessMsg
    }}>
      {showSuccessMsg && <SuccessMsg modal={showSuccessMsg} toggle={() => setShowSuccessMsg(!showSuccessMsg)} />}
      <div className='flex justify-between mt-2'>
        <CreateFiche />
        {selectedFiche && <button 
          className='p-2 rounded bg-red text-white'
          onClick={() => setShowDeleteFiche(!showDeleteFiche)}
        >
          <MdRemoveCircleOutline />
        </button>}
      </div>
      <SelectFiche />
      <DataFiches />
      {showDeleteFiche && selectedFiche && 
        <DeleteFiche FicheData={selectedFiche} modal={showDeleteFiche} toggle={() => setShowDeleteFiche(!showDeleteFiche)}/>
      }
    </ShowFichesContext.Provider>
  )
}

export default ShowFiches

import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { State } from '../../../../redux/store';
import { DevisInterface, ShowDevisInterfaceContext } from '../types';

const SelectDevis:React.FC = () => {
  const { devis } = useSelector((state: State) => state.devis);
  const { selectedDevis, setSelectedDevis } = useContext(ShowDevisInterfaceContext)
  return (
    <div className='flex' style={{
      flexDirection: "column"
    }}>
      {
      devis
      .map((dev: DevisInterface) => 
      (<span 
        key={dev._id}
        className={`${selectedDevis?._id === dev._id ? "border-r-2 border-main bg-white" : ""} text-main px-2 rounded mr-2 cursor-pointer`}
        onClick={() => setSelectedDevis(dev)}
      >
        N-{dev.numDevis}
      </span>))}
    </div>
  )
}

export default SelectDevis

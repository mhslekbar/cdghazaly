import React, { useContext } from 'react'
import { DataDevisContext, DefaultDevisInterface, DevisInterface, LineDevisType, ShowDevisInterfaceContext } from '../../../Devis/types'
import { FaEye } from 'react-icons/fa'
import { ShowFichesContext } from '../../types'

interface LineDevisDataInterface {
  ln: LineDevisType,
  index: any,
  devis: DevisInterface
}
const LineDevisData:React.FC<LineDevisDataInterface> = ({ ln, index, devis}) => {
  const { showTeethBoard, setShowTeethBoard, setSelectedDevis } = useContext(ShowDevisInterfaceContext)
  const { setSelectedTeeth, setSelectedSurface, setPrice, setTreat, setSelectedTreat } = useContext(DataDevisContext)
  const { setSelectedLineDevis } = useContext(ShowFichesContext)
  
  const setChangeLine = (line: LineDevisType) => {
    // LineFiche
    setSelectedLineDevis(ln)
    setShowTeethBoard(!showTeethBoard)
    // teethBoard
    setSelectedTeeth(line.teeth.nums)
    setSelectedSurface(line.teeth.surface)
    setPrice(line.price)
    setTreat(line.treatment._id)
    setSelectedTreat(line.treatment)
    setSelectedDevis(devis)
  }


  return (
    <>
    <tr className="border-b">
      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
        {ln.treatment?.name}
      </td>
      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
        {ln.teeth.nums.map((tooth: string, index) => tooth + (index < ln.teeth.nums.length - 1   ? ", " : ""))}
      </td>
      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
        {ln.teeth.surface}
      </td>
      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
        {ln.teeth.nums.length}
      </td>
      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
        {ln.price}
      </td>
      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
        {ln.price * ln.teeth.nums.length}
      </td>
      <td className='flex justify-center'>
        <FaEye 
          className='hover:text-main'
          onClick={() => setChangeLine(ln)}
          style={{
            fontSize: "22px"
          }} 
        />  
      </td>
  </tr>
  </>
  )
}

export default LineDevisData

import React from 'react'
import { LineDevisType } from '../../../Devis/types'

interface LineDevisDataInterface {
  ln: LineDevisType,
  index: any
}
const LineDevisData:React.FC<LineDevisDataInterface> = ({ ln, index}) => {
  return (
    <tr className="border-b" key={index}>
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
      <td>
        
    </td>
  </tr>
  )
}

export default LineDevisData

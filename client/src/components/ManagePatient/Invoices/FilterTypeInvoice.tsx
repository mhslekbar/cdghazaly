import React, { useContext } from 'react'
import { ShowInvoicesContext } from './types'



const FilterTypeInvoice:React.FC = () => {
  const { typeInvoice, setTypeInvoice } = useContext(ShowInvoicesContext)

  return (
    <div className="flex gap-2">
    <div className="flex justify-start items-center gap-1">
      <input type="radio" checked={typeInvoice === "global"} id="global" name="typeInvoice" value={typeInvoice} onChange={() => setTypeInvoice("global")}/>
      <label htmlFor="global">global</label>
    </div>
    <div className="flex justify-start items-center gap-1">
      <input type="radio" checked={typeInvoice === "assuré"} id="assuré" name="typeInvoice" value={typeInvoice} onChange={() => setTypeInvoice("assuré")}/>
      <label htmlFor="assuré">assuré</label>
    </div>
    <div className="flex justify-start items-center gap-1">
      <input type="radio" checked={typeInvoice === "cabinet"} id="cabinet" name="typeInvoice" value={typeInvoice} onChange={() => setTypeInvoice("cabinet")}/>
      <label htmlFor="cabinet">cabinet</label>
    </div>
  </div>
  )
}

export default FilterTypeInvoice

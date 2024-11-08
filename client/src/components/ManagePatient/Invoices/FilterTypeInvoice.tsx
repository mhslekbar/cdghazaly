import React, { useContext } from 'react'
import { ShowInvoicesContext } from './types'
import { useTranslation } from 'react-i18next'

const FilterTypeInvoice:React.FC = () => {
  const { typeInvoice, setTypeInvoice, toggleInvoiceDetails, setToggleInvoiceDetails } = useContext(ShowInvoicesContext)
  const { t } = useTranslation()

  return (
    <div className='flex flex-col'>
      <div className="flex gap-2">
        <div className="flex justify-start items-center gap-1">
          <input type="radio" checked={typeInvoice === "global"} id="global" name="typeInvoice" value={typeInvoice} onChange={() => setTypeInvoice("global")}/>
          <label htmlFor="global">{t("global")}</label>
        </div>
        <div className="flex justify-start items-center gap-1">
          <input type="radio" checked={typeInvoice === "assuré"} id="assuré" name="typeInvoice" value={typeInvoice} onChange={() => setTypeInvoice("assuré")}/>
          <label htmlFor="assuré">{t("Assuré")}</label>
        </div>
        <div className="flex justify-start items-center gap-1">
          <input type="radio" checked={typeInvoice === "cabinet"} id="cabinet" name="typeInvoice" value={typeInvoice} onChange={() => setTypeInvoice("cabinet")}/>
          <label htmlFor="cabinet">{t("cabinet")}</label>
        </div>
      </div>

      {typeInvoice === "global" && <div>
        <h3 className='text-gray-700 font-bold'>{t("Details de la facture")}</h3>
        <div className="flex justify-start items-center gap-1">
          <input type="radio" checked={toggleInvoiceDetails === 'show'} id="showInvoiceDetail" name="toggleInvoiceDetail" value={toggleInvoiceDetails} onChange={() => setToggleInvoiceDetails('show')}/>
          <label htmlFor="showInvoiceDetail">{t("Afficher")}</label>
        </div>
        <div className="flex justify-start items-center gap-1">
          <input type="radio" checked={toggleInvoiceDetails === 'hide'} id="hideInvoiceDetail" name="toggleInvoiceDetail" value={toggleInvoiceDetails} onChange={() => setToggleInvoiceDetails('hide')}/>
          <label htmlFor="hideInvoiceDetail">{t("Casher")}</label>
        </div>
      </div>}

    </div>
  )
}

export default FilterTypeInvoice

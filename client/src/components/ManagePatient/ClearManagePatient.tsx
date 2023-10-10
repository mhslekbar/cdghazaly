import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ClearPaymentsApi } from '../../redux/payments/paymentApiCalls'
import { ClearFicheApi } from '../../redux/fiches/ficheApiCalls'
import { ClearDevisApi } from '../../redux/devis/devisApiCalls'
import { ClearInvoiceApi } from '../../redux/invoices/invoiceApiCalls'
import { ClearConsumptionLabApi } from '../../redux/laboratory/consumptions/consumptionLabApiCalls'

const ClearManagePatient: React.FC = () => {

  const dispatch: any = useDispatch()

  useEffect(() => {
    const clearData = async () => {
      await dispatch(ClearDevisApi())
      await dispatch(ClearInvoiceApi())
      await dispatch(ClearConsumptionLabApi())
      await dispatch(ClearPaymentsApi())
      await dispatch(ClearFicheApi())
    }
    clearData()
  }, [dispatch])

  return (<>
  </>)
}

export default ClearManagePatient
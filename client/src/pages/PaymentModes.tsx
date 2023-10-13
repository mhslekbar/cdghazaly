import React from 'react'
import ShowPaymentMode from '../components/paymentMode/ShowPaymentMode'
import { useTranslation } from 'react-i18next'

const PaymentModes = () => {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1 className='text-center text-3xl mb-4'>{t("Mode de paiements")}</h1>
      <ShowPaymentMode/>
    </div>
  )
}

export default PaymentModes
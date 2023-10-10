import React from 'react'
import ShowPaymentMode from '../components/paymentMode/ShowPaymentMode'

const PaymentModes = () => {
  return (
    <div>
      <h1 className='text-center text-3xl mb-4'>Mode de paiements</h1>
      <ShowPaymentMode/>
    </div>
  )
}

export default PaymentModes
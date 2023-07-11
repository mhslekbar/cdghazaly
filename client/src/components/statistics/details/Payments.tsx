import React from "react";
import DataPayments from "./DataPayments";

const Payments: React.FC = () => {
  
  return (
    <section className="grid grid-cols-3 mt-5">
      <DataPayments paymentFilter="payment" />
    </section>
  );
};

export default Payments;

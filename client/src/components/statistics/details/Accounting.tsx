import React from "react";
import DataPayments from "./DataPayments";

const Accounting: React.FC = () => {
  return (
    <section className="grid grid-cols-3 mt-5">
      <DataPayments paymentFilter="soins"/>
    </section>
  );
};
export default Accounting;

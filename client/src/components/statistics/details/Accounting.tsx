import React from "react";
import DataPayments from "./DataPayments";

const Accounting: React.FC = () => {
  return (
    <section className="mt-5">
      <DataPayments paymentFilter="soins"/>
    </section>
  );
};
export default Accounting;

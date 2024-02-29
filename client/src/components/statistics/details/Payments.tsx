import React, { useContext } from "react";
import DataPayments from "./DataPayments";
import ButtonElement from "../../../HtmlComponents/ButtonElement";
import { State } from "../../../redux/store";
import { useSelector } from "react-redux";
import { PermissionType } from "../../roles/types";
import { ShowStatisticContext } from "../types";
import { filterSpecificDate } from "../../../functions/functions";
import { PaymentInterface } from "../../ManagePatient/Payments/types";
import { useParams } from "react-router";
import ApprovePayments from "./ApprovePayments";

const Payments: React.FC = () => {
  const { permissions } = useSelector((state: State) => state.permissions);
  const { showApprovePayments, setShowApprovePayments } =
    useContext(ShowStatisticContext);

  const { payments } = useSelector((state: State) => state.payments);
  const { doctorId } = useParams();

  const { selectedDate, day, month, showSwitchDate, startDate, endDate } =
    useContext(ShowStatisticContext);

  const filteredApproveData = filterSpecificDate(
    payments,
    day,
    month,
    showSwitchDate,
    startDate,
    endDate,
    selectedDate
  )
    ?.filter(
      (payment: PaymentInterface) =>
        payment.doctor._id === doctorId &&
        (payment.type === "payment" || payment.type === "consultations") &&
        (payment.invoiceAssur ? payment.invoiceAssur?.payed : payment)
    )
    .filter((payment: PaymentInterface) => !payment.approved);

  return (
    <section className="mt-5">
      <DataPayments paymentFilter="payment" />

      {filteredApproveData.length > 0 &&
        permissions.find(
          (permission: PermissionType) =>
            permission.name === "APPROUVER" &&
            permission.collectionName === "PAIEMENTS_PATIENTS"
        ) && (
          <div className="w-fit">
            <ButtonElement
              typeBtn="Valider"
              toggle={() => setShowApprovePayments(!showApprovePayments)}
            />
          </div>
        )}
      {showApprovePayments && (
        <ApprovePayments
          filteredApproveData={filteredApproveData}
          modal={showApprovePayments}
          toggle={() => setShowApprovePayments(!showApprovePayments)}
        />
      )}
    </section>
  );
};

export default Payments;

db.appointments.aggregate([
  {$match: {date: new Date("2023-05-16")}},
  {$project: {
     _id: 0,
     day: {$dayOfWeek: "$date"},
     doctor: 1,
     patient: 1,
     start_time: {$hour: "$start_time"},
     end_time: {$hour: "$end_time"},
     service: 1
  }},
  {$group: {
     _id: "$start_time",
     slots: {
        $push: {
           day: "$day",
           doctor: "$doctor",
           patient: "$patient",
           service: "$service"
        }
     }
  }},
  {$sort: {_id: 1}},
  {$project: {
     _id: 0,
     time_slot: {$concat: [
        {$toString: "$_id"},
        ":00 - ",
        {$toString: {$add: ["$_id", 1]}},
        ":00"
     ]},
     Monday: {$arrayElemAt: ["$slots", 0]},
     Tuesday: {$arrayElemAt: ["$slots", 1]},
     Wednesday: {$arrayElemAt: ["$slots", 2]},
     Thursday: {$arrayElemAt: ["$slots", 3]},
     Friday: {$arrayElemAt: ["$slots", 4]},
     Saturday: {$arrayElemAt: ["$slots", 5]},
     Sunday: {$arrayElemAt: ["$slots", 6]}
  }}
])





    // Filter out the devis models where treatment for all teeth is done and is present in the invoice model
  //   const filteredDevisModels = devisData.filter((devis) =>
  //   devis.LineDevis.filter((lineDevis) =>
  //     invoices.every((invoice) =>
  //       invoice.LineInvoice.every((invoiceLine) => {
  //         if (
  //           invoiceLine.devis.toString() === devis._id.toString() &&
  //           invoiceLine.treatment.toString() === lineDevis.treatment._id.toString()
  //         ) {
  //           if (invoiceLine.teeth.nums.length !== lineDevis.teeth.nums.length) {
  //             return false;
  //           } else {
  //             const unmatchedTeethNums = invoiceLine.teeth.nums.filter(
  //               (num) => !lineDevis.teeth.nums.includes(num)
  //             );
  //             return unmatchedTeethNums.length > 0; // Return true if there are unmatched teeth numbers
  //           }
  //         } else {
  //           return true; // Include invoiceLine if it doesn't match the criteria
  //         }
  //       })
  //     )
  //   )
  // );
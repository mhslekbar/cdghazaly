export const getDateOfSpecificDay = (desiredDayOfWeek: number): string => {
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  let difference = desiredDayOfWeek - currentDayOfWeek;
  if (difference < 0) {
    difference += 7;
  }
  const daysToAdd = difference;
  currentDate.setDate(currentDate.getDate() + daysToAdd);
  return currentDate.toString()
};

export const dateIsEqualToCurrentDate = (desiredDayOfWeek: number) => {
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  let difference = desiredDayOfWeek - currentDayOfWeek;
  if (difference === 0) {
    currentDate.setDate(currentDate.getDate() + difference);
    return currentDate.toString()
  } 
  return null
};

export const strToTime = (date: any) => {
  return date.getTime() / 1000
}


export const MultiplyTime = (time: string, multiplier: number): string => {
  const [hour, minute] = time.split(":");
  let minutes = parseInt(hour) * 60 + parseInt(minute);
  minutes *= multiplier;

  const hours = Math.floor(minutes / 60);
  minutes -= hours * 60;

  // Return the formatted time
  return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
};


export const getDayOfTheWeek = (toDayDate: Date) => {
  let lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche;

  let weekDay = toDayDate.getDay();
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = daysOfWeek[weekDay];

  switch (currentDay.toUpperCase()) {
    case "MONDAY":
      lundi = toDayDate.getDate();
      mardi = lundi + 1;
      mercredi = lundi + 2;
      jeudi = lundi + 3;
      vendredi = lundi + 4;
      samedi = lundi + 5;
      dimanche = lundi + 6;
      break;
    case "TUESDAY":
      lundi = toDayDate.getDate() - 1;
      mardi = lundi + 1;
      mercredi = lundi + 2;
      jeudi = lundi + 3;
      vendredi = lundi + 4;
      samedi = lundi + 5;
      dimanche = lundi + 6;
      break;
    case "WEDNESDAY":
      lundi = toDayDate.getDate() - 2;
      mardi = lundi + 1;
      mercredi = lundi + 2;
      jeudi = lundi + 3;
      vendredi = lundi + 4;
      samedi = lundi + 5;
      dimanche = lundi + 6;
      break;
    case "THURSDAY":
      lundi = toDayDate.getDate() - 3;
      mardi = lundi + 1;
      mercredi = lundi + 2;
      jeudi = lundi + 3;
      vendredi = lundi + 4;
      samedi = lundi + 5;
      dimanche = lundi + 6;
      break;
    case "FRIDAY":
      lundi = toDayDate.getDate() - 4;
      mardi = lundi + 1;
      mercredi = lundi + 2;
      jeudi = lundi + 3;
      vendredi = lundi + 4;
      samedi = lundi + 5;
      dimanche = lundi + 6;
      break;
    case "SATURDAY":
      lundi = toDayDate.getDate() - 5;
      mardi = lundi + 1;
      mercredi = lundi + 2;
      jeudi = lundi + 3;
      vendredi = lundi + 4;
      samedi = lundi + 5;
      break;
    case "SUNDAY":
      lundi = toDayDate.getDate() - 6;
      mardi = lundi + 1;
      mercredi = lundi + 2;
      jeudi = lundi + 3;
      vendredi = lundi + 4;
      samedi = lundi + 5;
    break;
  }

  console.log(`lundi: ${lundi} 
    mardi : ${mardi}
    mercredi: ${mercredi}
    jeudi: ${jeudi}
    vendredi: ${vendredi}
    samedi: ${samedi}
    dimanche: ${dimanche}
  `)
};

export var resolutionNumDay = (numDay: number, mon: any, year: number) => {
  var finMois = 30;

  if (numDay <= 0) {
    mon -= 1;
  }

  if (mon === "00" && numDay <= 0) {
    mon = 12;
  }

  if (
    mon === 1 ||
    mon === 3 ||
    mon === 5 ||
    mon === 7 ||
    mon === 8 ||
    mon === 10 ||
    mon === 12
  ) {
    finMois = 31;
  } else if (mon === 4 || mon === 6 || mon === 9 || mon === 11) {
    finMois = 30;
  } else if (mon === 2 && !leapYear(year)) {
    finMois = 28;
  } else if (mon === 2 && leapYear(year)) {
    finMois = 29;
  }

  if (numDay > finMois) {
    mon = Number(mon) + 1;
    numDay = numDay - finMois;
  }

  if (numDay <= 0) {
    numDay = finMois - Math.abs(numDay);
  }

  if (mon === "00" && numDay <= 0) {
    numDay = finMois - Math.abs(numDay);
  }

  return [numDay, mon, year];
};

export var AddPlayTime = (time1: any, time2: any) => {
  var times = [time1, time2];
  var minutes = 0;

  // Loop through all the times
  times.forEach(function (time) {
    var [hour, minute] = time.split(":");
    minutes += parseInt(hour) * 60;
    minutes += parseInt(minute);
  });

  var hours = Math.floor(minutes / 60);
  minutes -= hours * 60;

  // Return the formatted time
  return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
};


export var leapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};




/*


  // Start Lundi
  let dataLundi = resolutionNumDay(lundi, mon, year);
  let dayLundi = (dataLundi[0].toString().length === 1) ? '0' + dataLundi[0] : dataLundi[0].toString();
  let monLundi = (dataLundi[1].toString().length === 1) ? '0' + dataLundi[1] : dataLundi[1].toString();
  let yearLundi = dataLundi[2].toString();
  // @typescript-eslint/no-unused-vars
  let dateLundi = dayLundi + '-' + monLundi + '-' + yearLundi;
  // END Lundi

  // Start Mardi
  let dataMardi = resolutionNumDay(mardi, mon, year);
  let dayMardi = (dataMardi[0].toString().length === 1) ? '0' + dataMardi[0] : dataMardi[0].toString();
  let monMardi = (dataMardi[1].toString().length === 1) ? '0' + dataMardi[1] : dataMardi[1].toString();
  let yearMardi = dataMardi[2].toString();
  // @typescript-eslint/no-unused-vars
  
  let dateMardi = dayMardi + '-' + monMardi + '-' + yearMardi;
  // END Mardi

  // Start Mercredi
  let dataMercredi = resolutionNumDay(mercredi, mon, year);
  let dayMercredi = (dataMercredi[0].toString().length === 1) ? '0' + dataMercredi[0] : dataMercredi[0].toString();
  let monMercredi = (dataMercredi[1].toString().length === 1) ? '0' + dataMercredi[1] : dataMercredi[1].toString();
  let yearMercredi = dataMercredi[2].toString();
  // @typescript-eslint/no-unused-vars
  let dateMercredi = dayMercredi + '-' + monMercredi + '-' + yearMercredi;
  // END Mercredi

  // Start Jeudi
  let dataJeudi = resolutionNumDay(jeudi, mon, year);
  let dayJeudi = (dataJeudi[0].toString().length === 1) ? '0' + dataJeudi[0] : dataJeudi[0].toString();
  let monJeudi = (dataJeudi[1].toString().length === 1) ? '0' + dataJeudi[1] : dataJeudi[1].toString();
  let yearJeudi = dataJeudi[2].toString();
  // @typescript-eslint/no-unused-vars
  let dateJeudi = dayJeudi + '-' + monJeudi + '-' + yearJeudi;
  // END Jeudi

  // Start Vendredi
  let dataVendredi = resolutionNumDay(vendredi, mon, year);
  let dayVendredi = (dataVendredi[0].toString().length === 1) ? '0' + dataVendredi[0] : dataVendredi[0].toString();
  let monVendredi = (dataVendredi[1].toString().length === 1) ? '0' + dataVendredi[1] : dataVendredi[1].toString();
  let yearVendredi = dataVendredi[2].toString();
  // @typescript-eslint/no-unused-vars
  let dateVendredi = dayVendredi + '-' + monVendredi + '-' + yearVendredi;
  // END Vendredi

  // Start Samedi
  let dataSamedi = resolutionNumDay(samedi, mon, year);
  let daySamedi = (dataSamedi[0].toString().length === 1) ? '0' + dataSamedi[0] : dataSamedi[0].toString();
  let monSamedi = (dataSamedi[1].toString().length === 1) ? '0' + dataSamedi[1] : dataSamedi[1].toString();
  let yearSamedi = dataSamedi[2].toString();
  // @typescript-eslint/no-unused-vars
  let dateSamedi = daySamedi + '-' + monSamedi + '-' + yearSamedi;
  // END Samedi

  // Start Dimanche
  let dataDimanche = resolutionNumDay(dimanche, mon, year);
  let dayDimanche = (dataDimanche[0].toString().length === 1) ? '0' + dataDimanche[0] : dataDimanche[0].toString();
  let monDimanche = (dataDimanche[1].toString().length === 1) ? '0' + dataDimanche[1] : dataDimanche[1].toString();
  let yearDimanche = dataDimanche[2].toString();
  // @typescript-eslint/no-unused-vars
  let dateDimanche = dayDimanche + '-' + monDimanche + '-' + yearDimanche;
  // END Dimanche



  
  // Global Variables
    const lundi = 0;
    const mardi = 1;
    const mercredi = 2;
    const jeudi = 3;
    const vendredi = 4;
    const samedi = 5;
    const dimanche = 6;





*/

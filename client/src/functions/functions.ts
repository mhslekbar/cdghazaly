export const Timeout = 1500

export const hideMsg = (e: any, error: string[], setError: any) => {
  const theMsg = e.target.innerText;
  setError(error.filter((err) => err?.toUpperCase()?.trim() !== theMsg?.toUpperCase()?.trim())); 
};


export const filterSpecificDate = (MyArray: any[], day: number, month: number, showSwitchDate: boolean, startDate: Date, endDate: Date, selectedDate: Date): any [] => {
  return MyArray?.filter((consumption: any) => {
    const consumptionDate = new Date(consumption.createdAt);
    if(showSwitchDate) {
      return consumptionDate >= startDate && consumptionDate <= endDate;
    } else {
      if (day.toString() === "jour" && month.toString() !== "mois") {
        const startDate = new Date(selectedDate);
        startDate.setDate(1);
        // I did this to prevent any errors with time
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        
        const endDate = new Date(selectedDate);
        endDate.setDate(31);
        // I did this to prevent any errors with time
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(0);
        return consumptionDate >= startDate && consumptionDate <= endDate;
      }
      if (month.toString() === "mois") {
        const startDate = new Date(selectedDate);
        startDate.setDate(1);
        startDate.setMonth(0);
        // I did this to prevent any errors with time
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        
        const endDate = new Date(selectedDate);
        endDate.setDate(31);
        endDate.setMonth(11);
        // I did this to prevent any errors with time
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(0);
        return consumptionDate >= startDate && consumptionDate <= endDate;
      }
      const selectedDateFormatted = formatDate(selectedDate.toString());
      const consumptionDateFormatted = formatDate(consumptionDate.toString());

      return consumptionDateFormatted === selectedDateFormatted;
    }
  })
}


export const formatDate = (dateString: string): string => {
  let result = ""
  if(dateString) {
    // options is explicitly typed as Intl.DateTimeFormatOptions
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const theDate = new Date(dateString).toLocaleDateString('en-US', options);
    const arrDate = theDate.split("/")
    result = `${arrDate[1]}/${arrDate[0]}/${arrDate[2]}`;
  }
  return result
};

export const formattedDate = (dateString: string) => {
  let result = ""
  if(dateString) {
    // options is explicitly typed as Intl.DateTimeFormatOptions
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const theDate = new Date(dateString).toLocaleDateString('en-US', options);
    const arrDate = theDate.split("/")
    result = `${arrDate[2]}-${arrDate[0]}-${arrDate[1]}`;
  }
  return result
};

export const removeComma = (num: number) => {
  return Number(num) - num === 0 ? Number(num) : num.toFixed(2)
}

export const RegNo = (num: number) => {
  switch(num?.toString().length) {
    case 1: return `000${num}`; 
    case 2: return `00${num}`; 
    case 3: return `0${num}`; 
    case 4: return `${num}`; 
    default: return num
  }
}


export const getRemainingDays = (dateString: string) => {
  if(dateString) {
    const givenDate = new Date(dateString);
    const now = new Date();
    const differenceInTime = givenDate.getTime() - now.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    const remainingDays = Math.ceil(differenceInDays);
  
    if(remainingDays < 7) {
      return `${remainingDays} jour${remainingDays > 1 ? "s" : ""}`;
    } else if(remainingDays < 30) {
      const numWeek = remainingDays / 7
      const days  = Math.ceil(numWeek) % 10
      return `${Number(numWeek)} semaine${numWeek > 1 ? "s" : ""} ${days} jour${days > 1 ? "s" : ""}`;
    } else if(remainingDays < 365) {
      const numMonth = remainingDays / 30
      const days  = Math.ceil(numMonth) % 10
      if(numMonth < 12) {
        return `${Number(numMonth)} mois ${days} jour${days > 1 ? "s" : ""}`;
      } else {
        const numYear = numMonth / 12
        return `${numYear}an${numYear > 1 ? "s" : ""} ${Number(numMonth)} mois ${days} jour${days > 1 ? "s" : ""}`;
      }
    } else {
      return `${remainingDays} jours`
    }
  }
}

export const COLORS = [
  "#f9ca24",
  "#ff4757",
  "#5352ed",
  "#70a1ff",
  "#f45e437d",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#2d3436",
  "#00b894",
  "#e17055",
  "#d63031",
  "#a29bfe",
  "#6ab04c",
  "#4834d4",
  "#f0932b",
  "#130f40",
  "#95afc0",
  "#205fe6",
  "#28deba",
  "#b9d79a",
  "#b32252",
  "#3a0d0d",
  "#f1e616",
  "#574f39",
  "#b32222",
  "#7b22b3",
  "#7b00ff",
  "#ffee00",
];



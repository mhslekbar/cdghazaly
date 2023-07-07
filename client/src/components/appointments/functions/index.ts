import { formatDate } from "../../../functions/functions";

export const getDateOfSpecificDay = (desiredDayOfWeek: number, desiredDate: any = null): string => {
  const currentDate = new Date(desiredDate); // start with current Date
  const currentDayOfWeek = currentDate.getDay();
  let difference = desiredDayOfWeek - currentDayOfWeek;
  if (difference < 0) {
    // difference += 7;
  }
  currentDate.setDate(currentDate.getDate() + difference);
  return currentDate.toString()
};

export const dateIsEqualToCurrentDate = (desiredDayOfWeek: number, desiredDate: any = null): string | null => {
  const currentDate = new Date(); // start with current Date
  const currentDayOfWeek = currentDate.getDay();
  let difference = desiredDayOfWeek - currentDayOfWeek;
  if(formatDate(desiredDate) !== formatDate(currentDate.toString())) {
    return null
  }
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

export let AddPlayTime = (time1: any, time2: any) => {
  let times = [time1, time2];
  let minutes = 0;

  // Loop through all the times
  times.forEach(function (time) {
    let [hour, minute] = time.split(":");
    minutes += parseInt(hour) * 60;
    minutes += parseInt(minute);
  });

  let hours = Math.floor(minutes / 60);
  minutes -= hours * 60;

  // Return the formatted time
  return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
};




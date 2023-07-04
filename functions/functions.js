const convertToHoursMins = (time) => {
  if (time < 1) {
    return;
  }
  const hours = Math.floor(time / 60);
  const minutes = Math.floor(time % 60);
  return `${hours}:${minutes}`;
};

const strToTime = (date) => {
  return date.getTime() / 1000
}

const AllDayOfWork = [
  { name: "Lundi", order: 0 },
  { name: "Mardi", order: 1 },
  { name: "Mercredi", order: 2 },
  { name: "Jeudi", order: 3 },
  { name: "Vendredi", order: 4 },
  { name: "Samedi", order: 5 },
]

module.exports = { convertToHoursMins, strToTime, AllDayOfWork}
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

module.exports = { convertToHoursMins, strToTime }
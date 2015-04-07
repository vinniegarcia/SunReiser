const dec2hms = (dec) => {
  // convert decimal time to
  // hour/minute/second representation
  return parseInt((dec - parseInt(dec)) * 60, 10);
};
const zeroPad = (num) => {
  num = parseInt(num, 10);
  return (num > 9) ? num : '0' + num;
};
const getHour = (time) => {
  return parseInt(time, 10);
};
const get12Hour = (hour24) => {
  if (hour24 < 1) return 12;
  if (hour24 > 12) return hour24 - 12;
  return hour24;
};
const getMeridian = (hour24) => {
  return (hour24 > 11 && hour24 < 24) ? 'pm' : 'am';
};

const convertTime = (originalTime) => {
  let time = '00:00:00'
  if (originalTime) {
    const hour24 = getHour(originalTime);
    const hour12 = get12Hour(hour24);
    const meridian = getMeridian(hour24);

    const minuteBasis = dec2hms(originalTime);
    const min = zeroPad(minuteBasis)

    const secondBasis = dec2hms(minuteBasis);
    const sec = zeroPad(secondBasis);

    time = `${hour12}:${min}:${sec} ${meridian}`;
  }
  return time;
};

export default convertTime;

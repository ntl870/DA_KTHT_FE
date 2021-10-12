import moment from "moment";

export const monthsArr: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const weekDaysArr: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const getAllWeekDay = (
  weekDay: number,
  month: number,
  year: number
): string[] => {
  const date = moment()
    .year(year)
    .month(monthsArr[month - 1])
    .day(weekDaysArr[weekDay !== 0 ? weekDay : 6]);

  const monthDate = date.month();
  const result: string[] = [];
  while (monthDate === date.month()) {
    result.push(date.toISOString().substring(0, 10));
    date.add(7, "d");
  }
  const firstDay = Number(result[0][8] + result[0][9]) - 7;
  if (Number(result[0][8] + result[0][9]) >= 8) {
    const missingDay = `${result[0].substring(0, 7)}-0${firstDay}`;
    result.unshift(missingDay);
  }
  return result;
};

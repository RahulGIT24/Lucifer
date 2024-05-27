export default function getDateAndTime(timestamp: Date) {

    const time = new Date(timestamp);
  // date
  const d: number = time.getDay();
  const m: number = time.getMonth();
  const days_of_week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months_of_year = [
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

  let day: string = "";

  for (let i = 0; i < days_of_week.length; i++) {
    if (i == d) {
      day = days_of_week[i];
      break;
    }
  }

  let month: string = "";
  for (let i = 0; i < months_of_year.length; i++) {
    if (i == m) {
      month = months_of_year[i];
      break;
    }
  }

  const date = time.getDate();
  const year = time.getFullYear();
  const finalDate = `${day}, ${date}-${month}-${year}`;

  // time
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const finalTime = `${hours}-${minutes}-${seconds}`;

  return { finalDate, finalTime };
}

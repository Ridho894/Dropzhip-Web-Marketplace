export const getFulldate = (date: number) => {
  let month = date.toString().substring(4, 6);
  let monthName = "";
  switch (month) {
    case "01":
      monthName = "Jan";
      break;
    case "02":
      monthName = "Feb";
      break;
    case "03":
      monthName = "Mar";
      break;
    case "04":
      monthName = "Apr";
      break;
    case "05":
      monthName = "May";
      break;
    case "06":
      monthName = "Jun";
      break;
    case "07":
      monthName = "Jul";
      break;
    case "08":
      monthName = "Aug";
      break;
    case "09":
      monthName = "Sep";
      break;
    case "10":
      monthName = "Oct";
      break;
    case "11":
      monthName = "Nov";
      break;
    case "12":
      monthName = "Dec";
      break;
  }
  const fullDate = `${date.toString().substring(6, 8)} ${monthName} ${date
    .toString()
    .substring(2, 4)}`;
  return fullDate;
};

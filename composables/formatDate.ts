type DateFormat =
  | "DD-MM-YY"
  | "DD-MM-YYYY"
  | "DD-MMM-YYYY"
  | "DD-MMM-YYYY MM:HH"
  | "YYYY-MM-DDTHH:MM"; // Added new format

export const useFormatDate = () => {
  const padZero = (number: number): string =>
    number < 10 ? `0${number}` : number.toString();

  const formatDate = (date: Date | string, format: DateFormat): string => {
    const d = new Date(date);
    const day = padZero(d.getDate());
    const month = padZero(d.getMonth() + 1);
    const year = d.getFullYear();
    const shortYear = year.toString().slice(-2);
    const hours = padZero(d.getHours());
    const minutes = padZero(d.getMinutes());
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const shortMonth = monthNames[d.getMonth()];

    switch (format) {
      case "DD-MM-YY":
        return `${day}-${month}-${shortYear}`;
      case "DD-MM-YYYY":
        return `${day}-${month}-${year}`;
      case "DD-MMM-YYYY":
        return `${day}-${shortMonth}-${year}`;
      case "DD-MMM-YYYY MM:HH":
        return `${day}-${shortMonth}-${year} ${hours}:${minutes}`;
      case "YYYY-MM-DDTHH:MM":
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      default:
        return date.toString();
    }
  };

  return {
    formatDate,
  };
};

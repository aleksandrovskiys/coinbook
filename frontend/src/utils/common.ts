export const snakeToReadable = (s: string): string => {
  const stringWithSpaces = s.replace(/_/g, " ");

  return stringWithSpaces.charAt(0).toUpperCase() + stringWithSpaces.substring(1);
};

export const dateToISODate = (date: Date): string => {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0];
};

export const snakeToReadable = (s: string): string => {
  const stringWithSpaces = s.replace(/_/g, " ");

  return stringWithSpaces.charAt(0).toUpperCase() + stringWithSpaces.substring(1);
};

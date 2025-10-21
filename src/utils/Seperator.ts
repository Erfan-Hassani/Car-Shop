export const formatWithSeparator = (value: string | number, separator = ",") => {
  return value
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};
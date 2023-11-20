export const formatToTime = (seconds: number): string => {
  const date = new Date(seconds * 1000);
  return new Intl.DateTimeFormat('default', { hour: '2-digit', minute: '2-digit' }).format(date);
};

export function getDailyTipIndex(length: number, date = new Date()) {
  if (length <= 0) return 0;
  const start = new Date(date.getFullYear(), 0, 0).getTime();
  const day = Math.floor((date.getTime() - start) / 86400000);
  return day % length;
}

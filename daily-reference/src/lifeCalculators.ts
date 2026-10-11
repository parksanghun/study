export function calculateDilution(totalMl: number, ratio: number) {
  if (!Number.isFinite(totalMl) || !Number.isFinite(ratio) || totalMl <= 0 || ratio <= 0) {
    return { concentrate: 0, water: 0 };
  }
  const concentrate = Math.round(totalMl / ratio);
  return { concentrate, water: totalMl - concentrate };
}

export function calculateBudgetBalance(income: number, fixed: number, variable: number) {
  return Math.max(0, income - fixed - variable);
}

export function addStorageDays(start: string, days: number) {
  const date = new Date(`${start}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isValidDateString(val: string): boolean {
  if (!val || typeof val !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(val)) {
    return false;
  }
  const [y, m, d] = val.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return (
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  );
}

export function isDateInPast(val: string): boolean {
  if (!isValidDateString(val)) return false;
  return val < getTodayDateString();
}

export function isEndDateBeforeStartDate(
  startDate: string,
  endDate: string
): boolean {
  if (!isValidDateString(startDate) || !isValidDateString(endDate)) {
    return false;
  }
  return endDate < startDate;
}

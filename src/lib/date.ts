import dayjs from "dayjs";

// Formats an ISO date string as e.g. "25 June 2026" (Indian day-month-year order).
export function formatDate(value?: string) {
  if (!value) return "";
  return dayjs(value).format("D MMMM YYYY");
}

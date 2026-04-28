export function createDateFromTimeString(timeString, dateString = null) {
  const [hours, minutes] = timeString.split(":").map(Number); // Extract hours & minutes "HH:mm"
  const date = dateString ? new Date(dateString) : new Date(); // Use provided date in format "2025-05-10" or default to today
  date.setHours(hours, minutes, 0, 0); // Set extracted time (HH:mm:00.000)

  return date;
}

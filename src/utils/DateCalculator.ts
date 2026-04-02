export const getDeliveryDateFromPickup = (
  pickupDate: string,
  daysToAdd = 2
) => {
  if (!pickupDate) return ""

  const date = new Date(pickupDate)
  date.setDate(date.getDate() + daysToAdd)

  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}


export const getRemainingDays = (futureDate?: string) => {
  if (!futureDate) {
    return { days: 0, message: "Invalid date" }
  }

  // today (local)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // parse YYYY-MM-DD as local date (NOT UTC)
  const [year, month, day] = futureDate.split("-").map(Number)
  const target = new Date(year, month - 1, day)
  target.setHours(0, 0, 0, 0)

  const diffMs = target.getTime() - today.getTime()
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  //  exceeded case
  if (diffDays < 0) {
    return {
      days: 0,
      message: "Sorry, the expected delivery date has passed. Please contact support for assistance.",
    }
  }

  // today case
  if (diffDays === 0) {
    return {
      days: 0,
      message: "Due today",
    }
  }

  // future case
  return {
    days: diffDays,
    message: `${diffDays} day${diffDays > 1 ? "s" : ""} remaining`,
  }
}
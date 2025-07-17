// Simplified booking data integration
interface SimplifiedBookingSlot {
  courtId: string
  date: string
  time: string
  duration: number
}

// Update OCCUPIED_SLOTS to use hourly time slots (7:00-23:00) instead of 30-minute slots
const OCCUPIED_SLOTS: SimplifiedBookingSlot[] = [
  // JULY 3rd DATA - Updated to hourly slots
  { courtId: "melbourne", date: "2025-07-03", time: "08:00", duration: 60 },
  { courtId: "melbourne", date: "2025-07-03", time: "12:00", duration: 120 },
  { courtId: "melbourne", date: "2025-07-03", time: "13:00", duration: 120 },
  { courtId: "melbourne", date: "2025-07-03", time: "18:00", duration: 180 },
  { courtId: "melbourne", date: "2025-07-03", time: "19:00", duration: 180 },
  { courtId: "melbourne", date: "2025-07-03", time: "20:00", duration: 180 },

  { courtId: "paris", date: "2025-07-03", time: "09:00", duration: 120 },
  { courtId: "paris", date: "2025-07-03", time: "10:00", duration: 120 },
  { courtId: "paris", date: "2025-07-03", time: "14:00", duration: 60 },
  { courtId: "paris", date: "2025-07-03", time: "18:00", duration: 120 },
  { courtId: "paris", date: "2025-07-03", time: "19:00", duration: 120 },
  { courtId: "paris", date: "2025-07-03", time: "21:00", duration: 60 },

  { courtId: "london", date: "2025-07-03", time: "11:00", duration: 60 },
  { courtId: "london", date: "2025-07-03", time: "15:00", duration: 60 },
  { courtId: "london", date: "2025-07-03", time: "18:00", duration: 60 },
  { courtId: "london", date: "2025-07-03", time: "20:00", duration: 120 },
  { courtId: "london", date: "2025-07-03", time: "21:00", duration: 120 },

  { courtId: "newyork", date: "2025-07-03", time: "12:00", duration: 60 },
  { courtId: "newyork", date: "2025-07-03", time: "16:00", duration: 120 },
  { courtId: "newyork", date: "2025-07-03", time: "17:00", duration: 120 },
  { courtId: "newyork", date: "2025-07-03", time: "19:00", duration: 120 },
  { courtId: "newyork", date: "2025-07-03", time: "20:00", duration: 120 },
  { courtId: "newyork", date: "2025-07-03", time: "22:00", duration: 60 },

  // JULY 9th DATA - Updated to hourly slots
  { courtId: "melbourne", date: "2025-07-09", time: "09:00", duration: 120 },
  { courtId: "melbourne", date: "2025-07-09", time: "10:00", duration: 120 },
  { courtId: "melbourne", date: "2025-07-09", time: "16:00", duration: 60 },
  { courtId: "melbourne", date: "2025-07-09", time: "20:00", duration: 60 },

  { courtId: "paris", date: "2025-07-09", time: "10:00", duration: 60 },
  { courtId: "paris", date: "2025-07-09", time: "18:00", duration: 60 },

  { courtId: "london", date: "2025-07-09", time: "12:00", duration: 60 },
  { courtId: "london", date: "2025-07-09", time: "19:00", duration: 180 },
  { courtId: "london", date: "2025-07-09", time: "20:00", duration: 180 },
  { courtId: "london", date: "2025-07-09", time: "21:00", duration: 180 },

  { courtId: "newyork", date: "2025-07-09", time: "13:00", duration: 120 },
  { courtId: "newyork", date: "2025-07-09", time: "14:00", duration: 120 },
  { courtId: "newyork", date: "2025-07-09", time: "15:00", duration: 60 },
  { courtId: "newyork", date: "2025-07-09", time: "19:00", duration: 120 },
  { courtId: "newyork", date: "2025-07-09", time: "20:00", duration: 120 },
  { courtId: "newyork", date: "2025-07-09", time: "21:00", duration: 60 },

  // JULY 17th DATA - Today's data
  { courtId: "melbourne", date: "2025-07-17", time: "09:00", duration: 120 },
  { courtId: "melbourne", date: "2025-07-17", time: "10:00", duration: 120 },
  { courtId: "melbourne", date: "2025-07-17", time: "15:00", duration: 60 },
  { courtId: "melbourne", date: "2025-07-17", time: "20:00", duration: 60 },

  { courtId: "paris", date: "2025-07-17", time: "11:00", duration: 60 },
  { courtId: "paris", date: "2025-07-17", time: "16:00", duration: 120 },
  { courtId: "paris", date: "2025-07-17", time: "17:00", duration: 120 },
  { courtId: "paris", date: "2025-07-17", time: "21:00", duration: 60 },

  { courtId: "london", date: "2025-07-17", time: "12:00", duration: 60 },
  { courtId: "london", date: "2025-07-17", time: "17:00", duration: 60 },
  { courtId: "london", date: "2025-07-17", time: "21:00", duration: 60 },

  { courtId: "newyork", date: "2025-07-17", time: "12:00", duration: 60 },
  { courtId: "newyork", date: "2025-07-17", time: "18:00", duration: 180 },
  { courtId: "newyork", date: "2025-07-17", time: "19:00", duration: 180 },
  { courtId: "newyork", date: "2025-07-17", time: "20:00", duration: 180 },
]

// Keep existing interfaces for compatibility
export interface AdminBookingSlot {
  id: string
  courtId: string
  date: string
  time: string
  status: "free" | "court_paid" | "court_unpaid" | "training_paid" | "training_unpaid" | "trainer_reserved" | "blocked"
  clientName?: string
  clientPhone?: string
  clientEmail?: string
  trainerName?: string
  price?: number
  duration?: number
  notes?: string
  blockReason?: string
}

export interface AdminCourt {
  id: string
  name: string
  type: "clay" | "hard" | "indoor"
  basePrice: number
}

// Admin panel courts data
export const ADMIN_COURTS: AdminCourt[] = [
  { id: "melbourne", name: "Мельбурн", type: "hard", basePrice: 2100 },
  { id: "paris", name: "Париж", type: "clay", basePrice: 2100 },
  { id: "london", name: "Лондон", type: "hard", basePrice: 2100 },
  { id: "newyork", name: "Нью-Йорк", type: "indoor", basePrice: 2100 },
]

// Utility functions for admin data integration
export const isSlotOccupied = (courtId: string, date: string, time: string): boolean => {
  return OCCUPIED_SLOTS.some((slot) => slot.courtId === courtId && slot.date === date && slot.time === time)
}

export const getAdminSlotPrice = (courtId: string, time: string, date?: Date): number => {
  const hour = Number.parseInt(time.split(":")[0])
  const isWeekend = date ? [0, 6].includes(date.getDay()) : false

  if (isWeekend) {
    return 2100 // Flat rate for weekends
  }

  // Weekday pricing
  if ((hour >= 7 && hour < 17) || (hour >= 22 && hour <= 23)) {
    return 2100
  } else if (hour >= 17 && hour < 22) {
    return 2300
  }

  return 2100
}

export const getOccupancyRate = (date: string): number => {
  const totalSlots = ADMIN_COURTS.length * 28 // 28 time slots per day
  const occupiedSlots = OCCUPIED_SLOTS.filter((slot) => slot.date === date).length

  return Math.round((occupiedSlots / totalSlots) * 100)
}

export const getDailyRevenue = (date: string): number => {
  return OCCUPIED_SLOTS.filter((slot) => slot.date === date).reduce((sum, slot) => {
    const price = getAdminSlotPrice(slot.courtId, slot.time)
    return sum + price
  }, 0)
}

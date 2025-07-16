// Simplified booking data integration
interface SimplifiedBookingSlot {
  courtId: string
  date: string
  time: string
  duration: number
}

const OCCUPIED_SLOTS: SimplifiedBookingSlot[] = [
  // JULY 3rd DATA
  { courtId: "1", date: "2025-07-03", time: "08:00", duration: 60 },
  { courtId: "1", date: "2025-07-03", time: "08:30", duration: 60 },
  { courtId: "2", date: "2025-07-03", time: "09:00", duration: 90 },
  { courtId: "2", date: "2025-07-03", time: "09:30", duration: 90 },
  { courtId: "2", date: "2025-07-03", time: "10:00", duration: 90 },
  { courtId: "3", date: "2025-07-03", time: "10:30", duration: 60 },
  { courtId: "3", date: "2025-07-03", time: "11:00", duration: 60 },
  { courtId: "4", date: "2025-07-03", time: "11:30", duration: 60 },
  { courtId: "1", date: "2025-07-03", time: "12:00", duration: 90 },
  { courtId: "1", date: "2025-07-03", time: "12:30", duration: 90 },
  { courtId: "1", date: "2025-07-03", time: "13:00", duration: 90 },
  { courtId: "2", date: "2025-07-03", time: "13:30", duration: 60 },
  { courtId: "2", date: "2025-07-03", time: "14:00", duration: 60 },
  { courtId: "3", date: "2025-07-03", time: "14:30", duration: 60 },
  { courtId: "3", date: "2025-07-03", time: "15:00", duration: 60 },
  { courtId: "4", date: "2025-07-03", time: "15:30", duration: 90 },
  { courtId: "4", date: "2025-07-03", time: "16:00", duration: 90 },
  { courtId: "4", date: "2025-07-03", time: "16:30", duration: 90 },
  { courtId: "5", date: "2025-07-03", time: "17:00", duration: 60 },
  { courtId: "5", date: "2025-07-03", time: "17:30", duration: 60 },
  { courtId: "1", date: "2025-07-03", time: "18:00", duration: 120 },
  { courtId: "1", date: "2025-07-03", time: "18:30", duration: 120 },
  { courtId: "1", date: "2025-07-03", time: "19:00", duration: 120 },
  { courtId: "1", date: "2025-07-03", time: "19:30", duration: 120 },
  { courtId: "2", date: "2025-07-03", time: "18:30", duration: 90 },
  { courtId: "2", date: "2025-07-03", time: "19:00", duration: 90 },
  { courtId: "2", date: "2025-07-03", time: "19:30", duration: 90 },
  { courtId: "3", date: "2025-07-03", time: "18:00", duration: 60 },
  { courtId: "3", date: "2025-07-03", time: "18:30", duration: 60 },
  { courtId: "3", date: "2025-07-03", time: "19:30", duration: 60 },
  { courtId: "3", date: "2025-07-03", time: "20:00", duration: 60 },
  { courtId: "4", date: "2025-07-03", time: "19:00", duration: 90 },
  { courtId: "4", date: "2025-07-03", time: "19:30", duration: 90 },
  { courtId: "4", date: "2025-07-03", time: "20:00", duration: 90 },
  { courtId: "5", date: "2025-07-03", time: "18:30", duration: 90 },
  { courtId: "5", date: "2025-07-03", time: "19:00", duration: 90 },
  { courtId: "5", date: "2025-07-03", time: "19:30", duration: 90 },
  { courtId: "5", date: "2025-07-03", time: "20:30", duration: 60 },
  { courtId: "5", date: "2025-07-03", time: "21:00", duration: 60 },
  { courtId: "2", date: "2025-07-03", time: "20:30", duration: 60 },
  { courtId: "2", date: "2025-07-03", time: "21:00", duration: 60 },
  { courtId: "1", date: "2025-07-03", time: "20:30", duration: 60 },
  { courtId: "1", date: "2025-07-03", time: "21:00", duration: 60 },

  // JULY 9th DATA
  { courtId: "1", date: "2025-07-09", time: "08:30", duration: 90 },
  { courtId: "1", date: "2025-07-09", time: "09:00", duration: 90 },
  { courtId: "1", date: "2025-07-09", time: "09:30", duration: 90 },
  { courtId: "2", date: "2025-07-09", time: "10:00", duration: 60 },
  { courtId: "2", date: "2025-07-09", time: "10:30", duration: 60 },
  { courtId: "3", date: "2025-07-09", time: "11:30", duration: 60 },
  { courtId: "4", date: "2025-07-09", time: "13:00", duration: 90 },
  { courtId: "4", date: "2025-07-09", time: "13:30", duration: 90 },
  { courtId: "4", date: "2025-07-09", time: "14:00", duration: 90 },
  { courtId: "5", date: "2025-07-09", time: "14:30", duration: 60 },
  { courtId: "5", date: "2025-07-09", time: "15:00", duration: 60 },
  { courtId: "1", date: "2025-07-09", time: "16:00", duration: 60 },
  { courtId: "1", date: "2025-07-09", time: "16:30", duration: 60 },
  { courtId: "2", date: "2025-07-09", time: "17:30", duration: 60 },
  { courtId: "2", date: "2025-07-09", time: "18:00", duration: 60 },
  { courtId: "3", date: "2025-07-09", time: "18:30", duration: 120 },
  { courtId: "3", date: "2025-07-09", time: "19:00", duration: 120 },
  { courtId: "3", date: "2025-07-09", time: "19:30", duration: 120 },
  { courtId: "3", date: "2025-07-09", time: "20:00", duration: 120 },
  { courtId: "4", date: "2025-07-09", time: "19:00", duration: 90 },
  { courtId: "4", date: "2025-07-09", time: "19:30", duration: 90 },
  { courtId: "4", date: "2025-07-09", time: "20:00", duration: 90 },
  { courtId: "5", date: "2025-07-09", time: "20:30", duration: 60 },
  { courtId: "5", date: "2025-07-09", time: "21:00", duration: 60 },

  // JULY 12th DATA
  { courtId: "1", date: "2025-07-12", time: "08:00", duration: 90 },
  { courtId: "1", date: "2025-07-12", time: "08:30", duration: 90 },
  { courtId: "1", date: "2025-07-12", time: "09:00", duration: 90 },
  { courtId: "2", date: "2025-07-12", time: "09:30", duration: 60 },
  { courtId: "2", date: "2025-07-12", time: "10:00", duration: 60 },
  { courtId: "3", date: "2025-07-12", time: "10:30", duration: 120 },
  { courtId: "3", date: "2025-07-12", time: "11:00", duration: 120 },
  { courtId: "3", date: "2025-07-12", time: "11:30", duration: 120 },
  { courtId: "3", date: "2025-07-12", time: "12:00", duration: 120 },
  { courtId: "4", date: "2025-07-12", time: "11:00", duration: 90 },
  { courtId: "4", date: "2025-07-12", time: "11:30", duration: 90 },
  { courtId: "4", date: "2025-07-12", time: "12:00", duration: 90 },
  { courtId: "5", date: "2025-07-12", time: "12:30", duration: 60 },
  { courtId: "5", date: "2025-07-12", time: "13:00", duration: 60 },
  { courtId: "1", date: "2025-07-12", time: "14:00", duration: 90 },
  { courtId: "1", date: "2025-07-12", time: "14:30", duration: 90 },
  { courtId: "1", date: "2025-07-12", time: "15:00", duration: 90 },
  { courtId: "2", date: "2025-07-12", time: "15:30", duration: 60 },
  { courtId: "2", date: "2025-07-12", time: "16:00", duration: 60 },
  { courtId: "3", date: "2025-07-12", time: "16:30", duration: 60 },
  { courtId: "3", date: "2025-07-12", time: "17:00", duration: 60 },
  { courtId: "4", date: "2025-07-12", time: "17:30", duration: 90 },
  { courtId: "4", date: "2025-07-12", time: "18:00", duration: 90 },
  { courtId: "4", date: "2025-07-12", time: "18:30", duration: 90 },
  { courtId: "5", date: "2025-07-12", time: "19:00", duration: 90 },
  { courtId: "5", date: "2025-07-12", time: "19:30", duration: 90 },
  { courtId: "5", date: "2025-07-12", time: "20:00", duration: 90 },
  { courtId: "1", date: "2025-07-12", time: "20:30", duration: 60 },
  { courtId: "1", date: "2025-07-12", time: "21:00", duration: 60 },
  { courtId: "2", date: "2025-07-12", time: "20:00", duration: 90 },
  { courtId: "2", date: "2025-07-12", time: "20:30", duration: 90 },
  { courtId: "2", date: "2025-07-12", time: "21:00", duration: 90 },

  // JULY 14th DATA
  { courtId: "2", date: "2025-07-14", time: "08:00", duration: 60 },
  { courtId: "2", date: "2025-07-14", time: "08:30", duration: 60 },
  { courtId: "3", date: "2025-07-14", time: "09:00", duration: 60 },
  { courtId: "3", date: "2025-07-14", time: "09:30", duration: 60 },
  { courtId: "4", date: "2025-07-14", time: "10:30", duration: 90 },
  { courtId: "4", date: "2025-07-14", time: "11:00", duration: 90 },
  { courtId: "4", date: "2025-07-14", time: "11:30", duration: 90 },
  { courtId: "5", date: "2025-07-14", time: "11:00", duration: 90 },
  { courtId: "5", date: "2025-07-14", time: "11:30", duration: 90 },
  { courtId: "5", date: "2025-07-14", time: "12:00", duration: 90 },
  { courtId: "1", date: "2025-07-14", time: "13:30", duration: 90 },
  { courtId: "1", date: "2025-07-14", time: "14:00", duration: 90 },
  { courtId: "1", date: "2025-07-14", time: "14:30", duration: 90 },
  { courtId: "2", date: "2025-07-14", time: "15:00", duration: 60 },
  { courtId: "2", date: "2025-07-14", time: "15:30", duration: 60 },
  { courtId: "3", date: "2025-07-14", time: "16:00", duration: 90 },
  { courtId: "3", date: "2025-07-14", time: "16:30", duration: 90 },
  { courtId: "3", date: "2025-07-14", time: "17:00", duration: 90 },
  { courtId: "4", date: "2025-07-14", time: "17:30", duration: 120 },
  { courtId: "4", date: "2025-07-14", time: "18:00", duration: 120 },
  { courtId: "4", date: "2025-07-14", time: "18:30", duration: 120 },
  { courtId: "4", date: "2025-07-14", time: "19:00", duration: 120 },
  { courtId: "5", date: "2025-07-14", time: "18:30", duration: 60 },
  { courtId: "5", date: "2025-07-14", time: "19:00", duration: 60 },
  { courtId: "1", date: "2025-07-14", time: "19:30", duration: 90 },
  { courtId: "1", date: "2025-07-14", time: "20:00", duration: 90 },
  { courtId: "1", date: "2025-07-14", time: "20:30", duration: 90 },
  { courtId: "2", date: "2025-07-14", time: "20:00", duration: 60 },
  { courtId: "2", date: "2025-07-14", time: "20:30", duration: 60 },
  { courtId: "3", date: "2025-07-14", time: "21:00", duration: 60 },
  { courtId: "3", date: "2025-07-14", time: "21:30", duration: 60 },

  // JULY 17th DATA
  { courtId: "1", date: "2025-07-17", time: "08:30", duration: 90 },
  { courtId: "1", date: "2025-07-17", time: "09:00", duration: 90 },
  { courtId: "1", date: "2025-07-17", time: "09:30", duration: 90 },
  { courtId: "2", date: "2025-07-17", time: "10:00", duration: 60 },
  { courtId: "2", date: "2025-07-17", time: "10:30", duration: 60 },
  { courtId: "3", date: "2025-07-17", time: "11:00", duration: 60 },
  { courtId: "3", date: "2025-07-17", time: "11:30", duration: 60 },
  { courtId: "4", date: "2025-07-17", time: "12:00", duration: 60 },
  { courtId: "5", date: "2025-07-17", time: "12:30", duration: 90 },
  { courtId: "5", date: "2025-07-17", time: "13:00", duration: 90 },
  { courtId: "5", date: "2025-07-17", time: "13:30", duration: 90 },
  { courtId: "1", date: "2025-07-17", time: "14:30", duration: 60 },
  { courtId: "1", date: "2025-07-17", time: "15:00", duration: 60 },
  { courtId: "2", date: "2025-07-17", time: "15:30", duration: 90 },
  { courtId: "2", date: "2025-07-17", time: "16:00", duration: 90 },
  { courtId: "2", date: "2025-07-17", time: "16:30", duration: 90 },
  { courtId: "3", date: "2025-07-17", time: "17:00", duration: 60 },
  { courtId: "3", date: "2025-07-17", time: "17:30", duration: 60 },
  { courtId: "4", date: "2025-07-17", time: "18:00", duration: 120 },
  { courtId: "4", date: "2025-07-17", time: "18:30", duration: 120 },
  { courtId: "4", date: "2025-07-17", time: "19:00", duration: 120 },
  { courtId: "4", date: "2025-07-17", time: "19:30", duration: 120 },
  { courtId: "5", date: "2025-07-17", time: "18:30", duration: 90 },
  { courtId: "5", date: "2025-07-17", time: "19:00", duration: 90 },
  { courtId: "5", date: "2025-07-17", time: "19:30", duration: 90 },
  { courtId: "1", date: "2025-07-17", time: "20:00", duration: 60 },
  { courtId: "1", date: "2025-07-17", time: "20:30", duration: 60 },
  { courtId: "2", date: "2025-07-17", time: "20:30", duration: 60 },
  { courtId: "2", date: "2025-07-17", time: "21:00", duration: 60 },
  { courtId: "3", date: "2025-07-17", time: "21:00", duration: 60 },
  { courtId: "3", date: "2025-07-17", time: "21:30", duration: 60 },
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
  { id: "1", name: "Корт 1 (Хард)", type: "hard", basePrice: 600 },
  { id: "2", name: "Корт 2 (Хард)", type: "hard", basePrice: 480 },
  { id: "3", name: "Корт 3 (Грунт)", type: "clay", basePrice: 720 },
  { id: "4", name: "Корт 4 (Грунт)", type: "clay", basePrice: 600 },
  { id: "5", name: "Корт 5 (Крытый)", type: "indoor", basePrice: 480 },
]

// Utility functions for admin data integration
export const isSlotOccupied = (courtId: string, date: string, time: string): boolean => {
  return OCCUPIED_SLOTS.some((slot) => slot.courtId === courtId && slot.date === date && slot.time === time)
}

export const getAdminSlotPrice = (courtId: string, time: string): number => {
  const court = ADMIN_COURTS.find((c) => c.id === courtId)
  if (!court) return 0

  const hour = Number.parseInt(time.split(":")[0])
  let multiplier = 1.0

  // Time-based pricing from admin system
  if (hour >= 8 && hour < 16) {
    multiplier = 0.8 // off-peak
  } else if (hour >= 16 && hour < 19) {
    multiplier = 1.0 // standard
  } else if (hour >= 19 && hour < 22) {
    multiplier = 1.3 // peak
  }

  return Math.round(court.basePrice * multiplier)
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

// Updated court configuration per PRD
export interface AdminCourt {
  id: string
  name: string
  type: "clay" | "hard" | "indoor"
  basePrice: number
}

// New courts with international city names
export const ADMIN_COURTS: AdminCourt[] = [
  { id: "1", name: "Мельбурн", type: "hard", basePrice: 2100 },
  { id: "2", name: "Париж", type: "clay", basePrice: 2100 },
  { id: "3", name: "Лондон", type: "hard", basePrice: 2100 },
  { id: "4", name: "Нью-Йорк", type: "indoor", basePrice: 2100 },
]

// Generate hourly time slots (7:00-23:00)
export const generateHourlyTimeSlots = (): string[] => {
  const slots: string[] = []
  for (let hour = 7; hour <= 23; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`)
  }
  return slots
}

// Pricing logic per PRD specifications
export const calculateSlotPrice = (time: string, date: Date | string): number => {
  const hour = Number.parseInt(time.split(":")[0])

  // Convert string to Date if needed
  const dateObj = typeof date === "string" ? new Date(date) : date
  const dayOfWeek = dateObj.getDay()
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

  if (isWeekend) {
    return 2100 // Flat rate for weekends
  }

  // Weekday pricing
  if ((hour >= 7 && hour < 17) || (hour >= 22 && hour <= 23)) {
    return 2100 // Off-peak
  } else if (hour >= 17 && hour < 22) {
    return 2300 // Peak
  }

  return 2100 // Default fallback
}

// Generate random occupancy (60-70% as specified)
export const generateOccupiedSlots = (date: string, targetOccupancy = 0.65): string[] => {
  const occupiedSlots: string[] = []
  const timeSlots = generateHourlyTimeSlots()

  ADMIN_COURTS.forEach((court) => {
    timeSlots.forEach((timeSlot) => {
      if (Math.random() < targetOccupancy) {
        occupiedSlots.push(`${court.id}-${timeSlot}`)
      }
    })
  })

  return occupiedSlots
}

// Check if slot is occupied
export const isSlotOccupied = (courtId: string, date: string, time: string): boolean => {
  const occupiedSlots = generateOccupiedSlots(date)
  return occupiedSlots.includes(`${courtId}-${time}`)
}

// Get slot price (wrapper for calculateSlotPrice)
export const getAdminSlotPrice = (courtId: string, time: string, date: Date = new Date()): number => {
  return calculateSlotPrice(time, date)
}

// Utility functions for compatibility
export const getOccupancyRate = (date: string): number => {
  const totalSlots = ADMIN_COURTS.length * generateHourlyTimeSlots().length
  const occupiedSlots = generateOccupiedSlots(date).length
  return Math.round((occupiedSlots / totalSlots) * 100)
}

export const getDailyRevenue = (date: string): number => {
  const occupiedSlots = generateOccupiedSlots(date)
  const dateObj = new Date(date)

  return occupiedSlots.reduce((sum, slotKey) => {
    const [courtId, time] = slotKey.split("-")
    const price = calculateSlotPrice(time, dateObj)
    return sum + price
  }, 0)
}

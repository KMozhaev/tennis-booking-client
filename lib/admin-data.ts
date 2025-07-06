// Admin panel data synchronization
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

// Admin panel booking data - synchronized from admin system
export const ADMIN_BOOKING_DATA: AdminBookingSlot[] = [
  // July 7th, 2025 - Current day data
  {
    id: "demo_101",
    courtId: "1",
    date: "2025-07-07",
    time: "08:00",
    status: "court_paid",
    clientName: "Анна Петрова",
    clientPhone: "+7 916 123-45-67",
    price: 1200,
    duration: 60,
  },
  {
    id: "demo_102",
    courtId: "1",
    date: "2025-07-07",
    time: "08:30",
    status: "court_paid",
    clientName: "Анна Петрова",
    clientPhone: "+7 916 123-45-67",
    price: 0,
    duration: 60,
  },
  {
    id: "demo_103",
    courtId: "2",
    date: "2025-07-07",
    time: "09:00",
    status: "training_paid",
    trainerName: "Дмитрий Козлов",
    clientName: "Михаил Иванов",
    clientPhone: "+7 903 987-65-43",
    price: 2500,
    duration: 90,
  },
  {
    id: "demo_104",
    courtId: "2",
    date: "2025-07-07",
    time: "09:30",
    status: "training_paid",
    trainerName: "Дмитрий Козлов",
    clientName: "Михаил Иванов",
    clientPhone: "+7 903 987-65-43",
    price: 0,
    duration: 90,
  },
  {
    id: "demo_105",
    courtId: "2",
    date: "2025-07-07",
    time: "10:00",
    status: "training_paid",
    trainerName: "Дмитрий Козлов",
    clientName: "Михаил Иванов",
    clientPhone: "+7 903 987-65-43",
    price: 0,
    duration: 90,
  },
  {
    id: "demo_106",
    courtId: "3",
    date: "2025-07-07",
    time: "10:30",
    status: "court_unpaid",
    clientName: "Елена Смирнова",
    clientPhone: "+7 925 456-78-90",
    price: 1440,
    duration: 60,
  },
  {
    id: "demo_107",
    courtId: "3",
    date: "2025-07-07",
    time: "11:00",
    status: "court_unpaid",
    clientName: "Елена Смирнова",
    clientPhone: "+7 925 456-78-90",
    price: 0,
    duration: 60,
  },
  {
    id: "demo_108",
    courtId: "4",
    date: "2025-07-07",
    time: "11:30",
    status: "trainer_reserved",
    trainerName: "Анна Петрова",
    duration: 60,
  },
  {
    id: "demo_109",
    courtId: "1",
    date: "2025-07-07",
    time: "12:00",
    status: "court_paid",
    clientName: "Игорь Соколов",
    clientPhone: "+7 921 456-78-90",
    price: 1200,
    duration: 90,
  },
  {
    id: "demo_110",
    courtId: "1",
    date: "2025-07-07",
    time: "12:30",
    status: "court_paid",
    clientName: "Игорь Соколов",
    clientPhone: "+7 921 456-78-90",
    price: 0,
    duration: 90,
  },
  {
    id: "demo_111",
    courtId: "1",
    date: "2025-07-07",
    time: "13:00",
    status: "court_paid",
    clientName: "Игорь Соколов",
    clientPhone: "+7 921 456-78-90",
    price: 0,
    duration: 90,
  },
  {
    id: "demo_112",
    courtId: "2",
    date: "2025-07-07",
    time: "13:30",
    status: "training_unpaid",
    trainerName: "Елена Сидорова",
    clientName: "Мария Федорова",
    clientPhone: "+7 915 789-01-23",
    price: 2200,
    duration: 60,
  },
  {
    id: "demo_113",
    courtId: "2",
    date: "2025-07-07",
    time: "14:00",
    status: "training_unpaid",
    trainerName: "Елена Сидорова",
    clientName: "Мария Федорова",
    clientPhone: "+7 915 789-01-23",
    price: 0,
    duration: 60,
  },
  {
    id: "demo_114",
    courtId: "3",
    date: "2025-07-07",
    time: "14:30",
    status: "court_paid",
    clientName: "Сергей Николаев",
    clientPhone: "+7 926 678-90-12",
    price: 1440,
    duration: 60,
  },
  {
    id: "demo_115",
    courtId: "3",
    date: "2025-07-07",
    time: "15:00",
    status: "court_paid",
    clientName: "Сергей Николаев",
    clientPhone: "+7 926 678-90-12",
    price: 0,
    duration: 60,
  },
  {
    id: "demo_116",
    courtId: "4",
    date: "2025-07-07",
    time: "15:30",
    status: "training_paid",
    trainerName: "Михаил Иванов",
    clientName: "Татьяна Морозова",
    clientPhone: "+7 918 345-67-89",
    price: 2800,
    duration: 90,
  },
  {
    id: "demo_117",
    courtId: "4",
    date: "2025-07-07",
    time: "16:00",
    status: "training_paid",
    trainerName: "Михаил Иванов",
    clientName: "Татьяна Морозова",
    clientPhone: "+7 918 345-67-89",
    price: 0,
    duration: 90,
  },
  {
    id: "demo_118",
    courtId: "4",
    date: "2025-07-07",
    time: "16:30",
    status: "training_paid",
    trainerName: "Михаил Иванов",
    clientName: "Татьяна Морозова",
    clientPhone: "+7 918 345-67-89",
    price: 0,
    duration: 90,
  },
  {
    id: "demo_119",
    courtId: "5",
    date: "2025-07-07",
    time: "17:00",
    status: "court_unpaid",
    clientName: "Александр Волков",
    clientPhone: "+7 909 234-56-78",
    price: 960,
    duration: 60,
  },
  {
    id: "demo_120",
    courtId: "5",
    date: "2025-07-07",
    time: "17:30",
    status: "court_unpaid",
    clientName: "Александр Волков",
    clientPhone: "+7 909 234-56-78",
    price: 0,
    duration: 60,
  },
  {
    id: "demo_121",
    courtId: "1",
    date: "2025-07-07",
    time: "18:00",
    status: "training_paid",
    trainerName: "Дмитрий Козлов",
    clientName: "Виктор Петров",
    clientPhone: "+7 916 111-22-33",
    price: 3000,
    duration: 120,
  },
  {
    id: "demo_122",
    courtId: "1",
    date: "2025-07-07",
    time: "18:30",
    status: "training_paid",
    trainerName: "Дмитрий Козлов",
    clientName: "Виктор Петров",
    clientPhone: "+7 916 111-22-33",
    price: 0,
    duration: 120,
  },
  {
    id: "demo_123",
    courtId: "1",
    date: "2025-07-07",
    time: "19:00",
    status: "training_paid",
    trainerName: "Дмитрий Козлов",
    clientName: "Виктор Петров",
    clientPhone: "+7 916 111-22-33",
    price: 0,
    duration: 120,
  },
  {
    id: "demo_124",
    courtId: "1",
    date: "2025-07-07",
    time: "19:30",
    status: "training_paid",
    trainerName: "Дмитрий Козлов",
    clientName: "Виктор Петров",
    clientPhone: "+7 916 111-22-33",
    price: 0,
    duration: 120,
  },
  {
    id: "demo_125",
    courtId: "2",
    date: "2025-07-07",
    time: "18:30",
    status: "court_paid",
    clientName: "Наталья Кузнецова",
    clientPhone: "+7 925 444-55-66",
    price: 1560,
    duration: 90,
  },
  {
    id: "demo_126",
    courtId: "2",
    date: "2025-07-07",
    time: "19:00",
    status: "court_paid",
    clientName: "Наталья Кузнецова",
    clientPhone: "+7 925 444-55-66",
    price: 0,
    duration: 90,
  },
  {
    id: "demo_127",
    courtId: "2",
    date: "2025-07-07",
    time: "19:30",
    status: "court_paid",
    clientName: "Наталья Кузнецова",
    clientPhone: "+7 925 444-55-66",
    price: 0,
    duration: 90,
  },
  {
    id: "demo_128",
    courtId: "3",
    date: "2025-07-07",
    time: "18:00",
    status: "training_unpaid",
    trainerName: "Анна Петрова",
    clientName: "Олег Смирнов",
    clientPhone: "+7 917 777-88-99",
    price: 2500,
    duration: 60,
  },
  {
    id: "demo_129",
    courtId: "3",
    date: "2025-07-07",
    time: "18:30",
    status: "training_unpaid",
    trainerName: "Анна Петрова",
    clientName: "Олег Смирнов",
    clientPhone: "+7 917 777-88-99",
    price: 0,
    duration: 60,
  },
  {
    id: "demo_130",
    courtId: "3",
    date: "2025-07-07",
    time: "19:30",
    status: "court_paid",
    clientName: "Ирина Васильева",
    clientPhone: "+7 903 333-44-55",
    price: 1872,
    duration: 60,
  },
  {
    id: "demo_131",
    courtId: "3",
    date: "2025-07-07",
    time: "20:00",
    status: "court_paid",
    clientName: "Ирина Васильева",
    clientPhone: "+7 903 333-44-55",
    price: 0,
    duration: 60,
  },
  {
    id: "demo_132",
    courtId: "4",
    date: "2025-07-07",
    time: "19:00",
    status: "trainer_reserved",
    trainerName: "Елена Сидорова",
    duration: 90,
  },
  {
    id: "demo_133",
    courtId: "4",
    date: "2025-07-07",
    time: "19:30",
    status: "trainer_reserved",
    trainerName: "Елена Сидорова",
    duration: 90,
  },
  {
    id: "demo_134",
    courtId: "4",
    date: "2025-07-07",
    time: "20:00",
    status: "trainer_reserved",
    trainerName: "Елена Сидорова",
    duration: 90,
  },
  {
    id: "demo_135",
    courtId: "5",
    date: "2025-07-07",
    time: "18:30",
    status: "court_unpaid",
    clientName: "Павел Морозов",
    clientPhone: "+7 926 666-77-88",
    price: 1248,
    duration: 90,
  },
  {
    id: "demo_136",
    courtId: "5",
    date: "2025-07-07",
    time: "19:00",
    status: "court_unpaid",
    clientName: "Павел Морозов",
    clientPhone: "+7 926 666-77-88",
    price: 0,
    duration: 90,
  },
  {
    id: "demo_137",
    courtId: "5",
    date: "2025-07-07",
    time: "19:30",
    status: "court_unpaid",
    clientName: "Павел Морозов",
    clientPhone: "+7 926 666-77-88",
    price: 0,
    duration: 90,
  },
  {
    id: "demo_138",
    courtId: "5",
    date: "2025-07-07",
    time: "20:30",
    status: "training_paid",
    trainerName: "Михаил Иванов",
    clientName: "Светлана Попова",
    clientPhone: "+7 915 222-33-44",
    price: 2800,
    duration: 60,
  },
  {
    id: "demo_139",
    courtId: "5",
    date: "2025-07-07",
    time: "21:00",
    status: "training_paid",
    trainerName: "Михаил Иванов",
    clientName: "Светлана Попова",
    clientPhone: "+7 915 222-33-44",
    price: 0,
    duration: 60,
  },
  {
    id: "demo_140",
    courtId: "2",
    date: "2025-07-07",
    time: "20:30",
    status: "court_paid",
    clientName: "Андрей Козлов",
    clientPhone: "+7 917 888-99-00",
    price: 1248,
    duration: 60,
  },
  {
    id: "demo_141",
    courtId: "2",
    date: "2025-07-07",
    time: "21:00",
    status: "court_paid",
    clientName: "Андрей Козлов",
    clientPhone: "+7 917 888-99-00",
    price: 0,
    duration: 60,
  },
  {
    id: "demo_142",
    courtId: "1",
    date: "2025-07-07",
    time: "20:30",
    status: "court_unpaid",
    clientName: "Юлия Сидорова",
    clientPhone: "+7 925 555-66-77",
    price: 1560,
    duration: 60,
  },
  {
    id: "demo_143",
    courtId: "1",
    date: "2025-07-07",
    time: "21:00",
    status: "court_unpaid",
    clientName: "Юлия Сидорова",
    clientPhone: "+7 925 555-66-77",
    price: 0,
    duration: 60,
  },
]

// Utility functions for admin data integration
export const isSlotOccupied = (courtId: string, date: string, time: string): boolean => {
  return ADMIN_BOOKING_DATA.some(
    (slot) => slot.courtId === courtId && slot.date === date && slot.time === time && slot.status !== "free",
  )
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
  const occupiedSlots = ADMIN_BOOKING_DATA.filter((slot) => slot.date === date && slot.status !== "free").length

  return Math.round((occupiedSlots / totalSlots) * 100)
}

export const getDailyRevenue = (date: string): number => {
  return ADMIN_BOOKING_DATA.filter(
    (slot) => slot.date === date && (slot.status === "court_paid" || slot.status === "training_paid"),
  ).reduce((sum, slot) => sum + (slot.price || 0), 0)
}

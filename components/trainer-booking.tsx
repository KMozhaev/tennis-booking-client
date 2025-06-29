"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { useToast } from "@/hooks/use-toast"
import { format, addDays } from "date-fns"
import { ru } from "date-fns/locale"
import { ArrowLeft, Star, Clock, MapPin, CheckCircle, X } from "lucide-react"

// Types
interface Trainer {
  id: number
  name: string
  description: string
  experienceYears: number
  priceFor90min: number
  rating: number
}

interface Session {
  time: string
  price: number
  court: string
  available: boolean
}

interface ContactInfo {
  name: string
  phone: string
  email: string
}

// Trainer data
const trainers: Trainer[] = [
  {
    id: 1,
    name: "Анна Петрова",
    description: "Техника удара, тактика игры",
    experienceYears: 8,
    priceFor90min: 2250,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Михаил Волков",
    description: "Подача, физическая подготовка",
    experienceYears: 12,
    priceFor90min: 2500,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Елена Смирнова",
    description: "Начинающие, детский теннис",
    experienceYears: 6,
    priceFor90min: 2000,
    rating: 4.7,
  },
]

// Generate trainer sessions
const getTrainerSessions = (date: Date, trainerId: number): Session[] => {
  const sessions: Record<number, Session[]> = {
    1: [
      // Анна Петрова
      { time: "09:00 - 10:30", price: 2250, court: "Корт 1", available: true },
      { time: "14:00 - 15:30", price: 2250, court: "Корт 3", available: true },
      { time: "18:00 - 19:30", price: 2900, court: "Корт 1", available: false }, // peak price
    ],
    2: [
      // Михаил Волков
      { time: "11:00 - 12:30", price: 2500, court: "Корт 2", available: true },
      { time: "16:00 - 17:30", price: 3250, court: "Корт 4", available: true },
    ],
    3: [
      // Елена Смирнова
      { time: "10:00 - 11:30", price: 2000, court: "Корт 5", available: true },
    ],
  }
  return sessions[trainerId] || []
}

interface TrainerBookingProps {
  view: string
  setView: (view: string) => void
  selectedTrainer: Trainer | null
  setSelectedTrainer: (trainer: Trainer | null) => void
  selectedSession: Session | null
  setSelectedSession: (session: Session | null) => void
  selectedDate: Date | null
  setSelectedDate: (date: Date | null) => void
  isMobile: boolean
}

export function TrainerBooking({
  view,
  setView,
  selectedTrainer,
  setSelectedTrainer,
  selectedSession,
  setSelectedSession,
  selectedDate,
  setSelectedDate,
  isMobile,
}: TrainerBookingProps) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    phone: "",
    email: "",
  })

  const handleSelectTrainer = (trainer: Trainer) => {
    setSelectedTrainer(trainer)
    setSelectedDate(new Date())
    setView("schedule")
  }

  const handleSelectSession = (trainer: Trainer, session: Session, date: Date) => {
    setSelectedTrainer(trainer)
    setSelectedSession(session)
    setSelectedDate(date)
    setView("confirmation")
  }

  const handleConfirmBooking = () => {
    // Simulate booking process
    setTimeout(() => {
      setShowSuccess(true)
    }, 1000)
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    setView("selection")
    setSelectedTrainer(null)
    setSelectedSession(null)
    setSelectedDate(null)
    setContactInfo({ name: "", phone: "", email: "" })
  }

  return (
    <div className="h-full overflow-auto">
      {view === "selection" && <TrainerSelection onSelectTrainer={handleSelectTrainer} />}

      {view === "schedule" && selectedTrainer && selectedDate && (
        <TrainerSchedule
          trainer={selectedTrainer}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onBack={() => setView("selection")}
          onSelectSession={handleSelectSession}
        />
      )}

      {view === "confirmation" && selectedTrainer && selectedSession && selectedDate && (
        <TrainerBookingConfirmation
          trainer={selectedTrainer}
          session={selectedSession}
          date={selectedDate}
          contactInfo={contactInfo}
          setContactInfo={setContactInfo}
          onBack={() => setView("schedule")}
          onConfirm={handleConfirmBooking}
          isMobile={isMobile}
        />
      )}

      <TrainerSuccessModal
        open={showSuccess}
        onOpenChange={setShowSuccess}
        trainer={selectedTrainer}
        session={selectedSession}
        date={selectedDate}
        onClose={handleSuccessClose}
        isMobile={isMobile}
      />
    </div>
  )
}

// Trainer Selection Component
interface TrainerSelectionProps {
  onSelectTrainer: (trainer: Trainer) => void
}

function TrainerSelection({ onSelectTrainer }: TrainerSelectionProps) {
  return (
    <div className="p-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center gap-3">
        <div className="text-blue-600">ℹ️</div>
        <div className="text-blue-800 text-sm">В стоимость тренировки включено: корт, ракетки и мячики</div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Выберите тренера</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
          >
            {/* Avatar */}
            <div className="w-20 h-20 bg-gradient-to-br from-[#4285f4] to-[#34a853] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {trainer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            {/* Trainer Info */}
            <h3 className="text-xl font-semibold mb-2">{trainer.name}</h3>

            <div className="flex items-center justify-center gap-1 mb-3">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-yellow-600 font-medium">{trainer.rating}</span>
            </div>

            <p className="text-gray-600 mb-3">{trainer.description}</p>
            <p className="text-gray-500 text-sm mb-4">Опыт: {trainer.experienceYears} лет</p>

            <div className="text-[#4285f4] text-xl font-bold mb-4">За 90 мин: {trainer.priceFor90min}₽</div>

            <Button onClick={() => onSelectTrainer(trainer)} className="w-full bg-[#4285f4] hover:bg-[#3367d6]">
              Выбрать расписание
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Trainer Schedule Component
interface TrainerScheduleProps {
  trainer: Trainer
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  onBack: () => void
  onSelectSession: (trainer: Trainer, session: Session, date: Date) => void
}

function TrainerSchedule({ trainer, selectedDate, setSelectedDate, onBack, onSelectSession }: TrainerScheduleProps) {
  const sessions = getTrainerSessions(selectedDate, trainer.id)

  return (
    <div className="p-6">
      <Button variant="ghost" onClick={onBack} className="mb-6 p-0 h-auto text-[#4285f4] hover:bg-transparent">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Назад к тренерам
      </Button>

      {/* Trainer Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-15 h-15 bg-gradient-to-br from-[#4285f4] to-[#34a853] rounded-full flex items-center justify-center text-white text-lg font-bold">
          {trainer.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{trainer.name}</h2>
          <p className="text-gray-600">{trainer.description}</p>
        </div>
      </div>

      {/* Date Selector */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-2 block">Выберите дату:</Label>
        <input
          type="date"
          value={format(selectedDate, "yyyy-MM-dd")}
          min={format(new Date(), "yyyy-MM-dd")}
          max={format(addDays(new Date(), 30), "yyyy-MM-dd")}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-md bg-white text-base"
        />
      </div>

      <h3 className="text-xl font-semibold mb-4">Доступные тренировки</h3>

      <div className="space-y-3">
        {sessions
          .filter((s) => s.available)
          .map((session, index) => (
            <div
              key={index}
              onClick={() => onSelectSession(trainer, session, selectedDate)}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-blue-50 hover:border-[#4285f4] transition-all"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold">{session.time}</div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {session.court}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      90 мин • Всё включено
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-[#4285f4]">{session.price}₽</div>
                </div>
              </div>
            </div>
          ))}

        {sessions
          .filter((s) => !s.available)
          .map((session, index) => (
            <div
              key={`occupied-${index}`}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 cursor-not-allowed"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold text-gray-500">{session.time}</div>
                  <div className="text-sm text-gray-400 mt-1">Занято</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

// Booking Confirmation Component
interface TrainerBookingConfirmationProps {
  trainer: Trainer
  session: Session
  date: Date
  contactInfo: ContactInfo
  setContactInfo: (info: ContactInfo) => void
  onBack: () => void
  onConfirm: () => void
  isMobile: boolean
}

function TrainerBookingConfirmation({
  trainer,
  session,
  date,
  contactInfo,
  setContactInfo,
  onBack,
  onConfirm,
  isMobile,
}: TrainerBookingConfirmationProps) {
  const formatDate = (date: Date) => {
    return format(date, "EEEE, d MMMM yyyy", { locale: ru })
  }

  const isFormValid = contactInfo.name.trim() && contactInfo.phone.trim()

  return (
    <div className="p-6">
      <Button variant="ghost" onClick={onBack} className="mb-6 p-0 h-auto text-[#4285f4] hover:bg-transparent">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Изменить время
      </Button>

      <h2 className="text-2xl font-bold mb-6">Подтверждение бронирования</h2>

      {/* Booking Summary */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Детали тренировки</h3>

        {/* Trainer Summary */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
          <div className="w-15 h-15 bg-gradient-to-br from-[#4285f4] to-[#34a853] rounded-full flex items-center justify-center text-white text-lg font-bold">
            {trainer.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <div className="font-semibold text-lg">{trainer.name}</div>
            <div className="text-gray-600 text-sm">Опыт: {trainer.experienceYears} лет</div>
            <div className="text-gray-600 text-sm">{trainer.description}</div>
          </div>
        </div>

        {/* Session Details */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Дата:</span>
            <span className="font-medium">{formatDate(date)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Время:</span>
            <span className="font-medium">{session.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Длительность:</span>
            <span className="font-medium">90 минут</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Корт:</span>
            <span className="font-medium">{session.court}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Включено:</span>
            <span className="font-medium">Корт + ракетки + мячики</span>
          </div>
        </div>

        {/* Total Cost */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Итого:</span>
            <span className="text-2xl font-bold text-[#4285f4]">{session.price}₽</span>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Ваше имя *
            </Label>
            <Input
              id="name"
              value={contactInfo.name}
              onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
              placeholder="Иван Иванов"
              className="mt-1 h-10 text-base"
              style={{ fontSize: "16px" }}
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium">
              Телефон *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              placeholder="+7 (999) 123-45-67"
              className="mt-1 h-10 text-base"
              style={{ fontSize: "16px" }}
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              placeholder="ivan@example.com"
              className="mt-1 h-10 text-base"
              style={{ fontSize: "16px" }}
            />
          </div>
        </div>
      </div>

      <Button
        onClick={onConfirm}
        disabled={!isFormValid}
        className="w-full bg-[#4285f4] hover:bg-[#3367d6] h-12 text-base font-medium"
      >
        Забронировать тренировку
      </Button>
    </div>
  )
}

// Success Modal Component
interface TrainerSuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trainer: Trainer | null
  session: Session | null
  date: Date | null
  onClose: () => void
  isMobile: boolean
}

function TrainerSuccessModal({
  open,
  onOpenChange,
  trainer,
  session,
  date,
  onClose,
  isMobile,
}: TrainerSuccessModalProps) {
  const { toast } = useToast()

  const handleWhatsApp = () => {
    const phone = "79999999999"
    const message = encodeURIComponent("Изменить/Отменить тренировку")
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  const handleAddToCalendar = () => {
    if (!session || !date || !trainer) return

    const startTime = session.time.split(" - ")[0]
    const startDate = new Date(date)
    const [hours, minutes] = startTime.split(":").map(Number)
    startDate.setHours(hours, minutes)

    const endDate = new Date(startDate)
    endDate.setMinutes(endDate.getMinutes() + 90)

    const title = `Тренировка с ${trainer.name}`
    const details = `Тренер: ${trainer.name}\nАдрес: ул. Спортивная, 15\nКорт: ${session.court}\nВключено: корт + ракетки + мячики`

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z&details=${encodeURIComponent(details)}`

    window.open(googleCalendarUrl, "_blank")
  }

  if (!trainer || !session || !date) return null

  const ModalContent = (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      <h2 className="text-2xl font-bold">Тренировка забронирована!</h2>

      <div className="bg-gray-50 p-6 rounded-xl text-left space-y-3">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Тренер:</span>
          <span className="font-semibold">{trainer.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Время:</span>
          <span className="font-semibold">{session.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Корт:</span>
          <span className="font-semibold">{session.court}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Адрес:</span>
          <span className="font-semibold">ул. Спортивная, 15</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button onClick={handleAddToCalendar} className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base">
          Добавить в календарь
        </Button>

        <Button onClick={handleWhatsApp} className="w-full bg-green-600 hover:bg-green-700 h-12 text-base">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z" />
          </svg>
          Изменить/Отменить
        </Button>

        <Button variant="outline" onClick={onClose} className="w-full bg-white h-12 text-base">
          Закрыть
        </Button>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div></div>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="h-8 w-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
          {ModalContent}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">{ModalContent}</DialogContent>
    </Dialog>
  )
}

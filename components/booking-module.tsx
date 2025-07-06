"use client"

import React from "react"

import { useState, useReducer, useEffect } from "react"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { format, addDays } from "date-fns"
import { ru } from "date-fns/locale"
import { Checkbox } from "@/components/ui/checkbox"
import { TrainerBooking } from "./trainer-booking"
import { PaymentModal } from "./payment/PaymentModal"

// Types
interface TimeSlot {
  time: string
  available: boolean
  price: number
}

interface Court {
  id: string
  name: string
  type: "clay" | "hard" | "indoor"
  basePrice: number
  slots: TimeSlot[]
}

interface BookingState {
  selectedSlots: { courtId: string; timeSlots: string[]; duration: number; totalPrice: number } | null
  selectedDate: Date
  courtTypeFilter: string
  showConfirmation: boolean
  showSuccess: boolean
}

type BookingAction =
  | { type: "TOGGLE_SLOT"; payload: { courtId: string; timeSlot: string } }
  | { type: "CLEAR_SELECTION" }
  | { type: "SET_DATE"; payload: Date }
  | { type: "SET_COURT_TYPE_FILTER"; payload: string }
  | { type: "SHOW_CONFIRMATION"; payload: boolean }
  | { type: "SHOW_SUCCESS"; payload: boolean }

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "TOGGLE_SLOT": {
      const { courtId, timeSlot } = action.payload
      const currentSelection = state.selectedSlots

      if (!currentSelection || currentSelection.courtId !== courtId) {
        // Start new selection on different court
        const court = courts.find((c) => c.id === courtId)
        const slot = court?.slots.find((s) => s.time === timeSlot)
        if (!slot) return state

        return {
          ...state,
          selectedSlots: {
            courtId,
            timeSlots: [timeSlot],
            duration: 30,
            totalPrice: slot.price,
          },
        }
      }

      const timeSlots = [...currentSelection.timeSlots]
      const slotIndex = timeSlots.indexOf(timeSlot)

      if (slotIndex === -1) {
        // Adding new slot - only allow if adjacent
        const allTimeSlots = generateTimeSlots().map((s) => s.time)
        const sortedSelection = [...timeSlots].sort((a, b) => allTimeSlots.indexOf(a) - allTimeSlots.indexOf(b))
        const firstSlotIndex = allTimeSlots.indexOf(sortedSelection[0])
        const lastSlotIndex = allTimeSlots.indexOf(sortedSelection[sortedSelection.length - 1])
        const newSlotIndex = allTimeSlots.indexOf(timeSlot)

        // Check if new slot is adjacent (immediately before first or after last)
        const isAdjacent = newSlotIndex === firstSlotIndex - 1 || newSlotIndex === lastSlotIndex + 1

        if (isAdjacent) {
          const court = courts.find((c) => c.id === courtId)
          const slot = court?.slots.find((s) => s.time === timeSlot)
          if (!slot) return state

          const newTimeSlots = [...timeSlots, timeSlot].sort(
            (a, b) => allTimeSlots.indexOf(a) - allTimeSlots.indexOf(b),
          )
          const totalPrice = newTimeSlots.reduce((sum, time) => {
            const slotPrice = court?.slots.find((s) => s.time === time)?.price || 0
            return sum + slotPrice
          }, 0)

          return {
            ...state,
            selectedSlots: {
              courtId,
              timeSlots: newTimeSlots,
              duration: newTimeSlots.length * 30,
              totalPrice,
            },
          }
        }
        // If not adjacent, ignore the click
        return state
      } else {
        // Removing slot - only allow if it's at the edge
        if (slotIndex === 0 || slotIndex === timeSlots.length - 1) {
          timeSlots.splice(slotIndex, 1)
          if (timeSlots.length === 0) {
            return { ...state, selectedSlots: null }
          }

          const court = courts.find((c) => c.id === courtId)
          const totalPrice = timeSlots.reduce((sum, time) => {
            const slotPrice = court?.slots.find((s) => s.time === time)?.price || 0
            return sum + slotPrice
          }, 0)

          return {
            ...state,
            selectedSlots: {
              courtId,
              timeSlots,
              duration: timeSlots.length * 30,
              totalPrice,
            },
          }
        }
        // If clicking middle slot, ignore
        return state
      }
    }
    case "CLEAR_SELECTION":
      return { ...state, selectedSlots: null }
    case "SET_DATE":
      return { ...state, selectedDate: action.payload, selectedSlots: null }
    case "SET_COURT_TYPE_FILTER":
      return { ...state, courtTypeFilter: action.payload, selectedSlots: null }
    case "SHOW_CONFIRMATION":
      return { ...state, showConfirmation: action.payload }
    case "SHOW_SUCCESS":
      return { ...state, showSuccess: action.payload, showConfirmation: false }
    default:
      return state
  }
}

// Pricing logic
const calculatePrice = (basePrice: number, time: string, isWeekend = false): number => {
  const hour = Number.parseInt(time.split(":")[0])
  let multiplier = 1.0

  // Time multipliers
  if (hour >= 8 && hour < 16) {
    multiplier = 0.8 // off-peak
  } else if (hour >= 16 && hour < 19) {
    multiplier = 1.0 // standard
  } else if (hour >= 19 && hour < 22) {
    multiplier = 1.3 // peak
  }

  // Weekend multiplier
  if (isWeekend) {
    multiplier *= 1.3
  }

  return Math.round(basePrice * multiplier)
}

// Generate time slots
const generateTimeSlots = (): { time: string }[] => {
  const slots: { time: string }[] = []
  for (let hour = 8; hour < 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      slots.push({ time })
    }
  }
  return slots
}

// Generate courts with pricing
const generateCourts = (selectedDate: Date): Court[] => {
  const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6
  const timeSlots = generateTimeSlots()

  return [
    { id: "1", name: "Корт 1 (Хард)", type: "hard", basePrice: 600 },
    { id: "2", name: "Корт 2 (Хард)", type: "hard", basePrice: 480 },
    { id: "3", name: "Корт 3 (Грунт)", type: "clay", basePrice: 720 },
    { id: "4", name: "Корт 4 (Грунт)", type: "clay", basePrice: 600 },
    { id: "5", name: "Корт 5 (Крытый)", type: "indoor", basePrice: 480 },
  ].map((court) => ({
    ...court,
    slots: timeSlots.map(({ time }) => ({
      time,
      available: Math.random() > 0.15, // 15% occupied
      price: calculatePrice(court.basePrice, time, isWeekend),
    })),
  }))
}

const courts = generateCourts(new Date())

interface BookingModuleProps {
  onClose: () => void
}

export function BookingModule({ onClose }: BookingModuleProps) {
  const [state, dispatch] = useReducer(bookingReducer, {
    selectedSlots: null,
    selectedDate: new Date(),
    courtTypeFilter: "all",
    showConfirmation: false,
    showSuccess: false,
  })

  const [activeTab, setActiveTab] = useState("courts")

  // Trainer booking state
  const [trainerView, setTrainerView] = useState("selection") // 'selection' | 'schedule' | 'confirmation'
  const [selectedTrainer, setSelectedTrainer] = useState(null)
  const [selectedSession, setSelectedSession] = useState(null)
  const [trainerSelectedDate, setTrainerSelectedDate] = useState(null)

  const [isMobile, setIsMobile] = useState(false)
  const { toast } = useToast()

  const [showPayment, setShowPayment] = useState(false)
  const [paymentData, setPaymentData] = useState(null)

  const onSuccess = () => {
    dispatch({ type: "SHOW_SUCCESS", payload: true })
  }

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const allTimeSlots = generateTimeSlots().map((s) => s.time)

  const handleSlotClick = (courtId: string, time: string, available: boolean) => {
    if (!available) {
      toast({
        title: "Слот недоступен",
        variant: "destructive",
      })
      return
    }

    dispatch({ type: "TOGGLE_SLOT", payload: { courtId, timeSlot: time } })
  }

  const filteredCourts = courts.filter((court) => {
    if (state.courtTypeFilter === "all") return true
    return court.type === state.courtTypeFilter
  })

  const canBook = state.selectedSlots && state.selectedSlots.duration >= 60

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 md:inset-8 bg-[#F9F9F9] md:rounded-lg z-50 flex flex-col max-h-screen md:max-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-300 rounded" />
            <h1 className="text-lg font-semibold">Courtoo</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Filters */}
        {activeTab === "courts" && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex gap-4">
              <div>
                <input
                  type="date"
                  value={format(state.selectedDate, "yyyy-MM-dd")}
                  min={format(new Date(), "yyyy-MM-dd")}
                  max={format(addDays(new Date(), 30), "yyyy-MM-dd")}
                  onChange={(e) => dispatch({ type: "SET_DATE", payload: new Date(e.target.value) })}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white"
                />
              </div>
              <select
                value={state.courtTypeFilter}
                onChange={(e) => dispatch({ type: "SET_COURT_TYPE_FILTER", payload: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="all">Все корты</option>
                <option value="hard">Хард</option>
                <option value="clay">Грунт</option>
                <option value="indoor">Крытый</option>
              </select>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("courts")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "courts"
                  ? "border-[#4285f4] text-[#4285f4]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Бронирование корта
            </button>
            <button
              onClick={() => setActiveTab("trainers")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "trainers"
                  ? "border-[#4285f4] text-[#4285f4]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Тренировка с тренером
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className={`flex-1 flex overflow-hidden ${isMobile && state.selectedSlots ? "pb-20" : ""}`}>
          {activeTab === "courts" && (
            <>
              {/* Main Content */}
              <div className="flex-1 overflow-hidden">
                <CourtBookingView
                  courts={filteredCourts}
                  timeSlots={allTimeSlots}
                  onSlotClick={handleSlotClick}
                  selectedSlots={state.selectedSlots}
                  isMobile={isMobile}
                  dispatch={dispatch}
                />
              </div>

              {/* Right Sidebar (Desktop only) - Only show when can book */}
              {!isMobile && canBook && (
                <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col">
                  <BookingSummary
                    selectedSlots={state.selectedSlots}
                    selectedDate={state.selectedDate}
                    onNext={() => dispatch({ type: "SHOW_CONFIRMATION", payload: true })}
                    allTimeSlots={allTimeSlots}
                  />
                </div>
              )}
            </>
          )}

          {activeTab === "trainers" && (
            <div className="flex-1 overflow-hidden">
              <TrainerBooking
                view={trainerView}
                setView={setTrainerView}
                selectedTrainer={selectedTrainer}
                setSelectedTrainer={setSelectedTrainer}
                selectedSession={selectedSession}
                setSelectedSession={setSelectedSession}
                selectedDate={trainerSelectedDate}
                setSelectedDate={setTrainerSelectedDate}
                isMobile={isMobile}
              />
            </div>
          )}
        </div>

        {/* Bottom Bar (Mobile only) */}
        {isMobile && activeTab === "courts" && canBook && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">
                  {state.selectedSlots.duration} мин • {state.selectedSlots.totalPrice}₽
                </div>
                <div className="text-sm text-gray-600">
                  {courts.find((c) => c.id === state.selectedSlots?.courtId)?.name}
                </div>
              </div>
              <Button
                onClick={() => dispatch({ type: "SHOW_CONFIRMATION", payload: true })}
                className="bg-[#4285f4] hover:bg-[#3367d6]"
              >
                Забронировать
              </Button>
            </div>
          </div>
        )}

        {/* Show minimum booking message when selection is too short */}
        {isMobile && activeTab === "courts" && state.selectedSlots && state.selectedSlots.duration < 60 && (
          <div className="fixed bottom-0 left-0 right-0 bg-yellow-50 border-t border-yellow-200 p-4 z-50">
            <div className="text-center text-yellow-800">
              Минимум 60 минут • Выберите еще {Math.ceil((60 - state.selectedSlots.duration) / 30)} слот(а)
            </div>
          </div>
        )}

        {/* Confirmation Modal/Drawer */}
        {activeTab === "courts" && (
          <ConfirmationModal
            open={state.showConfirmation}
            onOpenChange={(open) => dispatch({ type: "SHOW_CONFIRMATION", payload: open })}
            selectedSlots={state.selectedSlots}
            onSuccess={onSuccess}
            setPaymentData={setPaymentData}
            setShowPayment={setShowPayment}
          />
        )}

        {/* Success Modal/Drawer */}
        {activeTab === "courts" && (
          <SuccessModal
            open={state.showSuccess}
            onOpenChange={(open) => dispatch({ type: "SHOW_SUCCESS", payload: open })}
            selectedSlots={state.selectedSlots}
            onClose={onClose}
          />
        )}

        <PaymentModal
          open={showPayment}
          onOpenChange={setShowPayment}
          paymentData={paymentData}
          onSuccess={() => {
            setShowPayment(false)
            onSuccess()
          }}
          onError={() => {
            setShowPayment(false)
            // Keep the confirmation modal open for retry
          }}
        />
      </div>
      <Toaster />
    </>
  )
}

// Court Booking Grid Component
interface CourtBookingViewProps {
  courts: Court[]
  timeSlots: string[]
  onSlotClick: (courtId: string, time: string, available: boolean) => void
  selectedSlots: { courtId: string; timeSlots: string[]; duration: number; totalPrice: number } | null
  isMobile: boolean
  dispatch: React.Dispatch<BookingAction>
}

function CourtBookingView({
  courts,
  timeSlots,
  onSlotClick,
  selectedSlots,
  isMobile,
  dispatch,
}: CourtBookingViewProps) {
  const isSlotSelected = (courtId: string, time: string) => {
    return selectedSlots?.courtId === courtId && selectedSlots.timeSlots.includes(time)
  }

  const getSelectionInfo = (courtId: string, time: string) => {
    if (!selectedSlots || selectedSlots.courtId !== courtId || !selectedSlots.timeSlots.includes(time)) {
      return null
    }

    // Only show info in the middle slot of multi-slot selections
    if (selectedSlots.timeSlots.length > 1) {
      const timeIndex = timeSlots.indexOf(time)
      const firstSlotIndex = timeSlots.indexOf(selectedSlots.timeSlots[0])
      const lastSlotIndex = timeSlots.indexOf(selectedSlots.timeSlots[selectedSlots.timeSlots.length - 1])

      const middleIndex = Math.floor((firstSlotIndex + lastSlotIndex) / 2)

      if (timeIndex === middleIndex) {
        return {
          duration: selectedSlots.duration,
          price: selectedSlots.totalPrice,
        }
      }
      return { hidePrice: true } // Hide individual prices in group
    }

    return null
  }

  // Add this at the top of the CourtBookingView component
  const styles = `
  .schedule-grid .time-header {
    position: sticky;
    top: 0;
    background: white;
    z-index: 20;
    border-bottom: 1px solid #e0e0e0;
  }

  .schedule-grid .court-header {
    position: sticky;
    left: 0;
    background: white;
    z-index: 10;
    border-right: 1px solid #e0e0e0;
  }
`

  return (
    <div className="h-full overflow-auto">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="p-4">
        <div className="mb-4">
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg flex items-center gap-2">
            <div className="w-3 h-3 bg-[#4285f4] rounded"></div>
            Нажмите на слоты для выбора времени • Минимум 60 минут
          </div>
        </div>

        <div className="relative">
          {/* UNIFIED LAYOUT: Time slots VERTICAL (rows), Courts HORIZONTAL (columns) */}
          <div className="overflow-auto">
            <div
              className="schedule-grid bg-gray-200 rounded-lg overflow-hidden min-w-max"
              style={{
                display: "grid",
                gridTemplateColumns: `${isMobile ? "60px" : "80px"} repeat(${courts.length}, ${isMobile ? "100px" : "120px"})`,
                gridTemplateRows: `${isMobile ? "40px" : "50px"} repeat(${timeSlots.length}, ${isMobile ? "50px" : "60px"})`,
                gap: 0,
              }}
            >
              {/* Sticky corner cell */}
              <div className="bg-white sticky top-0 left-0 z-20 border-r border-b border-gray-300"></div>

              {/* Sticky court headers */}
              {courts.map((court) => (
                <div
                  key={court.id}
                  className="court-header bg-white font-medium text-center py-2 text-xs flex items-center justify-center sticky top-0 z-10 border-r border-b border-gray-300"
                >
                  <div className="truncate px-1">{isMobile ? court.name.replace(/\s*$$[^)]*$$/, "") : court.name}</div>
                </div>
              ))}

              {timeSlots.map((time) => (
                <React.Fragment key={time}>
                  {/* Sticky time column */}
                  <div className="time-header bg-white text-xs font-medium py-2 px-2 text-right flex items-center justify-end sticky left-0 z-10 border-r border-b border-gray-300">
                    {time}
                  </div>
                  {courts.map((court) => {
                    const slot = court.slots.find((s) => s.time === time)
                    if (!slot)
                      return (
                        <div key={`${court.id}-${time}`} className="bg-gray-50 border-r border-b border-gray-300"></div>
                      )

                    const isSelected = isSlotSelected(court.id, time)
                    const selectionInfo = getSelectionInfo(court.id, time)

                    return (
                      <button
                        key={`${court.id}-${time}`}
                        onClick={() => onSlotClick(court.id, time, slot.available)}
                        disabled={!slot.available}
                        className={`
                          relative text-xs transition-all duration-150 select-none border-r border-b border-gray-300
                          ${
                            isSelected
                              ? "bg-[#4285f4] text-white"
                              : slot.available
                                ? "bg-[#f8f9fa] hover:bg-blue-50 hover:shadow-sm border-[#e0e0e0]"
                                : "bg-[#e0e0e0] text-[#666] cursor-not-allowed"
                          }
                        `}
                      >
                        {slot.available ? (
                          isSelected ? (
                            selectionInfo?.hidePrice ? (
                              // Empty selected slot in group
                              <div className="absolute inset-0"></div>
                            ) : selectionInfo ? (
                              // Middle slot with total info
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <div className={`${isMobile ? "text-xs" : "text-sm"} font-bold`}>
                                  {selectionInfo.duration} мин
                                </div>
                                <div className={`${isMobile ? "text-xs" : "text-sm"}`}>{selectionInfo.price}₽</div>
                              </div>
                            ) : (
                              // Single selected slot
                              <div className="absolute inset-1 flex flex-col items-center justify-center text-white">
                                <div className={`${isMobile ? "text-xs" : "text-sm"} font-medium`}>{slot.price}₽</div>
                                <div className="text-xs opacity-80">30 мин</div>
                              </div>
                            )
                          ) : (
                            // Available unselected slot
                            <div className="absolute inset-1 flex flex-col items-center justify-center">
                              <div className={`${isMobile ? "text-xs" : "text-sm"} font-medium`}>{slot.price}₽</div>
                              <div className="text-xs opacity-60">30 мин</div>
                            </div>
                          )
                        ) : (
                          // Occupied slot
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`${isMobile ? "text-xs" : "text-sm"}`}>Занято</div>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Booking Summary Component
interface BookingSummaryProps {
  selectedSlots: { courtId: string; timeSlots: string[]; duration: number; totalPrice: number }
  selectedDate: Date
  onNext: () => void
  allTimeSlots: string[]
}

function BookingSummary({ selectedSlots, selectedDate, onNext, allTimeSlots }: BookingSummaryProps) {
  const court = courts.find((c) => c.id === selectedSlots.courtId)
  const startTime = selectedSlots.timeSlots[0]
  const endTime = selectedSlots.timeSlots[selectedSlots.timeSlots.length - 1]
  const endTimeIndex = allTimeSlots.indexOf(endTime)
  const endTimeSlot = allTimeSlots[endTimeIndex + 1] || endTime

  return (
    <div className="space-y-4 flex-1">
      <h3 className="font-semibold text-lg">Детали бронирования</h3>

      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <div className="font-medium text-base">{court?.name}</div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Дата:</span>
            <span className="font-medium">{format(selectedDate, "dd.MM.yyyy", { locale: ru })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Время:</span>
            <span className="font-medium">
              {startTime} - {endTimeSlot}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Длительность:</span>
            <span className="font-medium">{selectedSlots.duration} минут</span>
          </div>
        </div>

        <div className="border-t pt-3 flex justify-between items-center">
          <span className="font-semibold">Итого:</span>
          <span className="font-bold text-lg text-[#4285f4]">{selectedSlots.totalPrice}₽</span>
        </div>
      </div>

      <Button onClick={onNext} className="w-full bg-[#4285f4] hover:bg-[#3367d6] h-12 text-base font-medium">
        Забронировать
      </Button>
    </div>
  )
}

// Confirmation Modal
interface ConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedSlots: { courtId: string; timeSlots: string[]; duration: number; totalPrice: number } | null
  onSuccess: () => void
  setPaymentData: (data: any) => void
  setShowPayment: (show: boolean) => void
}

function ConfirmationModal({
  open,
  onOpenChange,
  selectedSlots,
  onSuccess,
  setPaymentData,
  setShowPayment,
}: ConfirmationModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("online")
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!name || !phone || !agreeTerms) {
      toast({
        title: "Заполните все обязательные поля",
        variant: "destructive",
      })
      return
    }

    if (paymentMethod === "online") {
      setPaymentData({
        amount: selectedSlots.totalPrice,
        bookingId: `booking_${Date.now()}`,
        method: "card",
      })
      setShowPayment(true)
    } else {
      setTimeout(() => {
        onSuccess()
      }, 1000)
    }
  }

  if (!selectedSlots) return null

  const ModalContent = (
    <div className="space-y-4">
      <div className="space-y-3">
        <div>
          <Label htmlFor="name" className="text-sm font-medium">
            Имя*
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            className="mt-1 h-10 text-base"
            style={{ fontSize: "16px" }}
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-sm font-medium">
            Телефон*
          </Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            className="mt-1 h-10 text-base"
            style={{ fontSize: "16px" }}
          />
        </div>
      </div>

      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="online" id="online" />
          <Label htmlFor="online" className="text-sm">
            Оплатить картой онлайн
          </Label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="onsite" id="onsite" />
          <Label htmlFor="onsite" className="text-sm">
            Оплатить на месте
          </Label>
        </div>
      </RadioGroup>

      <div className="flex items-center space-x-3">
        <Checkbox id="terms" checked={agreeTerms} onCheckedChange={setAgreeTerms} />
        <Label htmlFor="terms" className="text-sm">
          Согласен с правилами клуба
        </Label>
      </div>

      <div className="border-t pt-3">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Итого</span>
          <span className="text-xl font-bold text-[#4285f4]">{selectedSlots.totalPrice}₽</span>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-[#4285f4] hover:bg-[#3367d6] h-10 text-sm font-medium"
        disabled={!name || !phone || !agreeTerms}
      >
        Забронировать
      </Button>
    </div>
  )

  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="p-6">
          <DrawerHeader className="px-0 flex items-center justify-between">
            <DrawerTitle className="text-xl">Бронирование</DrawerTitle>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="h-8 w-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </DrawerHeader>
          {ModalContent}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Бронирование</DialogTitle>
        </DialogHeader>
        {ModalContent}
      </DialogContent>
    </Dialog>
  )
}

// Success Modal
interface SuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedSlots: { courtId: string; timeSlots: string[]; duration: number; totalPrice: number } | null
  onClose: () => void
}

function SuccessModal({ open, onOpenChange, selectedSlots, onClose }: SuccessModalProps) {
  const handleWhatsApp = () => {
    const phone = "79999999999"
    const message = encodeURIComponent("Изменить/Отменить бронирование")
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  const handleAddToCalendar = () => {
    if (!selectedSlots) return

    const court = courts.find((c) => c.id === selectedSlots.courtId)
    const startTime = selectedSlots.timeSlots[0]
    const startDate = new Date()
    startDate.setHours(Number.parseInt(startTime.split(":")[0]), Number.parseInt(startTime.split(":")[1]))

    const endDate = new Date(startDate)
    endDate.setMinutes(endDate.getMinutes() + selectedSlots.duration)

    const title = court?.name || ""
    const details = `Адрес: ул. Спортивная, 15\nПокрытие: ${court?.type}`

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z&details=${encodeURIComponent(details)}`

    window.open(googleCalendarUrl, "_blank")
  }

  if (!selectedSlots) return null

  const court = courts.find((c) => c.id === selectedSlots.courtId)

  const ModalContent = (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold">Бронирование успешно!</h2>

      <div className="bg-gray-50 p-6 rounded-xl text-left space-y-3">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Корт:</span>
          <span className="font-semibold">{court?.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Время:</span>
          <span className="font-semibold">
            {selectedSlots.timeSlots[0]} - {selectedSlots.timeSlots[selectedSlots.timeSlots.length - 1]}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Длительность:</span>
          <span className="font-semibold">{selectedSlots.duration} минут</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Адрес:</span>
          <span className="font-semibold">ул. Спортивная, 15</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button onClick={handleAddToCalendar} className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base">
          <Plus className="w-5 h-5 mr-2" />
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

  if (typeof window !== "undefined" && window.innerWidth < 768) {
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

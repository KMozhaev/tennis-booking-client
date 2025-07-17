"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

interface BookingDetails {
  courtId: string
  courtName: string
  timeSlots: string[]
  duration: number
  totalPrice: number
  date: Date
  customerName: string
  customerPhone: string
}

interface WhatsAppDemoSlideProps {
  open: boolean
  onClose: () => void
  bookingDetails: BookingDetails | null
}

export function WhatsAppDemoSlide({ open, onClose, bookingDetails }: WhatsAppDemoSlideProps) {
  const [showNotification, setShowNotification] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (open && bookingDetails) {
      // Show notification first
      const notificationTimer = setTimeout(() => {
        setShowNotification(true)
      }, 1000)

      // Then show full message
      const messageTimer = setTimeout(() => {
        setShowMessage(true)
      }, 3000)

      return () => {
        clearTimeout(notificationTimer)
        clearTimeout(messageTimer)
      }
    }
  }, [open, bookingDetails])

  const handleClose = () => {
    setShowNotification(false)
    setShowMessage(false)
    onClose()
  }

  if (!open || !bookingDetails) return null

  const startTime = bookingDetails.timeSlots[0]
  const endTime = bookingDetails.timeSlots[bookingDetails.timeSlots.length - 1]
  const endTimeIndex = bookingDetails.timeSlots.length - 1
  const actualEndTime = `${Number.parseInt(endTime.split(":")[0])}:${(Number.parseInt(endTime.split(":")[1]) + 30).toString().padStart(2, "0")}`

  const formattedDate = format(bookingDetails.date, "d MMMM (EEEE)", { locale: ru })
  const courtType = bookingDetails.courtName.includes("Мельбурн")
    ? "Мельбурн"
    : bookingDetails.courtName.includes("Париж")
      ? "Париж"
      : "Лондон"

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
      {/* Close button */}
      <div className="absolute top-4 right-4 z-10">
        <Button variant="ghost" onClick={handleClose} className="text-white hover:bg-white/10">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="max-w-6xl w-full">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Автоматическое уведомление</h2>
          <p className="text-xl text-gray-300">Клиент получает подтверждение на WhatsApp мгновенно</p>
        </div>

        <div className="flex items-center justify-center gap-12">
          {/* iPhone with notification */}
          <div className="relative">
            <div className="text-center mb-4">
              <div className="text-lg font-medium text-white">Уведомление на экране блокировки</div>
            </div>

            <div className="relative">
              {/* iPhone frame */}
              <div className="w-80 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-pink-400 via-orange-400 to-blue-500 rounded-[2.5rem] relative overflow-hidden">
                  {/* Status bar */}
                  <div className="flex justify-between items-center px-6 pt-4 text-white text-sm font-medium">
                    <div>9:41</div>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                      </div>
                      <svg className="w-4 h-4 ml-1" fill="white" viewBox="0 0 24 24">
                        <path d="M2 17h20v2H2zm1.15-4.05L4 11.47l.85 1.48L3.5 14.5l1.35 1.55L3.5 17.5 4 18.53l-.85 1.48L2 17.47l1.15-2.52zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      </svg>
                      <div className="w-6 h-3 border border-white rounded-sm">
                        <div className="w-full h-full bg-white rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="text-center mt-16">
                    <div className="text-white text-7xl font-thin">9:41</div>
                    <div className="text-white text-lg mt-2">100% Charged</div>
                  </div>

                  {/* WhatsApp notification */}
                  <div
                    className={`absolute bottom-32 left-4 right-4 transition-all duration-500 ${
                      showNotification ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-gray-900">WHATSAPP</div>
                            <div className="text-xs text-gray-500">сейчас</div>
                          </div>
                          <div className="text-sm text-gray-700 mt-1">Подтверждение бронирования</div>
                          <div className="text-xs text-gray-500">{bookingDetails.customerName}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom indicators */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-32 h-1 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className={`transition-all duration-500 ${showMessage ? "opacity-100" : "opacity-30"}`}>
            <div className="text-white text-4xl">→</div>
          </div>

          {/* WhatsApp message */}
          <div
            className={`transition-all duration-500 ${showMessage ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div className="text-center mb-4">
              <div className="text-lg font-medium text-white">Полное сообщение в WhatsApp</div>
            </div>

            <div className="w-80 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-gray-100 rounded-[2.5rem] relative overflow-hidden">
                {/* WhatsApp header */}
                <div className="bg-green-600 px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    T
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">+79011883693</div>
                    <div className="text-green-100 text-xs">в сети</div>
                  </div>
                  <div className="flex gap-4">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                    </svg>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                </div>

                {/* Message content */}
                <div className="p-4 space-y-4 h-full overflow-y-auto pb-20">
                  <div className="bg-white rounded-lg p-3 max-w-xs shadow-sm">
                    <div className="text-sm text-gray-800 leading-relaxed">
                      <div className="font-medium mb-2">
                        {bookingDetails.customerName}, вы забронировали корт в клубе Tennis Park Sokolniki:
                      </div>

                      <div className="mb-3">
                        📍 <strong>Адрес клуба:</strong> г. Москва,
                        <br />
                        ул. Спортивная, 15
                        <br />
                        <span className="text-blue-600 underline text-xs">
                          Проложить маршрут: https://yandex.ru/maps/...
                        </span>
                      </div>

                      <div className="space-y-1 text-sm">
                        <div>
                          🎾 <strong>Корт:</strong> {bookingDetails.courtName} ({courtType})
                        </div>
                        <div>
                          📅 <strong>Дата:</strong> {formattedDate}
                        </div>
                        <div>
                          🕐 <strong>Время:</strong> {startTime}–{actualEndTime}
                        </div>
                        <div>
                          💳 <strong>Оплата:</strong> оплачено онлайн
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-gray-600 border-t pt-2">
                        Вы можете изменить или отменить бронь в любое время, но не позднее чем за 24 часа до начала.
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2 text-right">9:41</div>
                  </div>
                </div>

                {/* Input area */}
                <div className="absolute bottom-0 left-0 right-0 bg-gray-200 p-2">
                  <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2">
                    <div className="text-gray-400 text-sm flex-1">Введите сообщение...</div>
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center mt-8">
          <div className="text-white text-lg mb-4">Клиенты получают все детали бронирования автоматически</div>
          <Button onClick={handleClose} className="bg-[#4285f4] hover:bg-[#3367d6] text-white px-8 py-3 text-lg">
            Завершить демо
          </Button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { BookingModule } from "@/components/booking-module"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [showBooking, setShowBooking] = useState(true) // Changed to true for immediate preview

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Теннисный клуб</h1>
        <Button
          onClick={() => setShowBooking(true)}
          className="bg-[#4285f4] hover:bg-[#3367d6] text-white px-8 py-3 text-lg"
        >
          Забронировать корт
        </Button>
      </div>

      {showBooking && <BookingModule onClose={() => setShowBooking(false)} />}
    </main>
  )
}

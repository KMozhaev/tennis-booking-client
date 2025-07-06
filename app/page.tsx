"use client"

import { useState } from "react"
import { BookingModule } from "@/components/booking-module"
import { DemoSlide } from "@/components/demo-slide"

export default function Home() {
  const [showBooking, setShowBooking] = useState(false)

  if (showBooking) {
    return <BookingModule onClose={() => setShowBooking(false)} />
  }

  return <DemoSlide onStartDemo={() => setShowBooking(true)} />
}

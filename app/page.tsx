"use client"

import { useState } from "react"
import { BookingModule } from "@/components/booking-module"
import { DemoPresentation } from "@/components/demo-presentation"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [currentView, setCurrentView] = useState<"landing" | "demo" | "booking">("booking")

  return (
    <main className="min-h-screen bg-gray-100">
      {currentView === "landing" && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Courtoo
            </h1>
            <p className="text-xl text-gray-600 mb-8">Современная система управления теннисными клубами</p>
            <div className="space-y-4">
              <Button
                onClick={() => setCurrentView("demo")}
                className="bg-[#4285f4] hover:bg-[#3367d6] text-white px-8 py-4 text-lg rounded-lg w-full max-w-md"
              >
                Посмотреть демо
              </Button>
              <Button
                onClick={() => setCurrentView("booking")}
                variant="outline"
                className="px-8 py-4 text-lg rounded-lg w-full max-w-md"
              >
                Перейти к бронированию
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentView === "demo" && <DemoPresentation onComplete={() => setCurrentView("booking")} />}

      {currentView === "booking" && <BookingModule onClose={() => setCurrentView("landing")} />}
    </main>
  )
}

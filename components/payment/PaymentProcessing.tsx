"use client"

import { Loader2 } from "lucide-react"

export function PaymentProcessing() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <Loader2 className="w-12 h-12 text-[#0066FF] animate-spin" />
      <div className="text-lg font-medium">Обрабатываем платёж...</div>
      <div className="text-sm text-gray-500 text-center">
        Это может занять несколько секунд.
        <br />
        Не закрывайте это окно.
      </div>
    </div>
  )
}

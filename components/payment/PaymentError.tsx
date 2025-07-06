"use client"

import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PaymentResult } from "./PaymentModal"

interface PaymentErrorProps {
  result: PaymentResult
  onRetry: () => void
  onClose: () => void
}

export function PaymentError({ result, onRetry, onClose }: PaymentErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
        <XCircle className="w-10 h-10 text-red-600" />
      </div>

      <div className="text-center">
        <h3 className="text-xl font-bold text-red-600 mb-2">Платёж не прошёл</h3>
        <div className="text-sm text-gray-600">{result.error || "Произошла ошибка при обработке платежа"}</div>
      </div>

      <div className="w-full space-y-2">
        <Button onClick={onRetry} className="w-full bg-[#0066FF] hover:bg-[#0052CC]">
          Попробовать ещё раз
        </Button>
        <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
          Отменить
        </Button>
      </div>
    </div>
  )
}

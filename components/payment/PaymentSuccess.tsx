"use client"

import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PaymentResult } from "./PaymentModal"

interface PaymentSuccessProps {
  result: PaymentResult
  amount: number
  onClose: () => void
}

export function PaymentSuccess({ result, amount, onClose }: PaymentSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      <div className="text-center">
        <h3 className="text-xl font-bold text-green-600 mb-2">Платёж успешен!</h3>
        <div className="text-lg font-medium mb-1">{amount}₽</div>
        <div className="text-sm text-gray-500">ID транзакции: {result.transactionId}</div>
      </div>

      <div className="w-full bg-gray-50 rounded-lg p-4 text-sm">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Сумма:</span>
          <span className="font-medium">{amount}₽</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Комиссия:</span>
          <span className="font-medium">0₽</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Время:</span>
          <span className="font-medium">{new Date(result.timestamp).toLocaleTimeString("ru-RU")}</span>
        </div>
      </div>

      <Button onClick={onClose} className="w-full bg-[#0066FF] hover:bg-[#0052CC]">
        Готово
      </Button>
    </div>
  )
}

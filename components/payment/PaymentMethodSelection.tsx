"use client"

import { CreditCard, Wallet, Smartphone, Building2, MoreHorizontal, ChevronDown } from "lucide-react"
import { useState } from "react"

interface PaymentMethodSelectionProps {
  amount: number
  onMethodSelect: (method: string) => void
}

export function PaymentMethodSelection({ amount, onMethodSelect }: PaymentMethodSelectionProps) {
  const [showDetails, setShowDetails] = useState(false)

  const paymentMethods = [
    {
      id: "card",
      name: "Банковская карта",
      description: "Сохранённая или новая",
      icon: CreditCard,
      available: true,
    },
    {
      id: "yumoney",
      name: "ЮMoney",
      description: "Кошелёк или привязанная карта",
      icon: Wallet,
      available: false,
    },
    {
      id: "tpay",
      name: "T-Pay",
      description: "Приложение Т‑Банка",
      icon: Smartphone,
      available: false,
    },
    {
      id: "sbp",
      name: "СБП",
      description: "Приложение вашего банка",
      icon: Building2,
      available: false,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Выберите способ оплаты</h3>
        <div className="text-2xl font-bold text-[#0066FF] mb-4">{amount}₽</div>
      </div>

      {/* Payment Details */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between p-3 text-left"
        >
          <span className="text-sm font-medium">Детали платежа</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showDetails ? "rotate-180" : ""}`} />
        </button>

        {showDetails && (
          <div className="border-t border-gray-200 p-3 text-sm text-gray-600">
            <div className="flex justify-between mb-1">
              <span>Бронирование корта</span>
              <span>{amount}₽</span>
            </div>
            <div className="flex justify-between">
              <span>Комиссия</span>
              <span>0₽</span>
            </div>
          </div>
        )}
      </div>

      {/* Payment Methods */}
      <div className="space-y-2">
        {paymentMethods.map((method) => {
          const IconComponent = method.icon
          return (
            <button
              key={method.id}
              onClick={() => onMethodSelect(method.id)}
              className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#0066FF] hover:bg-blue-50 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">{method.name}</div>
                <div className="text-sm text-gray-500">{method.description}</div>
              </div>
              {!method.available && <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">Скоро</div>}
            </button>
          )
        })}

        {/* More Options */}
        <button className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium">Ещё варианты</div>
            <div className="text-sm text-gray-500">Другие способы оплаты</div>
          </div>
        </button>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, CreditCard } from "lucide-react"

interface CardData {
  number: string
  expiry: string
  cvc: string
  needReceipt: boolean
}

interface PaymentCardFormProps {
  amount: number
  cardData: CardData
  setCardData: (data: CardData) => void
  onSubmit: () => void
  onBack: () => void
}

export function PaymentCardForm({ amount, cardData, setCardData, onSubmit, onBack }: PaymentCardFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + " / " + v.substring(2, 4)
    }
    return v
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!cardData.number || cardData.number.replace(/\s/g, "").length !== 16) {
      newErrors.number = "Введите корректный номер карты"
    }

    if (!cardData.expiry || cardData.expiry.length !== 7) {
      newErrors.expiry = "Введите срок действия"
    }

    if (!cardData.cvc || cardData.cvc.length !== 3) {
      newErrors.cvc = "Введите CVC код"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit()
    }
  }

  const isFormValid =
    cardData.number.replace(/\s/g, "").length === 16 && cardData.expiry.length === 7 && cardData.cvc.length === 3

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          <span className="font-medium">Банковская карта</span>
        </div>
      </div>

      {/* Saved Cards Option */}
      <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-[#0066FF] transition-colors">
        <div className="text-sm text-[#0066FF] font-medium">Сохранённые карты</div>
        <div className="text-xs text-gray-500">У вас нет сохранённых карт</div>
      </button>

      {/* Card Form */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="cardNumber" className="text-sm font-medium">
            Номер карты
          </Label>
          <Input
            id="cardNumber"
            value={cardData.number}
            onChange={(e) => {
              const formatted = formatCardNumber(e.target.value)
              setCardData({ ...cardData, number: formatted })
              if (errors.number) setErrors({ ...errors, number: "" })
            }}
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            className={`mt-1 ${errors.number ? "border-red-500" : ""}`}
          />
          {errors.number && <div className="text-xs text-red-500 mt-1">{errors.number}</div>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiry" className="text-sm font-medium">
              Срок действия
            </Label>
            <Input
              id="expiry"
              value={cardData.expiry}
              onChange={(e) => {
                const formatted = formatExpiry(e.target.value)
                setCardData({ ...cardData, expiry: formatted })
                if (errors.expiry) setErrors({ ...errors, expiry: "" })
              }}
              placeholder="ММ / ГГ"
              maxLength={7}
              className={`mt-1 ${errors.expiry ? "border-red-500" : ""}`}
            />
            {errors.expiry && <div className="text-xs text-red-500 mt-1">{errors.expiry}</div>}
          </div>

          <div>
            <Label htmlFor="cvc" className="text-sm font-medium">
              CVC
            </Label>
            <Input
              id="cvc"
              value={cardData.cvc}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").substring(0, 3)
                setCardData({ ...cardData, cvc: value })
                if (errors.cvc) setErrors({ ...errors, cvc: "" })
              }}
              placeholder="000"
              maxLength={3}
              className={`mt-1 ${errors.cvc ? "border-red-500" : ""}`}
            />
            {errors.cvc && <div className="text-xs text-red-500 mt-1">{errors.cvc}</div>}
          </div>
        </div>

        {/* Receipt Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="receipt"
            checked={cardData.needReceipt}
            onCheckedChange={(checked) => setCardData({ ...cardData, needReceipt: checked as boolean })}
          />
          <Label htmlFor="receipt" className="text-sm">
            Нужен чек
          </Label>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className="w-full bg-[#0066FF] hover:bg-[#0052CC] h-12 text-base font-medium"
      >
        Оплатить {amount}₽
      </Button>

      {/* Security Info */}
      <div className="text-xs text-gray-500 text-center">Ваши данные защищены по стандарту PCI DSS</div>
    </div>
  )
}

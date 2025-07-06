"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { PaymentMethodSelection } from "./PaymentMethodSelection"
import { PaymentCardForm } from "./PaymentCardForm"
import { PaymentProcessing } from "./PaymentProcessing"
import { PaymentSuccess } from "./PaymentSuccess"
import { PaymentError } from "./PaymentError"

export interface PaymentData {
  amount: number
  bookingId: string
  method: "card" | "yumoney" | "tpay" | "sbp"
  cardData?: {
    number: string
    expiry: string
    cvc: string
    needReceipt: boolean
  }
}

export interface PaymentResult {
  success: boolean
  transactionId?: string
  error?: string
  timestamp: string
}

export type PaymentStep = "method-selection" | "card-form" | "processing" | "success" | "error"

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  paymentData: PaymentData | null
  onSuccess: () => void
  onError: () => void
}

export function PaymentModal({ open, onOpenChange, paymentData, onSuccess, onError }: PaymentModalProps) {
  const [step, setStep] = useState<PaymentStep>("method-selection")
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    needReceipt: false,
  })
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds

  // Timer countdown
  useEffect(() => {
    if (!open) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onOpenChange(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [open, onOpenChange])

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setStep("method-selection")
      setCardData({ number: "", expiry: "", cvc: "", needReceipt: false })
      setPaymentResult(null)
      setTimeLeft(900)
    }
  }, [open])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleMethodSelect = (method: string) => {
    if (method === "card") {
      setStep("card-form")
    } else {
      // Show "Feature in development" for other methods
      alert("Функция в разработке")
    }
  }

  const handleCardSubmit = async () => {
    setStep("processing")

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // 90% success rate, 10% error rate
    const isSuccess = Math.random() > 0.1

    const result: PaymentResult = {
      success: isSuccess,
      transactionId: isSuccess ? `txn_${Date.now()}` : undefined,
      error: isSuccess ? undefined : "Недостаточно средств на карте",
      timestamp: new Date().toISOString(),
    }

    setPaymentResult(result)
    setStep(isSuccess ? "success" : "error")

    if (isSuccess) {
      setTimeout(() => {
        onSuccess()
      }, 2000)
    }
  }

  const handleRetry = () => {
    setStep("method-selection")
    setPaymentResult(null)
  }

  const handleClose = () => {
    onOpenChange(false)
    if (step === "error") {
      onError()
    }
  }

  if (!paymentData) return null

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  const ModalContent = (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#0066FF] rounded flex items-center justify-center">
            <span className="text-white text-sm font-bold">Y</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">YooKassa</div>
            <div className="text-xs text-gray-500">yoomoney.ru</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-lg">{paymentData.amount}₽</div>
          <div className="text-xs text-gray-500">Завершите оплату в течение {formatTime(timeLeft)}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {step === "method-selection" && (
          <PaymentMethodSelection amount={paymentData.amount} onMethodSelect={handleMethodSelect} />
        )}

        {step === "card-form" && (
          <PaymentCardForm
            amount={paymentData.amount}
            cardData={cardData}
            setCardData={setCardData}
            onSubmit={handleCardSubmit}
            onBack={() => setStep("method-selection")}
          />
        )}

        {step === "processing" && <PaymentProcessing />}

        {step === "success" && paymentResult && (
          <PaymentSuccess result={paymentResult} amount={paymentData.amount} onClose={handleClose} />
        )}

        {step === "error" && paymentResult && (
          <PaymentError result={paymentResult} onRetry={handleRetry} onClose={handleClose} />
        )}
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh]">{ModalContent}</DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0">{ModalContent}</DialogContent>
    </Dialog>
  )
}

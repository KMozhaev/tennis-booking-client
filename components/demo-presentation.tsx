"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface DemoPresentationProps {
  onComplete: () => void
}

export function DemoPresentation({ onComplete }: DemoPresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const slides = [
    {
      id: "problem",
      type: "problem" as const,
    },
    {
      id: "solution",
      type: "solution" as const,
    },
  ]

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      onComplete()
    }
  }

  const skipDemo = () => {
    onComplete()
  }

  // Auto-advance after 8 seconds on problem slide
  useEffect(() => {
    if (currentSlide === 0) {
      const timer = setTimeout(() => {
        nextSlide()
      }, 16000)
      return () => clearTimeout(timer)
    }
  }, [currentSlide])

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Skip button */}
      <div className="absolute top-4 right-4 z-10">
        <Button variant="ghost" onClick={skipDemo} className="text-white hover:bg-white/10 text-sm">
          Пропустить
        </Button>
      </div>

      {/* Slide content */}
      <div className={`flex-1 transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
        {currentSlide === 0 && <ProblemSlide />}
        {currentSlide === 1 && <SolutionSlide onComplete={onComplete} />}
      </div>

      {/* Navigation - only show on problem slide */}
      {currentSlide === 0 && (
        <div className="p-6 flex items-center justify-between">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextSlide}
            className="bg-[#4285f4] hover:bg-[#3367d6] text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            Далее
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

function ProblemSlide() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Знакомая ситуация?</h1>
          <p className="text-xl text-gray-300">Рутина управления теннисным и падел-клубом</p>
        </div>

        {/* Problem image */}
        <div className="relative">
          <img
            src="/images/problem-slide.png"
            alt="Проблемы управления теннисным клубом"
            className="w-full h-auto rounded-lg shadow-2xl"
          />

          {/* Overlay text annotations */}
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
            Ручное ведение расписания
          </div>
          <div className="absolute top-1/2 right-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
            Постоянные звонки
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
            Пропущенные клиенты
          </div>
        </div>

        {/* Problem points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <div className="text-red-400 text-3xl font-bold mb-2">15 часов</div>
            <div className="text-gray-300">в неделю на администрирование</div>
          </div>
          <div className="text-center">
            <div className="text-red-400 text-3xl font-bold mb-2">30%</div>
            <div className="text-gray-300">пропущенных звонков</div>
          </div>
          <div className="text-center">
            <div className="text-red-400 text-3xl font-bold mb-2">65%</div>
            <div className="text-gray-300">загрузка кортов</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SolutionSlide({ onComplete }: { onComplete: () => void }) {
  const [showGlow, setShowGlow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowGlow(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      {/* Top section with metrics */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-6xl w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-white mb-2">Courtoo</div>
            <div className="text-lg text-blue-100">Современная система бронирования</div>
          </div>

          {/* Main revenue highlight */}
          <div className="text-center mb-12">
            <div
              className={`text-6xl md:text-8xl font-bold text-white mb-4 transition-all duration-1000 ${
                showGlow ? "drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] scale-110" : ""
              }`}
            >
              +₽180 000/мес
            </div>
            <div className="text-2xl text-blue-100">Увеличение выручки за первый квартал</div>
          </div>

          {/* Success metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-green-300 text-4xl font-bold mb-2">+14%</div>
              <div className="text-white">Загрузка кортов</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-green-300 text-4xl font-bold mb-2">-74%</div>
              <div className="text-white">Время на администрирование</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-green-300 text-4xl font-bold mb-2">-8%</div>
              <div className="text-white">Снижение потерь от неявок</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with booking system preview */}
      <div className="bg-white/95 backdrop-blur-sm p-6 border-t border-white/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <div className="text-lg font-semibold text-gray-800 mb-2">
              Полный контроль загрузки кортов и тренеров в реальном времени
            </div>
            <div className="text-sm text-gray-600">Нажмите на систему бронирования, чтобы попробовать</div>
          </div>

          <div onClick={onComplete}>
            <BookingSystemPreview />
          </div>
        </div>
      </div>
    </div>
  )
}

// Add this new component:
function BookingSystemPreview() {
  return (
    <div className="relative bg-[#F9F9F9] rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-300 rounded" />
          <h1 className="text-lg font-semibold">Courtoo</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex gap-4">
          <div className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm">07.07.2025</div>
          <div className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm">Все корты</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex">
          <div className="px-6 py-3 text-sm font-medium border-b-2 border-[#4285f4] text-[#4285f4]">
            Бронирование корта
          </div>
          <div className="px-6 py-3 text-sm font-medium text-gray-500">Тренировка с тренером</div>
        </div>
      </div>

      {/* Booking grid preview */}
      <div className="p-4">
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-[#4285f4] rounded"></div>
          Нажмите на слоты для выбора времени • Минимум 60 минут
        </div>

        {/* Simplified grid */}
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-6 gap-0">
            {/* Header */}
            <div className="bg-white p-2 text-xs font-medium border-r border-b border-gray-300"></div>
            <div className="bg-white p-2 text-xs font-medium text-center border-r border-b border-gray-300">Корт 1</div>
            <div className="bg-white p-2 text-xs font-medium text-center border-r border-b border-gray-300">Корт 2</div>
            <div className="bg-white p-2 text-xs font-medium text-center border-r border-b border-gray-300">Корт 3</div>
            <div className="bg-white p-2 text-xs font-medium text-center border-r border-b border-gray-300">Корт 4</div>
            <div className="bg-white p-2 text-xs font-medium text-center border-b border-gray-300">Корт 5</div>

            {/* Sample rows */}
            {["08:00", "08:30", "09:00"].map((time, index) => (
              <>
                <div
                  key={`time-${index}`}
                  className="bg-white p-2 text-xs text-right border-r border-b border-gray-300"
                >
                  {time}
                </div>
                <div className="bg-[#e0e0e0] p-2 text-xs text-center border-r border-b border-gray-300">Занято</div>
                <div className="bg-[#f8f9fa] p-2 text-xs text-center border-r border-b border-gray-300 group-hover:bg-blue-50 transition-colors">
                  <div className="font-medium">384₽</div>
                  <div className="opacity-60">30 мин</div>
                </div>
                <div className="bg-[#f8f9fa] p-2 text-xs text-center border-r border-b border-gray-300 group-hover:bg-blue-50 transition-colors">
                  <div className="font-medium">576₽</div>
                  <div className="opacity-60">30 мин</div>
                </div>
                <div className="bg-[#f8f9fa] p-2 text-xs text-center border-r border-b border-gray-300 group-hover:bg-blue-50 transition-colors">
                  <div className="font-medium">480₽</div>
                  <div className="opacity-60">30 мин</div>
                </div>
                <div className="bg-[#f8f9fa] p-2 text-xs text-center border-b border-gray-300 group-hover:bg-blue-50 transition-colors">
                  <div className="font-medium">384₽</div>
                  <div className="opacity-60">30 мин</div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
        <div className="bg-[#4285f4] text-white px-6 py-3 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity transform scale-95 group-hover:scale-100">
          Попробовать систему
        </div>
      </div>
    </div>
  )
}

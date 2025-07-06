"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, Clock, Users } from "lucide-react"

interface DemoSlideProps {
  onStartDemo: () => void
}

export function DemoSlide({ onStartDemo }: DemoSlideProps) {
  const [animateRevenue, setAnimateRevenue] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateRevenue(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-400/20 rounded-full blur-lg"></div>
      </div>

      {/* Sparkle effects */}
      <div className="absolute top-1/4 left-1/3 animate-pulse">
        <Sparkles className="w-6 h-6 text-yellow-300" />
      </div>
      <div className="absolute top-1/3 right-1/4 animate-pulse delay-300">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="absolute bottom-1/3 left-1/5 animate-pulse delay-700">
        <Sparkles className="w-5 h-5 text-green-300" />
      </div>

      <div className="text-center space-y-8 max-w-6xl mx-auto relative z-10">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Courtoo</h1>
          <div className="w-16 h-1 bg-white/60 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Main revenue metric with glow effect */}
        <div className="relative">
          <div
            className={`text-6xl md:text-8xl font-black text-white transition-all duration-1000 ${
              animateRevenue ? "scale-110 drop-shadow-2xl" : "scale-100"
            }`}
            style={{
              textShadow: animateRevenue ? "0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.4)" : "none",
            }}
          >
            +₽180 000<span className="text-4xl md:text-5xl">/мес</span>
          </div>
          <p className="text-xl md:text-2xl text-white/90 mt-4 font-medium">Увеличение выручки за первый квартал</p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-green-300 mb-2">+340%</div>
            <div className="text-white/80 text-lg flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Загрузка кортов
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2">-85%</div>
            <div className="text-white/80 text-lg flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              Время на администрирование
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-300 mb-2">98%</div>
            <div className="text-white/80 text-lg flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Довольные клиенты
            </div>
          </div>
        </div>

        {/* System description */}
        <div className="mt-12 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Современная система бронирования</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">Полный контроль загрузки кортов в реальном времени</p>
        </div>

        {/* Booking interface preview */}
        <div className="mt-12 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-gray-100 px-3 py-1 rounded-md">07.07.2025</span>
              <span className="bg-gray-100 px-3 py-1 rounded-md">Все корты</span>
            </div>
          </div>

          <div className="border-b border-gray-200 mb-4">
            <div className="flex gap-6">
              <button className="pb-2 px-1 border-b-2 border-[#4285f4] text-[#4285f4] font-medium text-sm">
                Бронирование корта
              </button>
              <button className="pb-2 px-1 text-gray-500 text-sm">Тренировка с тренером</button>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm text-gray-600">
            <div className="w-3 h-3 bg-[#4285f4] rounded"></div>
            Нажмите на слоты для выбора времени • Минимум 60 минут
          </div>

          {/* Booking grid preview */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="grid grid-cols-6 gap-0 text-xs">
              {/* Header */}
              <div className="bg-white p-2 border-r border-b border-gray-200"></div>
              <div className="bg-white p-2 border-r border-b border-gray-200 font-medium text-center">
                Корт 1 (Макс)
              </div>
              <div className="bg-white p-2 border-r border-b border-gray-200 font-medium text-center">
                Корт 2 (Макс)
              </div>
              <div className="bg-white p-2 border-r border-b border-gray-200 font-medium text-center">
                Корт 3 (Грунт)
              </div>
              <div className="bg-white p-2 border-r border-b border-gray-200 font-medium text-center">
                Корт 4 (Грунт)
              </div>
              <div className="bg-white p-2 border-b border-gray-200 font-medium text-center">Корт 5 (Крытый)</div>

              {/* Time slots */}
              {[
                { time: "08:00", slots: ["Занято", "384₽", "576₽", "480₽", "384₽"] },
                { time: "08:30", slots: ["Занято", "384₽", "576₽", "480₽", "384₽"] },
                { time: "09:00", slots: ["480₽", "Занято", "576₽", "480₽", "384₽"] },
              ].map((row, i) => (
                <React.Fragment key={i}>
                  <div className="bg-white p-2 border-r border-b border-gray-200 text-right font-medium">
                    {row.time}
                  </div>
                  {row.slots.map((slot, j) => (
                    <div
                      key={j}
                      className={`p-2 border-r border-b border-gray-200 text-center ${
                        slot === "Занято" ? "bg-gray-200 text-gray-600" : "bg-gray-50 hover:bg-blue-50 cursor-pointer"
                      }`}
                    >
                      <div className="font-medium">{slot}</div>
                      {slot !== "Занято" && <div className="text-xs opacity-60">30 мин</div>}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12">
          <Button
            onClick={onStartDemo}
            className="bg-white text-[#6366f1] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Попробовать систему
          </Button>
          <p className="text-white/70 text-sm mt-4">Демо-версия • Без регистрации</p>
        </div>
      </div>
    </div>
  )
}

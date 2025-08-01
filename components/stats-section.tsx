"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Globe, Clock, DollarSign } from "lucide-react"

const stats = [
  {
    icon: Clock,
    label: "Domain Age",
    value: "11",
    suffix: "Months",
    description: "Established domain with history",
  },
  {
    icon: DollarSign,
    label: "Market Value",
    value: "3499",
    prefix: "$",
    description: "Competitive pricing for premium domain",
  },
  {
    icon: Globe,
    label: "Global Reach",
    value: "195",
    suffix: "Countries",
    description: "Worldwide recognition potential",
  },
  {
    icon: TrendingUp,
    label: "ROI Potential",
    value: "500",
    suffix: "%+",
    description: "Expected value appreciation",
  },
]

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return <span>{count.toLocaleString()}</span>
}

export default function StatsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Domain Statistics
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Key metrics that demonstrate the value and potential of NvidiaCore.com
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-blue-400/50 transition-all duration-300 group"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-blue-400" />
                </div>

                <div className="text-4xl font-bold text-white mb-2">
                  {stat.prefix}
                  <AnimatedCounter value={Number.parseInt(stat.value)} />
                  {stat.suffix}
                </div>

                <div className="text-lg font-semibold text-blue-400 mb-2">{stat.label}</div>

                <div className="text-sm text-gray-400">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-green-500/10 border border-green-400/30 rounded-xl">
            <h3 className="text-xl font-bold text-green-400 mb-2">Clean History</h3>
            <p className="text-gray-300">No penalties, no trademark issues, perfect reputation</p>
          </div>

          <div className="text-center p-6 bg-blue-500/10 border border-blue-400/30 rounded-xl">
            <h3 className="text-xl font-bold text-blue-400 mb-2">Instant Transfer</h3>
            <p className="text-gray-300">Quick and secure domain transfer via Atom.com</p>
          </div>

          <div className="text-center p-6 bg-purple-500/10 border border-purple-400/30 rounded-xl">
            <h3 className="text-xl font-bold text-purple-400 mb-2">Multiple Payment</h3>
            <p className="text-gray-300">Crypto, escrow, credit cards - your choice</p>
          </div>
        </div>
      </div>
    </section>
  )
}

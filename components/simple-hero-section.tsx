"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Zap, Cpu, Brain, ExternalLink, Coins, DollarSign } from "lucide-react"
import CryptoPaymentModal from "./crypto-payment-modal"

export default function SimpleHeroSection() {
  const [cryptoModalOpen, setCryptoModalOpen] = useState(false)
  const [paymentType, setPaymentType] = useState<"buy-now" | "make-offer">("buy-now")

  const openCryptoModal = (type: "buy-now" | "make-offer") => {
    setPaymentType(type)
    setCryptoModalOpen(true)
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Animated Background - Pure CSS */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 tech-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Animated particles using pure CSS */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Binary rain effect */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 text-sm font-mono animate-pulse font-bold"
              style={{
                left: `${i * 6.5}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            >
              {Array.from({ length: 25 }).map((_, j) => (
                <div key={j} className="mb-2 opacity-80">
                  {Math.random() > 0.5 ? "1" : "0"}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Large animated AI symbols - Pure CSS */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-9xl mb-8 animate-pulse text-green-400/20">⚡</div>
          <div className="text-7xl mb-4 animate-bounce text-blue-400/20">🧠</div>
          <div className="text-8xl animate-pulse text-purple-400/20">🔥</div>
        </div>
      </div>

      {/* Floating geometric shapes - Pure CSS */}
      <div className="absolute inset-0 z-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 border-2 border-green-400/30 rotate-45 animate-bounce"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + Math.sin(i) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="hero-title-responsive font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse font-orbitron">
            NvidiaCore
          </h1>
          <div className="hero-subtitle-responsive text-gray-300 mb-6 font-light">Premium AI Domain for Sale</div>
          <div className="text-4xl md:text-5xl font-bold text-green-400 mb-8 animate-bounce font-orbitron">$3,499</div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-green-400/30 hover:scale-105 transition-transform">
            <Brain className="w-5 h-5 text-green-400 animate-pulse" />
            <span className="text-green-400">AI Ready</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30 hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5 text-blue-400 animate-pulse" />
            <span className="text-blue-400">GPU Optimized</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-400/30 hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-purple-400">Tech Focused</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            size="lg"
            className="button-ultra-responsive bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-400/50"
            onClick={() => window.open("https://www.atom.com/name/nvidiacore", "_blank")}
          >
            Buy Now - Atom.com
            <ExternalLink className="ml-2 w-5 h-5" />
          </Button>

          
        </div>

        {/* Secondary Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
 <Button
  variant="outline"
  size="lg"
  className="button-ultra-responsive border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent hover:scale-105"
  onClick={() => {
    setTimeout(() => {
      const el = document.getElementById("contact-section")
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }}
>
  Make Offer
  <DollarSign className="ml-2 w-5 h-5" />
</Button>



          
        </div>

        <div className="mt-8 text-gray-400 text-sm">
          ✓ 11 months old • ✓ Clean history • ✓ No trademarks • ✓ Multiple payment options
        </div>

        {/* Live indicators */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <span>1000 viewers online</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>23 interested buyers</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <span>7 active negotiations</span>
          </div>
        </div>
      </div>

      {/* Crypto Payment Modal */}
      <CryptoPaymentModal
        isOpen={cryptoModalOpen}
        onClose={() => setCryptoModalOpen(false)}
        paymentType={paymentType}
      />
    </section>
  )
}

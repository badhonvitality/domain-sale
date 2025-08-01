"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// More robust dynamic import with better error handling
const EnhancedHeroSection = dynamic(() => import("@/components/enhanced-hero-section"), {
  ssr: false,
  loading: () => <HeroLoadingFallback />,
})

// Fallback component that matches the main hero structure
function HeroLoadingFallback() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 tech-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Binary rain effect */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 text-sm font-mono animate-pulse font-bold"
              style={{
                left: `${i * 6}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            >
              {Array.from({ length: 30 }).map((_, j) => (
                <div key={j} className="mb-2 opacity-80">
                  {Math.random() > 0.5 ? "1" : "0"}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse font-orbitron">
            NvidiaCore.com
          </h1>
          <div className="text-2xl md:text-3xl text-gray-300 mb-6 font-light">Premium AI Domain for Sale</div>
          <div className="text-4xl md:text-5xl font-bold text-green-400 mb-8 animate-bounce font-orbitron">$3,499</div>
        </div>

        {/* Loading indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400"></div>
        </div>

        <div className="text-gray-400 text-sm animate-pulse">
          ✓ 11 months old • ✓ Clean history • ✓ No trademarks • ✓ Loading 3D experience...
        </div>
      </div>
    </section>
  )
}

export default function ClientHeroWrapper() {
  const [mounted, setMounted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Error boundary for client-side errors
    const handleError = (error: ErrorEvent) => {
      console.error("Client-side error:", error)
      if (error.message?.includes("Three") || error.message?.includes("WebGL")) {
        setHasError(true)
      }
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return <HeroLoadingFallback />
  }

  // If there's an error with 3D, show fallback
  if (hasError) {
    return <Hero2DFallback />
  }

  return <EnhancedHeroSection />
}

// 2D fallback hero section
function Hero2DFallback() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Enhanced 2D Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 tech-grid opacity-30 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Animated particles using CSS */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
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

        {/* Binary rain */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 text-sm font-mono animate-pulse font-bold"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            >
              {Array.from({ length: 40 }).map((_, j) => (
                <div key={j} className="mb-2 opacity-80">
                  {Math.random() > 0.5 ? "1" : "0"}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Large animated AI symbol */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-9xl mb-8 animate-pulse text-green-400/30">⚡</div>
          <div className="text-6xl mb-4 animate-bounce text-blue-400/30">🧠</div>
          <div className="text-8xl animate-pulse text-purple-400/30">🔥</div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse font-orbitron">
            NvidiaCore
          </h1>
          <div className="text-2xl md:text-3xl text-gray-300 mb-6 font-light">Premium AI Domain for Sale</div>
          <div className="text-4xl md:text-5xl font-bold text-green-400 mb-8 animate-bounce font-orbitron">$3,499</div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-green-400/30 animate-pulse">
            <span className="text-green-400">🧠 AI Ready</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30 animate-pulse">
            <span className="text-blue-400">⚡ GPU Optimized</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-400/30 animate-pulse">
            <span className="text-purple-400">🚀 Tech Focused</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => window.open("https://www.atom.com/name/nvidiacore", "_blank")}
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Buy Now - Atom.com 🔗
          </button>
          <button className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent">
            Make Offer 💰
          </button>
        </div>

        <div className="mt-8 text-gray-400 text-sm">
          ✓ 11 months old • ✓ Clean history • ✓ No trademarks • ✓ Multiple payment options
        </div>
      </div>
    </section>
  )
}

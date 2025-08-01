"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Zap, Cpu, Brain, ExternalLink, Coins, DollarSign } from "lucide-react"
import CryptoPaymentModal from "./crypto-payment-modal"

// More defensive dynamic imports with better error handling
const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => ({ default: mod.Canvas })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
})

const OrbitControls = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.OrbitControls })), {
  ssr: false,
})

const Sphere = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.Sphere })), { ssr: false })

const Box = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.Box })), { ssr: false })

const Float = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.Float })), { ssr: false })

// Error boundary component
function ErrorBoundary({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = () => setHasError(true)
    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (hasError) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Simplified and more stable 3D components
function AICore() {
  try {
    return (
      <group>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
            />
          </Sphere>
        </Float>

        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[2, 0.1, 16, 100]} />
          <meshStandardMaterial color="#0088ff" emissive="#0088ff" emissiveIntensity={0.2} />
        </mesh>

        {Array.from({ length: 6 }).map((_, i) => (
          <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.3}>
            <Box
              args={[0.3, 0.3, 0.3]}
              position={[Math.cos((i / 6) * Math.PI * 2) * 3, Math.sin((i / 6) * Math.PI * 2) * 2, 0]}
            >
              <meshStandardMaterial color="#8800ff" emissive="#8800ff" emissiveIntensity={0.2} />
            </Box>
          </Float>
        ))}

        <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0088ff" />
        <ambientLight intensity={0.2} />
      </group>
    )
  } catch (error) {
    console.error("AICore error:", error)
    return null
  }
}

function ParticleField() {
  try {
    const positions = new Float32Array(150)
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }

    return (
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={50} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#00ff88" transparent opacity={0.6} sizeAttenuation />
      </points>
    )
  } catch (error) {
    console.error("ParticleField error:", error)
    return null
  }
}

function Simple3DScene() {
  const [mounted, setMounted] = useState(false)
  const [webGLSupported, setWebGLSupported] = useState(true)

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) {
        setWebGLSupported(false)
      }
    } catch (error) {
      setWebGLSupported(false)
    }

    setMounted(true)
  }, [])

  if (!mounted || !webGLSupported) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-8 animate-pulse">⚡</div>
          <div className="text-green-400 text-2xl font-bold animate-bounce">AI POWERED</div>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary
      fallback={
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-8 animate-pulse">⚡</div>
            <div className="text-green-400 text-2xl font-bold animate-bounce">AI POWERED</div>
          </div>
        </div>
      }
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
          }}
        >
          <Suspense fallback={null}>
            <AICore />
            <ParticleField />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              enableDamping={false}
            />
          </Suspense>
        </Canvas>
      </Suspense>
    </ErrorBoundary>
  )
}

export default function EnhancedHeroSection() {
  const [cryptoModalOpen, setCryptoModalOpen] = useState(false)
  const [paymentType, setPaymentType] = useState<"buy-now" | "make-offer">("buy-now")
  const [showFallback, setShowFallback] = useState(false)

  const openCryptoModal = (type: "buy-now" | "make-offer") => {
    setPaymentType(type)
    setCryptoModalOpen(true)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 tech-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* CSS-only animated background */}
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
              {Array.from({ length: 30 }).map((_, j) => (
                <div key={j} className="mb-2 opacity-80">
                  {Math.random() > 0.5 ? "1" : "0"}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 3D Scene with better error handling */}
      {!showFallback && (
        <div className="absolute inset-0 z-10">
          <Simple3DScene />
        </div>
      )}

      {/* Fallback animated background */}
      {showFallback && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-8 animate-pulse">⚡</div>
            <div className="text-green-400 text-2xl font-bold animate-bounce">AI POWERED</div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse font-orbitron">
            NvidiaCore.com
          </h1>
          <div className="text-2xl md:text-3xl text-gray-300 mb-6 font-light">Premium AI Domain for Sale</div>
          <div className="text-4xl md:text-5xl font-bold text-green-400 mb-8 animate-bounce font-orbitron">$3,499</div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-green-400/30">
            <Brain className="w-5 h-5 text-green-400" />
            <span className="text-green-400">AI Ready</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30">
            <Cpu className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400">GPU Optimized</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-400/30">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400">Tech Focused</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            onClick={() => window.open("https://www.atom.com/name/nvidiacore", "_blank")}
          >
            Buy Now - Atom.com
            <ExternalLink className="ml-2 w-5 h-5" />
          </Button>

          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            onClick={() => openCryptoModal("buy-now")}
          >
            Buy with Crypto
            <Coins className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent"
          >
            Make Offer - Traditional
            <DollarSign className="ml-2 w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent"
            onClick={() => openCryptoModal("make-offer")}
          >
            Make Crypto Offer
            <Coins className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <div className="mt-8 text-gray-400 text-sm">
          ✓ 11 months old • ✓ Clean history • ✓ No trademarks • ✓ Multiple payment options
        </div>
      </div>

      <CryptoPaymentModal
        isOpen={cryptoModalOpen}
        onClose={() => setCryptoModalOpen(false)}
        paymentType={paymentType}
      />
    </section>
  )
}

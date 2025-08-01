"use client"

import { useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Cpu, Brain } from "lucide-react"

// Dynamically import 3D components with no SSR
const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => ({ default: mod.Canvas })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
})

const OrbitControls = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.OrbitControls })), {
  ssr: false,
})

const Sphere = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.Sphere })), {
  ssr: false,
})

const Box = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.Box })), {
  ssr: false,
})

const Float = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.Float })), {
  ssr: false,
})

function AICore() {
  return (
    <group>
      {/* Central AI Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.3} transparent opacity={0.8} />
        </Sphere>
      </Float>

      {/* Orbiting Ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshStandardMaterial color="#0088ff" emissive="#0088ff" emissiveIntensity={0.2} />
      </mesh>

      {/* GPU Cubes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.3}>
          <Box
            args={[0.3, 0.3, 0.3]}
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 4,
              Math.sin((i / 8) * Math.PI * 2) * 2,
              Math.sin((i / 8) * Math.PI * 2) * 1,
            ]}
          >
            <meshStandardMaterial color="#8800ff" emissive="#8800ff" emissiveIntensity={0.2} />
          </Box>
        </Float>
      ))}

      {/* Lighting */}
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0088ff" />
      <ambientLight intensity={0.2} />
    </group>
  )
}

function ParticleField() {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={50}
          array={new Float32Array(150).map(() => (Math.random() - 0.5) * 20)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00ff88" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* 3D Scene */}
      {mounted && (
        <div className="absolute inset-0 z-10">
          <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
              <Suspense fallback={null}>
                <AICore />
                <ParticleField />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Suspense>
            </Canvas>
          </Suspense>
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
            NvidiaCore.com
          </h1>
          <div className="text-2xl md:text-3xl text-gray-300 mb-6 font-light">Premium AI Domain for Sale</div>
          <div className="text-4xl md:text-5xl font-bold text-green-400 mb-8 animate-bounce">$3,499</div>
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Buy Now - Instant Transfer
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent"
          >
            Make Offer
          </Button>
        </div>

        <div className="mt-8 text-gray-400 text-sm">
          ✓ 11 months old • ✓ Clean history • ✓ No trademarks • ✓ Instant transfer via Atom.com
        </div>
      </div>
    </section>
  )
}

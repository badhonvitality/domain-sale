"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Sphere,
  Box,
  Float,
  Text3D,
  Environment,
  MeshDistortMaterial,
  Sparkles,
  Stars,
  Sky,
  Octahedron,
} from "@react-three/drei"
import { useRef, useMemo, useState, useEffect } from "react"
import type * as THREE from "three"
import { Button } from "@/components/ui/button"
import { Zap, Cpu, Brain, Sparkle, Rocket, Star, Globe, Shield, ExternalLink } from "lucide-react"

// Advanced AI Core with Neural Network Visualization
function AICore() {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const neuralRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.1
    }
    if (neuralRef.current) {
      neuralRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group>
      {/* Central AI Core with Distortion */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere
          ref={meshRef}
          args={[1.2, 64, 64]}
          position={[0, 0, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <MeshDistortMaterial
            color={hovered ? "#00ffff" : "#00ff88"}
            emissive={hovered ? "#00ffff" : "#00ff88"}
            emissiveIntensity={0.6}
            transparent
            opacity={0.9}
            distort={0.3}
            speed={2}
            roughness={0}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Multiple Orbiting Rings */}
      <mesh ref={ringRef} position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.1, 16, 100]} />
        <meshStandardMaterial color="#00aaff" emissive="#00aaff" emissiveIntensity={0.5} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[3, 0.08, 16, 100]} />
        <meshStandardMaterial color="#aa00ff" emissive="#aa00ff" emissiveIntensity={0.4} />
      </mesh>

      <mesh rotation={[0, Math.PI / 4, Math.PI / 3]} position={[0, 0, 0]}>
        <torusGeometry args={[2.8, 0.06, 16, 100]} />
        <meshStandardMaterial color="#ff00aa" emissive="#ff00aa" emissiveIntensity={0.4} />
      </mesh>

      {/* Neural Network Nodes */}
      <group ref={neuralRef}>
        {Array.from({ length: 12 }).map((_, i) => (
          <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.2}>
            <Octahedron
              args={[0.15]}
              position={[
                Math.cos((i / 12) * Math.PI * 2) * 5,
                Math.sin((i / 12) * Math.PI * 2) * 3,
                Math.sin((i / 12) * Math.PI * 4) * 2,
              ]}
            >
              <meshStandardMaterial
                color={`hsl(${(i * 30) % 360}, 100%, 60%)`}
                emissive={`hsl(${(i * 30) % 360}, 100%, 40%)`}
                emissiveIntensity={0.5}
              />
            </Octahedron>
          </Float>
        ))}
      </group>

      {/* GPU Computing Cubes */}
      {Array.from({ length: 16 }).map((_, i) => (
        <Float key={i} speed={1 + i * 0.15} rotationIntensity={0.4}>
          <Box
            args={[0.3, 0.3, 0.3]}
            position={[
              Math.cos((i / 16) * Math.PI * 2) * 6,
              Math.sin((i / 16) * Math.PI * 2) * 4,
              Math.sin((i / 16) * Math.PI * 3) * 2,
            ]}
          >
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={0.4}
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
        </Float>
      ))}

      {/* Enhanced Lighting System */}
      <pointLight position={[10, 10, 10]} intensity={3} color="#00ff88" />
      <pointLight position={[-10, -10, -10]} intensity={2} color="#00aaff" />
      <pointLight position={[0, 10, -10]} intensity={2.5} color="#aa00ff" />
      <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={3} color="#ffffff" castShadow />
      <ambientLight intensity={0.4} />
    </group>
  )
}

// Advanced Particle System with Multiple Types
function AdvancedParticleField() {
  const points = useRef<THREE.Points>(null)
  const aiParticles = useRef<THREE.Points>(null)
  const gpuParticles = useRef<THREE.Points>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(300 * 3)
    for (let i = 0; i < 300; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return positions
  }, [])

  const aiParticlesPosition = useMemo(() => {
    const positions = new Float32Array(150 * 3)
    for (let i = 0; i < 150; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25
    }
    return positions
  }, [])

  const gpuParticlesPosition = useMemo(() => {
    const positions = new Float32Array(100 * 3)
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05
      points.current.rotation.x = state.clock.elapsedTime * 0.02
    }
    if (aiParticles.current) {
      aiParticles.current.rotation.y = -state.clock.elapsedTime * 0.03
      aiParticles.current.rotation.z = state.clock.elapsedTime * 0.01
    }
    if (gpuParticles.current) {
      gpuParticles.current.rotation.x = state.clock.elapsedTime * 0.04
      gpuParticles.current.rotation.z = -state.clock.elapsedTime * 0.02
    }
  })

  return (
    <>
      {/* Main Particle Field */}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#00ff88" transparent opacity={0.9} sizeAttenuation />
      </points>

      {/* AI Particles */}
      <points ref={aiParticles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={aiParticlesPosition.length / 3}
            array={aiParticlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.08} color="#00aaff" transparent opacity={0.8} sizeAttenuation />
      </points>

      {/* GPU Particles */}
      <points ref={gpuParticles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={gpuParticlesPosition.length / 3}
            array={gpuParticlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.12} color="#aa00ff" transparent opacity={0.8} sizeAttenuation />
      </points>

      {/* Sparkles Effect */}
      <Sparkles count={200} scale={[20, 20, 20]} size={4} speed={0.5} opacity={0.8} color="#ffffff" />
    </>
  )
}

// Floating 3D Text
function Floating3DText() {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <Text3D
        ref={textRef}
        font="/fonts/Geist_Bold.json"
        size={0.8}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[0, -8, 0]}
      >
        NVIDIACORE.COM
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Text3D>
    </Float>
  )
}

export default function Advanced3DHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-green-400 mx-auto mb-4"></div>
          <div className="text-white text-xl font-bold">Loading 3D Experience...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 tech-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Enhanced Binary Rain */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 text-sm font-mono animate-pulse font-bold"
              style={{
                left: `${i * 4}%`,
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

      {/* Advanced 3D Scene */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }} gl={{ antialias: true, alpha: true }} shadows>
          {/* Environment and Sky */}
          <Environment preset="night" />
          <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          {/* Main 3D Components */}
          <AICore />
          <AdvancedParticleField />
          <Floating3DText />

          {/* Advanced Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />

          {/* Fog for Depth */}
          <fog attach="fog" args={["#000000", 10, 50]} />
        </Canvas>
      </div>

      {/* Enhanced Content Overlay with Better Contrast */}
      <div className="relative z-20 text-center max-w-6xl mx-auto px-4">
        <div className="mb-12">
          {/* Enhanced Title with Better Visibility */}
          <h1 className="hero-title-responsive font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse font-orbitron drop-shadow-2xl">
              NvidiaCore
            </span>
            <div className="absolute -inset-2 bg-gradient-to-r from-green-400/30 via-blue-500/30 to-purple-600/30 rounded-lg blur-xl opacity-50 animate-pulse"></div>
          </h1>

          {/* Enhanced Subtitle with Better Contrast */}
          <div className="hero-subtitle-responsive text-gray-100 mb-8 font-light relative drop-shadow-lg">
            <span className="glitch font-semibold text-white" data-text="World's #1 Premium AI GPU Domain For Sale">
              World's #1 Premium AI GPU Domain For Sale
            </span>
          </div>

          {/* Enhanced Price with Better Visibility but Less Glow */}
          <div className="text-5xl md:text-7xl font-bold mb-8 relative drop-shadow-lg">
            <span className="animate-bounce inline-block text-white font-orbitron">$</span>
            <span className="price-enhanced font-orbitron text-green-400">3,499</span>
            <div className="absolute inset-0 animate-ping bg-green-400/20 rounded-full opacity-30"></div>
          </div>

          {/* Enhanced Status Badges with Better Contrast */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-gradient-to-r from-green-600/40 to-green-700/40 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-green-300/60 hover:scale-105 transition-transform shadow-lg">
              <Brain className="w-6 h-6 text-green-300 animate-pulse drop-shadow-lg" />
              <span className="text-green-200 font-bold drop-shadow-md">AI Ready</span>
              <Sparkle className="w-4 h-4 text-green-300 animate-spin" />
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600/40 to-blue-700/40 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-blue-300/60 hover:scale-105 transition-transform shadow-lg">
              <Cpu className="w-6 h-6 text-blue-300 animate-pulse drop-shadow-lg" />
              <span className="text-blue-200 font-bold drop-shadow-md">GPU Optimized</span>
              <Zap className="w-4 h-4 text-blue-300 animate-bounce" />
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600/40 to-purple-700/40 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-purple-300/60 hover:scale-105 transition-transform shadow-lg">
              <Rocket className="w-6 h-6 text-purple-300 animate-pulse drop-shadow-lg" />
              <span className="text-purple-200 font-bold drop-shadow-md">Tech Focused</span>
              <Star className="w-4 h-4 text-purple-300 animate-spin" />
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons with Atom.com Link */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Button
            size="lg"
            className="button-ultra-responsive bg-gradient-to-r from-green-600 via-blue-700 to-purple-800 hover:from-green-500 hover:via-blue-600 hover:to-purple-700 text-white px-12 py-6 text-xl font-bold rounded-full transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-green-400/50 relative overflow-hidden group border-2 border-green-400/50"
            onClick={() => window.open("https://www.atom.com/name/nvidiacore", "_blank")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Globe className="mr-3 w-6 h-6 animate-spin" />
            Buy Now - Instant Transfer
            <ExternalLink className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="button-ultra-responsive border-4 border-green-300 text-green-200 hover:bg-green-400 hover:text-black px-12 py-6 text-xl font-bold rounded-full transition-all duration-500 bg-black/50 hover:scale-110 shadow-2xl hover:shadow-green-400/50 relative overflow-hidden group backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-green-400 -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <Shield className="mr-3 w-6 h-6 relative z-10" />
            <span className="relative z-10">Make Offer</span>
          </Button>
        </div>

        {/* Enhanced Trust Indicators with Better Visibility */}
        <div className="text-gray-200 text-lg space-y-3 drop-shadow-lg">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <span className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
              <span className="font-semibold text-white">11 months old</span>
            </span>
            <span className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg"></div>
              <span className="font-semibold text-white">Clean history</span>
            </span>
            <span className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-lg"></div>
              <span className="font-semibold text-white">No trademarks</span>
            </span>
            <span className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
              <span className="font-semibold text-white">Instant transfer via Atom.com</span>
            </span>
          </div>

          <div className="text-base opacity-90 mt-6 bg-black/20 px-6 py-3 rounded-full backdrop-blur-sm">
            <span className="text-green-300 font-bold">⚡ Lightning-fast transfer</span> •
            <span className="text-blue-300 font-bold"> 🛡️ Secure escrow</span> •
            <span className="text-purple-300 font-bold"> 💳 Multiple payment options</span> •
            <span className="text-yellow-300 font-bold"> 🌍 Global support</span>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Action Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center gap-4 bg-black/70 backdrop-blur-md px-8 py-4 rounded-full border-2 border-green-400/50 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping shadow-lg"></div>
            <span className="text-green-300 text-sm font-bold drop-shadow-md">LIVE</span>
          </div>
          <div className="text-white text-sm font-semibold">247 viewers online</div>
          <div className="text-gray-300 text-sm">•</div>
          <div className="text-blue-300 text-sm font-semibold">23 interested</div>
          <div className="text-gray-300 text-sm">•</div>
          <div className="text-purple-300 text-sm font-semibold">7 negotiating</div>
        </div>
      </div>
    </section>
  )
}

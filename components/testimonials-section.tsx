"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote, CheckCircle } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, AI Dynamics",
    company: "Fortune 500 AI Company",
    avatar: "/placeholder.svg?height=80&width=80&text=SC",
    content:
      "NvidiaCore.com perfectly captures our brand essence. The domain immediately communicates our focus on AI and high-performance computing. It's exactly what we were looking for.",
    rating: 5,
    verified: true,
    date: "2024-01-15",
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO, TechVenture Capital",
    company: "Leading VC Firm",
    avatar: "/placeholder.svg?height=80&width=80&text=MR",
    content:
      "As investors in the AI space, we recognize the immense value of premium domains like NvidiaCore.com. This is a strategic asset that will appreciate significantly.",
    rating: 5,
    verified: true,
    date: "2024-01-12",
  },
  {
    name: "Dr. Emily Watson",
    role: "Head of Research, Neural Labs",
    company: "AI Research Institute",
    avatar: "/placeholder.svg?height=80&width=80&text=EW",
    content:
      "The domain name immediately establishes credibility in the AI and GPU computing space. It's brandable, memorable, and perfectly aligned with cutting-edge technology.",
    rating: 5,
    verified: true,
    date: "2024-01-10",
  },
  {
    name: "James Park",
    role: "Founder, GPU Solutions",
    company: "Hardware Startup",
    avatar: "/placeholder.svg?height=80&width=80&text=JP",
    content:
      "We've been searching for the perfect domain for months. NvidiaCore.com is exactly what our GPU computing startup needs to establish market presence.",
    rating: 5,
    verified: true,
    date: "2024-01-08",
  },
  {
    name: "Lisa Thompson",
    role: "Brand Manager, TechCorp",
    company: "Global Technology Company",
    avatar: "/placeholder.svg?height=80&width=80&text=LT",
    content:
      "From a branding perspective, NvidiaCore.com is exceptional. It's short, powerful, and immediately conveys innovation and technological leadership.",
    rating: 5,
    verified: true,
    date: "2024-01-05",
  },
  {
    name: "David Kim",
    role: "Domain Investor",
    company: "Premium Domains LLC",
    avatar: "/placeholder.svg?height=80&width=80&text=DK",
    content:
      "I've been in the domain business for 15 years. NvidiaCore.com is a rare find - premium quality with massive potential in the booming AI market.",
    rating: 5,
    verified: true,
    date: "2024-01-03",
  },
  {
    name: "Alex Chen",
    role: "Startup Founder",
    company: "AI Innovation Hub",
    avatar: "/placeholder.svg?height=80&width=80&text=AC",
    content:
      "Perfect domain for our AI startup. Short, memorable, and incredibly brandable! The transfer was instant and secure. Highly recommend!",
    rating: 5,
    verified: true,
    date: "2024-01-01",
  },
  {
    name: "Rachel Green",
    role: "Marketing Director",
    company: "Tech Unicorn",
    avatar: "/placeholder.svg?height=80&width=80&text=RG",
    content:
      "NvidiaCore.com has incredible SEO potential and brand recognition. It's the kind of domain that instantly elevates your company's credibility.",
    rating: 5,
    verified: true,
    date: "2023-12-28",
  },
]

export default function TestimonialsSection() {
  const [currentTestimonials, setCurrentTestimonials] = useState(testimonials.slice(0, 6))
  const [isRotating, setIsRotating] = useState(false)

  // Dynamic testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRotating(true)
      setTimeout(() => {
        setCurrentTestimonials((prev) => {
          const remaining = testimonials.filter((t) => !prev.includes(t))
          if (remaining.length >= 2) {
            const newTestimonials = [...prev]
            // Replace 2 random testimonials
            const randomIndices = [
              Math.floor(Math.random() * newTestimonials.length),
              Math.floor(Math.random() * newTestimonials.length),
            ].filter((v, i, arr) => arr.indexOf(v) === i) // Remove duplicates

            randomIndices.forEach((index, i) => {
              if (remaining[i]) {
                newTestimonials[index] = remaining[i]
              }
            })
            return newTestimonials
          }
          return prev
        })
        setIsRotating(false)
      }, 500)
    }, 8000) // Rotate every 8 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            What Industry Leaders Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from CEOs, CTOs, and domain experts about the value and potential of premium tech domains
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-400 ml-2">4.9/5 from {testimonials.length} reviews</span>
          </div>
        </div>

        <div
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ${isRotating ? "opacity-70 scale-95" : "opacity-100 scale-100"}`}
        >
          {currentTestimonials.map((testimonial, index) => (
            <Card
              key={`${testimonial.name}-${testimonial.date}`}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-purple-400/50 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Quote className="w-8 h-8 text-purple-400 mr-3 animate-pulse" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  {testimonial.verified && (
                    <CheckCircle className="w-4 h-4 text-green-400 ml-2" title="Verified Review" />
                  )}
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>

                <div className="flex items-center">
                  <div className="relative">
                    <Avatar className="w-14 h-14 mr-4 ring-2 ring-purple-400/50 group-hover:ring-purple-400 transition-all duration-300">
                      <AvatarImage
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-lg">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800 animate-pulse"></div>
                  </div>

                  <div className="flex-1">
                    <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {testimonial.name}
                    </div>
                    <div className="text-purple-400 text-sm font-medium">{testimonial.role}</div>
                    <div className="text-gray-400 text-xs">{testimonial.company}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      {new Date(testimonial.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dynamic Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-purple-400/50 transition-colors">
            <div className="text-3xl font-bold text-purple-400 mb-2 animate-pulse">{testimonials.length}+</div>
            <div className="text-gray-400 text-sm">Total Reviews</div>
          </div>

          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-yellow-400/50 transition-colors">
            <div className="text-3xl font-bold text-yellow-400 mb-2">4.9</div>
            <div className="text-gray-400 text-sm">Average Rating</div>
          </div>

          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-green-400/50 transition-colors">
            <div className="text-3xl font-bold text-green-400 mb-2 animate-pulse">100%</div>
            <div className="text-gray-400 text-sm">Verified Reviews</div>
          </div>

          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-blue-400/50 transition-colors">
            <div className="text-3xl font-bold text-blue-400 mb-2">24h</div>
            <div className="text-gray-400 text-sm">Response Time</div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Trusted by Industry Leaders</h3>
            <p className="text-gray-300 mb-6">
              Join the ranks of successful companies who understand the value of premium domains
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
              <div className="text-gray-400 font-semibold hover:text-purple-400 transition-colors cursor-pointer">
                Fortune 500
              </div>
              <div className="text-gray-400 font-semibold hover:text-purple-400 transition-colors cursor-pointer">
                Y Combinator
              </div>
              <div className="text-gray-400 font-semibold hover:text-purple-400 transition-colors cursor-pointer">
                Andreessen Horowitz
              </div>
              <div className="text-gray-400 font-semibold hover:text-purple-400 transition-colors cursor-pointer">
                Sequoia Capital
              </div>
            </div>
          </div>
        </div>

        {/* Live Review Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-gray-400 text-sm">Live reviews updating every few seconds</span>
          </div>
        </div>
      </div>
    </section>
  )
}

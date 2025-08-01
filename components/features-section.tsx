"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Cpu, Zap, Globe, Shield, TrendingUp, Rocket, Star, CheckCircle, Target } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Perfect for AI startups, machine learning companies, and neural network platforms",
    tags: ["AI", "ML", "Neural Networks"],
    color: "text-green-400",
  },
  {
    icon: Cpu,
    title: "GPU & Computing",
    description: "Ideal for GPU manufacturers, computing platforms, and hardware companies",
    tags: ["GPU", "Computing", "Hardware"],
    color: "text-blue-400",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Represents speed, efficiency, and cutting-edge technology solutions",
    tags: ["Performance", "Speed", "Efficiency"],
    color: "text-purple-400",
  },
  {
    icon: Globe,
    title: "Global Appeal",
    description: "Internationally recognized brand with massive market potential",
    tags: ["Global", "Brand", "Market"],
    color: "text-cyan-400",
  },
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "Clean domain history with no trademark issues or penalties",
    tags: ["Secure", "Clean", "Trusted"],
    color: "text-emerald-400",
  },
  {
    icon: TrendingUp,
    title: "Investment Grade",
    description: "Premium domain with strong appreciation potential and ROI",
    tags: ["Investment", "ROI", "Premium"],
    color: "text-orange-400",
  },
]

const industries = [
  "Artificial Intelligence",
  "Machine Learning",
  "GPU Computing",
  "Data Centers",
  "Cloud Computing",
  "Gaming Technology",
  "Cryptocurrency Mining",
  "Autonomous Vehicles",
  "Robotics",
  "Deep Learning",
  "Computer Vision",
  "Neural Networks",
]

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Why NvidiaCore.com?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A premium domain that perfectly captures the essence of modern technology, AI innovation, and
            high-performance computing.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-gray-700 hover:border-green-400/50 transition-all duration-300 group"
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-gray-400">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="bg-gray-700 text-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Industries Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-8 text-white">Perfect for These Industries</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-lg border border-gray-600 hover:border-green-400/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {industry}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/30 rounded-2xl p-8 max-w-2xl mx-auto">
            <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Build Your Empire?</h3>
            <p className="text-gray-300 mb-6">
              NvidiaCore.com is more than just a domain - it's your gateway to the future of technology.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                Premium Quality
              </span>
              <span className="flex items-center gap-1">
                <Rocket className="w-4 h-4 text-blue-400" />
                Instant Transfer
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-400" />
                Secure Transaction
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

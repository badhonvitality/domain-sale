import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Globe, Shield, Clock, Star, ExternalLink, Mail, MessageSquare, User, Code, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Main Footer Content - Fully Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Domain Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-white mb-4 holographic">NvidiaCore.com</h3>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Premium AI domain perfect for technology companies, startups, and innovators.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-xs">
                <Clock className="w-3 h-3 mr-1" />
                11 Months Old
              </Badge>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Clean History
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Actions</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a
                  href="https://www.atom.com/name/nvidiacore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors flex items-center justify-center sm:justify-start gap-1"
                >
                  Buy Now - $3,499
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">
                  Make an Offer
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-purple-400 transition-colors">
                  View Features
                </a>
              </li>
              <li>
                <a href="#stats" className="hover:text-cyan-400 transition-colors">
                  Domain Statistics
                </a>
              </li>
               <li>
                <a href="/privacy-policy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-cyan-400 transition-colors">
                   Terms & Conditions
                </a>
              </li>                           
            </ul>
          </div>
          

          {/* Industries */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold text-white mb-4">Perfect For</h4>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li>• AI & Machine Learning</li>
              <li>• GPU Computing</li>
              <li>• Tech Startups</li>
              <li>• Gaming Companies</li>
              <li>• Data Centers</li>
              <li>• Cloud Computing</li>
            </ul>
          </div>

          {/* Enhanced Contact */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:owner.rido.llc@gmail.com" className="hover:text-blue-300 transition-colors">
                  owner.rido.llc@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <MessageSquare className="w-4 h-4 text-green-400" />
                <a
                  href="https://wa.me/8801708103286"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-300 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <User className="w-4 h-4 text-purple-400" />
                <a
                  href="https://discord.com/users/1121859070488498196"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-300 transition-colors"
                >
                  Discord
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <a
                  href="https://facebook.com/badhonvitality"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800 mb-8" />

        {/* Domain Features - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-yellow-400/50 transition-colors">
            <Star className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-400 mx-auto mb-2" />
            <h5 className="font-semibold text-white mb-1 text-sm sm:text-base">Premium Quality</h5>
            <p className="text-xs sm:text-sm text-gray-400">Hand-picked domain with massive potential</p>
          </div>

          <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-green-400/50 transition-colors">
            <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-green-400 mx-auto mb-2" />
            <h5 className="font-semibold text-white mb-1 text-sm sm:text-base">Secure Transfer</h5>
            <p className="text-xs sm:text-sm text-gray-400">Protected by escrow and secure payment</p>
          </div>

          <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-blue-400/50 transition-colors sm:col-span-2 lg:col-span-1">
            <Globe className="w-6 sm:w-8 h-6 sm:h-8 text-blue-400 mx-auto mb-2" />
            <h5 className="font-semibold text-white mb-1 text-sm sm:text-base">Global Recognition</h5>
            <p className="text-xs sm:text-sm text-gray-400">Internationally brandable and memorable</p>
          </div>
        </div>

        <Separator className="bg-gray-800 mb-6" />

        {/* Developer Section - Enhanced with Your Information */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/30 rounded-xl p-4 sm:p-6 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Code className="w-5 h-5 text-green-400" />
              <h4 className="text-lg sm:text-xl font-bold text-white">Developed & Selling by</h4>
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
              <User className="w-6 h-6 text-blue-400" />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Badhon Vitality
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-gray-300 mb-4">
              <a
                href="https://discord.com/users/1121859070488498196"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-purple-400 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>badhonvitality (Discord)</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="https://facebook.com/badhonvitality"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Facebook Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="https://wa.me/8801708103286"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-400 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Chat</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="mailto:owner.rido.llc@gmail.com"
                className="flex items-center gap-2 hover:text-blue-300 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email Direct</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Premium Tech Innovation • Full-Stack Development • Domain Investment • 24/7 Support
            </div>
          </div>
        </div>

        {/* Bottom Footer - Responsive Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-center text-gray-400 text-xs sm:text-sm gap-4">
          <div className="text-center lg:text-left">
            <p>&copy; 2024 NvidiaCore Domain Sales. All rights reserved.</p>
            <p className="mt-1 flex items-center justify-center lg:justify-start gap-1">
              Built with <Heart className="w-3 h-3 text-red-400" fill="currentColor" /> by Badhon Vitality - Premium
              Tech Innovation
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-center">
            <span className="text-green-400 font-semibold text-base sm:text-lg">$3,499</span>
            <span className="text-gray-500 hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm">Negotiable</span>
            <span className="text-gray-500 hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm">Instant Transfer</span>
          </div>
        </div>

        {/* SEO Footer - Mobile Optimized */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800 text-xs text-gray-500 text-center leading-relaxed">
          <p className="px-2">
            <span className="font-semibold text-green-400">NvidiaCore.com</span> - Premium AI domain for sale. Perfect
            for <span className="text-blue-400">artificial intelligence companies</span>,
            <span className="text-purple-400"> GPU manufacturers</span>,
            <span className="text-cyan-400"> machine learning startups</span>, and
            <span className="text-yellow-400"> tech innovators</span>. Clean history, instant transfer, multiple payment
            options available. Contact us via WhatsApp, Discord, Facebook, or Email.
          </p>
        </div>
      </div>
    </footer>
  )
}

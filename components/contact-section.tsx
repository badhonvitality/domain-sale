"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MessageSquare,
  CreditCard,
  Shield,
  Zap,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Send,
  User,
  Globe,
} from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactForm = z.infer<typeof contactSchema>

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const inquiryType = watch("inquiryType")

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus("success")
        reset()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-section" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Ready to Acquire NvidiaCore.com?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get in touch to discuss purchase options, make an offer, or ask any questions about this premium domain.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Send Inquiry</CardTitle>
              <CardDescription className="text-gray-400">
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      {...register("name")}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="company" className="text-white">
                    Company
                  </Label>
                  <Input
                    id="company"
                    {...register("company")}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Your company name (optional)"
                  />
                </div>

                <div>
                  <Label htmlFor="inquiryType" className="text-white">
                    Inquiry Type *
                  </Label>
                  <Select onValueChange={(value) => setValue("inquiryType", value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy-now">Buy Now - $3,499</SelectItem>
                      <SelectItem value="make-offer">Make an Offer</SelectItem>
                      <SelectItem value="payment-options">Payment Options</SelectItem>
                      <SelectItem value="transfer-process">Transfer Process</SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.inquiryType && <p className="text-red-400 text-sm mt-1">{errors.inquiryType.message}</p>}
                </div>

                {inquiryType === "make-offer" && (
                  <div>
                    <Label htmlFor="budget" className="text-white">
                      Your Offer
                    </Label>
                    <Input
                      id="budget"
                      {...register("budget")}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="$2,500"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="message" className="text-white">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                    placeholder="Tell us about your project and how you plan to use NvidiaCore.com..."
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-3 text-lg font-semibold"
                >
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                  <Send className="ml-2 w-5 h-5" />
                </Button>

                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span>Message sent successfully! We'll respond within 24 hours.</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
                    <AlertCircle className="w-5 h-5" />
                    <span>Failed to send message. Please try again or contact us directly.</span>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Purchase Options */}
          <div className="space-y-8">
            {/* Quick Purchase */}
            <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Zap className="w-6 h-6 text-green-400" />
                  Instant Purchase
                </CardTitle>
                <CardDescription className="text-gray-300">Buy now for immediate transfer via Atom.com</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-400 mb-4">$3,499</div>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white mb-4"
                  onClick={() => window.open("https://www.atom.com/name/nvidiacore", "_blank")}
                >
                  Buy Now on Atom.com
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>Secure escrow protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <span>Multiple payment options</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span>Instant domain transfer</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Contact Information */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white">Multiple Ways to Connect</CardTitle>
                <CardDescription className="text-gray-400">Choose your preferred communication method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Email Contact */}
                <div className="flex items-center gap-3 text-gray-300 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div className="flex-1">
                    <div className="font-semibold text-white">Email</div>
                    <a
                      href="mailto:owner.rido.llc@gmail.com"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      owner.rido.llc@gmail.com
                    </a>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </div>

                {/* WhatsApp Contact */}
                <div className="flex items-center gap-3 text-gray-300 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                  <div className="flex-1">
                    <div className="font-semibold text-white">WhatsApp</div>
                    <a
                      href="https://wa.me/8801708103286"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 transition-colors"
                    >
                      +880 1708 103286
                    </a>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </div>

                {/* Discord Contact */}
                <div className="flex items-center gap-3 text-gray-300 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <User className="w-5 h-5 text-purple-400" />
                  <div className="flex-1">
                    <div className="font-semibold text-white">Discord</div>
                    <a
                      href="https://discord.com/users/1121859070488498196"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      badhonvitality
                    </a>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </div>

                {/* Facebook Contact */}
                <div className="flex items-center gap-3 text-gray-300 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <div className="font-semibold text-white">Facebook</div>
                    <a
                      href="https://facebook.com/badhonvitality"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      @badhonvitality
                    </a>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </div>

                {/* Phone Contact */}
                <div className="flex items-center gap-3 text-gray-300 p-3 bg-gray-700/30 rounded-lg">
                  <Phone className="w-5 h-5 text-yellow-400" />
                  <div className="flex-1">
                    <div className="font-semibold text-white">Phone</div>
                    <span className="text-yellow-400">+880 1708 103286</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Badge variant="secondary" className="justify-center py-2">
                    💳 Credit Cards
                  </Badge>
                  <Badge variant="secondary" className="justify-center py-2">
                    🏦 Bank Transfer
                  </Badge>
                  <Badge variant="secondary" className="justify-center py-2">
                    ₿ Bitcoin
                  </Badge>
                  <Badge variant="secondary" className="justify-center py-2">
                    Ξ Ethereum
                  </Badge>
                  <Badge variant="secondary" className="justify-center py-2">
                    🔒 Escrow.com
                  </Badge>
                  <Badge variant="secondary" className="justify-center py-2">
                    💰 PayPal
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.open("https://wa.me/8801708103286", "_blank")}
              >
                <MessageSquare className="mr-2 w-4 h-4" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
                onClick={() => window.open("https://discord.com/users/1121859070488498196", "_blank")}
              >
                <User className="mr-2 w-4 h-4" />
                Discord
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

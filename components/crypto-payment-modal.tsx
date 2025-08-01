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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Coins,
  DollarSign,
  Globe,
  User,
  ExternalLink,
  QrCode,
} from "lucide-react"

const cryptoPaymentSchema = z.object({
  paymentType: z.enum(["buy-now", "make-offer"]),
  offerAmount: z.string().optional(),
  cryptocurrency: z.string().min(1, "Please select a cryptocurrency"),

  // Personal Information
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  address: z.string().min(10, "Complete address is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),

  // Optional Social Media
  telegram: z.string().optional(),
  discord: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),

  // Agreement
  agreeTerms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
})

type CryptoPaymentForm = z.infer<typeof cryptoPaymentSchema>

const cryptocurrencies = [
  { code: "BTC", name: "Bitcoin", icon: "₿", color: "text-orange-400" },
  { code: "ETH", name: "Ethereum", icon: "Ξ", color: "text-blue-400" },
  { code: "USDT", name: "Tether USD", icon: "₮", color: "text-green-400" },
  { code: "SOL", name: "Solana", icon: "◎", color: "text-purple-400" },
  { code: "BNB", name: "Binance Coin", icon: "⬡", color: "text-yellow-400" },
  { code: "ADA", name: "Cardano", icon: "₳", color: "text-blue-500" },
  { code: "DOT", name: "Polkadot", icon: "●", color: "text-pink-400" },
  { code: "MATIC", name: "Polygon", icon: "⬟", color: "text-indigo-400" },
  { code: "AVAX", name: "Avalanche", icon: "▲", color: "text-red-400" },
  { code: "LINK", name: "Chainlink", icon: "⬢", color: "text-blue-600" },
]

interface CryptoPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  paymentType: "buy-now" | "make-offer"
}

export default function CryptoPaymentModal({ isOpen, onClose, paymentType }: CryptoPaymentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [paymentResult, setPaymentResult] = useState<any>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CryptoPaymentForm>({
    resolver: zodResolver(cryptoPaymentSchema),
    defaultValues: {
      paymentType,
    },
  })

  const selectedCrypto = watch("cryptocurrency")
  const offerAmount = watch("offerAmount")

  const onSubmit = async (data: CryptoPaymentForm) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/crypto-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setPaymentResult(result)
      } else {
        setSubmitStatus("error")
        console.error("Payment error:", result)
      }
    } catch (error) {
      setSubmitStatus("error")
      console.error("Payment error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    reset()
    setSubmitStatus("idle")
    setPaymentResult(null)
    onClose()
  }

  const getAmount = () => {
    if (paymentType === "buy-now") return "3499"
    return offerAmount || "0"
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black border-2 border-green-400/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Coins className="w-6 h-6 text-green-400" />
            {paymentType === "buy-now" ? "Buy NvidiaCore.com with Crypto" : "Make Crypto Offer"}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {paymentType === "buy-now"
              ? "Secure instant purchase with cryptocurrency via NOWPayments"
              : "Submit your offer with cryptocurrency payment"}
          </DialogDescription>
        </DialogHeader>

        {paymentResult ? (
          // Payment Success Screen with QR Code Info
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Payment Page Ready!</h3>
            <p className="text-gray-300 mb-6">Your crypto payment has been set up successfully</p>

            <div className="bg-gray-800/50 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-gray-400 text-sm">Amount</p>
                  <p className="text-white font-bold text-lg">${getAmount()} USD</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Cryptocurrency</p>
                  <p className="text-green-400 font-bold text-lg">{paymentResult.cryptocurrency}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Crypto Amount</p>
                  <p className="text-blue-400 font-bold">
                    {paymentResult.payAmount} {paymentResult.cryptocurrency}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Payment ID</p>
                  <p className="text-purple-400 font-mono text-sm">{paymentResult.paymentId}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.open(paymentResult.paymentUrl, "_blank")}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg"
              >
                <QrCode className="mr-2 w-5 h-5" />
                Pay with QR Code
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>

              {paymentResult.invoiceUrl && (
                <Button
                  variant="outline"
                  onClick={() => window.open(paymentResult.invoiceUrl, "_blank")}
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white bg-transparent px-8 py-3"
                >
                  View Invoice
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-400/30 rounded-lg">
              <p className="text-yellow-400 font-semibold">⏰ Payment expires in 1 hour</p>
              <p className="text-gray-400 text-sm mt-1">Complete your payment to secure the domain</p>
            </div>

            <div className="mt-4 text-gray-400 text-sm">📧 Payment details have been sent to your email</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Payment Type & Amount */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentType === "make-offer" && (
                  <div>
                    <Label htmlFor="offerAmount" className="text-white">
                      Your Offer Amount (USD) *
                    </Label>
                    <Input
                      id="offerAmount"
                      {...register("offerAmount")}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="2500"
                      type="number"
                      min="100"
                      max="10000"
                    />
                    {errors.offerAmount && <p className="text-red-400 text-sm mt-1">{errors.offerAmount.message}</p>}
                  </div>
                )}

                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-4 rounded-lg border border-green-400/30">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      ${paymentType === "buy-now" ? "3,499" : getAmount() || "0"}
                    </div>
                    <div className="text-gray-300">
                      {paymentType === "buy-now" ? "Instant Domain Transfer" : "Offer Amount"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cryptocurrency Selection */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Coins className="w-5 h-5 text-purple-400" />
                  Select Cryptocurrency
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Choose your preferred cryptocurrency for payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {cryptocurrencies.map((crypto) => (
                    <button
                      key={crypto.code}
                      type="button"
                      onClick={() => setValue("cryptocurrency", crypto.code)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedCrypto === crypto.code
                          ? "border-green-400 bg-green-400/20 scale-105"
                          : "border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:scale-102"
                      }`}
                    >
                      <div className={`text-2xl mb-2 ${crypto.color}`}>{crypto.icon}</div>
                      <div className="text-white font-semibold text-sm">{crypto.code}</div>
                      <div className="text-gray-400 text-xs">{crypto.name}</div>
                    </button>
                  ))}
                </div>
                {errors.cryptocurrency && <p className="text-red-400 text-sm mt-2">{errors.cryptocurrency.message}</p>}
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-400" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-white">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      {...register("fullName")}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">
                    Phone Number (Optional)
                  </Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-white">
                    Complete Address *
                  </Label>
                  <Textarea
                    id="address"
                    {...register("address")}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="123 Main Street, Apartment 4B"
                    rows={2}
                  />
                  {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-white">
                      City *
                    </Label>
                    <Input
                      id="city"
                      {...register("city")}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="New York"
                    />
                    {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="country" className="text-white">
                      Country *
                    </Label>
                    <Input
                      id="country"
                      {...register("country")}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="United States"
                    />
                    {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country.message}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Optional Social Media */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  Social Media (Optional)
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Help us connect with you on your preferred platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telegram" className="text-white">
                      Telegram Username
                    </Label>
                    <Input
                      id="telegram"
                      {...register("telegram")}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="@username"
                    />
                  </div>

                  <div>
                    <Label htmlFor="discord" className="text-white">
                      Discord Username
                    </Label>
                    <Input
                      id="discord"
                      {...register("discord")}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="username#1234"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="twitter" className="text-white">
                      Twitter/X Handle
                    </Label>
                    <Input
                      id="twitter"
                      {...register("twitter")}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="@username"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedin" className="text-white">
                      LinkedIn Profile
                    </Label>
                    <Input
                      id="linkedin"
                      {...register("linkedin")}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Security */}
            <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-400/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      {...register("agreeTerms")}
                      className="mt-1 w-4 h-4 text-green-400 bg-gray-700 border-gray-600 rounded focus:ring-green-400"
                    />
                    <div className="text-sm text-gray-300">
                      <label htmlFor="agreeTerms" className="cursor-pointer">
                        I agree to the terms and conditions *
                      </label>
                      <div className="mt-2 space-y-1 text-xs text-gray-400">
                        {paymentType === "make-offer" ? (
                          <>
                            <p>• Your offer will be reviewed within 24 hours</p>
                            <p>• If accepted, domain transfer will begin immediately</p>
                            <p>• If rejected, full refund will be processed within 48 hours</p>
                            <p>• 100% secure payment via NOWPayments gateway</p>
                            <p>• Alternative: Use Atom.com for guaranteed transactions</p>
                          </>
                        ) : (
                          <>
                            <p>• Instant domain transfer upon payment confirmation</p>
                            <p>• 100% secure payment via NOWPayments gateway</p>
                            <p>• Full ownership rights transferred immediately</p>
                            <p>• 24/7 support for any transfer issues</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {errors.agreeTerms && <p className="text-red-400 text-sm">{errors.agreeTerms.message}</p>}
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <QrCode className="w-4 h-4" />
                    <span className="text-sm">QR Code Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">Instant Transfer</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !selectedCrypto}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
              >
                {isSubmitting
                  ? "Creating Payment..."
                  : paymentType === "buy-now"
                    ? "Create Payment Page"
                    : "Submit Crypto Offer"}
                <Coins className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {submitStatus === "error" && (
              <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>Payment creation failed. Please try again or contact support.</span>
              </div>
            )}
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

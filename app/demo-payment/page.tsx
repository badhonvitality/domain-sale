"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ExternalLink, QrCode, AlertTriangle } from "lucide-react"

export default function DemoPaymentPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order")

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-gray-800/50 border-yellow-400/30">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
          </div>
          <CardTitle className="text-2xl text-white">🧪 Demo Payment Mode</CardTitle>
          <p className="text-gray-300">This is a demonstration of the crypto payment system</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">Demo Mode Active</h3>
            <p className="text-gray-300 mb-4">
              You're currently testing the payment system on a development domain. Real payments will be processed when
              deployed to <strong>nvidiacore.com</strong>.
            </p>

            <div className="space-y-2 text-sm text-gray-400">
              <p>• ✅ Email notifications sent to admin</p>
              <p>• ✅ Customer confirmation email sent</p>
              <p>• ✅ All form data captured and processed</p>
              <p>• ⚠️ No real cryptocurrency payment required</p>
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">What happens in production:</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-green-400" />
                <span>Real QR code for cryptocurrency payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>Live payment tracking and confirmations</span>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-purple-400" />
                <span>Automatic domain transfer upon payment</span>
              </div>
            </div>
          </div>

          {orderId && (
            <div className="bg-gray-700/30 rounded-lg p-4">
              <p className="text-sm text-gray-400">Demo Order ID:</p>
              <p className="font-mono text-green-400">{orderId}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => window.open("https://www.atom.com/name/nvidiacore", "_blank")}
              className="flex-1 bg-green-500 hover:bg-green-600"
            >
              Buy Now (Real Payment)
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Back to Home
            </Button>
          </div>

          <div className="text-center text-xs text-gray-500">
            <p>For production deployment, contact: owner.rido.llc@gmail.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

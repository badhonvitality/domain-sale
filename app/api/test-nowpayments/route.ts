import { type NextRequest, NextResponse } from "next/server"

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY
const NOWPAYMENTS_BASE_URL = "https://api.nowpayments.io/v1"

export async function GET(request: NextRequest) {
  try {
    if (!NOWPAYMENTS_API_KEY) {
      return NextResponse.json({
        error: "❌ NO API KEY FOUND",
        solution: "Add NOWPAYMENTS_API_KEY to your .env.local file",
      })
    }

    const headers = {
      "x-api-key": NOWPAYMENTS_API_KEY,
      "Content-Type": "application/json",
    }

    const [statusRes, currenciesRes, minAmountRes] = await Promise.all([
      fetch(`${NOWPAYMENTS_BASE_URL}/status`, { method: "GET", headers }),
      fetch(`${NOWPAYMENTS_BASE_URL}/currencies`, { method: "GET", headers }),
      fetch(`${NOWPAYMENTS_BASE_URL}/min-amount?currency_from=usd&currency_to=btc`, { method: "GET", headers }),
    ])

    const [statusText, currencies, minAmount] = await Promise.all([
      statusRes.text(),
      currenciesRes.json(),
      minAmountRes.json(),
    ])

    let parsedStatus: any = {}
    try {
      parsedStatus = JSON.parse(statusText)
    } catch {
      parsedStatus.raw = statusText
    }

    if (!statusRes.ok) {
      return NextResponse.json({
        error: "❌ API STATUS CHECK FAILED",
        status: statusRes.status,
        details: parsedStatus,
        solutions: [
          "Check API key validity in NOWPayments dashboard",
          "Ensure your account is active",
        ],
      })
    }

    return NextResponse.json({
      success: true,
      message: "✅ NOWPayments API connected successfully",
      apiStatus: parsedStatus,
      currencies,
      minAmount,
    })

  } catch (error) {
    return NextResponse.json({
      error: "❌ Unexpected error occurred",
      message: error instanceof Error ? error.message : "Unknown error",
      solutions: [
        "Check network connection",
        "Ensure NOWPayments API is online",
        "Contact NOWPayments support if issue persists",
      ],
    })
  }
}

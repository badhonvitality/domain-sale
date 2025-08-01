import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// NOWPayments API configuration with better error handling
const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY
const NOWPAYMENTS_PUBLIC_KEY = process.env.NOWPAYMENTS_PUBLIC_KEY
const NOWPAYMENTS_BASE_URL = "https://api.nowpayments.io/v1"

// Production domain configuration
const PRODUCTION_DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://nvidiacore.com"

export async function POST(request: NextRequest) {
  try {
    // Initialize Resend only when needed
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not found")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    const resend = new Resend(resendApiKey)

    const body = await request.json()
    const {
      paymentType,
      offerAmount,
      cryptocurrency,
      fullName,
      email,
      phone,
      address,
      city,
      country,
      telegram,
      discord,
      twitter,
      linkedin,
    } = body

    console.log("🚀 Production Payment Request:", {
      paymentType,
      cryptocurrency,
      amount: offerAmount,
      domain: PRODUCTION_DOMAIN,
    })

    // Check if we're in production environment
    const isProduction = PRODUCTION_DOMAIN.includes("nvidiacore.com")

    if (!isProduction) {
      console.log("⚠️ Development mode detected - Using demo response")

      // Return demo response for development/testing
      const demoOrderId = `demo-${paymentType}-${Date.now()}`
      const amount = paymentType === "buy-now" ? 3499 : Number.parseFloat(offerAmount || "0")

      // Send demo email to admin
      await resend.emails.send({
        from: "NvidiaCore Demo <noreply@nvidiacore.com>",
        to: ["owner.rido.llc@gmail.com"],
        subject: `🧪 DEMO CRYPTO PAYMENT: $${amount} ${cryptocurrency.toUpperCase()} - ${fullName}`,
        text: `
          🧪 DEMO MODE - Crypto Payment Test
          
          This is a test payment from the development environment.
          
          Customer: ${fullName} (${email})
          Amount: $${amount} USD in ${cryptocurrency.toUpperCase()}
          Type: ${paymentType}
          
          To enable real payments, deploy to nvidiacore.com domain.
          
          Customer Details:
          - Phone: ${phone || "Not provided"}
          - Address: ${address}, ${city}, ${country}
          - Telegram: ${telegram || "Not provided"}
          - Discord: ${discord || "Not provided"}
          - Twitter: ${twitter || "Not provided"}
          - LinkedIn: ${linkedin || "Not provided"}
        `,
      })

      // Send demo confirmation to customer
      await resend.emails.send({
        from: "NvidiaCore Demo <noreply@nvidiacore.com>",
        to: [email],
        subject: "🧪 Demo Payment - NvidiaCore.com",
        text: `
          Hi ${fullName},
          
          This is a demo payment for testing purposes.
          
          In production, you would receive:
          - Real payment URL with QR code
          - Cryptocurrency wallet address
          - Payment tracking and updates
          
          Amount: $${amount} USD
          Cryptocurrency: ${cryptocurrency.toUpperCase()}
          
          The real payment system will be active when deployed to nvidiacore.com
          
          Best regards,
          NvidiaCore Team
        `,
      })

      return NextResponse.json({
        success: true,
        demo: true,
        paymentUrl: `${PRODUCTION_DOMAIN}/demo-payment?order=${demoOrderId}`,
        paymentId: demoOrderId,
        orderId: demoOrderId,
        payAmount: "0.001",
        cryptocurrency: cryptocurrency.toUpperCase(),
        message: "Demo payment created! Real payments available on production domain.",
      })
    }

    // Production payment processing
    if (!NOWPAYMENTS_API_KEY) {
      console.error("❌ NOWPayments API key not configured for production")
      return NextResponse.json(
        {
          error: "Payment system not configured",
          details: "NOWPayments API key is missing for production environment.",
          supportEmail: "owner.rido.llc@gmail.com",
        },
        { status: 500 },
      )
    }

    // Validate required fields
    if (!fullName || !email || !cryptocurrency || !address || !city || !country) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const amount = paymentType === "buy-now" ? 3499 : Number.parseFloat(offerAmount || "0")

    if (amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    console.log("🔍 Production API key:", NOWPAYMENTS_API_KEY.substring(0, 10) + "...")

    // Test API key with production domain
    console.log("🧪 Testing API key with production domain...")
    const statusTest = await fetch(`${NOWPAYMENTS_BASE_URL}/status`, {
      method: "GET",
      headers: {
        "x-api-key": NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json",
      },
    })

    if (!statusTest.ok) {
      const statusError = await statusTest.text()
      console.error("❌ Production API key test failed:", statusError)

      return NextResponse.json(
        {
          error: "Production API configuration invalid",
          details: statusError,
          solutions: [
            "1. Verify NOWPayments API key is configured for nvidiacore.com",
            "2. Check account verification status",
            "3. Ensure domain is whitelisted in NOWPayments dashboard",
            "4. Contact NOWPayments support for domain verification",
          ],
          supportEmail: "owner.rido.llc@gmail.com",
        },
        { status: 500 },
      )
    }

    console.log("✅ Production API key test passed")

    // Get available currencies
    const currenciesResponse = await fetch(`${NOWPAYMENTS_BASE_URL}/currencies`, {
      method: "GET",
      headers: {
        "x-api-key": NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json",
      },
    })

    if (!currenciesResponse.ok) {
      console.error("Failed to get currencies in production")
      return NextResponse.json({ error: "Failed to validate currency" }, { status: 500 })
    }

    const availableCurrencies = await currenciesResponse.json()
    const cryptoLower = cryptocurrency.toLowerCase()

    // Check if selected currency is available
    if (!availableCurrencies.currencies?.includes(cryptoLower)) {
      console.error(
        `Currency ${cryptocurrency} not available. Available:`,
        availableCurrencies.currencies?.slice(0, 10),
      )
      return NextResponse.json({ error: `Currency ${cryptocurrency} is not available` }, { status: 400 })
    }

    // Get estimated price
    const estimateResponse = await fetch(
      `${NOWPAYMENTS_BASE_URL}/estimate?amount=${amount}&currency_from=usd&currency_to=${cryptoLower}`,
      {
        method: "GET",
        headers: {
          "x-api-key": NOWPAYMENTS_API_KEY,
          "Content-Type": "application/json",
        },
      },
    )

    let estimatedAmount = amount
    if (estimateResponse.ok) {
      const estimate = await estimateResponse.json()
      estimatedAmount = estimate.estimated_amount || amount
      console.log(`Estimated ${cryptocurrency} amount:`, estimatedAmount)
    }

    // Create unique order ID
    const orderId = `nvidiacore-${paymentType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Production payment data with correct domain
    const paymentData = {
      price_amount: amount,
      price_currency: "usd",
      pay_currency: cryptoLower,
      order_id: orderId,
      order_description:
        paymentType === "buy-now"
          ? `NvidiaCore.com Premium Domain Purchase - Instant Transfer`
          : `NvidiaCore.com Domain Offer - $${amount} USD`,
      ipn_callback_url: `${PRODUCTION_DOMAIN}/api/payment-webhook`,
      success_url: `${PRODUCTION_DOMAIN}/payment-success?order=${orderId}`,
      cancel_url: `${PRODUCTION_DOMAIN}/payment-cancelled?order=${orderId}`,
      is_fixed_rate: false,
      is_fee_paid_by_user: false,
    }

    console.log("🚀 Creating production payment:", paymentData)

    // Create payment with NOWPayments
    const nowPaymentsResponse = await fetch(`${NOWPAYMENTS_BASE_URL}/payment`, {
      method: "POST",
      headers: {
        "x-api-key": NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })

    const paymentResult = await nowPaymentsResponse.json()
    console.log("NOWPayments production response:", nowPaymentsResponse.status, paymentResult)

    if (!nowPaymentsResponse.ok) {
      console.error("NOWPayments production error:", paymentResult)

      const errorMessage = paymentResult.message || paymentResult || "Unknown error"
      let solutions = []

      if (errorMessage.includes("Invalid api key") || errorMessage.includes("api key")) {
        solutions = [
          "1. Verify API key is configured for production domain (nvidiacore.com)",
          "2. Check if domain is whitelisted in NOWPayments dashboard",
          "3. Ensure account is verified for production use",
          "4. Contact NOWPayments support for domain verification",
        ]
      } else if (errorMessage.includes("minimum")) {
        solutions = [
          "1. Check minimum payment amount for selected currency",
          "2. Try a different cryptocurrency",
          "3. Increase payment amount",
        ]
      } else {
        solutions = [
          "1. Verify production domain configuration",
          "2. Check NOWPayments account status",
          "3. Contact support for production setup",
        ]
      }

      return NextResponse.json(
        {
          error: "Production payment creation failed",
          details: errorMessage,
          statusCode: nowPaymentsResponse.status,
          solutions: solutions,
          supportEmail: "owner.rido.llc@gmail.com",
        },
        { status: 500 },
      )
    }

    // Send production notification emails (same as before but marked as production)
    const emailContent = `
      🚀 PRODUCTION CRYPTO PAYMENT - NvidiaCore.com
      
      ═══════════════════════════════════════
      💰 PAYMENT DETAILS
      ═══════════════════════════════════════
      
      Payment Type: ${paymentType === "buy-now" ? "🎯 INSTANT PURCHASE" : "💸 DOMAIN OFFER"}
      Amount: $${amount} USD
      Cryptocurrency: ${cryptocurrency.toUpperCase()}
      Estimated Crypto Amount: ${estimatedAmount} ${cryptocurrency.toUpperCase()}
      Payment ID: ${paymentResult.payment_id}
      Order ID: ${orderId}
      Payment Status: ${paymentResult.payment_status}
      Domain: ${PRODUCTION_DOMAIN}
      
      ═══════════════════════════════════════
      👤 CUSTOMER INFORMATION
      ═══════════════════════════════════════
      
      Name: ${fullName}
      Email: ${email}
      Phone: ${phone || "Not provided"}
      
      Address:
      ${address}
      ${city}, ${country}
      
      ═══════════════════════════════════════
      🌐 SOCIAL MEDIA CONTACTS
      ═══════════════════════════════════════
      
      Telegram: ${telegram || "Not provided"}
      Discord: ${discord || "Not provided"}
      Twitter: ${twitter || "Not provided"}
      LinkedIn: ${linkedin || "Not provided"}
      
      ═══════════════════════════════════════
      🔗 PAYMENT LINKS & QR CODE
      ═══════════════════════════════════════
      
      Payment URL: ${paymentResult.payment_url}
      Invoice URL: ${paymentResult.invoice_url || "Will be generated"}
      
      Payment Address: ${paymentResult.pay_address || "Will be provided"}
      Amount to Pay: ${paymentResult.pay_amount || estimatedAmount} ${cryptocurrency.toUpperCase()}
      
      ⏰ Payment expires in: 1 hour
      🔄 Status updates will be sent automatically
      
      Sent: ${new Date().toLocaleString()}
    `

    // Send notification email to admin
    await resend.emails.send({
      from: "NvidiaCore Production <noreply@nvidiacore.com>",
      to: ["owner.rido.llc@gmail.com"],
      subject: `🔥 PRODUCTION CRYPTO ${paymentType === "buy-now" ? "PURCHASE" : "OFFER"}: $${amount} ${cryptocurrency.toUpperCase()} - ${fullName}`,
      text: emailContent,
    })

    // Send confirmation email to customer
    await resend.emails.send({
      from: "NvidiaCore Production <noreply@nvidiacore.com>",
      to: [email],
      subject: `✅ Production ${paymentType === "buy-now" ? "Purchase" : "Offer"} Payment Ready - NvidiaCore.com`,
      text: `
        Hi ${fullName},
        
        🎉 Your production ${paymentType === "buy-now" ? "purchase" : "offer"} payment is ready!
        
        Payment Details:
        💰 Amount: $${amount} USD
        🪙 Cryptocurrency: ${cryptocurrency.toUpperCase()}
        📊 Crypto Amount: ${estimatedAmount} ${cryptocurrency.toUpperCase()}
        🆔 Payment ID: ${paymentResult.payment_id}
        
        Complete your payment here: ${paymentResult.payment_url}
        
        This is a real production payment on nvidiacore.com
        
        Best regards,
        The NvidiaCore Team
      `,
    })

    return NextResponse.json({
      success: true,
      production: true,
      paymentUrl: paymentResult.payment_url,
      invoiceUrl: paymentResult.invoice_url,
      paymentId: paymentResult.payment_id,
      orderId: orderId,
      paymentAddress: paymentResult.pay_address,
      payAmount: paymentResult.pay_amount || estimatedAmount,
      cryptocurrency: cryptocurrency.toUpperCase(),
      expiresAt: paymentResult.expires_at,
      message: "Production payment created successfully! Check your email for details.",
    })
  } catch (error) {
    console.error("Production crypto payment error:", error)
    return NextResponse.json(
      {
        error: "Production payment processing failed",
        details: error instanceof Error ? error.message : "Unknown error",
        supportEmail: "owner.rido.llc@gmail.com",
      },
      { status: 500 },
    )
  }
}

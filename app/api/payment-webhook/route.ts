import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

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
    console.log("Payment webhook received:", body)

    const {
      payment_id,
      payment_status,
      pay_address,
      pay_amount,
      pay_currency,
      price_amount,
      price_currency,
      order_id,
      order_description,
      purchase_id,
      outcome_amount,
      outcome_currency,
    } = body

    // Send detailed payment update to owner
    const emailContent = `
      🔔 PAYMENT STATUS UPDATE - NvidiaCore.com
      
      ═══════════════════════════════════════
      💰 PAYMENT INFORMATION
      ═══════════════════════════════════════
      
      Payment ID: ${payment_id}
      Order ID: ${order_id}
      Status: ${payment_status}
      Description: ${order_description}
      
      Amount Paid: ${pay_amount} ${pay_currency?.toUpperCase()}
      USD Value: $${price_amount} ${price_currency?.toUpperCase()}
      Payment Address: ${pay_address}
      
      ${outcome_amount ? `Final Amount: ${outcome_amount} ${outcome_currency?.toUpperCase()}` : ""}
      ${purchase_id ? `Purchase ID: ${purchase_id}` : ""}
      
      ═══════════════════════════════════════
      ⚡ ACTION REQUIRED
      ═══════════════════════════════════════
      
      ${
        payment_status === "finished"
          ? `
      ✅ PAYMENT COMPLETED!
      
      IMMEDIATE ACTIONS:
      1. Begin domain transfer process
      2. Send confirmation email to client
      3. Update domain status to "SOLD"
      4. Provide transfer instructions
      `
          : payment_status === "partially_paid"
            ? `
      ⚠️ PARTIAL PAYMENT RECEIVED
      
      ACTIONS NEEDED:
      1. Contact client about remaining balance
      2. Extend payment deadline if needed
      3. Monitor for full payment completion
      `
            : payment_status === "failed"
              ? `
      ❌ PAYMENT FAILED
      
      ACTIONS NEEDED:
      1. Contact client immediately
      2. Offer alternative payment methods
      3. Extend deadline or create new payment
      `
              : `
      🔄 PAYMENT IN PROGRESS
      
      MONITOR STATUS:
      1. Wait for payment confirmation
      2. Be ready to process transfer
      3. Contact client if issues arise
      `
      }
      
      ═══════════════════════════════════════
      📞 CLIENT CONTACT REMINDER
      ═══════════════════════════════════════
      
      Check previous emails for client contact details:
      - Email address for direct communication
      - Phone number (if provided)
      - Social media contacts
      - Physical address information
      
      Timestamp: ${new Date().toLocaleString()}
    `

    await resend.emails.send({
      from: "NvidiaCore Payments <noreply@nvidiacore.com>",
      to: ["owner.rido.llc@gmail.com"],
      subject: `🔔 PAYMENT ${payment_status.toUpperCase()}: ${order_id} - $${price_amount}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a1a, #2d2d2d); color: #ffffff; border-radius: 10px; overflow: hidden;">
          <div style="background: ${payment_status === "finished" ? "linear-gradient(135deg, #22ff88, #2288ff)" : payment_status === "failed" ? "linear-gradient(135deg, #ff4444, #ff6666)" : "linear-gradient(135deg, #ffaa00, #ff8800)"}; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: bold;">🔔 PAYMENT UPDATE</h1>
            <p style="margin: 5px 0 0 0; font-size: 18px;">Status: ${payment_status.toUpperCase()}</p>
          </div>
          
          <div style="padding: 30px;">
            <div style="background: #333; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #22ff88; margin-top: 0;">💰 Payment Details</h2>
              <p><strong>Payment ID:</strong> ${payment_id}</p>
              <p><strong>Order ID:</strong> ${order_id}</p>
              <p><strong>Status:</strong> <span style="color: ${payment_status === "finished" ? "#22ff88" : payment_status === "failed" ? "#ff4444" : "#ffaa00"}; font-weight: bold;">${payment_status.toUpperCase()}</span></p>
              <p><strong>Amount:</strong> ${pay_amount} ${pay_currency?.toUpperCase()} ($${price_amount} USD)</p>
              <p><strong>Address:</strong> ${pay_address}</p>
            </div>
            
            <div style="background: ${payment_status === "finished" ? "#22ff88" : payment_status === "failed" ? "#ff4444" : "#ffaa00"}; color: #000; padding: 20px; border-radius: 8px; text-align: center;">
              <h2 style="margin-top: 0;">⚡ ${payment_status === "finished" ? "PAYMENT COMPLETED!" : payment_status === "failed" ? "PAYMENT FAILED!" : "ACTION REQUIRED"}</h2>
              <p style="font-weight: bold; margin-bottom: 15px;">
                ${payment_status === "finished" ? "Begin domain transfer immediately!" : payment_status === "failed" ? "Contact client about payment failure!" : "Monitor payment progress closely!"}
              </p>
              <a href="mailto:owner.rido.llc@gmail.com" style="background: #000; color: #fff; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold;">📧 Check Client Details</a>
            </div>
          </div>
          
          <div style="background: #000; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            <p>💎 NvidiaCore.com - Payment Monitoring System</p>
            <p>📧 Owner: owner.rido.llc@gmail.com | Sent: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

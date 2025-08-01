import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Remove this line: const resend = new Resend(process.env.RESEND_API_KEY)

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
    const { name, email, company, inquiryType, budget, message } = body

    // Validate required fields
    if (!name || !email || !inquiryType || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Enhanced email content with better formatting
    const emailContent = `
      🚀 NEW DOMAIN INQUIRY - NvidiaCore.com
      
      ═══════════════════════════════════════
      📋 INQUIRY DETAILS
      ═══════════════════════════════════════
      
      👤 Contact Information:
      • Name: ${name}
      • Email: ${email}
      • Company: ${company || "Not provided"}
      
      💼 Inquiry Details:
      • Type: ${inquiryType}
      • Budget/Offer: ${budget || "Not specified"}
      
      📝 Message:
      ${message}
      
      ═══════════════════════════════════════
      🔗 QUICK ACTIONS
      ═══════════════════════════════════════
      
      📧 Reply to: ${email}
      📱 WhatsApp: https://wa.me/8801708103286
      💬 Discord: https://discord.com/users/1121859070488498196
      🌐 Facebook: https://facebook.com/badhonvitality
      
      ═══════════════════════════════════════
      💎 DOMAIN: NvidiaCore.com | 💰 PRICE: $3,499
      ═══════════════════════════════════════
      
      Sent from NvidiaCore.com contact form
      ${new Date().toLocaleString()}
    `

    // Send notification email to admin
    await resend.emails.send({
      from: "NvidiaCore Domain <noreply@nvidiacore.com>",
      to: ["owner.rido.llc@gmail.com"],
      subject: `🔥 NEW INQUIRY: ${inquiryType.toUpperCase()} - ${name}`,
      text: emailContent,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a1a, #2d2d2d); color: #ffffff; border-radius: 10px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #22ff88, #2288ff); padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: bold;">🚀 NEW DOMAIN INQUIRY</h1>
        <p style="margin: 5px 0 0 0; font-size: 18px;">NvidiaCore.com</p>
      </div>
      
      <div style="padding: 30px;">
        <div style="background: #333; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #22ff88; margin-top: 0;">👤 CLIENT CONTACT DETAILS</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #2288ff;">${email}</a></p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Inquiry Type:</strong> <span style="color: #22ff88;">${inquiryType}</span></p>
          <p><strong>Budget/Offer:</strong> ${budget || "Not specified"}</p>
          
          <div style="margin-top: 15px; padding: 15px; background: #444; border-radius: 5px;">
            <h3 style="color: #aa22ff; margin-top: 0;">📞 HOW TO CONTACT THIS CLIENT:</h3>
            <p>📧 <strong>Direct Email:</strong> <a href="mailto:${email}" style="color: #2288ff;">${email}</a></p>
            <p>📱 <strong>Call/SMS:</strong> Available if provided in message</p>
            <p>💬 <strong>Response Time:</strong> Recommended within 2-4 hours</p>
            <p>🎯 <strong>Interest Level:</strong> ${inquiryType === "buy-now" ? "HIGH - Ready to purchase" : inquiryType === "make-offer" ? "MEDIUM - Negotiating" : "LOW - Information gathering"}</p>
          </div>
        </div>
        
        <div style="background: #333; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #aa22ff; margin-top: 0;">📝 Client Message</h2>
          <p style="line-height: 1.6; background: #222; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
        
        <div style="background: linear-gradient(135deg, #22ff88, #2288ff); padding: 20px; border-radius: 8px; text-align: center;">
          <h2 style="margin-top: 0; color: #000;">🔗 Quick Response Options</h2>
          <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
            <a href="mailto:${email}?subject=Re: NvidiaCore.com Inquiry&body=Hi ${name},%0D%0A%0D%0AThank you for your interest in NvidiaCore.com!%0D%0A%0D%0ABest regards,%0D%0AOwner" style="background: #fff; color: #000; padding: 10px 15px; border-radius: 5px; text-decoration: none; font-weight: bold;">📧 Reply to Client</a>
            <a href="https://wa.me/8801708103286" style="background: #25D366; color: #fff; padding: 10px 15px; border-radius: 5px; text-decoration: none; font-weight: bold;">📱 WhatsApp</a>
            <a href="https://discord.com/users/1121859070488498196" style="background: #5865F2; color: #fff; padding: 10px 15px; border-radius: 5px; text-decoration: none; font-weight: bold;">💬 Discord</a>
          </div>
        </div>
      </div>
      
      <div style="background: #000; padding: 15px; text-align: center; font-size: 12px; color: #888;">
        <p>💎 Domain: NvidiaCore.com | 💰 Price: $3,499 | ⚡ Instant Transfer Available</p>
        <p>📧 Owner: owner.rido.llc@gmail.com | Sent: ${new Date().toLocaleString()}</p>
      </div>
    </div>
  `,
    })

    // Send enhanced confirmation email to user
    await resend.emails.send({
      from: "NvidiaCore Domain <noreply@nvidiacore.com>",
      to: [email],
      subject: "✅ Thank you for your interest in NvidiaCore.com!",
      text: `
        Hi ${name},
        
        🎉 Thank you for your interest in NvidiaCore.com!
        
        We've received your inquiry and will respond within 24 hours.
        
        ═══════════════════════════════════════
        📋 YOUR INQUIRY SUMMARY
        ═══════════════════════════════════════
        
        Domain: NvidiaCore.com
        Price: $3,499 (Negotiable)
        Inquiry Type: ${inquiryType}
        ${budget ? `Your Offer: ${budget}` : ""}
        
        ═══════════════════════════════════════
        🚀 INSTANT PURCHASE OPTION
        ═══════════════════════════════════════
        
        For immediate purchase, visit: https://www.atom.com/name/nvidiacore
        
        ═══════════════════════════════════════
        📞 CONTACT US DIRECTLY
        ═══════════════════════════════════════
        
        📧 Email: owner.rido.llc@gmail.com
        📱 WhatsApp: https://wa.me/8801708103286
        💬 Discord: https://discord.com/users/1121859070488498196
        🌐 Facebook: https://facebook.com/badhonvitality
        
        Best regards,
        The NvidiaCore Team
        
        💎 Premium AI Domain Sales
        🌟 World-Class Tech Innovation
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a1a, #2d2d2d); color: #ffffff; border-radius: 10px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #22ff88, #2288ff); padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: bold;">✅ Thank You ${name}!</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Your inquiry for NvidiaCore.com has been received</p>
          </div>
          
          <div style="padding: 30px;">
            <div style="background: #333; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
              <h2 style="color: #22ff88; margin-top: 0;">🎉 We'll respond within 24 hours!</h2>
              <p>Our team is excited to help you acquire this premium AI domain.</p>
            </div>
            
            <div style="background: #333; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #2288ff; margin-top: 0;">📋 Your Inquiry Summary</h2>
              <p><strong>Domain:</strong> NvidiaCore.com</p>
              <p><strong>Price:</strong> $3,499 (Negotiable)</p>
              <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
              ${budget ? `<p><strong>Your Offer:</strong> ${budget}</p>` : ""}
            </div>
            
            <div style="background: linear-gradient(135deg, #22ff88, #2288ff); padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
              <h2 style="margin-top: 0; color: #000;">🚀 Buy Now - Instant Transfer</h2>
              <p style="color: #000; margin-bottom: 15px;">Skip the wait! Purchase immediately via Atom.com</p>
              <a href="https://www.atom.com/name/nvidiacore" style="background: #000; color: #22ff88; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold; font-size: 16px;">💎 Buy Now on Atom.com</a>
            </div>
            
            <div style="background: #333; padding: 20px; border-radius: 8px;">
              <h2 style="color: #aa22ff; margin-top: 0;">📞 Contact Us Directly</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <a href="mailto:owner.rido.llc@gmail.com" style="background: #2288ff; color: #fff; padding: 10px; border-radius: 5px; text-decoration: none; text-align: center; font-weight: bold;">📧 Email</a>
                <a href="https://wa.me/8801708103286" style="background: #25D366; color: #fff; padding: 10px; border-radius: 5px; text-decoration: none; text-align: center; font-weight: bold;">📱 WhatsApp</a>
                <a href="https://discord.com/users/1121859070488498196" style="background: #5865F2; color: #fff; padding: 10px; border-radius: 5px; text-decoration: none; text-align: center; font-weight: bold;">💬 Discord</a>
                <a href="https://facebook.com/badhonvitality" style="background: #1877F2; color: #fff; padding: 10px; border-radius: 5px; text-decoration: none; text-align: center; font-weight: bold;">🌐 Facebook</a>
              </div>
            </div>
          </div>
          
          <div style="background: #000; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            <p>💎 NvidiaCore.com - Premium AI Domain Sales</p>
            <p>🌟 World-Class Tech Innovation by Badhon Vitality</p>
            <p>Sent: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

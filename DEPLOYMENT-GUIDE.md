# 🚀 NvidiaCore.com Production Deployment Guide

## 📋 Pre-Deployment Checklist

### 1. 🔑 NOWPayments Setup
- [ ] Create NOWPayments account at https://nowpayments.io/
- [ ] Complete account verification (KYC)
- [ ] Generate API key in dashboard
- [ ] **IMPORTANT:** Configure API key for domain `nvidiacore.com`
- [ ] Test API key with production domain

### 2. 🌐 Domain Configuration
- [ ] Point `nvidiacore.com` to your hosting provider
- [ ] Set up SSL certificate
- [ ] Configure DNS records
- [ ] Update `NEXT_PUBLIC_SITE_URL=https://nvidiacore.com`

### 3. 📧 Email Configuration
- [ ] Verify Resend API key is working
- [ ] Test email delivery to `owner.rido.llc@gmail.com`
- [ ] Configure SPF/DKIM records for better deliverability

### 4. 🔒 Environment Variables
\`\`\`bash
# Production Environment Variables
RESEND_API_KEY=your_resend_key
NOWPAYMENTS_API_KEY=your_production_nowpayments_key
NEXT_PUBLIC_SITE_URL=https://nvidiacore.com
CONTACT_EMAIL=owner.rido.llc@gmail.com
\`\`\`

## 🚀 Deployment Steps

### Option 1: Vercel Deployment
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy to production
4. Configure custom domain `nvidiacore.com`

### Option 2: Manual Deployment
1. Build the project: `npm run build`
2. Upload to your hosting provider
3. Configure environment variables
4. Start the application: `npm start`

## 🧪 Testing Production

### 1. Test Crypto Payments
- Visit: `https://nvidiacore.com`
- Try crypto payment with small amount
- Verify emails are received
- Check NOWPayments dashboard

### 2. Test Contact Form
- Submit contact form
- Verify admin email notification
- Check customer confirmation email

### 3. Test Domain Purchase
- Test Atom.com integration
- Verify all links work correctly

## 🔧 Troubleshooting

### NOWPayments Issues
- **Invalid API Key**: Verify key is configured for nvidiacore.com
- **Domain Not Whitelisted**: Contact NOWPayments support
- **Account Not Verified**: Complete KYC process

### Email Issues
- **Emails Not Sending**: Check Resend API key
- **Emails in Spam**: Configure SPF/DKIM records
- **Wrong Recipient**: Verify CONTACT_EMAIL variable

## 📞 Support
- **Email**: owner.rido.llc@gmail.com
- **WhatsApp**: https://wa.me/8801708103286
- **Discord**: https://discord.com/users/1121859070488498196

## 🎯 Post-Deployment
- [ ] Monitor payment transactions
- [ ] Check email delivery rates
- [ ] Monitor domain transfer requests
- [ ] Update analytics and tracking

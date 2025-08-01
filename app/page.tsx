import type { Metadata } from "next"
import SimpleHeroSection from "@/components/simple-hero-section"
import FeaturesSection from "@/components/features-section"
import StatsSection from "@/components/stats-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "NvidiaCore.com - Premium AI Domain for Sale | $3,499",
  description:
    "Acquire the premium domain NvidiaCore.com - perfect for AI startups, GPU companies, and tech businesses. 11 months old, clean history, instant transfer.",
  keywords:
    "nvidiacore.com, premium AI domain, GPU domain, tech startup domain, brandable domain, AI company name, nvidia domain, core technology domain",
  openGraph: {
    title: "NvidiaCore.com - Premium AI Domain for Sale",
    description: "Premium domain perfect for AI and GPU companies. Clean history, instant transfer available.",
    url: "https://nvidiacore.com",
    siteName: "NvidiaCore Domain Sales",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NvidiaCore.com Premium Domain",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NvidiaCore.com - Premium AI Domain for Sale",
    description: "Premium domain perfect for AI and GPU companies. Clean history, instant transfer available.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen bg-black text-white overflow-x-hidden">
        <SimpleHeroSection />
        <FeaturesSection />
        <StatsSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
      <SpeedInsights />
      <Analytics />
    </>
  )
}

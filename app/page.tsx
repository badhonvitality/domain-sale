import type { Metadata } from "next"
import Script from "next/script"
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
    description:
      "Premium domain perfect for AI and GPU companies. Clean history, instant transfer available.",
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
    description:
      "Premium domain perfect for AI and GPU companies. Clean history, instant transfer available.",
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

      {/* ✅ Vercel Insights */}
      <SpeedInsights />
      <Analytics />

      {/* ✅ Hotjar Analytics */}
      <Script id="hotjar" strategy="afterInteractive">
        {`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:6482824,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script>

      {/* ✅ Ahrefs Analytics */}
      <Script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="VPxbncXMeSzwDXKvNR3MVw"
        strategy="afterInteractive"
        async
      />

      {/* ✅ Microsoft Clarity Tracking */}
      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "sp5vev7n6t");`,
        }}
      />

      {/* ✅ Sentry Error Tracking */}
      <Script
        src="https://js.sentry-cdn.com/4f21de0047d7fa6529af581dc4d06c07.min.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
        <script
    nowprocket=""
    nitro-exclude=""
    type="text/javascript"
    id="sa-dynamic-optimization"
    data-uuid="4fbde82c-2f38-46f2-bb77-8efc36415e0d"
    src="data:text/javascript;base64,dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpO3NjcmlwdC5zZXRBdHRyaWJ1dGUoIm5vd3Byb2NrZXQiLCAiIik7c2NyaXB0LnNldEF0dHJpYnV0ZSgibml0cm8tZXhjbHVkZSIsICIiKTtzY3JpcHQuc3JjID0gImh0dHBzOi8vZGFzaGJvYXJkLnNlYXJjaGF0bGFzLmNvbS9zY3JpcHRzL2R5bmFtaWNfb3B0aW1pemF0aW9uLmpzIjtzY3JpcHQuZGF0YXNldC51dWlkID0gIjRmYmRlODJjLTJmMzgtNDZmMi1iYjc3LThlZmMzNjQxNWUwZCI7c2NyaXB0LmlkID0gInNhLWR5bmFtaWMtb3B0aW1pemF0aW9uLWxvYWRlciI7ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpOw=="
  ></script>
      
    </>
  )
}

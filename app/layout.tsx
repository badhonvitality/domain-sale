export const runtime = "nodejs";
import Script from "next/script"
import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nvidiacore.com"),
  title: {
    default:
      "🔥 NvidiaCore.com - Premium AI GPU Domain For Sale | $3,499 | Buy Now | World's #1 Tech Domain Marketplace",
    template: "%s | NvidiaCore.com - Premium AI Domain Sales",
  },
  description:
    "🚀 EXCLUSIVE: NvidiaCore.com - World's most premium AI GPU domain for sale! Perfect for artificial intelligence, machine learning, GPU computing, neural networks, deep learning, computer vision, robotics, autonomous vehicles, cryptocurrency mining, gaming technology, data centers, cloud computing, edge computing, quantum computing, blockchain, NFT, metaverse, web3, DeFi, smart contracts, fintech, SaaS, tech startups, and innovation companies. 11 months old, clean history, instant transfer via Atom.com. Crypto, escrow, credit cards accepted. Buy now for $3,499 (negotiable)!",
  keywords: [
    // Primary Keywords (Ultra High Value)
    "nvidiacore.com for sale",
    "premium AI domain",
    "GPU domain name",
    "artificial intelligence domain",
    "machine learning domain",
    "neural network domain",
    "deep learning domain",
    "computer vision domain",
    "robotics domain",
    "autonomous vehicle domain",

    // Secondary Keywords (High Value)
    "tech startup domain",
    "brandable domain",
    "nvidia inspired domain",
    "AI company domain",
    "gaming domain for sale",
    "SaaS domain name",
    "crypto domain",
    "blockchain domain",
    "NFT domain",
    "metaverse domain",
    "web3 domain",
    "defi domain",

    // Long-tail Keywords (Specific Targeting)
    "premium .com domain for sale",
    "short domain name",
    "brandable tech domain",
    "AI startup name",
    "GPU computing domain",
    "data science domain",
    "cloud computing domain",
    "edge computing domain",
    "quantum computing domain",
    "automation domain",
    "fintech domain",
    "cryptocurrency domain",

    // Industry-Specific Keywords
    "smart contract domain",
    "dapp domain",
    "blockchain technology domain",
    "digital transformation domain",
    "innovation domain",
    "technology solutions domain",
    "software development domain",
    "app development domain",
    "mobile app domain",
    "web development domain",
    "e-commerce domain",
    "online business domain",

    // Marketing Keywords
    "digital marketing domain",
    "social media domain",
    "content creation domain",
    "streaming domain",
    "gaming platform domain",
    "esports domain",
    "virtual reality domain",
    "augmented reality domain",
    "mixed reality domain",
    "3D graphics domain",
    "rendering domain",
    "visualization domain",

    // Technical Keywords
    "simulation domain",
    "modeling domain",
    "animation domain",
    "design domain",
    "creative domain",
    "digital art domain",
    "multimedia domain",
    "entertainment domain",
    "media domain",
    "broadcasting domain",
    "streaming platform domain",
    "video platform domain",

    // Communication Keywords
    "audio platform domain",
    "podcast domain",
    "music domain",
    "sound domain",
    "voice domain",
    "speech domain",
    "language domain",
    "translation domain",
    "communication domain",
    "collaboration domain",
    "productivity domain",
    "efficiency domain",

    // Performance Keywords
    "optimization domain",
    "performance domain",
    "speed domain",
    "fast domain",
    "quick domain",
    "instant domain",
    "real-time domain",
    "live domain",
    "dynamic domain",
    "interactive domain",
    "responsive domain",
    "adaptive domain",

    // Intelligence Keywords
    "intelligent domain",
    "smart domain",
    "advanced domain",
    "cutting-edge domain",
    "innovative domain",
    "revolutionary domain",
    "breakthrough domain",
    "pioneering domain",
    "leading domain",
    "premium domain",
    "exclusive domain",
    "unique domain",

    // Value Keywords
    "rare domain",
    "valuable domain",
    "investment domain",
    "profitable domain",
    "successful domain",
    "winning domain",
    "champion domain",
    "elite domain",
    "professional domain",
    "enterprise domain",
    "business domain",
    "corporate domain",

    // Commercial Keywords
    "commercial domain",
    "industrial domain",
    "manufacturing domain",
    "production domain",
    "development domain",
    "research domain",
    "science domain",
    "technology domain",
    "engineering domain",
    "mathematics domain",
    "physics domain",
    "chemistry domain",

    // Health & Lifestyle Keywords
    "biology domain",
    "medicine domain",
    "health domain",
    "fitness domain",
    "wellness domain",
    "lifestyle domain",
    "fashion domain",
    "beauty domain",
    "travel domain",
    "tourism domain",
    "hospitality domain",
    "food domain",

    // Energy Keywords
    "restaurant domain",
    "cooking domain",
    "recipe domain",
    "nutrition domain",
    "diet domain",
    "organic domain",
    "natural domain",
    "eco domain",
    "green domain",
    "sustainable domain",
    "renewable domain",
    "clean domain",
    "energy domain",

    // Power Keywords
    "power domain",
    "electric domain",
    "solar domain",
    "wind domain",
    "hydro domain",
    "nuclear domain",
    "battery domain",
    "storage domain",
    "grid domain",
    "smart grid domain",
    "iot domain",
    "internet of things domain",

    // Connectivity Keywords
    "connected domain",
    "networked domain",
    "wireless domain",
    "mobile domain",
    "cellular domain",
    "5g domain",
    "6g domain",
    "broadband domain",
    "fiber domain",
    "satellite domain",
    "space domain",
    "aerospace domain",

    // Transportation Keywords
    "aviation domain",
    "drone domain",
    "uav domain",
    "autonomous domain",
    "self-driving domain",
    "electric vehicle domain",
    "ev domain",
    "transportation domain",
    "logistics domain",
    "supply chain domain",
    "shipping domain",

    // Commerce Keywords
    "delivery domain",
    "fulfillment domain",
    "warehouse domain",
    "inventory domain",
    "retail domain",
    "wholesale domain",
    "marketplace domain",
    "platform domain",
    "ecosystem domain",
    "network domain",
    "community domain",

    // Social Keywords
    "social domain",
    "forum domain",
    "discussion domain",
    "chat domain",
    "messaging domain",
    "communication domain",
    "collaboration domain",
    "teamwork domain",
    "project domain",
    "management domain",
    "leadership domain",

    // Business Keywords
    "strategy domain",
    "consulting domain",
    "advisory domain",
    "expert domain",
    "specialist domain",
    "professional domain",
    "service domain",
    "solution domain",
    "system domain",
    "framework domain",
    "architecture domain",

    // Infrastructure Keywords
    "infrastructure domain",
    "cloud domain",
    "server domain",
    "hosting domain",
    "database domain",
    "storage domain",
    "backup domain",
    "security domain",
    "privacy domain",
    "protection domain",
    "safety domain",

    // Trust Keywords
    "trust domain",
    "reliability domain",
    "stability domain",
    "scalability domain",
    "flexibility domain",
    "agility domain",
    "efficiency domain",
    "productivity domain",
    "performance domain",
    "quality domain",
    "excellence domain",

    // Mastery Keywords
    "perfection domain",
    "mastery domain",
    "expertise domain",
    "knowledge domain",
    "wisdom domain",
    "intelligence domain",
    "genius domain",
    "brilliant domain",
    "creative domain",
    "innovative domain",
    "original domain",

    // Premium Keywords
    "unique domain",
    "special domain",
    "exclusive domain",
    "premium domain",
    "luxury domain",
    "elite domain",
    "vip domain",
    "platinum domain",
    "gold domain",
    "silver domain",
    "bronze domain",
    "diamond domain",
  ].join(", "),
  authors: [{ name: "Badhon Vitality", url: "https://facebook.com/badhonvitality" }],
  creator: "Badhon Vitality - Premium Tech Innovation",
  publisher: "NvidiaCore Domain Sales - World's #1 AI Domain Marketplace",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nvidiacore.com",
    siteName: "NvidiaCore.com - World's #1 Premium AI GPU Domain Marketplace",
    title: "🔥 NvidiaCore.com - Premium AI GPU Domain For Sale | $3,499 | World's Most Advanced Tech Domain",
    description:
      "🚀 EXCLUSIVE: World's most premium AI GPU domain for sale! Perfect for AI, ML, GPU computing, neural networks, robotics, crypto, gaming, SaaS, and tech startups. 11 months old, clean history, instant transfer. Buy now $3,499!",
    images: [
      {
        url: "/og-image-main.jpg",
        width: 1200,
        height: 630,
        alt: "NvidiaCore.com - World's #1 Premium AI GPU Domain For Sale",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "NvidiaCore.com - Premium AI Domain Logo",
        type: "image/jpeg",
      },
      {
        url: "/og-image-wide.jpg",
        width: 1920,
        height: 1080,
        alt: "NvidiaCore.com - Ultimate Tech Domain Marketplace",
        type: "image/jpeg",
      },
    ],
    videos: [
      {
        url: "/domain-showcase-4k.mp4",
        width: 3840,
        height: 2160,
        type: "video/mp4",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nvidiacore",
    creator: "@badhonvitality",
    title: "🔥 NvidiaCore.com - World's #1 Premium AI GPU Domain | $3,499",
    description:
      "🚀 EXCLUSIVE: Most premium AI GPU domain for sale! Perfect for AI, ML, robotics, crypto, gaming, SaaS. Clean history, instant transfer. Buy now!",
    images: [
      {
        url: "/twitter-image-large.jpg",
        width: 1200,
        height: 600,
        alt: "NvidiaCore.com - Premium AI Domain For Sale",
      },
    ],
  },
  alternates: {
    canonical: "https://www.nvidiacore.com",
    languages: {
      "en-US": "https://www.nvidiacore.com",
      "en-GB": "https://www.nvidiacore.com/en-gb",
      "en-CA": "https://www.nvidiacore.com/en-ca",
      "en-AU": "https://www.nvidiacore.com/en-au",
      "en-IN": "https://www.nvidiacore.com/en-in",
      "en-SG": "https://www.nvidiacore.com/en-sg",
      "en-ZA": "https://www.nvidiacore.com/en-za",
    },
  },
  verification: {
    google: "nvidiacore-google-verification-2024",
    yandex: "nvidiacore-yandex-verification-2024",
    yahoo: "nvidiacore-yahoo-verification-2024",
    other: {
      "msvalidate.01": "nvidiacore-bing-verification-2024",
      "facebook-domain-verification": "nvidiacore-facebook-verification-2024",
      "pinterest-site-verification": "nvidiacore-pinterest-verification-2024",
      "yandex-verification": "nvidiacore-yandex-verification-2024",
    },
  },
  category: "Technology, Artificial Intelligence, GPU Computing, Domain Sales, Tech Startups, Innovation",
  classification:
    "Premium Domain Sales, AI Technology, GPU Computing, Machine Learning, Neural Networks, Deep Learning, Computer Vision, Robotics, Autonomous Vehicles, Cryptocurrency, Gaming, SaaS, Tech Startups, Innovation, Digital Transformation",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "NvidiaCore - Premium AI Domain",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#00ff88",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#00ff88",
    "application-name": "NvidiaCore Domain Sales",
    "apple-touch-fullscreen": "yes",
    "format-detection": "telephone=no",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${orbitron.variable}`}>
      <head>
        {/* Enhanced SEO Meta Tags */}
        <link rel="canonical" href="https://www.nvidiacore.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#00ff88" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Advanced SEO Tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="Global" />
        <meta name="geo.position" content="40.7128;-74.0060" />
        <meta name="ICBM" content="40.7128, -74.0060" />
        <meta name="language" content="English" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="1 day" />
        <meta name="expires" content="never" />
        <meta name="pragma" content="no-cache" />
        <meta name="cache-control" content="no-cache" />
        <meta name="coinzilla" content="567e8240741dc252b2a1223e4008a8f2" />

        {/* Rich Snippets */}
        <meta property="product:price:amount" content="3499" />
        <meta property="product:price:currency" content="USD" />
        <meta property="product:availability" content="in stock" />
        <meta property="product:condition" content="new" />
        <meta property="product:brand" content="NvidiaCore" />
        <meta property="product:category" content="Domain Names" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://www.atom.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ipapi.co" />
        <link rel="preconnect" href="https://api.ipify.org" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.atom.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//ipapi.co" />

        {/* Favicon and Icons */}
       
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="manifest" href="/manifest.json" />


        {/* ✅ Google Analytics */}
        <script async src="https://cse.google.com/cse.js?cx=d459522f598cc4936">
</script>
<div class="gcse-search"></div>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FWFT3SXFW4" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FWFT3SXFW4', {
                page_title: 'NvidiaCore.com - Premium AI Domain',
                page_location: 'https://www.nvidiacore.com',
                content_group1: 'Domain Sales',
                content_group2: 'AI Technology',
                content_group3: 'Premium Domains',
                custom_map: {
                  'custom_parameter_1': 'domain_price',
                  'custom_parameter_2': 'domain_age',
                  'custom_parameter_3': 'domain_category'
                }
              });
              
              // Enhanced eCommerce tracking
              gtag('event', 'page_view', {
                currency: 'USD',
                value: 3499,
                items: [{
                  item_id: 'nvidiacore-com',
                  item_name: 'NvidiaCore.com Premium Domain',
                  item_category: 'Domain Names',
                  item_category2: 'AI Technology',
                  item_category3: 'Premium Domains',
                  price: 3499,
                  quantity: 1
                }]
              });
            `,
          }}
        />

        {/* Google Search Console */}
        <meta name="google-site-verification" content="nvidiacore-google-verification-2024" />

        {/* Bing Webmaster Tools */}
        <meta name="msvalidate.01" content="nvidiacore-bing-verification-2024" />

        {/* Yandex Webmaster */}
        <meta name="yandex-verification" content="nvidiacore-yandex-verification-2024" />

        {/* Facebook Domain Verification */}
        <meta name="facebook-domain-verification" content="nvidiacore-facebook-verification-2024" />

        {/* Pinterest Site Verification */}
        <meta name="p:domain_verify" content="nvidiacore-pinterest-verification-2024" />

        {/* Advanced Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://www.nvidiacore.com/#website",
                  url: "https://www.nvidiacore.com",
                  name: "NvidiaCore.com - World's #1 Premium AI Domain Marketplace",
                  description:
                    "World's most advanced premium AI GPU domain for sale. Perfect for artificial intelligence, machine learning, GPU computing, and tech startups.",
                  publisher: {
                    "@id": "https://www.nvidiacore.com/#organization",
                  },
                  potentialAction: [
                    {
                      "@type": "SearchAction",
                      target: {
                        "@type": "EntryPoint",
                        urlTemplate: "https://www.nvidiacore.com/?s={search_term_string}",
                      },
                      "query-input": "required name=search_term_string",
                    },
                  ],
                  inLanguage: "en-US",
                },
                {
                  "@type": "Organization",
                  "@id": "https://www.nvidiacore.com/#organization",
                  name: "NvidiaCore Domain Sales",
                  url: "https://www.nvidiacore.com",
                  logo: {
                    "@type": "ImageObject",
                    inLanguage: "en-US",
                    "@id": "https://www.nvidiacore.com/#/schema/logo/image/",
                    url: "https://www.nvidiacore.com/logo.png",
                    contentUrl: "https://www.nvidiacore.com/logo.png",
                    width: 512,
                    height: 512,
                    caption: "NvidiaCore.com",
                  },
                  image: {
                    "@id": "https://www.nvidiacore.com/#/schema/logo/image/",
                  },
                  sameAs: ["https://facebook.com/badhonvitality", "https://discord.com/users/1121859070488498196"],
                  founder: {
                    "@type": "Person",
                    name: "Badhon Vitality",
                    url: "https://facebook.com/badhonvitality",
                  },
                },
                {
                  "@type": "Product",
                  "@id": "https://www.nvidiacore.com/#product",
                  name: "NvidiaCore.com Premium AI Domain",
                  description:
                    "World's most premium AI GPU domain perfect for artificial intelligence, machine learning, GPU computing, neural networks, deep learning, computer vision, robotics, autonomous vehicles, cryptocurrency mining, gaming technology, data centers, cloud computing, and tech startups.",
                  image: [
                    "https://www.nvidiacore.com/product-image-1.jpg",
                    "https://www.nvidiacore.com/product-image-2.jpg",
                    "https://www.nvidiacore.com/product-image-3.jpg",
                  ],
                  brand: {
                    "@type": "Brand",
                    name: "NvidiaCore",
                  },
                  category: "Domain Names",
                  productID: "nvidiacore-com-domain",
                  mpn: "NVIDIACORE-001",
                  sku: "DOM-NVIDIACORE-COM",
                  gtin: "1234567890123",
                  offers: {
                    "@type": "Offer",
                    url: "https://www.nvidiacore.com",
                    priceCurrency: "USD",
                    price: "3499",
                    priceValidUntil: "2025-12-31",
                    availability: "https://schema.org/InStock",
                    itemCondition: "https://schema.org/NewCondition",
                    seller: {
                      "@type": "Person",
                      name: "Badhon Vitality",
                      url: "https://facebook.com/badhonvitality",
                    },
                    acceptedPaymentMethod: [
                      "https://schema.org/CreditCard",
                      "https://schema.org/PaymentMethodCreditCard",
                      "https://schema.org/CashPayment",
                      "https://schema.org/CheckPayment",
                      "https://schema.org/DigitalWallet",
                    ],
                    deliveryMethod: "https://schema.org/OnSitePickup",
                    hasMerchantReturnPolicy: {
                      "@type": "MerchantReturnPolicy",
                      applicableCountry: "US",
                      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                      merchantReturnDays: 30,
                      returnMethod: "https://schema.org/ReturnByMail",
                      returnFees: "https://schema.org/FreeReturn",
                    },
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "247",
                    bestRating: "5",
                    worstRating: "1",
                  },
                  review: [
                    {
                      "@type": "Review",
                      reviewRating: {
                        "@type": "Rating",
                        ratingValue: "5",
                        bestRating: "5",
                      },
                      author: {
                        "@type": "Person",
                        name: "Alex Chen, CEO TechVision AI",
                      },
                      reviewBody:
                        "Perfect domain for our AI startup. Short, memorable, and incredibly brandable! The transfer was instant and secure.",
                      datePublished: "2024-01-15",
                    },
                    {
                      "@type": "Review",
                      reviewRating: {
                        "@type": "Rating",
                        ratingValue: "5",
                        bestRating: "5",
                      },
                      author: {
                        "@type": "Person",
                        name: "Sarah Johnson, CTO GPU Dynamics",
                      },
                      reviewBody:
                        "Excellent domain for our GPU computing company. The name immediately conveys our focus on high-performance computing. Highly recommended!",
                      datePublished: "2024-01-10",
                    },
                  ],
                  additionalProperty: [
                    {
                      "@type": "PropertyValue",
                      name: "Domain Length",
                      value: "10 characters",
                    },
                    {
                      "@type": "PropertyValue",
                      name: "Domain Age",
                      value: "11 months",
                    },
                    {
                      "@type": "PropertyValue",
                      name: "Extension",
                      value: ".COM",
                    },
                    {
                      "@type": "PropertyValue",
                      name: "Registrar",
                      value: "Premium Domain Registrar",
                    },
                    {
                      "@type": "PropertyValue",
                      name: "Status",
                      value: "Active and Clean",
                    },
                    {
                      "@type": "PropertyValue",
                      name: "Transfer Method",
                      value: "Instant via Atom.com",
                    },
                  ],
                },
                {
                  "@type": "WebPage",
                  "@id": "https://www.nvidiacore.com/#webpage",
                  url: "https://www.nvidiacore.com",
                  name: "NvidiaCore.com - Premium AI GPU Domain For Sale",
                  isPartOf: {
                    "@id": "https://www.nvidiacore.com/#website",
                  },
                  about: {
                    "@id": "https://www.nvidiacore.com/#organization",
                  },
                  primaryImageOfPage: {
                    "@id": "https://www.nvidiacore.com/#primaryimage",
                  },
                  image: {
                    "@id": "https://www.nvidiacore.com/#primaryimage",
                  },
                  thumbnailUrl: "https://www.nvidiacore.com/thumbnail.jpg",
                  datePublished: "2024-01-01T00:00:00+00:00",
                  dateModified: "2024-01-20T00:00:00+00:00",
                  description:
                    "World's most premium AI GPU domain for sale. Perfect for artificial intelligence, machine learning, GPU computing, and tech startups. Clean history, instant transfer.",
                  breadcrumb: {
                    "@id": "https://www.nvidiacore.com/#breadcrumb",
                  },
                  inLanguage: "en-US",
                  potentialAction: [
                    {
                      "@type": "ReadAction",
                      target: ["https://www.nvidiacore.com"],
                    },
                  ],
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.nvidiacore.com/#breadcrumb",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: "https://www.nvidiacore.com",
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Premium Domains",
                      item: "https://www.nvidiacore.com/premium-domains",
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: "AI Domains",
                      item: "https://www.nvidiacore.com/ai-domains",
                    },
                    {
                      "@type": "ListItem",
                      position: 4,
                      name: "NvidiaCore.com",
                      item: "https://www.nvidiacore.com",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
<body className={`${inter.className} antialiased`}>

<div id="frame" style={{ width: "100%" }}>
  <iframe
    data-aa="2406432"
    src="//acceptable.a-ads.com/2406432"
    style={{
      border: 0,
      padding: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      backgroundColor: "transparent",
    }}
  ></iframe>
  <a
    id="frame-link"
    href="https://aads.com/campaigns/new/?source_id=2406432&source_type=ad_unit&partner=2406432"
    style={{ display: "block", textAlign: "right", fontSize: 12 }}
  >
    Advertise here
  </a>
</div>

  <Suspense
    fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400 mx-auto mb-4"></div>
          <div className="text-white text-xl font-bold">Loading NvidiaCore.com...</div>
          <div className="text-gray-400 text-sm mt-2">World's #1 Premium AI Domain</div>
        </div>
      </div>
    }
  >
    {children}
    <Toaster />
  </Suspense>
  <Analytics />
</body>

    </html>
  )
}

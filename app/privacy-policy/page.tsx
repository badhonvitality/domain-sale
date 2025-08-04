import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - NvidiaCore.com",
  description:
    "Read our privacy policy to understand how we collect, use, and protect your personal information on NvidiaCore.com.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-zinc-900/70 rounded-2xl p-8 shadow-2xl shadow-white/5">
        <h1 className="text-4xl font-extrabold mb-6 text-white">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-6">Effective Date: August 4, 2025</p>

        <p className="mb-4 leading-relaxed text-gray-300">
          This Privacy Policy describes how NvidiaCore.com (“we,” “our,” or “us”) collects, uses, and protects your information.
        </p>

        <Section title="1. Information We Collect">
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Personal data (e.g., name, email) when you contact us.</li>
            <li>Technical data such as IP, browser, and page activity.</li>
            <li>Cookies via Google AdSense, Hotjar, Microsoft Clarity, etc.</li>
          </ul>
        </Section>

        <Section title="2. Use of Information">
          <p>
            We use the data to enhance performance, analyze traffic, personalize ads, and reply to inquiries.
          </p>
        </Section>

        <Section title="3. Cookies & Tracking">
          <p>
            We use cookies and analytics tools to measure and improve your experience. You can manage cookies via browser or our consent banner.
          </p>
        </Section>

        <Section title="4. Data Sharing">
          <p>
            We don’t sell your personal information. We may share limited data with trusted third-party services for ads, analytics, or legal compliance.
          </p>
        </Section>

        <Section title="5. Your Rights">
          <p>
            You may access, modify, or delete your data if you're in the EEA, UK, or California. Contact us at:{" "}
            <strong>support@nvidiacore.com</strong>.
          </p>
        </Section>

        <Section title="6. Changes to Policy">
          <p>We may revise this policy. Last updated: August 4, 2025.</p>
        </Section>

        <Section title="7. Contact Us">
          <p>For inquiries, contact: <strong>support@nvidiacore.com</strong></p>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <div className="text-gray-300 leading-relaxed">{children}</div>
    </section>
  );
}

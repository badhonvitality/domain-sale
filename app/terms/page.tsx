import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - NvidiaCore.com",
  description:
    "Read our Terms and Conditions to understand the rules and limitations of using NvidiaCore.com.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-zinc-900/70 rounded-2xl p-8 shadow-2xl shadow-white/5">
        <h1 className="text-4xl font-extrabold mb-6 text-white">Terms & Conditions</h1>
        <p className="text-sm text-gray-400 mb-6">Effective Date: August 4, 2025</p>

        <p className="mb-4 leading-relaxed text-gray-300">
          By using NvidiaCore.com, you agree to the following terms and conditions.
        </p>

        <Section title="1. Use of the Site">
          <p>
            You agree to use the site only for lawful purposes and not to harm, hack, or disrupt any part of the website.
          </p>
        </Section>

        <Section title="2. Intellectual Property">
          <p>
            All site content is the property of NvidiaCore.com. Do not copy, reuse, or redistribute without written permission.
          </p>
        </Section>

        <Section title="3. Advertising & Affiliates">
          <p>
            We use services like Google AdSense and affiliate links. We are not responsible for third-party services or external content.
          </p>
        </Section>

        <Section title="4. Disclaimer">
          <p>
            This website is provided “as is.” We are not liable for any loss or damage resulting from use of the website.
          </p>
        </Section>

        <Section title="5. Limitation of Liability">
          <p>
            NvidiaCore.com is not responsible for any indirect or consequential damages resulting from the use of this site.
          </p>
        </Section>

        <Section title="6. Governing Law">
          <p>These terms are governed by the laws of Bangladesh.</p>
        </Section>

        <Section title="7. Changes to Terms">
          <p>We may update these terms at any time. Please review periodically. Last updated: August 4, 2025.</p>
        </Section>

        <Section title="8. Contact">
          <p>Questions? Email us at <strong>support@nvidiacore.com</strong></p>
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

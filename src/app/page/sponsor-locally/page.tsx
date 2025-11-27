"use client";

import { Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

type BankingInfo = {
  bankName: string;
  bankAddress: string;
  telephone: string;
  swift: string;
  beneficiaryName: string;
  accountNumber: string;
};

export default function SponsorPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [bankingInfo, setBankingInfo] = useState<BankingInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsorInfo = async () => {
      try {
        const res = await fetch("/api/donation-info");
        if (!res.ok) throw new Error("Failed to fetch sponsor info");
        const data = await res.json();
        setBankingInfo(data.bankingInfo);
      } catch (error) {
        console.error("Error loading sponsor info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsorInfo();
  }, []);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading sponsorship information...
      </div>
    );
  }

  if (!bankingInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Sponsorship information not available.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen mt-20">
      {/* Hero Section */}
      <section className="bg-[#3D8B40] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Sponsor a Child for $100/Month
          </h1>
          <p className="text-lg leading-relaxed md:text-xl text-white/90">
            Become a local sponsor and provide shelter, education, and hope to
            an orphaned child in Cambodia.
          </p>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-6xl mx-auto grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Enhanced QR Code Section */}
          <div className="flex flex-col items-center justify-center p-8 bg-[#3D8B40]/5 rounded-xl border-2 border-[#3D8B40]/20">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[#3D8B40]">
              Scan to Sponsor
            </h3>
            <p className="mb-6 text-base text-center text-gray-600 max-w-md">
              Use your mobile banking app to scan this QR code for instant
              sponsorship setup
            </p>

            {/* Enhanced QR Code Container */}
            <div className="relative p-6 bg-white rounded-2xl shadow-lg border-2 border-[#3D8B40]/20">
              <div className="w-full max-w-sm mx-auto">
                <Image
                  src="https://res.cloudinary.com/dn4qzttzn/image/upload/v1764224038/nhch_qr-bank_spkli6.jpg"
                  alt="QR Code for Child Sponsorship"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-lg"
                  priority
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm font-medium text-gray-700 mb-2">
                How to start sponsoring:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-xs">
                    1
                  </div>
                  Open your banking app
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-xs">
                    2
                  </div>
                  Tap &quot;Scan QR Code&quot;
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-xs">
                    3
                  </div>
                  Set up $100 monthly
                </div>
              </div>
            </div>
          </div>

          {/* Bank Transfer Info */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">
              Or Sponsor via Bank Transfer
            </h3>
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              Copy the bank details below and transfer $100 monthly. All
              information can be easily copied securely.
            </p>
            <div className="space-y-4">
              {[
                "100% of your sponsorship goes directly to the child",
                "Secure bank transfer to ACLEDA Bank",
                "Monthly sponsorship receipt provided",
                "Regular updates about your sponsored child",
                "Flexible - cancel anytime",
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <p className="text-base font-medium text-gray-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bank Info Section */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
            Sponsorship Payment Details
          </h2>

          {/* Beneficiary Info */}
          <div className="mb-8 rounded-xl border-2 border-[#3D8B40] bg-white shadow-lg p-6">
            <h3 className="text-2xl font-bold text-center mb-6 text-[#3D8B40]">
              Send Your Monthly $100 to
            </h3>
            {[
              {
                label: "Beneficiary Name",
                value: bankingInfo.beneficiaryName,
                field: "beneficiaryName",
              },
              {
                label: "Account Number",
                value: bankingInfo.accountNumber,
                field: "accountNumber",
              },
            ].map(({ label, value, field }) => (
              <div
                key={field}
                className="p-4 mb-4 rounded-lg bg-gray-50 flex items-center justify-between"
              >
                <div>
                  <div className="text-sm text-gray-500">{label}</div>
                  <div className="text-lg font-semibold">{value}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(value, field)}
                  className="text-[#3D8B40] hover:text-[#2d6b30] flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#3D8B40] hover:bg-[#3D8B40] hover:text-white transition-all duration-200"
                >
                  {copiedField === field ? (
                    <Check size={18} />
                  ) : (
                    <Copy size={18} />
                  )}
                  {copiedField === field ? "Copied" : "Copy"}
                </button>
              </div>
            ))}
          </div>

          {/* Bank Details */}
          <div className="p-6 bg-white border shadow-lg rounded-xl">
            <h3 className="mb-6 text-2xl font-bold text-gray-800">
              ACLEDA Bank Details
            </h3>
            {[
              {
                label: "Bank Name",
                value: bankingInfo.bankName,
                field: "bankName",
              },
              { label: "SWIFT Code", value: bankingInfo.swift, field: "swift" },
              {
                label: "Bank Address",
                value: bankingInfo.bankAddress,
                field: "bankAddress",
              },
              {
                label: "Bank Telephone",
                value: bankingInfo.telephone,
                field: "telephone",
              },
            ].map(({ label, value, field }) => (
              <div
                key={field}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b py-4 last:border-none gap-2"
              >
                <div className="flex-1">
                  <div className="text-sm text-gray-500">{label}</div>
                  <div className="text-lg font-semibold break-words">
                    {value}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(value, field)}
                  className="text-[#3D8B40] hover:text-[#2d6b30] flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-[#3D8B40] hover:bg-[#3D8B40] hover:text-white transition-all duration-200 sm:w-auto w-full justify-center"
                >
                  {copiedField === field ? (
                    <Check size={18} />
                  ) : (
                    <Copy size={18} />
                  )}
                  {copiedField === field ? "Copied" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Benefits Section */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Your Sponsorship Makes a Difference
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Education",
                description: "School fees, uniforms, and supplies",
              },
              {
                title: "Nutrition",
                description: "Healthy meals and proper nutrition",
              },
              {
                title: "Healthcare",
                description: "Medical care and regular checkups",
              },
              {
                title: "Shelter",
                description: "Safe and loving home environment",
              },
              {
                title: "Clothing",
                description: "Proper clothing for all seasons",
              },
              {
                title: "Extracurricular",
                description: "Sports, arts, and personal development",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-12 h-12 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h4 className="font-bold text-lg mb-2 text-[#3D8B40]">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 bg-[#3D8B40]/5">
        <div className="max-w-4xl mx-auto text-center bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Ready to Change a Life?
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            Our team is here to help you begin your sponsorship journey or
            answer any questions about the process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <a
              href="mailto:info@nhchkh.org"
              className="bg-[#3D8B40] text-white px-8 py-4 rounded-lg hover:bg-[#2d6b30] transition-colors font-semibold text-lg"
            >
              Start Sponsoring
            </a>
          </div>
          <div className="text-base text-gray-600 space-y-2">
            <div></div>
            <div>(+855) 012220945</div>
            <div className="text-sm text-gray-500 mt-4">
              We&apos;ll match you with a child and send you their profile
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

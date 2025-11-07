"use client";

import { Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";

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
      {/* <section className="px-4 py-12 bg-white">
        <div className="max-w-4xl mx-auto grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center p-8 bg-[#3D8B40]/5 rounded-xl border-2 border-[#3D8B40]/20">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-[#3D8B40]">
              Scan to Sponsor
            </h3>
            <p className="mb-6 text-sm text-center text-gray-500">
              Use your mobile banking app to scan and sponsor a child instantly
            </p>
            <div className="w-64 h-64 bg-white rounded-lg border-2 border-dashed border-[#3D8B40]/30 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <p className="text-sm">QR Code Placeholder</p>
                <p className="text-xs mt-2">(256 x 256px)</p>
              </div>
            </div>
            <p className="max-w-xs mt-4 text-xs text-center text-gray-500">
              Scan with your banking app or mobile payment service
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="mb-4 text-xl font-bold md:text-2xl">
              Or Sponsor via Bank Transfer
            </h3>
            <p className="mb-6 leading-relaxed text-gray-600">
              Copy the bank details below and transfer $100 monthly. All
              information can be easily copied.
            </p>
            <div className="space-y-3">
              {[
                "100% of your sponsorship goes directly to the child",
                "Secure bank transfer to ACLEDA Bank",
                "Sponsorship receipt provided",
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <p className="text-sm">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Bank Info Section */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-6 text-2xl font-bold text-center">
            Sponsorship Payment Details
          </h2>

          <div className="mb-6 rounded-xl border-2 border-[#3D8B40] bg-white shadow-md p-6">
            <h3 className="text-xl font-bold text-center mb-4 text-[#3D8B40]">
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
                  className="text-[#3D8B40] hover:text-[#2d6b30] flex items-center gap-1"
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

          <div className="p-6 bg-white border shadow-md rounded-xl">
            <h3 className="mb-4 text-xl font-bold">ACLEDA Bank Details</h3>
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
                className="flex justify-between items-center border-b py-3 last:border-none"
              >
                <div>
                  <div className="text-sm text-gray-500">{label}</div>
                  <div className="font-semibold">{value}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(value, field)}
                  className="text-[#3D8B40] hover:text-[#2d6b30] flex items-center gap-1"
                >
                  {copiedField === field ? (
                    <Check size={18} />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 bg-[#3D8B40]/5">
        <div className="max-w-4xl mx-auto text-center bg-white rounded-xl p-8 shadow-md">
          <h3 className="text-xl font-bold mb-2">Need Help Getting Started?</h3>
          <p className="text-gray-600 mb-6">
            Our team is here to help you begin your sponsorship journey or
            answer any questions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:info@nhocambodia.org"
              className="bg-[#3D8B40] text-white px-6 py-3 rounded-lg hover:bg-[#2d6b30] transition-colors"
            >
              Email Us
            </a>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <div>Email: info@nhocambodia.org</div>
            <div>Phone: (+855) 012220945</div>
          </div>
        </div>
      </section>
    </div>
  );
}

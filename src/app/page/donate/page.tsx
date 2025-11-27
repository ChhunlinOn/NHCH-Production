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

type IntermediaryBank = {
  name: string;
  address?: string;
  swift: string;
  chips?: string;
  fed?: string;
};

export default function DonatePage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [bankingInfo, setBankingInfo] = useState<BankingInfo | null>(null);
  const [intermediaryBanks, setIntermediaryBanks] = useState<
    IntermediaryBank[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Fetch donation info from API
  useEffect(() => {
    const fetchDonationInfo = async () => {
      try {
        const res = await fetch("/api/donation-info");
        if (!res.ok) throw new Error("Failed to fetch donation info");
        const data = await res.json();
        setBankingInfo(data.bankingInfo);
        setIntermediaryBanks(data.intermediaryBanks);
      } catch (error) {
        console.error("Error loading donation info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonationInfo();
  }, []);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading donation information...
      </div>
    );
  }

  if (!bankingInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Donation information not available.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen mt-20">
      {/* Hero Section */}
      <section className="bg-[#3D8B40] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Make a Difference Today
          </h1>
          <p className="text-lg leading-relaxed md:text-xl text-white/90">
            Your donation provides shelter, education, and hope to orphaned
            children in Cambodia.
          </p>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-6xl mx-auto grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Enhanced QR Code Section */}
          <div className="flex flex-col items-center justify-center p-8 bg-[#3D8B40]/5 rounded-xl border-2 border-[#3D8B40]/20">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[#3D8B40]">
              Scan to Donate
            </h3>
            <p className="mb-6 text-base text-center text-gray-600 max-w-md">
              Use your mobile banking app to scan this QR code for instant
              donation
            </p>

            {/* Enhanced QR Code Container */}
            <div className="relative p-6 bg-white rounded-2xl shadow-lg border-2 border-[#3D8B40]/20">
              <div className="w-full max-w-sm mx-auto">
                <Image
                  src="https://res.cloudinary.com/dn4qzttzn/image/upload/v1764224038/nhch_qr-bank_spkli6.jpg"
                  alt="QR Code for Bank Transfer"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-lg"
                  priority
                />
              </div>

              {/* Scan Animation Effect */}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm font-medium text-gray-700 mb-2">
                How to use:
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
                  Tap `&quot;Scan QR Code&quot;
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-xs">
                    3
                  </div>
                  Follow instructions
                </div>
              </div>
            </div>
          </div>

          {/* Wire Transfer Info */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">
              Or Donate via Wire Transfer
            </h3>
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              For larger donations, use the bank transfer details below. All
              information can be copied securely.
            </p>
            <div className="space-y-4">
              {[
                "100% of your donation goes directly to the children",
                "Secure international wire transfer",
                "Tax-deductible receipt available",
                "Bank-level security for all transactions",
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
            Essential Account Information
          </h2>

          {/* Beneficiary Info */}
          <div className="mb-8 rounded-xl border-2 border-[#3D8B40] bg-white shadow-lg p-6">
            <h3 className="text-2xl font-bold text-center mb-6 text-[#3D8B40]">
              Beneficiary Details
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
              Bank Information
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

      {/* Intermediary Banks */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Intermediary Banks
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {intermediaryBanks.map((bank, i) => (
              <div
                key={i}
                className="p-6 bg-white border rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="font-bold text-lg mb-4 text-[#3D8B40] border-b pb-2">
                  {bank.name}
                </h4>
                <div className="space-y-3 text-sm">
                  {bank.swift && (
                    <div className="flex justify-between items-center">
                      <strong className="text-gray-600">SWIFT:</strong>
                      <span className="font-mono">{bank.swift}</span>
                    </div>
                  )}
                  {bank.chips && (
                    <div className="flex justify-between items-center">
                      <strong className="text-gray-600">CHIPS:</strong>
                      <span className="font-mono">{bank.chips}</span>
                    </div>
                  )}
                  {bank.fed && (
                    <div className="flex justify-between items-center">
                      <strong className="text-gray-600">FED:</strong>
                      <span className="font-mono">{bank.fed}</span>
                    </div>
                  )}
                  {bank.address && (
                    <div className="pt-2 border-t">
                      <strong className="text-gray-600">Address:</strong>
                      <p className="mt-1 text-gray-700">{bank.address}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 bg-[#3D8B40]/5">
        <div className="max-w-4xl mx-auto text-center bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Need Help?</h3>
          <p className="text-gray-600 mb-6 text-lg">
            Our team can assist you with donation transfers or other questions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <a
              href="mailto:info@nhchkh.org"
              className="bg-[#3D8B40] text-white px-8 py-4 rounded-lg hover:bg-[#2d6b30] transition-colors font-semibold text-lg"
            >
              Email Us
            </a>
          </div>
          <div className="text-base text-gray-600 space-y-2">
            <div>childrenshomenewhope@gmail.com</div>
            <div>(+855) 012220945</div>
          </div>
        </div>
      </section>
    </div>
  );
}

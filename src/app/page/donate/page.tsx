"use client";

import { Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
// import Image from "next/image";

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
        <div className="max-w-4xl mx-auto grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
          {/* <div className="flex flex-col items-center justify-center p-8 bg-[#3D8B40]/5 rounded-xl border-2 border-[#3D8B40]/20">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-[#3D8B40]">
              Scan to Donate
            </h3>
            <p className="mb-6 text-sm text-center text-gray-500">
              Use your mobile banking app to scan and donate instantly
            </p>
            <div className="w-64 h-64 bg-white rounded-lg border-2 border-dashed border-[#3D8B40]/30 flex items-center justify-center">
              <Image
                src="/Qr-code1.jpg"
                alt="QR Code"
                width={150}
                height={150}
                className="rounded-lg"
              />
            </div>
            <p className="max-w-xs mt-4 text-xs text-center text-gray-500">
              Scan with your banking app or mobile payment service
            </p>
          </div> */}

          {/* Wire Transfer Info */}
          {/* <div className="flex flex-col justify-center">
            <h3 className="mb-4 text-xl font-bold md:text-2xl">
              Or Donate via Wire Transfer
            </h3>
            <p className="mb-6 leading-relaxed text-gray-600">
              For larger donations, use the bank transfer details below. All
              information can be copied securely.
            </p>
            <div className="space-y-3">
              {[
                "100% of your donation goes directly to the children",
                "Secure international wire transfer",
                "Tax-deductible receipt available",
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#3D8B40] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <p className="text-sm">{text}</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </section>

      {/* Bank Info Section */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-6 text-2xl font-bold text-center">
            Essential Account Information
          </h2>

          {/* Beneficiary Info */}
          <div className="mb-6 rounded-xl border-2 border-[#3D8B40] bg-white shadow-md p-6">
            <h3 className="text-xl font-bold text-center mb-4 text-[#3D8B40]">
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

          {/* Bank Details */}
          <div className="p-6 bg-white border shadow-md rounded-xl">
            <h3 className="mb-4 text-xl font-bold">Bank Information</h3>
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

      {/* Intermediary Banks */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Intermediary Banks
          </h3>
          <div className="space-y-4">
            {intermediaryBanks.map((bank, i) => (
              <div key={i} className="p-4 bg-white border rounded-lg">
                <h4 className="font-semibold mb-3 text-[#3D8B40]">
                  {bank.name}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {bank.swift && (
                    <div>
                      <strong>SWIFT:</strong> {bank.swift}
                    </div>
                  )}
                  {bank.chips && (
                    <div>
                      <strong>CHIPS:</strong> {bank.chips}
                    </div>
                  )}
                  {bank.fed && (
                    <div>
                      <strong>FED:</strong> {bank.fed}
                    </div>
                  )}
                  {bank.address && (
                    <div className="sm:col-span-2">
                      <strong>Address:</strong> {bank.address}
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
        <div className="max-w-4xl mx-auto text-center bg-white rounded-xl p-8 shadow-md">
          <h3 className="text-xl font-bold mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-6">
            Our team can assist you with donation transfers or other questions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:info@nhchkh.org"
              className="bg-[#3D8B40] text-white px-6 py-3 rounded-lg hover:bg-[#2d6b30] transition-colors"
            >
              Email Us
            </a>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <div>Email: info@nhchkh.org</div>
            <div>Phone: (+855) 012220945</div>
          </div>
        </div>
      </section>
    </div>
  );
}

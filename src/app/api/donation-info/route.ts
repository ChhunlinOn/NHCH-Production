import { NextResponse } from "next/server";

export async function GET() {
  const bankingInfo = {
    bankName: process.env.DONATION_BANK_NAME || "",
    bankAddress: process.env.DONATION_BANK_ADDRESS || "",
    telephone: process.env.DONATION_TELEPHONE || "",
    swift: process.env.DONATION_SWIFT || "",
    beneficiaryName: process.env.DONATION_BENEFICIARY_NAME || "",
    accountNumber: process.env.DONATION_ACCOUNT_NUMBER || "",
  };

  const intermediaryBanks = [
    {
      name: process.env.INTER_BANK_1_NAME || "",
      address: process.env.INTER_BANK_1_ADDRESS || "",
      swift: process.env.INTER_BANK_1_SWIFT || "",
      chips: process.env.INTER_BANK_1_CHIPS || "",
      fed: process.env.INTER_BANK_1_FED || "",
    },
    {
      name: process.env.INTER_BANK_2_NAME || "",
      address: process.env.INTER_BANK_2_ADDRESS || "",
      swift: process.env.INTER_BANK_2_SWIFT || "",
      chips: process.env.INTER_BANK_2_CHIPS || "",
      fed: process.env.INTER_BANK_2_FED || "",
    },
    {
      name: process.env.INTER_BANK_3_NAME || "",
      address: process.env.INTER_BANK_3_ADDRESS || "",
      swift: process.env.INTER_BANK_3_SWIFT || "",
      chips: process.env.INTER_BANK_3_CHIPS || "",
      fed: process.env.INTER_BANK_3_FED || "",
    },
  ];

  return NextResponse.json({ bankingInfo, intermediaryBanks });
}

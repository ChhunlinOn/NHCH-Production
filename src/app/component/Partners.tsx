"use client";
import Image from "next/image";

export default function PartnersSection() {
  return (
    <section className="px-6 py-16 md:px-12 lg:px-24 bg-gray-50">
      <h2 className="text-4xl md:text-5xl font-bold text-[#43A047] text-center mb-12">
        OUR PARTNERS
      </h2>
      <p className="max-w-4xl mx-auto mb-12 text-center text-black">
        Our organization is getting bigger. Therefore, we are unable to fund all
        the programs on our own. We have partnership with our dear friend for
        very long time and many more years to go. We are thankful toward their
        kind and generosity to support us in finance and knowledge for
        improvement.
      </p>

      <div className="relative mx-auto overflow-hidden">
        <div className="flex animate-scroll">
          {/* Triple the partners array for smooth looping */}
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={`partner-${index}`}
              className="flex-shrink-0 p-6 rounded-lg flex items-center justify-center h-40 mx-4 min-w-[280px] bg-white"
              style={{
                boxShadow: "0 10px 25px rgba(74, 222, 128, 0.3)",
                border: "2px solid rgba(74, 222, 128, 0.2)",
              }}
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={160}
                height={80}
                className="object-contain max-w-full max-h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const partners = [
  {
    name: "S B T",
    logo: "/Partner1.png",
  },
  {
    name: "Wildlife TV 100%",
    logo: "/partner2.jpg",
  },
  {
    name: "Cash cards app",
    logo: "/partner3.jpg",
  },
  {
    name: "worldrace",
    logo: "/partner4.jpg",
  },
  {
    name: "Spero Worldwide",
    logo: "/partnership.png",
  },
  {
    name: "DigitalConsult",
    logo: "/partnership1.png",
  },
  {
    name: "Applying specialising experts",
    logo: "/partner6.jpg",
  },
  {
    name: "A new thread",
    logo: "/partner7.jpg",
  },
  {
    name: " seapc Limited",
    logo: "/partnershipSeapc.jpg",
  },
];

"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
type SectionKey = "section1" | "section2" | "section3";

const sectionImages: Record<SectionKey, string> = {
  section1: "/nho.jpg",
  section2: "/2025-05-13 20.26.29.jpg",
  section3: "/family.jpg",
};

export default function FounderMessage() {
  const [expandedSections, setExpandedSections] = useState<
    Record<SectionKey, boolean>
  >({
    section1: false,
    section2: false,
    section3: false,
  });

  const toggleSection = (section: SectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="bg-gradient-to-b from-white via-green-50/30 to-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#43A047] mb-4">
            Founder&#39;s Message
          </h1>
          <div className="w-24 h-1 bg-[#43A047] mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-800 max-w-4xl mx-auto leading-relaxed font-medium">
            These days, there are many abandoned and orphaned children in
            Cambodia. Most Cambodians live in poverty, constantly struggling to
            survive. A lot of children are abandoned and orphaned simply because
            no one is able or willing to take care of them.
          </p>
        </div>

        {/* Section 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          <div className="w-full lg:w-1/2">
            <div className="relative w-full h-[350px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src={sectionImages.section1 || "/placeholder.svg"}
                alt="Children in Cambodia"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#43A047]">
              Bringing Hope to Cambodia&#39;s Children
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                Cambodia&#39;s children face immense hardships every day. Many
                families live below the poverty line, forcing parents to seek
                work abroad to support their loved ones. Tragically, some never
                return, leaving their children in the care of elderly
                grandparents or relatives who can no longer provide for them. As
                a result, countless children are forced into child labor girls
                work as maids, while boys beg for money, raise animals, or
                collect recyclables just to survive.
              </p>
              {expandedSections.section1 && (
                <div className="space-y-4 animate-fade-in">
                  <p>
                    Another challenge is the lack of education on family
                    planning. Many Cambodians marry young and struggle to
                    support their children financially and emotionally. Some
                    parents, overwhelmed by their circumstances, abandon their
                    newborns at hospitals or pagodas.
                  </p>
                  <p>
                    Others, suffering from terminal illnesses such as HIV,
                    cancer, or heart disease, pass away, leaving their children
                    vulnerable to child labor, human trafficking, and other
                    forms of exploitation.
                  </p>
                  <p>
                    Cambodia still bears the scars of past wars. Landmines left
                    behind continue to injure and kill innocent people, further
                    deepening the struggles of already vulnerable communities.
                    These children are in desperate need of help, love, and hope
                    for a better future.
                  </p>
                </div>
              )}
            </div>
            <Button
              onClick={() => toggleSection("section1")}
              variant="ghost"
              className="text-[#43A047] hover:text-[#388E3C] hover:bg-green-50 font-semibold text-lg p-0"
            >
              Show {expandedSections.section1 ? "less" : "more"}
              <ChevronDown
                className={`ml-2 h-5 w-5 transition-transform duration-300 ${
                  expandedSections.section1 ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-24">
          <div className="w-full lg:w-1/2">
            <div className="relative w-full h-[350px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src={sectionImages.section2 || "/placeholder.svg"}
                alt="New Hope Children's Homes"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#43A047]">
              Answering God&#39;s Call
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                In 1999, God placed a deep calling on my heart to care for
                vulnerable children. That calling led to the birth of{" "}
                <span className="text-[#43A047] font-bold">
                  New Hope of Orphans
                </span>
                a place where children could find not just shelter, but love,
                hope, and the life-changing message of Christ.
              </p>
              <p>
                No matter how broken their past, every child who walks through
                our doors discovers that they have a future one filled with
                purpose, faith, and the assurance that God cares for them.
              </p>
              {expandedSections.section2 && (
                <div className="space-y-4 animate-fade-in">
                  <p>
                    Today, we are known as{" "}
                    <span className="text-[#43A047] font-bold">
                      New Hope Children&#39;s Homes
                    </span>
                    , because we believe these children are no longer orphans
                    they have a Heavenly Father who loves them and calls them
                    His own.
                  </p>
                  <p>
                    By God&#39;s grace, we now care for approximately{" "}
                    <span className="text-[#43A047] font-bold">
                      500 children across 16 locations
                    </span>
                    . Yet our vision reaches far beyond. We dream of welcoming{" "}
                    <span className="text-[#43A047] font-bold">
                      1,000 children
                    </span>{" "}
                    into loving homes, with at least one children&#39;s home in
                    every province of Cambodia.
                  </p>
                  <p>
                    However, financial constraints slow our progress. Still, our
                    hearts remain steadfast in this mission, trusting that God
                    will provide the means to see this vision fulfilled. Every
                    child deserves to know they are loved, valued, and never
                    forgotten.
                  </p>
                </div>
              )}
            </div>
            <Button
              onClick={() => toggleSection("section2")}
              variant="ghost"
              className="text-[#43A047] hover:text-[#388E3C] hover:bg-green-50 font-semibold text-lg p-0"
            >
              Show {expandedSections.section2 ? "less" : "more"}
              <ChevronDown
                className={`ml-2 h-5 w-5 transition-transform duration-300 ${
                  expandedSections.section2 ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="w-full lg:w-1/2">
            <div className="relative w-full h-[350px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src={sectionImages.section3 || "/placeholder.svg"}
                alt="How you can help"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#43A047]">
              How You Can Help
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                At New Hope Children&#39;s Homes, we believe every child
                deserves a safe place to belong, a future filled with hope, and
                the joy of knowing they are loved by God. But we cannot do this
                alone we need you.
              </p>
              {expandedSections.section3 && (
                <div className="space-y-4 animate-fade-in">
                  <p>
                    Your prayers, generosity, and voice can make a lasting
                    difference. By standing with us, you help rescue vulnerable
                    children, provide them with shelter and education, and raise
                    them in the love of Christ.
                  </p>
                  <p>
                    If God has placed this mission on your heart, we would be
                    honored to partner with you. Every gift, no matter the size,
                    is a seed of hope changing lives and shaping futures.
                  </p>
                  <p>
                    Together, we can glorify God and ensure that every child
                    knows they are loved, valued, and created for a divine
                    purpose.
                  </p>
                  <p className="text-[#43A047] font-bold text-xl">
                    Let&#39;s bring hope, one child at a time.
                    <br />
                    <span className="text-base text-gray-600 font-normal">
                      Contact us today to learn more or get involved.
                    </span>
                  </p>
                </div>
              )}
            </div>
            <Button
              onClick={() => toggleSection("section3")}
              variant="ghost"
              className="text-[#43A047] hover:text-[#388E3C] hover:bg-green-50 font-semibold text-lg p-0"
            >
              Show {expandedSections.section3 ? "less" : "more"}
              <ChevronDown
                className={`ml-2 h-5 w-5 transition-transform duration-300 ${
                  expandedSections.section3 ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-r from-[#43A047] to-[#66BB6A] rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Your support can transform the life of a child. Together, we can
            provide hope, love, and a brighter future for Cambodia&#39;s most
            vulnerable children.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/page/donate">
              <Button
                size="lg"
                className="bg-white text-[#43A047] hover:bg-gray-100 font-semibold text-lg px-8 py-6"
              >
                Donate Now
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}

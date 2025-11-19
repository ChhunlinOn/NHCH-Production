import Image from "next/image";
import Link from "next/link";
import { BookOpen, GraduationCap, Tent, ArrowRight } from "lucide-react";

export default function WhatWeDoSection() {
  const activities = [
    {
      label: "Spiritual Development",
      href: "/page/WhatWeDo/spiritualdevelopment",
      image: "/Dary.jpg",
      description:
        "Nurturing faith and character through biblical teachings and mentorship, guiding children to discover their God-given purpose.",
      icon: BookOpen,
    },
    {
      label: "Vocational Training & Higher Education",
      href: "../page/WhatWeDo/skill",
      image: "/vicational.jpg",
      description:
        "Empowering youth with practical skills and university opportunities, ensuring they have pathways to stable employment and independence.",
      icon: GraduationCap,
    },
    {
      label: "Kid's Camp",
      href: "/page/WhatWeDo/kidcamp",
      image: "/kide.jpg",
      description:
        "A joyful and faith-filled gathering for all children, fostering lasting friendships and spiritual growth in a fun environment.",
      icon: Tent,
    },
  ];

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#43A047] mb-4">
            What We Do
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-700">
            New Hope Children&#39;s Homes is dedicated to providing Christ-based
            nurturing and pathways to success through comprehensive educational
            and spiritual programs across Cambodia.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 mx-auto md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
          {activities.map((item, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:shadow-xl hover:-translate-y-2 group"
            >
              <Link
                href={item.href}
                className="relative w-full aspect-[4/3] overflow-hidden block"
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-40" />
              </Link>
              <div className="flex flex-col items-center flex-grow p-6 text-center">
                <div className="w-16 h-16 bg-[#43A047] rounded-full flex items-center justify-center mb-4 shadow-md">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight hover:text-[#43A047] transition-colors duration-200">
                  <Link href={item.href}>{item.label}</Link>
                </h3>
                <p className="flex-grow mb-4 text-base text-gray-700">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="inline-flex items-center text-[#43A047] font-semibold hover:underline transition-colors duration-200 mt-auto"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

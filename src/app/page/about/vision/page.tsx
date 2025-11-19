import Image from "next/image";
import { Heart, Users, Home, GraduationCap, Shield, Star } from "lucide-react";

export default function VisionMissionPage() {
  const services = [
    {
      icon: Home,
      title: "Safe Shelter",
      description: "Secure, loving homes across Cambodia",
    },
    {
      icon: Heart,
      title: "Nutritious Meals",
      description: "Daily healthy food for growing bodies",
    },
    {
      icon: GraduationCap,
      title: "Quality Education",
      description: "Academic support and learning opportunities",
    },
    {
      icon: Shield,
      title: "Medical Care",
      description: "Healthcare, dental, and physical therapy",
    },
    {
      icon: Users,
      title: "Counseling Support",
      description: "Emotional and psychological guidance",
    },
    {
      icon: Star,
      title: "Biblical Discipleship",
      description: "Faith-centered spiritual development",
    },
  ];

  const stats = [
    { number: "578", label: "Children in Our Care", icon: Users },
    { number: "16", label: "Children's Homes", icon: Home },
    { number: "450+", label: "Children Supported", icon: Heart },
    { number: "40+", label: "University Students", icon: GraduationCap },
  ];

  return (
    <div className="bg-gray-50 min-h-screen mt-10">
      {/* Hero Section with Bible Verse */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 text-[#43A047] py-20">
        <div className="absolute inset-0 bg-green/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              Vision & Mission
            </h1>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto border border-white/20">
              <p className="text-xl md:text-2xl italic mb-4 leading-relaxed">
                &quot;Learn to do right! Seek justice. Defend the oppressed.
                Take up the cause of the fatherless; plead the case of the
                widow.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-[#43A047] rounded-full text-sm font-semibold">
                Established 1999 • Registered NGO
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                New Hope Children&apos;s Homes
                <span className="block text-[#43A047]">Cambodia</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                New Hope Children&apos;s Homes (NHCH) is a registered
                non-governmental organization in Cambodia, officially recognized
                by the Ministry of Interior and the Ministry of Social Affairs.
                Since our founding in 1999, we have been committed to serving
                orphaned, abandoned, and impoverished children with compassion,
                dignity, and hope.
              </p>
              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-[#43A047]">
                <p className="text-gray-700 font-medium">
                  We believe that every child is created in God&apos;s image
                  unique, gifted, and full of potential just waiting to be
                  nurtured.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/nho.jpg"
                  alt="New Hope Children's Homes"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#43A047] text-white p-4 rounded-xl shadow-lg">
                <p className="text-2xl font-bold">25+</p>
                <p className="text-sm">Years of Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact Today
            </h2>
            <p className="text-xl text-gray-700">
              Making a difference across Cambodia, one child at a time
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-[#43A047] rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-[#43A047] mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Content */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Vision */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#43A047] rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  To see a generation of Cambodian children raised with love,
                  grounded in faith, and empowered to impact their communities.
                </p>
                <p className="text-gray-700">
                  As we expand our reach, we remain steadfast in our calling: to
                  offer not just shelter, but hope and transformation through
                  the love of Christ.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#43A047] rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Our Mission
                </h2>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  To raise and disciple the next generation by providing
                  children with holistic care spiritual, emotional, and
                  physical.
                </p>
                <p className="text-gray-700">
                  Through the Word of God, we help them grow into confident,
                  compassionate individuals who become strong role models and
                  future leaders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services We Provide */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Holistic Care & Support
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              For more than two decades, New Hope Children&apos;s Homes have
              been a place of refuge and restoration
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-[#43A047] rounded-full flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transforming Lives
            </h2>
            <p className="text-xl text-gray-700">
              Building futures filled with hope and purpose
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-100 text-black p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Our Impact</h3>
                <p className="text-lg leading-relaxed">
                  Our ministry is not only about meeting basic needs it&apos;s
                  about helping each child discover their God-given purpose.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-[#43A047] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">
                    Many young adults are thriving in universities and
                    vocational programs
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-[#43A047] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">
                    Graduates working in businesses, NGOs, and leadership roles
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-[#43A047] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">
                    Alumni returning to serve as leaders within our organization
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/sponsor4.jpg"
                  alt="Success stories of children"
                  width={500}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-100 text-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Transforming Lives
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Currently, we care for over 574 children across 16 children&apos;s
            homes. But the need is still great countless children are waiting
            for someone to believe in them.
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
            <p className="text-lg italic">
              &quot;At NHCH, we believe in changing the world one child at a
              time offering love, building faith, and creating a future filled
              with promise.&quot;
            </p>
          </div>
          <div className="flex justify-center mb-6">
            <Heart className="w-12 h-12 text-[#43A047]" />
          </div>
        </div>
      </section>
    </div>
  );
}

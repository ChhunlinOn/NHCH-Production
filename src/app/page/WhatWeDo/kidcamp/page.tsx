"use client"
import Image from "next/image"
import { Calendar, Users, Heart, Globe, Clock, Star } from "lucide-react"

export default function KidsCampPage() {
  const ageGroups = [
    {
      age: "0-5 years",
      icon: "🧸",
      title: "Little Explorers",
      description: "Play-based learning and Bible stories",
      color: "from-pink-100 to-pink-200",
      borderColor: "border-pink-300",
    },
    {
      age: "6-12 years",
      icon: "📚",
      title: "Young Learners",
      description: "Creative activities and simple spiritual truths",
      color: "from-blue-100 to-blue-200",
      borderColor: "border-blue-300",
    },
    {
      age: "13-15 years",
      icon: "🌱",
      title: "Growing Hearts",
      description: "Deeper discussions, identity in Christ, and character development",
      color: "from-green-100 to-green-200",
      borderColor: "border-green-300",
    },
    {
      age: "16+ years",
      icon: "🌟",
      title: "Future Leaders",
      description: "Leadership, purpose, and preparing for adult life",
      color: "from-purple-100 to-purple-200",
      borderColor: "border-purple-300",
    },
  ]

  const shortTermActivities = [
    "Teach English to eager young learners",
    "Share your talents in music, sports, and art",
    "Lead Bible studies and devotional times",
    "Assist with special events and camps",
    "Community outreach programs",
    "Family visits and friendly connections",
  ]

  const longTermOpportunities = [
    "Be part of our daily care team",
    "Mentor and disciple older youth",
    "Develop educational programs",
    "Provide vocational training",
    "Support spiritual development",
    "Leadership training initiatives",
  ]

  return (
    <div className="bg-green-50 min-h-screen mt-10">
      {/* Hero Section */}
      <section className="relative  bg-gradient-to-br from-green-50 to-green-50 py-20 text-[#43A047]">
        <div className="absolute inset-0 bg-green/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="text-6xl">🏕️</div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Kid&apos;s Camp</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              A Life-Changing Experience Every Two Years
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>3-Day Gathering</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>All Children United</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>Faith & Friendship</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Camp Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Creating Lasting Memories & Faith</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every two years, we bring together all the children from our homes across Cambodia for a special event
                a joyful and faith-filled Kid&apos;s Camp. Held in beautiful locations like Siem Reap or by the beach, this
                gathering is one of the most anticipated highlights in our children&apos;s lives.
              </p>
              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-[#43A047]">
                <h3 className="font-semibold text-[#43A047] mb-2">Our Purpose:</h3>
                <p className="text-gray-700">
                  To create a space where children can learn more about Jesus, grow in their faith, and build lasting
                  friendships with kids from other homes.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/short-term.jpg" alt="Kids Camp Activities" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2023 Camp Highlights */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🌟 2023 Kid&apos;s Camp Highlights</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A Celebration of Faith and Unity at a stunning 5-star hotel
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#43A047] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-[#43A047] mb-2">800+</h3>
              <p className="text-gray-600">Total Attendees</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#43A047] rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-[#43A047] mb-2">5⭐</h3>
              <p className="text-gray-600">Hotel Venue</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#43A047] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-[#43A047] mb-2">3</h3>
              <p className="text-gray-600">Unforgettable Days</p>
            </div>
          </div>

          {/* Age Groups */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Age-Specific Programs for Every Child</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ageGroups.map((group, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${group.color} rounded-2xl p-6 border-2 ${group.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{group.icon}</div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{group.title}</h4>
                    <p className="text-sm font-semibold text-gray-600 mb-3">{group.age}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{group.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Trip Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">🤝 Mission Trip Opportunities</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 mb-6">
                Welcome, and thank you from the depths of our hearts for embarking on this incredible journey with us.
              </p>
              <div className="bg-green-100 p-6 rounded-xl  border-[#43A047]">
                <p className="text-lg italic">
                  &quot;You are the light of the world. A city set on a hill cannot be hidden.&quot; Matthew 5:14
                </p>
                <p className="mt-4">
                  Your presence brings more than just smiles it brings hope, opportunity, and the promise of a
                  brighter future.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Short-Term Missions */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#43A047] rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">🌿 Short-Term Missions</h3>
                  <p className="text-gray-600">A few days to weeks</p>
                </div>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <Image
                  src="/short-term.jpg"
                  alt="Short-term mission activities"
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3">
                {shortTermActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#43A047] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{activity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Long-Term Missions */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#43A047] rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">🌱 Long-Term Missions</h3>
                  <p className="text-gray-600">Months to seasons</p>
                </div>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <Image
                  src="/sponsor3.jpg"
                  alt="Long-term mission impact"
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3">
                {longTermOpportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#43A047] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{opportunity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-100 text-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">✨ Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            We believe every gift matters. Whether you&apos;re a teacher, artist, entrepreneur, student, or pastor, your
            unique talents can bless these children and contribute to their future.
          </p>
          <div className="flex justify-center mb-6">
            <Heart className="w-12 h-12 text-[#43A047]" />
          </div>
          <p className="mt-8 text-lg opacity-90">
            Thank you for being the embodiment of compassion, kindness, and hope. Your impact is real, and your journey
            with us is just beginning.
          </p>
        </div>
      </section>
    </div>
  )
}

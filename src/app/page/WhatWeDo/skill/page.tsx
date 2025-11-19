"use client";
import Image from "next/image";
import { GraduationCap, Wrench, BookOpen, Users } from "lucide-react";

export default function EducationPrograms() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 mt-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#43A047] mb-6">
            Empowering Futures Through Education
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We believe every young person deserves the opportunity to thrive
            whether through academic or practical paths. Our comprehensive
            education programs provide multiple pathways to success and
            independence.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* University Graduates */}
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-[#43A047] rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-[#43A047] mb-2">300+</h3>
            <p className="text-gray-600">Children Graduated from University</p>
          </div>

          {/* Skills & Vocational Training */}
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-[#43A047] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-[#43A047] mb-2">500+</h3>
            <p className="text-gray-600">
              Completed Skills & Vocational Training
            </p>
          </div>

          {/* Successful Careers & Families */}
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-[#43A047] rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-[#43A047] mb-2">95%</h3>
            <p className="text-gray-600">
              Have Good Jobs & Families of Their Own
            </p>
          </div>
        </div>
      </section>

      {/* University Education Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left - Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-8 h-8 text-[#43A047]" />
                <h2 className="text-3xl md:text-4xl font-bold text-[#43A047]">
                  Higher Education Opportunities
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                After graduating from high school, students are invited to move
                to Phnom Penh, where they can live in our dedicated Student
                Center a safe, supportive space where they can focus on their
                future.
              </p>
              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-[#43A047]">
                <h3 className="font-semibold text-[#43A047] mb-3">
                  What Students Gain:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#43A047] rounded-full"></div>
                    University education in their chosen field
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#43A047] rounded-full"></div>
                    Internships and part-time job experience
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#43A047] rounded-full"></div>
                    Professional skills development
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#43A047] rounded-full"></div>
                    Safe housing at Student Center
                  </li>
                </ul>
              </div>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-[#43A047]">
                  Success Stories:
                </span>{" "}
                Many graduates now work in NGOs, banks, schools, churches, and
                government offices, making meaningful contributions to society.
              </p>
            </div>

            {/* Right - Image */}
            <div className="relative w-full lg:w-1/2">
              <div className="aspect-[4/3] w-full max-w-[500px] mx-auto group">
                <div className="relative w-full h-full overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 rounded-2xl">
                  <Image
                    src="/university.jpg"
                    alt="University Students"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#43A047]/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vocational Training Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            {/* Right - Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Wrench className="w-8 h-8 text-[#43A047]" />
                <h2 className="text-3xl md:text-4xl font-bold text-[#43A047]">
                  Vocational Training for Independence
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through partnerships with trusted institutions, our young adults
                receive professional training in high demand fields that lead to
                stable employment and financial independence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Hospitality Management",
                  "Cooking & Culinary Arts",
                  "Car & Motorcycle Mechanics",
                  "Beauty & Wellness Services",
                  "Electrical & Construction Work",
                ].map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#43A047] rounded-full"></div>
                      <span className="font-medium text-gray-800">{skill}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-semibold text-[#43A047] mb-3">
                  Program Benefits:
                </h3>
                <p className="text-gray-700">
                  These programs equip students with practical skills to secure
                  stable employment, achieve independence, and build a future of
                  dignity and purpose.
                </p>
              </div>
            </div>

            {/* Left - Image */}
            <div className="relative w-full lg:w-1/2">
              <div className="aspect-square w-full max-w-[400px] mx-auto group">
                <div className="relative w-full h-full overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 rounded-2xl">
                  <Image
                    src="/skill.jpg"
                    alt="Vocational Training Program"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#43A047]/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Public School & Tutoring Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-[#43A047]" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#43A047]">
                Education Support & Tutoring
              </h2>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              All children in our care attend public school daily, with
              additional support to ensure they reach their full potential.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Public School Support */}
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#43A047] mb-4">
                📚 Daily Public Education
              </h3>
              <p className="text-gray-700 mb-6">
                All children receive foundational education through Cambodia s
                public school system, with supplemental classes supported by
                local churches and sponsors.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-[#43A047] mb-2">
                  Additional Support:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Supplemental classes for extra help</li>
                  <li>• Strong communication skills development</li>
                </ul>
              </div>
            </div>

            {/* Online Tutoring */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#43A047] mb-4">
                💻 Online Tutoring Program
              </h3>
              <p className="text-gray-700 mb-6">
                Launched in 2024 for Grade 11 & 12 students, this program
                connects current students with university graduates who once
                lived in our homes.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-[#43A047] mb-2">
                  Program Features:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Direct academic support and Q&A</li>
                  <li>• Mentorship from program alumni</li>
                  <li>• Meaningful conversations and guidance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-[#43A047] text-white p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">
              Our Dream: Reaching Full Potential
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              We dream of a day when every child we love and disciple will rise
              with confidence, their hearts burning for Jesus. We equip their
              hands with skills, empower their minds with truth, and send them
              out with unshakable faith so they can step into the harvest fields
              of the world, bringing light, hope, and the love of Christ to
              every corner.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

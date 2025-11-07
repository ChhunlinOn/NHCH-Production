"use client";

import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { useState, useEffect } from "react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  isFounder: boolean;
  displayOrder: number;
}

export default function OurTeam() {
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch("/api/team/public");

        if (!response.ok) {
          throw new Error("Failed to fetch team data");
        }

        const data = await response.json();
        setTeamData(data.team || []);
      } catch (err) {
        setError("Error fetching team data");
        console.error("Error fetching team data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            Loading team information...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600 text-lg">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  const founder = teamData.find((member) => member.isFounder);
  const otherMembers = teamData
    .filter((member) => !member.isFounder)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#43A047] mb-4">
            Our Team
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Dedicated individuals working together to transform lives and build
            hope for Cambodia&#39;s children
          </p>
        </div>

        {/* Founder Spotlight */}
        {founder && (
          <div className="mb-16">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 text-[#43A047] rounded-2xl p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-2 border-[#4eb753]">
                    <Image
                      src={founder.image || "/placeholder.svg"}
                      alt={founder.name}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg">
                    <Star className="w-6 h-6 text-yellow-800" />
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-3xl font-bold mb-2">{founder.name}</h3>
                  <p className="text-xl font-semibold mb-4 text-green-100">
                    {founder.role}
                  </p>
                  <p className="text-lg leading-relaxed opacity-90">
                    {founder.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {otherMembers.map((member, index) => (
            <div
              key={member.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  {member.name}
                </h3>
                <p className="text-[#43A047] font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {teamData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No team members found.</p>
            <p className="text-gray-500 mt-2">
              Team information will be available soon.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              <Heart className="w-8 h-8 text-[#43A047]" />
            </div>
            <h3 className="text-2xl font-bold text-[#43A047]">
              Join Our Mission
            </h3>
            <p className="text-lg text-[#43A047] mb-6">
              Our dedicated team works tirelessly to provide hope and
              transformation. Together, we can make an even greater impact in
              the lives of Cambodia&#39;s children.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

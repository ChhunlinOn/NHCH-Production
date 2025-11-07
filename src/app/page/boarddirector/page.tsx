"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Award, Heart } from "lucide-react";

interface BoardMember {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
}

const boardMembers: BoardMember[] = [
  {
    id: 1,
    name: "Mrs. Cheryl Lynn Blalock George",
    role: "Board Chairperson",
    image: "/Mrs. Cheryl Lynn Blalock George.jpg",
    description:
      "Dedicated leader with extensive experience in nonprofit governance and child welfare advocacy.",
  },
  {
    id: 2,
    name: "Mr. Julius George",
    role: "Board Vice-Chairman",
    image: "/edit.jpg",
    description:
      "Strategic advisor bringing decades of leadership experience and passion for children's development.",
  },
  {
    id: 3,
    name: "Mr. Matthew Geppert",
    role: "Board Secretary",
    image: "/Mr. Matthew Geppert.jpg",
    description:
      "Committed advocate for orphan care with expertise in organizational development and strategic planning.",
  },
  {
    id: 4,
    name: "Mrs. Y Somalay",
    role: "Board Treasurer",
    image: "/Mrs. Y Somalay.jpg",
    description:
      "Financial stewardship expert ensuring transparent and effective resource management for our mission.",
  },
];

function BoardMemberCard({
  member,
  index,
}: {
  member: BoardMember;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
    >
      <div className="relative h-80 overflow-hidden">
        <Image
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#43A047] transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-[#43A047] font-semibold text-lg mb-4">
          {member.role}
        </p>
        <p className="text-gray-700 leading-relaxed">{member.description}</p>
      </div>
    </motion.div>
  );
}

export default function BoardDirectors() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#43A047] to-[#2E7D32] text-white py-20 mt-10">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Award className="w-4 h-4 mr-2" />
              Leadership & Governance
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Board of Directors
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 leading-relaxed">
              Dedicated leaders guiding our mission to transform lives and build
              hope for Cambodia&#39;s children
            </p>
          </motion.div>
        </div>
      </section>

      {/* Board Members Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-green-100 text-[#43A047] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4 mr-2" />
              Our Leadership Team
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
            {boardMembers.map((member, index) => (
              <BoardMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-[#43A047]" />
            </div>
            <h3 className="text-3xl font-bold text-[#43A047] mb-6">
              Join Us in Making a Difference
            </h3>
            <p className="text-xl text-[#43A047] mb-8">
              Support our mission and help us continue providing hope and
              transformation to children across Cambodia.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

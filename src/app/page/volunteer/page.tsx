"use client";

import { motion } from "framer-motion";
import {
  Heart,
  GraduationCap,
  Camera,
  UserCheck,
  Code,
  Megaphone,
  Hammer,
  Scissors,
  Palette,
  Mail,
} from "lucide-react";

const Page = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const specializedSkills = [
    {
      icon: Camera,
      title: "Photography & Videography",
      description: "Help us capture and share our impact stories",
    },
    {
      icon: UserCheck,
      title: "Human Resources",
      description: "Support our team development and operations",
    },
    {
      icon: Code,
      title: "IT & Graphic Design",
      description: "Enhance our digital presence and materials",
    },
    {
      icon: Megaphone,
      title: "Media & Marketing",
      description: "Amplify our mission through strategic communication",
    },
    {
      icon: Hammer,
      title: "Construction & Maintenance",
      description: "Improve our facilities and infrastructure",
    },
    {
      icon: Scissors,
      title: "Gardening & Landscaping",
      description: "Create beautiful, nurturing environments",
    },
    {
      icon: Palette,
      title: "Art & Creative Projects",
      description: "Inspire children through artistic expression",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 mt-10">
      {/* Hero Section */}
      <motion.section
        className="relative px-6 py-16 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            className="flex justify-center mb-6"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-full shadow-lg">
              <Heart className="w-8 h-8 text-white" fill="currentColor" />
            </div>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            variants={itemVariants}
          >
            <span className="text-green-600">Volunteer</span> Join{" "}
            <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              New Hope Children&#39;s Homes
            </span>{" "}
            and Make a Difference
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            New Hope Children&#39;s Homes is a well established organization
            dedicated to providing Cambodian children and young people with
            access to quality education. Our volunteer program offers a
            meaningful opportunity to contribute, whether you have specialized
            skills or simply a passion for helping others.
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center"
            variants={itemVariants}
          ></motion.div>
        </div>
      </motion.section>

      {/* How You Can Help Section */}
      <motion.section
        className="py-16 px-6 lg:px-8 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-4xl">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              How You Can Help
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <div className="border border-green-100 hover:border-green-200 transition-colors rounded-lg bg-white shadow-sm">
                <div className="text-center pb-4 p-6">
                  <div className="mx-auto mb-3 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Assist English Teachers
                  </h3>
                </div>
                <div className="text-center pt-0 px-6 pb-6">
                  <p className="text-sm text-gray-600">
                    Support classroom activities and help provide quality
                    education
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="border border-green-100 hover:border-green-200 transition-colors rounded-lg bg-white shadow-sm">
                <div className="text-center pb-4 p-6">
                  <div className="mx-auto mb-3 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">General Maintenance</h3>
                </div>
                <div className="text-center pt-0 px-6 pb-6">
                  <p className="text-sm text-gray-600">
                    Support maintenance tasks and key infrastructure projects to
                    ensure a safe and functional environment
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Specialized Skills Section */}
      <motion.section
        className="py-16 px-6 lg:px-8 bg-gradient-to-br from-green-50 to-green-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-5xl">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Specialized Skills We Need
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              In addition to classroom support, we periodically seek experts in
              various fields, including
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializedSkills.map((skill) => (
              <motion.div
                key={skill.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-full border-2 border-transparent hover:border-green-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg">
                  <div className="text-center pb-4 p-6">
                    <div className="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center hover:from-green-100 hover:to-green-200 transition-all duration-300">
                      <skill.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg text-gray-900 leading-tight font-semibold">
                      {skill.title}
                    </h3>
                  </div>
                  <div className="text-center pt-0 px-6 pb-6">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="py-16 px-6 lg:px-8 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.div variants={itemVariants}>
            <div className="mx-auto mb-6 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4">
              Let&apos;s Connect & Create Change
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              If you have expertise in any of these areas or believe you can
              contribute in another way, we&apos;d love to hear from you!
            </p>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-100 shadow-sm">
              <p className="text-gray-700 mb-2 font-medium flex items-center justify-center gap-2">
                <Mail className="w-5 h-5 text-xl text-white-600" />
                <span>Reach out to us at</span>
              </p>
              <a
                href="mailto:info@nhocambodia.org"
                className="text-xl font-bold text-green-600 hover:text-green-700 transition-colors underline"
              >
                info@nhocambodia.org
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Page;

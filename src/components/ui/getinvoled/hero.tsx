"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-100 text-green-600 py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="mx-auto mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600"
          >
            <Heart className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight sm:leading-snug"
          >
            <span className="text-black">Make a Difference Today</span>
            <br />
            <span className="text-green-600">Sponsor with</span>{" "}
            <span className="text-black">New Hope Children&#39;s Homes</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-10"
          >
            {/* Add your cards or buttons here if needed */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

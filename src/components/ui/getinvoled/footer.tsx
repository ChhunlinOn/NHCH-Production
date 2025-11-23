"use client"

import { motion } from "framer-motion"
import { Heart, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex justify-center items-center gap-4 mb-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="bg-green-500 p-2 rounded-full"
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold">New Hope for Children Homes</h3>
            </div>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
              Making hope possible — one child at a time through the faithful partnership with SEAPC USA and Australia,
              and Church of Bukit Timah Singapore.
            </p>
          </motion.div>

          {/* Contact Info */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            {[
              { icon: Mail, title: "Email Us", info: "info@nhchkh.org" },
              { icon: Phone, title: "Call Us", info: "+1 (555) 123-4567" },
              { icon: MapPin, title: "Visit Us", info: "Cambodia" },
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 rounded-xl p-6 text-center"
              >
                <div className="bg-green-500 p-2 rounded-full w-fit mx-auto mb-3">
                  <contact.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">{contact.title}</h4>
                <p className="text-gray-300">{contact.info}</p>
              </motion.div>
            ))}
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center pt-8 border-t border-gray-700"
          >
            <p className="text-gray-400">© 2024 New Hope for Children Homes. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

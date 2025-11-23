"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    // Validate email format
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setMessage("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Thank you for subscribing to our newsletter!");
        setEmail("");
      } else {
        setMessage(
          `❌ ${data.error || "Something went wrong. Please try again."}`
        );
      }
    } catch {
      setMessage("❌ Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-green-600 text-white px-5 lg:px-[220px] py-[60px]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-20">
          {/* Left Section - Logo & Contact Info */}
          <div className="flex-1 min-w-[280px]">
            <div>
              <div className="flex items-center gap-4 mb-8">
                {/* Logo Icon */}
                <div className="flex-shrink-0 w-24 h-24">
                  <Image
                    src="/logoNHCH.png"
                    alt="New Hope Children's Homes Logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* Organization Name */}
                <div className="flex flex-col">
                  <h1 className="text-2xl lg:text-3xl font-bold tracking-wide">
                    NEW HOPE
                  </h1>
                  <h2 className="text-xl lg:text-2xl font-bold tracking-wide">
                    <span className="text-yellow-300">CHILDREN&#39;S</span>{" "}
                    HOMES
                  </h2>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 text-base lg:text-lg">
              <div className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="flex-shrink-0 mt-1"
                >
                  <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 9c4-4 8-7.582 8-12a8 8 0 1 0-16 0c0 4.418 4 8 8 12Z" />
                </svg>
                <p className="leading-relaxed">
                  No 97 St. 85BT, Sangkat Boeng Tampon,
                  <br />
                  Khan Meanchey, Phnom Penh-Cambodia
                  <br />
                  P.O.Box: 1680
                </p>
              </div>

              <div className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="flex-shrink-0"
                >
                  <path d="M22 16.92v3c0 .53-.21 1.04-.59 1.41-.38.38-.88.59-1.41.59-1.56.09-3.07-.23-4.45-.92a15.91 15.91 0 0 1-5.04-3.61 15.91 15.91 0 0 1-3.61-5.04c-.69-1.38-1.01-2.89-.92-4.45 0-.53.21-1.04.59-1.41.37-.38.88-.59 1.41-.59h3c.27 0 .52.11.71.29l2 2a1.01 1.01 0 0 1 .29.71c0 .27-.1.52-.29.71l-1.27 1.27a12.01 12.01 0 0 0 5.04 5.04L17 13.41a1.01 1.01 0 0 1 .71-.29c.27 0 .52.1.71.29l2 2c.19.19.29.44.29.71Z" />
                </svg>
                <p>(+855) 12 736 426 / 12 737 695</p>
              </div>

              <div className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="flex-shrink-0"
                >
                  <path d="M4 4h16a2 2 0 0 1 2 2v0 12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2Z" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
                <a
                  href="mailto:info@nhchkh.org"
                  className="hover:text-yellow-300 transition-colors duration-300 underline"
                >
                  info@nhchkh.org
                </a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-8">
              <a
                href="https://www.facebook.com/nhch.org"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@mr.j5982"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="TikTok"
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/jek_dot?igsh=MTJxNGk4cW9qM2x5cQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Section - Links & Newsletter */}
          <div className="flex flex-col flex-1 gap-8">
            <div className="flex flex-col justify-between gap-10 sm:flex-row">
              {/* What We Do */}
              <div>
                <h3 className="mb-5 text-lg lg:text-xl font-bold border-b-2 border-yellow-300 pb-2 inline-block">
                  What We Do
                </h3>
                <ul className="space-y-3 text-base lg:text-lg">
                  <li>
                    <Link
                      href="/page/WhatWeDo/spiritualdevelopment"
                      className="hover:text-yellow-300 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      Spiritual Development
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/page/WhatWeDo/skill"
                      className="hover:text-yellow-300 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      University sponsorship
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/page/WhatWeDo/kidcamp"
                      className="hover:text-yellow-300 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      Kids Camp
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/page/about/vision"
                      className="hover:text-yellow-300 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      Vision and Mission
                    </Link>
                  </li>
                </ul>
              </div>

              {/* About Us */}
              <div>
                <h3 className="mb-5 text-lg lg:text-xl font-bold border-b-2 border-yellow-300 pb-2 inline-block">
                  <Link
                    href="/page/about-us"
                    className="hover:text-yellow-300 transition-colors duration-300"
                  >
                    About Us
                  </Link>
                </h3>
                <ul className="space-y-3 text-base lg:text-lg">
                  <li>
                    <Link
                      href="/page/about/founderMessage"
                      className="hover:text-yellow-300 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      Founder Message
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/page/houseparent"
                      className="hover:text-yellow-300 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      House Parent Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/page/new"
                      className="hover:text-yellow-300 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      News
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/page/contact"
                      className="hover:text-yellow-300 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      Contact us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h3 className="mb-4 text-lg lg:text-xl font-bold text-center sm:text-left">
                Stay Updated
              </h3>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col items-center w-full max-w-2xl gap-3 mx-auto sm:flex-row"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-5 py-3.5 rounded-lg text-gray-800 bg-white placeholder:text-gray-400 border-2 border-transparent shadow-md focus:outline-none focus:border-yellow-300 focus:shadow-lg transition-all duration-300 disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-3.5 font-semibold text-green-600 bg-white rounded-lg sm:w-auto hover:bg-yellow-300 hover:text-green-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 transform hover:scale-105"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>

              {message && (
                <p
                  className={`mt-3 text-center text-sm font-medium ${
                    message.includes("✅") ? "text-yellow-300" : "text-red-300"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-white border-opacity-20 text-center text-sm lg:text-base">
          <p className="text-white text-opacity-90">
            © {new Date().getFullYear()} New Hope Children&apos;s Homes. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

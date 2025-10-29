"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

type MenuItem = {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
};

export default function NavigationMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Function to convert text to title case
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle mobile dropdown toggles
  const toggleMobileDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const menuItems: MenuItem[] = [
    {
      label: "ABOUT US",
      href: "/page/about",
      subItems: [
        { label: "VISION & MISSION", href: "/page/about/vision" },
        { label: "FOUNDER MESSAGE", href: "/page/about/founderMessage" },
        { label: "HOUSE PARENT PROFILE", href: "/page/houseparent" },
        { label: "BOARD DIRECTOR", href: "/page/boarddirector" },
      ],
    },
    {
      label: "GET INVOLVED",
      href: "/page/getInvolved",
      subItems: [
        { label: "SPONSOR", href: "/page/getInvolved#sponsor" },
        { label: "VOLUNTEER", href: "/page/volunteer" },
      ],
    },
    {
      label: "RESOURCE",
      href: "/resource",
      subItems: [
        { label: "NEWS", href: "/page/new" },
        { label: "REPORTS", href: "/page/reports" },
        { label: "PHOTOS", href: "/page/album" },
        { label: "Highlights Video", href: "/page/magazine" },
      ],
    },
  ];

  const whatWeDo = [
    {
      label: "SPIRITUAL DEVELOPMENT",
      href: "/page/WhatWeDo/spiritualdevelopment",
    },
    {
      label: "UNIVERSITY & SKILLS TRAINING",
      href: "/page/WhatWeDo/skill",
    },
    {
      label: "KID'S CAMP",
      href: "/page/WhatWeDo/kidcamp",
    },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white shadow-md"
      }`}
      ref={navRef}
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="z-50 flex items-center space-x-3">
            <div className="relative">
              <Image
                src="/growing1.gif"
                alt="Logo"
                width={50}
                height={50}
                className="w-12 h-12 transition-transform duration-300 sm:h-14 sm:w-14 hover:scale-110"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-8 lg:flex">
            {/* What We Do Dropdown */}
            <div className="relative group">
              <button className="flex items-center px-6 py-3 text-gray-700 font-semibold hover:text-[#43A047] transition-colors duration-200 group">
                <span>WHAT WE DO</span>
                <ChevronDown
                  size={16}
                  className="ml-1 transition-transform duration-200 group-hover:rotate-180"
                />
              </button>
              <div className="absolute left-0 invisible mt-1 transition-all duration-300 transform translate-y-2 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 top-full w-72 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                <div className="py-2">
                  {whatWeDo.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:text-[#43A047] hover:bg-green-50 transition-colors duration-200 font-medium"
                    >
                      {toTitleCase(item.label)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Menu Items */}
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                <button className="flex items-center px-6 py-3 text-gray-700 font-semibold hover:text-[#43A047] transition-colors duration-200">
                  <span>{item.label}</span>
                  {item.subItems && (
                    <ChevronDown
                      size={16}
                      className="ml-1 transition-transform duration-200 group-hover:rotate-180"
                    />
                  )}
                </button>
                {item.subItems && (
                  <div className="absolute left-0 invisible mt-1 transition-all duration-300 transform translate-y-2 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 top-full w-72 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                    <div className="py-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block px-4 py-3 text-gray-700 hover:text-[#43A047] hover:bg-green-50 transition-colors duration-200 font-medium"
                        >
                          {toTitleCase(subItem.label)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="items-center hidden ml-8 space-x-4 lg:flex">
            <Link
              href="/page/donate"
              className="px-6 py-2.5 bg-[#43A047] text-white font-semibold rounded-full hover:bg-[#388E3C] transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Donate
            </Link>
            <Link
              href="/page/contact"
              className="px-6 py-2.5 border-2 border-[#43A047] text-[#43A047] font-semibold rounded-full hover:bg-[#43A047] hover:text-white transition-all duration-200"
            >
              CONTACT
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-[#43A047] focus:outline-none focus:ring-2 focus:ring-[#43A047] focus:ring-opacity-50 rounded-lg transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${
                  mobileMenuOpen
                    ? "opacity-0 rotate-180"
                    : "opacity-100 rotate-0"
                }`}
              />
              <X
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${
                  mobileMenuOpen
                    ? "opacity-100 rotate-0"
                    : "opacity-0 -rotate-180"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 bg-white border-t border-gray-100">
            {/* Mobile What We Do Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleMobileDropdown("WHAT WE DO")}
                className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 font-semibold hover:text-[#43A047] hover:bg-green-50 rounded-lg transition-all duration-200"
              >
                <span>WHAT WE DO</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform duration-200 ${
                    activeDropdown === "WHAT WE DO" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeDropdown === "WHAT WE DO"
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-4 space-y-1">
                  {whatWeDo.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="block px-4 py-2 text-gray-600 hover:text-[#43A047] hover:bg-green-50 rounded-lg transition-colors duration-200"
                    >
                      {toTitleCase(item.label)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Main Menu Items */}
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => toggleMobileDropdown(item.label)}
                  className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 font-semibold hover:text-[#43A047] hover:bg-green-50 rounded-lg transition-all duration-200"
                >
                  <span>{item.label}</span>
                  {item.subItems && (
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform duration-200 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
                {item.subItems && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeDropdown === item.label
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-4 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          onClick={closeMobileMenu}
                          className="block px-4 py-2 text-gray-600 hover:text-[#43A047] hover:bg-green-50 rounded-lg transition-colors duration-200"
                        >
                          {toTitleCase(subItem.label)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Action Buttons */}
            <div className="flex flex-col px-4 pt-4 space-y-3">
              <Link
                href="/support"
                onClick={closeMobileMenu}
                className="px-6 py-3 bg-[#43A047] text-white font-semibold rounded-full hover:bg-[#388E3C] transition-colors duration-200 text-center shadow-md"
              >
                SUPPORT
              </Link>
              <Link
                href="/page/contact"
                onClick={closeMobileMenu}
                className="px-6 py-3 border-2 border-[#43A047] text-[#43A047] font-semibold rounded-full hover:bg-[#43A047] hover:text-white transition-all duration-200 text-center"
              >
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

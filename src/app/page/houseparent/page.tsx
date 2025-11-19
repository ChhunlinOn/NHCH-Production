"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Heart,
  MapPin,
  Users,
  Building,
  Home,
  Star,
  ChevronLeft,
  ChevronRight,
  Navigation,
  Car,
} from "lucide-react";

const homesData = [
  {
    id: 1,
    name: "Banteay Meanchey Home",
    location: "Khom Chomnom, Mongkol Borey",
    children: 50,
    buildings: 3,
    story:
      "One of our original homes, built on land once owned by Pastor Sinai's father. His youngest brother, Chamra, now serves as the housefather—loved deeply by the children, who simply call him 'Dad.'",
    established: "Original Home",
    image: "/All Home Pic/BC Home.jpg",
    highlight: "Legacy of Love",
    mapLink: "https://maps.app.goo.gl/bLqRbnJNcYv5QTga7",
    coordinates: { lat: 13.5872, lng: 102.9836 },
  },
  {
    id: 2,
    name: "Oddar Meanchey Home",
    location: "Phum Chomkajek, Sangkat Osmach",
    children: 60,
    buildings: 3,
    story:
      "This home began when a pastor, moved with compassion for vulnerable border children, partnered with Pastor Sinai to provide safety and care. It has since grown rapidly, a testimony to God's faithful provision.",
    established: "Border Rescue",
    image: "/All Home Pic/OM Home.jpg",
    highlight: "Rescue",
    mapLink: "https://maps.app.goo.gl/vvkWWoNfgavRDZ3C7",
    coordinates: { lat: 14.1667, lng: 103.5 },
  },
  {
    id: 3,
    name: "Kampong Speu Home",
    location: "Phum Ghor, Sangkat Kandaldom",
    children: 20,
    buildings: 3,
    story:
      "Once operating from a church building, this home is now led by the son of the original housemother. Alongside his wife—who herself grew up in this home—they continue a beautiful legacy of love and discipleship.",
    established: "Family Legacy",
    image: "/All Home Pic/KS Home.jpg",
    highlight: "Generational Care",
    mapLink: "https://maps.app.goo.gl/7Npyfs3DkYmYHgYd9",
    coordinates: { lat: 11.45, lng: 104.5 },
  },
  {
    id: 4,
    name: "Kampong Thom Home",
    location: "Khom Okunthortbong",
    children: 20,
    buildings: 4,
    story:
      "A joyful and loving home where every child is nurtured in a safe and welcoming environment, surrounded by God's peace and presence.",
    established: "Former Orphan",
    image: "/All Home Pic/KT Home.jpg",
    highlight: "Full Circle Story",
    mapLink: "https://maps.app.goo.gl/MopRqx5VqeYveuFBA",
    coordinates: { lat: 12.7081, lng: 104.8886 },
  },
  {
    id: 5,
    name: "Pursat Home",
    location: "Phum Kacherdachbay",
    children: 30,
    buildings: 2,
    story:
      "Many of today's mission leaders once called this home their own. The houseparents here continue that powerful legacy—raising children with love, purpose, and the truth of God's Word.",
    established: "Since 2008",
    image: "/All Home Pic/PS Home.jpg",
    highlight: "Growing Alumni",
    mapLink: "https://maps.app.goo.gl/qP66FShUc7W3ZtiD7",
    coordinates: { lat: 12.5333, lng: 103.9167 },
  },
  {
    id: 6,
    name: "Takeo Home",
    location: "Phum Kdach",
    children: 20,
    buildings: 3,
    story:
      "Years ago, a faithful couple walked into a local church and saw children in need. God stirred their hearts with a calling they couldn't ignore. Today, they are lovingly known as 'Mom and Dad' to every child they serve.",
    established: "2017",
    image: "/All Home Pic/TK Home.jpg",
    highlight: "New Stability",
    mapLink: "https://maps.app.goo.gl/B1EcpcFKLFsC55HLA",
    coordinates: { lat: 10.9833, lng: 104.7833 },
  },
  {
    id: 7,
    name: "Phnom Penh Student Center",
    location: "St. 85BT, Boeng Tumpun",
    children: 20,
    buildings: 6,
    story:
      "More than a student dorm, this center is the heart of our mission—supporting university and vocational students, especially those receiving medical care, while also serving as the headquarters of NHCH.",
    established: "HQ Center",
    image: "/All Home Pic/PP Home.jpg",
    highlight: "Education Hub",
    mapLink: "https://maps.app.goo.gl/HAUUP6H8BLD3enFA6",
    coordinates: { lat: 11.5564, lng: 104.9282 },
  },
  {
    id: 8,
    name: "Kampot Home",
    location: "Phum Kdach",
    children: 10,
    buildings: 2,
    story:
      "A powerful story of transformation—one of our university graduates has returned, now married with children, and is passionately investing in the next generation of young leaders.",
    established: "Alumni Led",
    image: "/All Home Pic/KP Home.jpeg",
    highlight: "Boys' Sanctuary",
    mapLink: "https://maps.app.goo.gl/qpHTzu4RXtWoDb8x8",
    coordinates: { lat: 10.6333, lng: 104.1667 },
  },
  {
    id: 9,
    name: "Kampong Chhnang Home",
    location: "Phum Svay Krom",
    children: 20,
    buildings: 3,
    story:
      "Another inspiring graduate story—this former student, now a parent and leader, has come home to raise up children with the same hope and vision that once transformed their life.",
    established: "Since 2006",
    image: "/Picture9.jpg",
    highlight: "Next Generation",
    mapLink: "https://maps.app.goo.gl/DRzVgR7kpKEV1JXn7",
    coordinates: { lat: 12.25, lng: 104.6667 },
  },
  {
    id: 10,
    name: "Kampong Cham Home",
    location: "Phum Sekyom, Prek Chor",
    children: 50,
    buildings: 3,
    story:
      "Tevy and Vandy continue the work of her parents with full hearts. With new buildings rising and fresh hope growing, this home shines as a light of generational faithfulness.",
    established: "Family Legacy",
    image: "/All Home Pic/KM Home.jpg",
    highlight: "Growing Hope",
    mapLink: "https://maps.app.goo.gl/sWi1Tr6DsxLmin568",
    coordinates: { lat: 11.987, lng: 105.4583 },
  },
  {
    id: 11,
    name: "Battambang Home 2",
    location: "Phum Steungsomrong",
    children: 70,
    buildings: 3,
    story:
      "A beautiful, warm, and secure home created especially for girls. Here, they grow up surrounded by love, encouragement, and the freedom to thrive.",
    established: "Girls' Home",
    image: "/All Home Pic/BB2 Home.jpg",
    highlight: "Peaceful Haven",
    mapLink: "https://maps.app.goo.gl/NjTbu1vRKRf9B7YC6",
    coordinates: { lat: 13.1027, lng: 103.1982 },
  },
  {
    id: 12,
    name: "Battambang Home 1",
    location: "Phum Odombong",
    children: 10,
    buildings: 4,
    story:
      "Located in one of Cambodia's most well-known cities, this home is full of life, laughter, and legacy. A place where children are raised in love and pointed toward Christ.",
    established: "Since 2011",
    image: "/All Home Pic/BB1 Home.jpg",
    highlight: "Shepherd's Heart",
    mapLink: "https://maps.app.goo.gl/bDbu6JRLSsH3pvYV9",
    coordinates: { lat: 13.1027, lng: 103.1982 },
  },
  {
    id: 13,
    name: "Siem Reap Home",
    location: "Phum Krosang",
    children: 20,
    buildings: 3,
    story:
      "A sweet and peaceful home that feels like one big family. Set in nature, complete with a chicken coop, it offers the children a safe and simple life surrounded by God's creation.",
    established: "Veteran Leaders",
    image: "/All Home Pic/SR Home.jpg",
    highlight: "Experienced Care",
    mapLink: "https://maps.app.goo.gl/fZhqa8j17ApoUSMZ6",
    coordinates: { lat: 13.3671, lng: 103.8448 },
  },
  {
    id: 14,
    name: "Pailin Home",
    location: "Phum Tmey",
    children: 40,
    buildings: 1,
    story:
      "The children in this home are exceptionally bright and regularly receive awards. Walk through the home and you'll see every wall proudly decorated with their achievements.",
    established: "Built 2016",
    image: "/All Home Pic/PL Home.jpg",
    highlight: "Spiritual Growth",
    mapLink: "https://maps.app.goo.gl/Gr7m4RZgspXcgdmv5",
    coordinates: { lat: 12.85, lng: 102.6167 },
  },
  {
    id: 15,
    name: "Preah Vihear Home",
    location: "Phum Sroemkhangtbong",
    children: 30,
    buildings: 3,
    story:
      "This is a mission-driven home where the houseparents intentionally disciple children to become future leaders—spiritually, academically, and socially.",
    established: "Joined 2013",
    image: "/All Home Pic/PVH Home.jpg",
    highlight: "United Vision",
    mapLink: "https://maps.app.goo.gl/FQ3UoAx1qViA5zJn6",
    coordinates: { lat: 13.8167, lng: 104.9667 },
  },
  {
    id: 16,
    name: "Prey Veng Home",
    location: "Phum Prey Ogroun",
    children: 30,
    buildings: 2,
    story:
      "Though still a developing site, this home is full of heart. The land belongs to the houseparents, making the mission even more meaningful. With your support, children here are growing in love and purpose.",
    established: "Heart-Led",
    image: "/All Home Pic/PV Home.jpg",
    highlight: "Father's Love",
    mapLink: "https://maps.app.goo.gl/bo1xT1pKcTtAga6d7",
    coordinates: { lat: 11.4833, lng: 105.3333 },
  },
];

export default function HomePage() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedHome, setSelectedHome] = useState<any>(null);

  const CARDS_PER_PAGE = 8;
  const totalPages = Math.ceil(homesData.length / CARDS_PER_PAGE);

  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;
  const currentPageData = homesData.slice(startIndex, endIndex);

  // Animation observer for cards appearing on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll("[data-index]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [currentPage]);

  useEffect(() => {
    setVisibleCards(new Set());
    setExpandedCard(null);
  }, [currentPage]);

  // Get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Error getting location:", error);
          // Default to Phnom Penh if location access denied
          setUserLocation({ lat: 11.5564, lng: 104.9282 });
        }
      );
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  // Calculate distance between two coordinates (in km)
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Calculate travel time (rough estimate)
  const calculateTravelTime = (distance: number): string => {
    const averageSpeed = 40; // km/h average in Cambodia
    const hours = distance / averageSpeed;
    if (hours < 1) {
      return `${Math.round(hours * 60)} minutes`;
    } else {
      return `${Math.round(hours)} hours ${Math.round(
        (hours % 1) * 60
      )} minutes`;
    }
  };

  // Sort homes by distance from user
  const sortedHomes = userLocation
    ? [...homesData].sort((a, b) => {
        const distA = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          a.coordinates.lat,
          a.coordinates.lng
        );
        const distB = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          b.coordinates.lat,
          b.coordinates.lng
        );
        return distA - distB;
      })
    : homesData;

  // Toggle card expansion
  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const goToPage = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const homesSection = document.querySelector("#homes-section");
      if (homesSection) {
        homesSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const goToPreviousPage = (): void => {
    goToPage(currentPage - 1);
  };

  const goToNextPage = (): void => {
    goToPage(currentPage + 1);
  };

  // Calculate totals for statistics
  const totalChildren = homesData.reduce((sum, home) => sum + home.children, 0);
  const totalBuildings = homesData.reduce(
    (sum, home) => sum + home.buildings,
    0
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Space reserved for menu component */}
      <div className="h-12 sm:h-16 bg-white border-b border-green-100">
        {/* Your menu component goes here */}
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-100 py-12 sm:py-16 lg:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center w-full mx-auto">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Heart className="w-3 h-2 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Homes Across Cambodia
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              Children&apos;s Homes &
              <span className="text-green-600 block">Houseparents</span>
            </h1>

            {/* Three Feature Boxes in a Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16 max-w-7xl mx-auto">
              {/* Across Cambodia Box */}
              <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 p-4 rounded-full flex-shrink-0 mb-4">
                    <MapPin className="w-8 h-8 lg:w-10 lg:h-10 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg lg:text-xl">
                    Across Cambodia
                  </h3>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                    Each of our homes is located between one to ten hours&apos;
                    drive from Phnom Penh. Along the way, you&apos;ll witness
                    breathtaking views of lush rice fields and peaceful
                    countryside life, a reminder of Cambodia&apos;s natural
                    beauty and resilience.
                  </p>
                </div>
              </div>

              {/* Dedicated Houseparents Box */}
              <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 p-4 rounded-full flex-shrink-0 mb-4">
                    <Users className="w-8 h-8 lg:w-10 lg:h-10 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg lg:text-xl">
                    Dedicated Houseparents
                  </h3>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                    At the heart of every home are our dedicated houseparents,
                    many of whom are long-time pastors or have been Christians
                    for over five years. They serve not only as caregivers but
                    as spiritual mentors.
                  </p>
                </div>
              </div>

              {/* Unwavering Love Box */}
              <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 p-4 rounded-full flex-shrink-0 mb-4">
                    <Heart className="w-8 h-8 lg:w-10 lg:h-10 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg lg:text-xl">
                    Unwavering Love
                  </h3>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                    Though these children have endured great loss and hardship,
                    they are surrounded by unwavering love a love that reflects
                    God&apos;s grace through the commitment of those who have
                    dedicated their lives to serving Him.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Map Section */}
            <div className="max-w-7xl mx-auto mb-12 lg:mb-16">
              <div className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden">
                <div className="p-6 lg:p-8 border-b border-green-100">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 text-center">
                    Find Homes Near You
                  </h2>
                  <p className="text-gray-600 text-center max-w-2xl mx-auto">
                    Discover our children&apos;s homes across Cambodia with
                    distance information
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Enhanced Cambodia Map Section */}
                  <div className="h-96 lg:h-[500px] relative bg-green-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-green-100 flex items-center justify-center">
                      <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl mx-4">
                        <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Cambodia Children&#39;s Homes
                        </h3>
                        <p className="text-gray-600 mb-4 max-w-md">
                          Our {homesData.length} homes are spread across
                          Cambodia, providing love and care to {totalChildren}+
                          children
                        </p>
                        <a
                          href="https://www.google.com/maps/search/NHCH+Children's+Homes+in+Cambodia/@12.565679,104.990963,7z"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          View All Homes on Google Maps
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Homes List with Distance Information */}
                  <div className="max-h-[500px] overflow-y-auto border-l border-green-100">
                    <div className="p-4 border-b border-green-100 bg-green-50">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">
                          {userLocation ? "Homes Near You" : "All Homes"}
                        </h3>
                        <button
                          onClick={getUserLocation}
                          className="flex items-center text-green-600 hover:text-green-700 text-sm"
                        >
                          <Navigation className="w-4 h-4 mr-1" />
                          {userLocation ? "Update" : "Enable"} Location
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {userLocation
                          ? "Sorted by distance from your location"
                          : "Enable location to see distances"}
                      </p>
                    </div>

                    <div className="divide-y divide-green-50">
                      {sortedHomes.map((home) => {
                        const distance = userLocation
                          ? calculateDistance(
                              userLocation.lat,
                              userLocation.lng,
                              home.coordinates.lat,
                              home.coordinates.lng
                            )
                          : null;

                        return (
                          <div
                            key={home.id}
                            className="p-4 hover:bg-green-50 transition-colors cursor-pointer"
                            onClick={() => setSelectedHome(home)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-1">
                                  {home.name}
                                </h4>
                                <p className="text-sm text-gray-600 mb-2 flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {home.location}
                                </p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <span className="flex items-center">
                                    <Users className="w-3 h-3 mr-1" />
                                    {home.children} children
                                  </span>
                                  <span className="flex items-center">
                                    <Building className="w-3 h-3 mr-1" />
                                    {home.buildings} buildings
                                  </span>
                                </div>
                              </div>

                              {distance && (
                                <div className="text-right ml-4">
                                  <div className="text-lg font-bold text-green-600">
                                    {distance < 1
                                      ? `${Math.round(distance * 1000)}m`
                                      : `${distance.toFixed(1)}km`}
                                  </div>
                                  <div className="text-xs text-gray-500 flex items-center justify-end">
                                    <Car className="w-3 h-3 mr-1" />
                                    {calculateTravelTime(distance)}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {selectedHome && (
                  <div className="p-6 bg-green-50 border-t border-green-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          {selectedHome.name}
                        </h4>
                        <p className="text-gray-600">{selectedHome.location}</p>
                      </div>
                      <button
                        onClick={() => setSelectedHome(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex space-x-3">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedHome.coordinates.lat},${selectedHome.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg text-center hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Directions
                      </a>
                      <a
                        href={selectedHome.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
                      >
                        View on Map
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-green-100 transform hover:scale-105 transition-all duration-300">
                <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Home className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                  {homesData.length}
                </div>
                <div className="text-gray-900 font-medium text-sm sm:text-base">
                  Homes
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-green-100 transform hover:scale-105 transition-all duration-300">
                <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                  {totalChildren}
                  <span className="text-green-600">+</span>
                </div>
                <div className="text-gray-900 font-medium text-sm sm:text-base">
                  Children
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-green-100 transform hover:scale-105 transition-all duration-300">
                <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-green-600">
                  <Building className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                  {totalBuildings}
                </div>
                <div className="text-gray-900 font-medium text-sm sm:text-base">
                  Buildings
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Homes Section */}
      <section
        id="homes-section"
        className="py-12 sm:py-16 lg:py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our Children&apos;s Homes
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Discover the unique stories and loving communities that make each
              home special
            </p>
          </div>

          <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-x-8 lg:gap-y-12">
              {currentPageData.map((home, index) => (
                <div
                  key={home.id}
                  data-index={index}
                  className={`group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white overflow-hidden rounded-lg ${
                    visibleCards.has(index)
                      ? "animate-slide-in-up"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => toggleCard(index)}
                >
                  <div className="relative">
                    <a
                      href={home.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image
                        src={home.image || "/placeholder.svg"}
                        alt={`${home.name} exterior`}
                        width={500}
                        height={192}
                        className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </a>

                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <span className="inline-flex items-center rounded-full bg-green-600 px-2 py-0.5 sm:px-2.5 sm:py-0.5 text-xs font-medium text-white shadow-lg">
                        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                        <span className="hidden sm:inline">
                          {home.highlight}
                        </span>
                        <span className="sm:hidden">
                          {home.highlight.split(" ")[0]}
                        </span>
                      </span>
                    </div>

                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm rounded-full p-1.5 sm:p-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="pb-3">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-2 leading-tight">
                        {home.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-1 text-green-500 flex-shrink-0" />
                        <span className="truncate">{home.location}</span>
                      </p>
                    </div>

                    <div
                      className={`transition-all duration-500 overflow-hidden ${
                        expandedCard === index
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="border-t border-green-100 pt-4 space-y-3 sm:space-y-4">
                        <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2 py-0.5 sm:px-2.5 sm:py-0.5 text-xs font-medium text-green-700">
                          {home.established}
                        </span>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                          {home.story}
                        </p>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <div className="bg-green-50 p-2 sm:p-3 rounded-lg text-center">
                            <div className="text-lg sm:text-2xl font-bold text-green-600">
                              {home.children}+
                            </div>
                            <div className="text-xs text-green-700">
                              Children
                            </div>
                          </div>
                          <div className="bg-green-50 p-2 sm:p-3 rounded-lg text-center">
                            <div className="text-lg sm:text-2xl font-bold text-green-600">
                              {home.buildings}
                            </div>
                            <div className="text-xs text-green-700">
                              Buildings
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center mt-8 sm:mt-12 space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-green-600 border border-green-600 hover:bg-green-600 hover:text-white shadow-md transform hover:scale-105"
                }`}
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Previous
              </button>

              <div className="flex space-x-1 sm:space-x-2 sm:max-w-none">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base flex-shrink-0 ${
                        currentPage === page
                          ? "bg-green-600 text-white shadow-md"
                          : "bg-white text-green-600 border border-green-600 hover:bg-green-600 hover:text-white shadow-md transform hover:scale-105"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-green-600 border border-green-600 hover:bg-green-600 hover:text-white shadow-md transform hover:scale-105"
                }`}
              >
                Next
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white shadow-lg border-t-2 border-green-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="bg-green-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-700 mb-4 sm:mb-6">
              Join Us in Making a Difference
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-green-600 mb-6 sm:mb-8 leading-relaxed px-4">
              Every child deserves love, hope, and a bright future. Your support
              helps us continue this vital work across Cambodia.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CalendarDays, ArrowRight } from "lucide-react";

interface News {
  id: number;
  image: string;
  title: string;
  text: string;
  date: string;
  category: string;
  excerpt: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  news: News[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export default function NewsPage() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsData, setNewsData] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 6,
    hasNext: false,
    hasPrev: false,
  });

  const itemsPerPage = 6;

  // Fetch news data from API
  const fetchNews = async (page: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `/api/news/public?page=${page}&limit=${itemsPerPage}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data: ApiResponse = await response.json();
      setNewsData(data.news);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching news:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  const handleCloseOverlay = () => {
    console.log("[v0] Overlay closed");
    setIsOverlayOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl mt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#43A047] mb-4">NEWS</h1>
          <p className="text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl mt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#43A047] mb-4">NEWS</h1>
          <p className="text-gray-600">Error loading news</p>
          <Button
            onClick={() => fetchNews(currentPage)}
            className="mt-4 bg-green-500 hover:bg-green-600"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-20">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#43A047] mb-4">NEWS</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Recall our news, in Cambodia and around the world
        </p>
      </div>

      {/* Featured Article Section - Show first article as featured */}
      {newsData.length > 0 && (
        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-4">
            <p className="text-gray-500">{newsData[0].date}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-green-500 leading-tight">
              {newsData[0].title}
            </h1>
            <p className="text-gray-700 leading-relaxed">
              {newsData[0].excerpt}
            </p>
            <Link
              href={`/page/new/${newsData[0].id}`}
              className="inline-flex items-center text-green-500 font-semibold hover:underline transition-colors duration-200"
            >
              Read More
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2">
            <Image
              src={newsData[0].image || "/nho.jpg"}
              alt={newsData[0].title}
              width={600}
              height={400}
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </div>
        </div>
      )}

      {/* News Grid with Pagination */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-green-500 mb-6">Latest News</h2>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsData.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={article.image || "/nho.jpg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {article.category}
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 flex items-center mb-3">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  {article.date}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-green-500 transition-colors duration-200">
                  <Link href={`/page/new/${article.id}`}>{article.title}</Link>
                </h3>
                <p className="text-gray-700 text-base mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <Link
                  href={`/page/new/${article.id}`}
                  className="inline-flex items-center text-green-500 font-semibold hover:underline transition-colors duration-200"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-green-500 text-green-500 hover:bg-green-50"
            >
              Previous
            </Button>

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => handlePageChange(page)}
                  className={
                    currentPage === page
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "border-green-500 text-green-500 hover:bg-green-50"
                  }
                >
                  {page}
                </Button>
              )
            )}

            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className="border-green-500 text-green-500 hover:bg-green-50"
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Featured Article Overlay */}
      {isOverlayOpen && newsData.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-500 mb-2">{newsData[0].date}</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-green-500 leading-tight">
                    {newsData[0].title}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleCloseOverlay}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>

              <div className="mb-6">
                <Image
                  src={newsData[0].image || "/nho.jpg"}
                  alt={newsData[0].title}
                  width={800}
                  height={400}
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                />
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {newsData[0].text}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

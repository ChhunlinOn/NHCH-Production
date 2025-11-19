"use client";

// import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CalendarDays, ArrowLeft, Clock } from "lucide-react";
import { useParams } from "next/navigation";
import ImageCarousel from "@/app/component/ImageCarousel";

interface NewsImage {
  id: number;
  imageUrl: string;
  caption?: string;
  displayOrder: number;
}

interface News {
  id: number;
  title: string;
  text: string;
  date: string;
  category: string;
  excerpt: string;
  created_at: string;
  updated_at: string;
  newsImages: NewsImage[];
}

export default function NewsDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [news, setNews] = useState<News | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log("Fetching news ID:", id);

        const response = await fetch(`/api/news/public/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("News article not found");
          }
          throw new Error("Failed to fetch news");
        }

        const data: News = await response.json();
        setNews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching news:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id && !news) {
      fetchNewsDetail();
    }
  }, [id, news]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl mt-16">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl mt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/page/new">
            <Button className="bg-green-500 hover:bg-green-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl mt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-500 mb-4">
            News not found
          </h1>
          <Link href="/page/new">
            <Button className="bg-green-500 hover:bg-green-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-16">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/page/new">
          <Button
            variant="outline"
            className="border-green-500 text-green-500 hover:bg-green-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <div className="mb-8">
        <span className="inline-block bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
          {news.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {news.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-2" />
            {new Date(news.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {Math.ceil(news.text.split(/\s+/).length / 200)} min read
          </div>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="mb-8">
        <ImageCarousel images={news.newsImages} />
      </div>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none mb-12 text-center">
        <div className="text-gray-700 leading-relaxed space-y-6">
          {news.text.split("\n").map((paragraph, index) => (
            <p key={index} className="text-lg leading-8">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}

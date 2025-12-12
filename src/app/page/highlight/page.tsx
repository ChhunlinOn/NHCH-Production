"use client";

import { useEffect, useMemo, useState } from "react";

export default function App() {
  type ShortVideo = {
    id: number;
    title: string;
    video: string | null;
    videoPublicId: string | null;
    created_at: string;
    updated_at: string;
  };

  const [shortVideos, setShortVideos] = useState<ShortVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  // Fetch short videos from API
  useEffect(() => {
    const fetchShortVideos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/short-videos/public?all=true");
        
        if (!response.ok) {
          throw new Error("Failed to fetch short videos");
        }
        
        const data = await response.json();
        setShortVideos(data.shortVideos || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching short videos:", err);
        setError("Failed to load videos");
        setShortVideos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShortVideos();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setIsSmallScreen(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const pageSize = isSmallScreen ? 3 : 6; // show 3 on small screens, 6 otherwise

  // Filter videos with valid video URLs
  const validVideos = shortVideos.filter(video => video.video);
  const featuredVideo = validVideos[0];
  const otherVideos = validVideos.slice(1);

  const totalPages = Math.max(1, Math.ceil(otherVideos.length / pageSize));

  const pagedVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return otherVideos.slice(startIndex, endIndex);
  }, [currentPage, otherVideos, pageSize]);

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  // Clamp current page when page size changes to avoid empty pages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [pageSize, totalPages, currentPage]);

  function getPaginationItems(current: number, total: number) {
    const items: Array<number | "ellipsis"> = [];
    const windowSize = 1;
    if (total <= 7) {
      for (let i = 1; i <= total; i++) items.push(i);
      return items;
    }
    items.push(1);
    const start = Math.max(2, current - windowSize);
    const end = Math.min(total - 1, current + windowSize);
    if (start > 2) items.push("ellipsis");
    for (let i = start; i <= end; i++) items.push(i);
    if (end < total - 1) items.push("ellipsis");
    items.push(total);
    return items;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading videos...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
      <section className="container mx-auto px-4 py-8 max-w-6xl mt-16">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="md:w-5/12 w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-green-500 mb-2">Highlight Videos</h1>
            <p className="text-gray-600 text-sm md:text-base">Short highlight videos from recent activities and stories.</p>
            <p className="text-gray-500 text-xs md:text-sm mt-1">Catch quick moments, updates, and behind-the-scenes in under a minute.</p>
          </div>
          {featuredVideo && (
            <div className="md:w-7/12 w-full">
              <article className="group rounded-lg border border-gray-200 overflow-hidden shadow-sm bg-white">
                <div className="relative">
                  <video
                    className="w-full aspect-video object-cover bg-black"
                    src={featuredVideo.video!}
                    controls
                    preload="metadata"
                    playsInline
                    aria-label={featuredVideo.title}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-base sm:text-lg font-semibold">{featuredVideo.title}</h2>
                  <p className="text-xs text-gray-500 mt-1">Featured • {new Date(featuredVideo.created_at).toLocaleDateString()}</p>
                </div>
              </article>
            </div>
          )}
          {!featuredVideo && validVideos.length === 0 && (
            <div className="md:w-7/12 w-full">
              <div className="text-center py-12 border border-gray-200 rounded-lg bg-gray-50">
                <p className="text-gray-500">No videos available at the moment.</p>
                <p className="text-sm text-gray-400 mt-1">Check back later for new content!</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {otherVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pagedVideos.map((video) => (
            <article
              key={video.id}
              className="group rounded-lg border border-gray-200 overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <video
                  className="w-full aspect-video object-cover bg-black"
                  src={video.video!}
                  controls
                  preload="metadata"
                  playsInline
                  aria-label={video.title}
                />
              </div>
              <div className="p-4">
                <h2 className="text-sm sm:text-base font-medium line-clamp-2">{video.title}</h2>
                <p className="text-xs text-gray-500 mt-1">{new Date(video.created_at).toLocaleDateString()}</p>
              </div>
            </article>
          ))}
        </div>
      ) : validVideos.length <= 1 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No additional videos available.</p>
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && otherVideos.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap min-w-full">
            <button
              type="button"
              className="px-3 py-1.5 rounded border border-gray-300 text-sm disabled:opacity-50"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {getPaginationItems(currentPage, totalPages).map((item, idx) =>
              item === "ellipsis" ? (
                <span key={`ellipsis-${idx}`} className="px-2 text-sm text-gray-500">…</span>
              ) : (
                <button
                  key={item}
                  type="button"
                  className={`px-3 py-1.5 rounded border text-sm ${
                    item === currentPage
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => goToPage(item)}
                >
                  {item}
                </button>
              )
            )}
            <button
              type="button"
              className="px-3 py-1.5 rounded border border-gray-300 text-sm disabled:opacity-50"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
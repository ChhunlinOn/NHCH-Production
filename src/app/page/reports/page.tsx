"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Eye } from "lucide-react";
import Image from "next/image";

interface ReportPdf {
  id: number;
  title: string;
  cover_url: string | null;
  pdf_url: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export default function ReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<ReportPdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shownCount, setShownCount] = useState(6);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/report-pdfs');

        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }

        const data = await response.json();
        setReports(data);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError(err instanceof Error ? err.message : 'Failed to load reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-white mt-16">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-[#43A047] mb-4">Reports</h1>
          <p className="text-xl text-gray-600 mb-2">Annual Reports and Documents</p>
        </div>

        {/* Reports Grid */}
        <section className="mb-12">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#43A047]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 text-lg mb-4">Error loading reports</p>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No reports available</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.slice(0, shownCount).map((report) => (
                  <div key={report.id} className="bg-gray-50 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div className="cursor-pointer" onClick={() => router.push(`/page/reports/${report.id}`)}>
                      <Image
                        src={report.cover_url || "/detail-image.png"}
                        alt={report.title}
                        width={400}
                        height={192}
                        className="w-full h-48 object-cover rounded-md mb-4"
                        unoptimized
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{report.title}</h3>
                    {report.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{report.description}</p>
                    )}
                    <div className="flex justify-end">
                      <button
                        onClick={() => router.push(`/page/reports/${report.id}`)}
                        className="bg-[#43A047] text-white px-4 py-2 rounded hover:bg-[#388E3C] flex items-center"
                      >
                        <Eye size={16} className="mr-2" />
                        View Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {reports.length > shownCount && (
                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => setShownCount(shownCount + 6)}
                    className="text-[#43A047] underline hover:text-[#388E3C] transition-colors flex items-center"
                  >
                    Load More
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

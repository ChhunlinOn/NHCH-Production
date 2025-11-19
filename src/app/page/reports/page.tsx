"use client";
import { useState, useEffect } from "react";
import { ChevronRight, FileText, Download, Calendar } from "lucide-react";
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
  const [reports, setReports] = useState<ReportPdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shownCount, setShownCount] = useState(6);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/report-pdfs");

        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }

        const data = await response.json();
        setReports(data);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError(err instanceof Error ? err.message : "Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-gray-50 mt-28">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#43A047] mb-4">
          Reports Documents
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Discover our comprehensive annual reports, financial statements, and
          key documents showcasing our commitment to transparency and
          accountability.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#43A047] to-[#2e7d32] rounded-full blur-lg opacity-50 animate-pulse"></div>
              <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#43A047]"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-32 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <FileText size={32} className="text-red-600" />
            </div>
            <p className="text-red-600 text-lg font-bold mb-2">
              Unable to Load Reports
            </p>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-2xl shadow-lg p-12 border border-gray-100">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <FileText size={40} className="text-gray-400" />
            </div>
            <p className="text-gray-600 text-xl font-medium">
              No reports available yet
            </p>
            <p className="text-gray-500 mt-2">Check back soon for updates.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {reports.slice(0, shownCount).map((report, index) => (
                <div
                  key={report.id}
                  className="group h-full"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="h-full bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#43A047]/30 flex flex-col hover:scale-105">
                    {/* Image Section */}
                    <div className="relative h-56 bg-gradient-to-br from-[#43A047]/20 to-[#2e7d32]/20 overflow-hidden flex items-center justify-center group-hover:from-[#43A047]/30 group-hover:to-[#2e7d32]/30 transition-all duration-300">
                      {report.cover_url ? (
                        <Image
                          src={report.cover_url}
                          alt={report.title}
                          width={400}
                          height={224}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <FileText
                            size={56}
                            className="text-[#43A047]/30 group-hover:text-[#43A047]/50 transition-colors"
                          />
                          <span className="text-sm text-gray-500">
                            PDF Document
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-[#43A047] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Latest
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-7 flex-1 flex flex-col">
                      <div className="flex-1 mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#43A047] transition-colors duration-300">
                          {report.title}
                        </h3>
                        {report.description && (
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {report.description}
                          </p>
                        )}
                      </div>

                      {/* Footer with Date and Action */}
                      <div className="border-t border-gray-100 pt-4 mt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500 flex items-center gap-2">
                            <Calendar size={14} className="text-[#43A047]" />
                            {formatDate(report.created_at)}
                          </span>
                          <a
                            href={`/api/report-pdfs/${report.id}/view`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#43A047] hover:bg-[#2e7d32] text-white rounded-lg transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg"
                          >
                            <Download size={16} />
                            View PDF
                            <ChevronRight
                              size={16}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {reports.length > shownCount && (
              <div className="flex justify-center pt-8">
                <button
                  onClick={() => setShownCount(shownCount + 6)}
                  className="group relative px-10 py-4 bg-white border-2 border-[#43A047] text-[#43A047] hover:bg-[#43A047] hover:text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
                >
                  <span className="relative flex items-center gap-2">
                    Load More Reports
                    <ChevronRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

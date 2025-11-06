"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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

export default function ReportDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [report, setReport] = useState<ReportPdf | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/report-pdfs/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Report not found');
          }
          throw new Error('Failed to fetch report');
        }

        const data = await response.json();
        setReport(data);
      } catch (err) {
        console.error('Error fetching report:', err);
        setError(err instanceof Error ? err.message : 'Failed to load report');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReport();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white mt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#43A047]"></div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-white mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Report Not Found</h1>
          <p className="text-xl text-gray-600">{error || 'The requested report could not be found.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#43A047] mb-4">{report.title}</h1>
          <p className="text-xl text-gray-600 mb-2">Report Detail</p>
        </div>

        {/* Report Detail */}
        <section>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
            <Image
              src={report.cover_url || "/detail-image.png"}
              alt={report.title}
              width={400}
              height={256}
              className="w-full max-w-md h-64 object-cover rounded-md mb-6 mx-auto"
              unoptimized
            />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{report.title}</h2>
            {report.description && (
              <p className="text-gray-700 mb-6">{report.description}</p>
            )}
            <a
              href={report.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#43A047] text-white px-6 py-3 rounded hover:bg-[#388E3C] inline-block"
            >
              View PDF
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

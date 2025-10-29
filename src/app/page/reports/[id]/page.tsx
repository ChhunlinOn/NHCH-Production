"use client";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ReportDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Map id to report data
  const reports = [
    {
      id: "report-2025",
      title: "Report 2025",
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus, massa nec egestas ultricies, nunc purus cursus sem, sed tincidunt nulla orci non mauris. Donec vel felis et enim blandit commodo. Curabitur bibendum, justo sit amet feugiat malesuada, sapien nulla aliquet nisi, in mattis tortor erat vel nisl. Suspendisse potenti. Vivamus vel dictum augue. Sed interdum, felis vel sagittis congue, justo lectus aliquam nunc, quis sodales nibh lectus non nunc. Duis posuere feugiat turpis, sit amet facilisis magna ultricies non. Mauris pretium lorem ut tincidunt posuere.',
      thumbnail: "/nho.jpg",
      pdf: "/nho.pdf",
    },
    {
      id: "report-2026",
      title: "Report 2026",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus, massa nec egestas ultricies, nunc purus cursus sem, sed tincidunt nulla orci non mauris. Donec vel felis et enim blandit commodo. Curabitur bibendum, justo sit amet feugiat malesuada, sapien nulla aliquet nisi, in mattis tortor erat vel nisl. Suspendisse potenti. Vivamus vel dictum augue. Sed interdum, felis vel sagittis congue, justo lectus aliquam nunc, quis sodales nibh lectus non nunc. Duis posuere feugiat turpis, sit amet facilisis magna ultricies non. Mauris pretium lorem ut tincidunt posuere.',
      thumbnail: "/detail-image.png",
      pdf: "/chhunlin.pdf",
    },
  ];

  const report = reports.find((r) => r.id === id);

  if (!report) {
    return <div>Report not found</div>;
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
              src={report.thumbnail}
              alt={report.title}
              width={400}
              height={256}
              className="w-full max-w-md h-64 object-cover rounded-md mb-6 mx-auto"
            />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{report.title}</h2>
            <p className="text-gray-700 mb-6">{report.description}</p>
            <a
              href={report.pdf}
              download
              className="bg-[#43A047] text-white px-6 py-3 rounded hover:bg-[#388E3C] inline-block"
            >
              Download PDF
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

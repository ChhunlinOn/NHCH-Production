"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Eye } from "lucide-react";
import Image from "next/image";

export default function ReportsPage() {
  const router = useRouter();
  const [shownCount, setShownCount] = useState(6);

  // List of reports
  const reports = [
    {
      id: "report-2025",
      title: "Report 2025",
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus, massa nec egestas ultricies, nunc purus cursus sem, sed tincidunt nulla orci non mauris. Donec vel felis et enim blandit commodo. Curabitur bibendum, justo sit amet feugiat malesuada, sapien nulla aliquet nisi, in mattis tortor erat vel nisl. Suspendisse potenti. Vivamus vel dictum augue. Sed interdum, felis vel sagittis congue, justo lectus aliquam nunc, quis sodales nibh lectus non nunc. Duis posuere feugiat turpis, sit amet facilisis magna ultricies non. Mauris pretium lorem ut tincidunt posuere.',
      thumbnail: "/nho.jpg", // Use an image from public
    },
    {
      id: "report-2026",
      title: "Report 2026",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus, massa nec egestas ultricies, nunc purus cursus sem, sed tincidunt nulla orci non mauris. Donec vel felis et enim blandit commodo. Curabitur bibendum, justo sit amet feugiat malesuada, sapien nulla aliquet nisi, in mattis tortor erat vel nisl. Suspendisse potenti. Vivamus vel dictum augue. Sed interdum, felis vel sagittis congue, justo lectus aliquam nunc, quis sodales nibh lectus non nunc. Duis posuere feugiat turpis, sit amet facilisis magna ultricies non. Mauris pretium lorem ut tincidunt posuere.',
      thumbnail: "/detail-image.png", // Placeholder image
    },
    {
      id: "report-2027",
      title: "Report 2027",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus, massa nec egestas ultricies, nunc purus cursus sem, sed tincidunt nulla orci non mauris. Donec vel felis et enim blandit commodo. Curabitur bibendum, justo sit amet feugiat malesuada, sapien nulla aliquet nisi, in mattis tortor erat vel nisl. Suspendisse potenti. Vivamus vel dictum augue. Sed interdum, felis vel sagittis congue, justo lectus aliquam nunc, quis sodales nibh lectus non nunc. Duis posuere feugiat turpis, sit amet facilisis magna ultricies non. Mauris pretium lorem ut tincidunt posuere.',
      thumbnail: "/detail-image.png", // Placeholder image
    },
    {
      id: "report-2028",
      title: "Report 2028",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus, massa nec egestas ultricies, nunc purus cursus sem, sed tincidunt nulla orci non mauris. Donec vel felis et enim blandit commodo. Curabitur bibendum, justo sit amet feugiat malesuada, sapien nulla aliquet nisi, in mattis tortor erat vel nisl. Suspendisse potenti. Vivamus vel dictum augue. Sed interdum, felis vel sagittis congue, justo lectus aliquam nunc, quis sodales nibh lectus non nunc. Duis posuere feugiat turpis, sit amet facilisis magna ultricies non. Mauris pretium lorem ut tincidunt posuere.',
      thumbnail: "/detail-image.png", // Placeholder image
    },
    {
      id: "report-2029",
      title: "Report 2029",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus, massa nec egestas ultricies, nunc purus cursus sem, sed tincidunt nulla orci non mauris. Donec vel felis et enim blandit commodo. Curabitur bibendum, justo sit amet feugiat malesuada, sapien nulla aliquet nisi, in mattis tortor erat vel nisl. Suspendisse potenti. Vivamus vel dictum augue. Sed interdum, felis vel sagittis congue, justo lectus aliquam nunc, quis sodales nibh lectus non nunc. Duis posuere feugiat turpis, sit amet facilisis magna ultricies non. Mauris pretium lorem ut tincidunt posuere.',
      thumbnail: "/detail-image.png", // Placeholder image
    },
    {
      id: "report-2030",
      title: "Report 2030",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus, massa nec egestas ultricies, nunc purus cursus sem, sed tincidunt nulla orci non mauris. Donec vel felis et enim blandit commodo. Curabitur bibendum, justo sit amet feugiat malesuada, sapien nulla aliquet nisi, in mattis tortor erat vel nisl. Suspendisse potenti. Vivamus vel dictum augue. Sed interdum, felis vel sagittis congue, justo lectus aliquam nunc, quis sodales nibh lectus non nunc. Duis posuere feugiat turpis, sit amet facilisis magna ultricies non. Mauris pretium lorem ut tincidunt posuere.',
      thumbnail: "/detail-image.png", // Placeholder image
    },
    {
      id: "report-2031",
      title: "Report 2031",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus, massa nec egestas ultricies, nunc purus cursus sem, sed tincidunt nulla orci non mauris. Donec vel felis et enim blandit commodo. Curabitur bibendum, justo sit amet feugiat malesuada, sapien nulla aliquet nisi, in mattis tortor erat vel nisl. Suspendisse potenti. Vivamus vel dictum augue. Sed interdum, felis vel sagittis congue, justo lectus aliquam nunc, quis sodales nibh lectus non nunc. Duis posuere feugiat turpis, sit amet facilisis magna ultricies non. Mauris pretium lorem ut tincidunt posuere.',
      thumbnail: "/detail-image.png", // Placeholder image
    },
    {
      id: "report-2032",
      title: "Report 2032",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus, massa nec egestas ultricies, nunc purus cursus sem, sed tincidunt nulla orci non mauris. Donec vel felis et enim blandit commodo. Curabitur bibendum, justo sit amet feugiat malesuada, sapien nulla aliquet nisi, in mattis tortor erat vel nisl. Suspendisse potenti. Vivamus vel dictum augue. Sed interdum, felis vel sagittis congue, justo lectus aliquam nunc, quis sodales nibh lectus non nunc. Duis posuere feugiat turpis, sit amet facilisis magna ultricies non. Mauris pretium lorem ut tincidunt posuere.',
      thumbnail: "/detail-image.png", // Placeholder image
    },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.slice(0, shownCount).map((report) => (
              <div key={report.id} className="bg-gray-50 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="cursor-pointer" onClick={() => router.push(`/page/reports/${report.id}`)}>
                  <Image
                    src={report.thumbnail}
                    alt={report.title}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{report.title}</h3>
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
        </section>
      </div>
    </div>
  );
}

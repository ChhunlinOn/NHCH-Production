"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X } from "lucide-react";

export default function CreateReportPdfPage() {
  const [formData, setFormData] = useState({
    title: "",
    pdf_url: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const router = useRouter();

  // Upload file function for both images and PDFs
  const uploadFile = async (
    file: File
  ): Promise<{ image: string; fileType: string } | null> => {
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (data.success) {
        return {
          image: data.imageUrl,
          fileType: data.fileType,
        };
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const name = file.name?.toLowerCase() || "";
      const type = file.type || "";
      const isPdf = type === "application/pdf" || type.includes("pdf") || name.endsWith(".pdf");
      if (!isPdf) { alert("Please select a PDF file"); return; }

      // Validate file size (20MB max for PDFs)
      if (file.size > 20 * 1024 * 1024) {
        alert("PDF size must be less than 20MB");
        return;
      }

      setPdfFile(file);
    }
  };

  const removePdf = () => {
    setPdfFile(null);
    setFormData((prev) => ({ ...prev, pdf_url: "" }));

    // Reset file input
    const fileInput = document.getElementById("pdf") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title || !pdfFile) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      let pdfUrl = formData.pdf_url;
      // Upload PDF file
      if (pdfFile && !pdfUrl) {
        setUploadProgress(60);
        const pdfData = await uploadFile(pdfFile);
        if (pdfData && pdfData.fileType === "pdf") {
          pdfUrl = pdfData.image;
        }
        setUploadProgress(80);
      }

      setUploadProgress(100);

      const response = await fetch("/api/report-pdfs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          pdf_url: pdfUrl,
          description: formData.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create report PDF");
      }

      alert("Report PDF created successfully!");
      router.push("/admin/dashboard?section=report-pdfs");
    } catch (error) {
      console.error("Error creating report PDF:", error);
      alert(
        `Error: ${
          error instanceof Error ? error.message : "Failed to create report PDF"
        }`
      );
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard?section=report-pdfs">
              <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-white rounded-lg transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Create Report PDF
            </h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="space-y-6">
            

            {/* Progress Bar */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Uploading files...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter report PDF title"
              />
            </div>

            {/* PDF File Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PDF File *
              </label>
              <div className="space-y-4">
                {pdfFile ? (
                  <div className="flex items-center space-x-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-8 h-8 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {pdfFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removePdf}
                      className="p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Drag and drop a PDF file or click to browse
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Supports PDF files • Max 20MB
                    </p>
                    <label htmlFor="pdf" className="cursor-pointer">
                      <span className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Upload className="w-4 h-4 mr-2" />
                        Select PDF File
                      </span>
                      <input
                        type="file"
                        id="pdf"
                        name="pdf"
                        accept="application/pdf,.pdf"
                        onChange={handlePdfChange}
                        className="hidden"
                        required
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter description"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Link href="/admin/dashboard?section=report-pdfs">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Creating..." : "Create Report PDF"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

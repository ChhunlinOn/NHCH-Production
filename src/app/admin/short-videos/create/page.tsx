"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X, Play } from "lucide-react";

export default function CreateShortVideoPage() {
  const [formData, setFormData] = useState({
    title: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [videoPublicId, setVideoPublicId] = useState<string | null>(null);

  const router = useRouter();

  // Upload video function
  const uploadVideo = async (
    file: File
  ): Promise<{ video: string; videoPublicId: string } | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (data.success) {
        return {
          video: data.videoUrl,
          videoPublicId: data.publicId,
        };
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      throw error;
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("video/")) {
        alert("Please select a video file");
        return;
      }

      // Validate file size (50MB max)
      if (file.size > 50 * 1024 * 1024) {
        alert("Video size must be less than 50MB");
        return;
      }

      setVideoFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setVideoPublicId(null);

    // Reset file input
    const fileInput = document.getElementById("video") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoFile) {
      alert("Please select a video file");
      return;
    }

    // Validate required fields
    if (!formData.title) {
      alert("Please enter a title for the video");
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      // Upload video first
      setUploadProgress(30);
      const videoData = await uploadVideo(videoFile);
      setUploadProgress(70);

      if (!videoData) {
        throw new Error("Failed to upload video");
      }

      // Create short video with video data
      console.log("Creating short video with data:", {
        ...formData,
        video: videoData.video,
      });

      const videoResponse = await fetch("/api/short-videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          video: videoData.video,
          videoPublicId: videoData.videoPublicId,
        }),
      });

      setUploadProgress(100);

      console.log(
        "Short video creation response status:",
        videoResponse.status
      );

      if (!videoResponse.ok) {
        const errorText = await videoResponse.text();
        console.error("Short video creation failed:", errorText);

        let errorMessage = `Failed to create short video: ${videoResponse.status}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const responseText = await videoResponse.text();
      if (responseText) {
        try {
          const videoData = JSON.parse(responseText);
          console.log("Short video created successfully:", videoData);
        } catch {
          console.log("Short video created successfully (no JSON response)");
        }
      }

      alert("Short video created successfully!");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error creating short video:", error);
      alert(
        `Error: ${
          error instanceof Error
            ? error.message
            : "Failed to create short video"
        }`
      );
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
          <div className="flex items-center space-x-4 mt-20">
            <Link href="/admin/dashboard?section=short-videos">
              <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-white rounded-lg transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Upload Short Video
            </h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="space-y-6">
            {/* Video Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video File *
              </label>
              <div className="space-y-4">
                {videoPreview ? (
                  <div className="relative">
                    <video
                      src={videoPreview}
                      controls
                      className="w-full h-64 object-cover rounded-lg border"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Drag and drop a video or click to browse
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Supports MP4, AVI, MOV, WEBM • Max 50MB
                    </p>
                    <label htmlFor="video" className="cursor-pointer">
                      <span className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Upload className="w-4 h-4 mr-2" />
                        Select Video
                      </span>
                      <input
                        type="file"
                        id="video"
                        name="video"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="hidden"
                        required
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Uploading video...</span>
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
                placeholder="Enter video title"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Link href="/admin/dashboard">
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
                {isLoading ? "Uploading..." : "Upload Video"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

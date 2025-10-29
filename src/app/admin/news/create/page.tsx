"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Image from "next/image";

export default function CreateNewsPage() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    text: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imagePublicId, setImagePublicId] = useState<string | null>(null);

  const router = useRouter();

  // Upload image function
  const uploadImage = async (
    file: File
  ): Promise<{ image: string; imagePublicId: string } | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
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
          image: data.imageUrl,
          imagePublicId: data.publicId,
        };
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImagePublicId(null);

    // Reset file input
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image for the news article");
      return;
    }

    // Validate required fields
    if (
      !formData.title ||
      !formData.excerpt ||
      !formData.text ||
      !formData.category
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      // Upload image first
      setUploadProgress(30);
      const imageData = await uploadImage(imageFile);
      setUploadProgress(70);

      if (!imageData) {
        throw new Error("Failed to upload image");
      }

      // Create news with image data
      console.log("Creating news with data:", {
        ...formData,
        image: imageData.image,
      });

      const newsResponse = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: imageData.image,
          imagePublicId: imageData.imagePublicId,
        }),
      });

      setUploadProgress(100);

      console.log("News creation response status:", newsResponse.status);

      if (!newsResponse.ok) {
        const errorText = await newsResponse.text();
        console.error("News creation failed:", errorText);

        let errorMessage = `Failed to create news: ${newsResponse.status}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const responseText = await newsResponse.text();
      if (responseText) {
        try {
          const newsData = JSON.parse(responseText);
          console.log("News created successfully:", newsData);
        } catch {
          console.log("News created successfully (no JSON response)");
        }
      }

      alert("News created successfully!");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error creating news:", error);
      alert(
        `Error: ${
          error instanceof Error ? error.message : "Failed to create news"
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
            <Link href="/admin/dashboard">
              <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-white rounded-lg transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Create News Article
            </h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="space-y-6">
            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                News Image *
              </label>
              <div className="space-y-4">
                {imagePreview ? (
                  <div className="relative">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover rounded-lg border"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Drag and drop an image or click to browse
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Supports JPG, PNG, WEBP • Max 5MB
                    </p>
                    <label htmlFor="image" className="cursor-pointer">
                      <span className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Upload className="w-4 h-4 mr-2" />
                        Select Image
                      </span>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
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
                  <span>Uploading image...</span>
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
                placeholder="Enter news title"
              />
            </div>

            <div>
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Excerpt *
              </label>
              <input
                type="text"
                id="excerpt"
                name="excerpt"
                required
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Short description"
                maxLength={150}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.excerpt.length}/150 characters
              </p>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select a category</option>
                <option value="technology">Technology</option>
                <option value="sports">Sports</option>
                <option value="politics">Politics</option>
                <option value="entertainment">Entertainment</option>
                <option value="business">Business</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="science">Science</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Content *
              </label>
              <textarea
                id="text"
                name="text"
                required
                rows={10}
                value={formData.text}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter news content"
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
                {isLoading ? "Creating..." : "Create News"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

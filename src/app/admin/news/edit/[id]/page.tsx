"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Image from "next/image";

interface News {
  id: number;
  image: string;
  imagePublicId: string;
  title: string;
  excerpt: string;
  text: string;
  category: string;
  date: string;
}

export default function EditNewsPage() {
  const [formData, setFormData] = useState<News>({
    id: 0,
    image: "",
    imagePublicId: "",
    title: "",
    excerpt: "",
    text: "",
    category: "",
    date: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news/${id}`);

        if (response.ok) {
          const newsData = await response.json();
          console.log("Fetched news data:", newsData);
          setFormData(newsData);
          setImagePreview(newsData.image);
        } else {
          console.error("Failed to fetch news:", response.status);
          alert("Failed to fetch news data");
          router.push("/admin/dashboard");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        alert("Error fetching news data");
        router.push("/admin/dashboard");
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchNews();
    }
  }, [id, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
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
    setImagePreview(formData.image); // Reset to original image
    // Reset file input
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const uploadImage = async (
    file: File
  ): Promise<{ image: string; imagePublicId: string } | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log("Uploading image...");
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      console.log("Upload response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload failed:", errorText);
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("Upload response data:", data);

      // Handle different response formats
      if (data.secure_url || data.imageUrl) {
        return {
          image: data.secure_url || data.imageUrl,
          imagePublicId: data.public_id || data.publicId,
        };
      } else {
        throw new Error("Invalid response format from upload API");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const deleteOldImage = async (publicId: string) => {
    try {
      console.log("Deleting old image:", publicId);
      const response = await fetch("/api/upload", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      if (response.ok) {
        console.log("Old image deleted successfully");
      } else {
        console.warn("Failed to delete old image, but continuing...");
      }
    } catch (error) {
      console.warn("Error deleting old image, but continuing...", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.title ||
      !formData.excerpt ||
      !formData.text ||
      !formData.category ||
      !formData.date
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      let imageData = null;
      let oldImagePublicId = null;

      // Upload new image if selected
      if (imageFile) {
        setUploadProgress(30);
        imageData = await uploadImage(imageFile);
        setUploadProgress(70);

        // Store old image public ID for deletion
        oldImagePublicId = formData.imagePublicId;
      }

      // Prepare update data
      const updateData = {
        title: formData.title,
        excerpt: formData.excerpt,
        text: formData.text,
        category: formData.category,
        date: formData.date,
        ...(imageData
          ? {
              image: imageData.image,
              imagePublicId: imageData.imagePublicId,
            }
          : {
              image: formData.image,
              imagePublicId: formData.imagePublicId,
            }),
      };

      console.log("Sending update data:", updateData);

      // Update news
      const newsResponse = await fetch(`/api/news/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      setUploadProgress(100);

      console.log("Update response status:", newsResponse.status);

      if (newsResponse.ok) {
        // Delete old image after successful update
        if (oldImagePublicId && imageData) {
          await deleteOldImage(oldImagePublicId);
        }

        alert("News updated successfully!");
        router.push("/admin/dashboard");
      } else {
        const errorText = await newsResponse.text();
        console.error("Update failed:", errorText);

        let errorMessage = "Failed to update news";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error updating news:", error);
      alert(
        `Error: ${
          error instanceof Error ? error.message : "Failed to update news"
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

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

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
              Edit News Article
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
                News Image
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
                      />
                    </label>
                  </div>
                )}

                {/* Status Indicators */}
                {formData.image && !imageFile && (
                  <div className="p-2 bg-green-50 border border-green-200 rounded text-center">
                    <p className="text-sm text-green-700">
                      Current image will be kept
                    </p>
                    <p className="text-xs text-green-600">
                      Upload a new image to replace it
                    </p>
                  </div>
                )}

                {imageFile && (
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded text-center">
                    <p className="text-sm text-blue-700">
                      📸 New image selected - will replace current image
                    </p>
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
                {isLoading ? "Updating..." : "Update News"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

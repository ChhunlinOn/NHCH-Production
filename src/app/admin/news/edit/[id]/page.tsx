"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X, Plus } from "lucide-react";
import Image from "next/image";

interface NewsImageData {
  id?: number;
  imageUrl: string;
  publicId?: string;
  caption?: string;
  displayOrder?: number;
}

interface News {
  id: number;
  title: string;
  excerpt: string;
  text: string;
  category: string;
  date: string;
  newsImages: NewsImageData[];
}

export default function EditNewsPage() {
  const [formData, setFormData] = useState<Omit<News, "id">>({
    title: "",
    excerpt: "",
    text: "",
    category: "",
    date: "",
    newsImages: [],
  });

  const [existingImages, setExistingImages] = useState<NewsImageData[]>([]);
  const [newImages, setNewImages] = useState<NewsImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingImages, setUploadingImages] = useState<string[]>([]);

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news/${id}`);

        if (response.ok) {
          const newsData: News = await response.json();
          console.log("Fetched news data:", newsData);

          setFormData({
            title: newsData.title,
            excerpt: newsData.excerpt,
            text: newsData.text,
            category: newsData.category,
            date: newsData.date,
            newsImages: newsData.newsImages,
          });

          setExistingImages(newsData.newsImages || []);
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

  // Upload single image function
  const uploadImage = async (file: File): Promise<NewsImageData | null> => {
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
          imageUrl: data.imageUrl,
          publicId: data.publicId,
          caption: "",
        };
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Handle multiple image selection for new images
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Validate files
    const validFiles = Array.from(files).filter((file) => {
      if (!file.type.startsWith("image/")) {
        alert(`File ${file.name} is not an image`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`Image ${file.name} must be less than 5MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Add to uploading state
    setUploadingImages((prev) => [...prev, ...validFiles.map((f) => f.name)]);

    try {
      // Upload images sequentially
      for (const file of validFiles) {
        setUploadProgress(30);
        const imageData = await uploadImage(file);
        setUploadProgress(70);

        if (imageData) {
          setNewImages((prev) => [...prev, imageData]);
        }
      }
      setUploadProgress(100);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Some images failed to upload");
    } finally {
      setUploadingImages([]);
      setUploadProgress(0);

      // Reset file input
      const fileInput = document.getElementById(
        "new-images"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateImageCaption = (
    type: "existing" | "new",
    index: number,
    caption: string
  ) => {
    if (type === "existing") {
      setExistingImages((prev) =>
        prev.map((img, i) => (i === index ? { ...img, caption } : img))
      );
    } else {
      setNewImages((prev) =>
        prev.map((img, i) => (i === index ? { ...img, caption } : img))
      );
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

    // Validate at least one image
    const allImages = [...existingImages, ...newImages];
    if (allImages.length === 0) {
      alert("Please keep at least one image for the news article");
      return;
    }

    setIsLoading(true);

    try {
      // Prepare update data
      const updateData = {
        title: formData.title,
        excerpt: formData.excerpt,
        text: formData.text,
        category: formData.category,
        date: formData.date,
        images: allImages,
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

      console.log("Update response status:", newsResponse.status);

      if (newsResponse.ok) {
        alert(`News updated successfully with ${allImages.length} images!`);
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

  const totalImages = existingImages.length + newImages.length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 mt-20">
            <Link href="/admin/dashboard?section=news">
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
            {/* Multiple Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                News Images ({totalImages} total)
              </label>
              <div className="space-y-6">
                {/* New Image Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop new images or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Multiple images supported • JPG, PNG, WEBP • Max 5MB each
                  </p>
                  <label htmlFor="new-images" className="cursor-pointer">
                    <span className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Images
                    </span>
                    <input
                      type="file"
                      id="new-images"
                      name="new-images"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Uploading Indicator */}
                {uploadingImages.length > 0 && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700 font-medium mb-2">
                      Uploading {uploadingImages.length} image(s)...
                    </p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      {uploadingImages.map((filename, index) => (
                        <li key={index}>• {filename}</li>
                      ))}
                    </ul>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Existing Images */}
                {existingImages.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700">
                      Current Images ({existingImages.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {existingImages.map((image, index) => (
                        <div
                          key={image.id || index}
                          className="border rounded-lg p-4 space-y-3"
                        >
                          <div className="relative">
                            <Image
                              src={image.imageUrl}
                              alt={`Existing image ${index + 1}`}
                              width={200}
                              height={150}
                              className="w-full h-40 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeExistingImage(index)}
                              className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <div className="absolute top-2 left-2 px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded">
                              {index + 1}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Caption
                            </label>
                            <input
                              type="text"
                              value={image.caption || ""}
                              onChange={(e) =>
                                updateImageCaption(
                                  "existing",
                                  index,
                                  e.target.value
                                )
                              }
                              placeholder="Add image caption..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images */}
                {newImages.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700">
                      New Images ({newImages.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {newImages.map((image, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 space-y-3 border-green-200 bg-green-50"
                        >
                          <div className="relative">
                            <Image
                              src={image.imageUrl}
                              alt={`New image ${index + 1}`}
                              width={200}
                              height={150}
                              className="w-full h-40 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeNewImage(index)}
                              className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <div className="absolute top-2 left-2 px-2 py-1 bg-green-600 text-white text-xs rounded">
                              New
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Caption
                            </label>
                            <input
                              type="text"
                              value={image.caption || ""}
                              onChange={(e) =>
                                updateImageCaption("new", index, e.target.value)
                              }
                              placeholder="Add image caption..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Other form fields remain the same */}
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
              <Link href="/admin/dashboard?section=news">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                disabled={isLoading || totalImages === 0}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading
                  ? "Updating..."
                  : `Update News (${totalImages} images)`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

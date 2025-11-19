"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X, Plus } from "lucide-react";
import Image from "next/image";

interface NewsImageData {
  imageUrl: string;
  publicId?: string;
  caption?: string;
}

export default function CreateNewsPage() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    text: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [images, setImages] = useState<NewsImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingImages, setUploadingImages] = useState<string[]>([]);

  const router = useRouter();

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

  // Handle multiple image selection
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
          setImages((prev) => [...prev, imageData]);
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
      const fileInput = document.getElementById("images") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateImageCaption = (index: number, caption: string) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, caption } : img))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    // Validate at least one image
    if (images.length === 0) {
      alert("Please upload at least one image for the news article");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Creating news with data:", {
        ...formData,
        images: images,
      });

      const newsResponse = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          images: images,
        }),
      });

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

      alert("News created successfully with " + images.length + " images!");
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
          <div className="flex items-center space-x-4 mt-20">
            <Link href="/admin/dashboard?section=news">
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
            {/* Multiple Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                News Images * ({images.length} uploaded)
              </label>
              <div className="space-y-4">
                {/* Image Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop images or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Multiple images supported • JPG, PNG, WEBP • Max 5MB each
                  </p>
                  <label htmlFor="images" className="cursor-pointer">
                    <span className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <Plus className="w-4 h-4 mr-2" />
                      Select Images
                    </span>
                    <input
                      type="file"
                      id="images"
                      name="images"
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

                {/* Uploaded Images Preview */}
                {images.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700">
                      Uploaded Images Preview
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 space-y-3"
                        >
                          <div className="relative">
                            <Image
                              src={image.imageUrl}
                              alt={`Preview ${index + 1}`}
                              width={300}
                              height={200}
                              className="w-full h-48 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
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
                              Caption (optional)
                            </label>
                            <input
                              type="text"
                              value={image.caption || ""}
                              onChange={(e) =>
                                updateImageCaption(index, e.target.value)
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
                disabled={isLoading || images.length === 0}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading
                  ? "Creating..."
                  : `Create News (${images.length} images)`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   Plus,
//   Trash2,
//   Download,
//   Eye,
//   Upload,
//   X,
// } from "lucide-react";
// import Image from "next/image";

// interface Photo {
//   id: number;
//   imageUrl: string;
//   publicId: string;
//   description: string | null;
//   createdAt: string;
//   albumId: number;
//   uploadedBy: number;
// }

// interface Album {
//   id: number;
//   title: string;
//   description: string | null;
//   category: string | null;
// }

// interface UploadFile {
//   file: File;
//   previewUrl: string;
//   uploadProgress: number;
//   status: "pending" | "uploading" | "success" | "error";
//   error?: string;
// }

// export default function AlbumPhotos() {
//   const [album, setAlbum] = useState<Album | null>(null);
//   const [photos, setPhotos] = useState<Photo[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUploading, setIsUploading] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState<UploadFile[]>([]);
//   const [description, setDescription] = useState("");
//   const [viewPhoto, setViewPhoto] = useState<Photo | null>(null);
//   const router = useRouter();
//   const params = useParams();

//   useEffect(() => {
//     fetchAlbumAndPhotos();
//   }, [params.id]);

//   const fetchAlbumAndPhotos = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const albumId = params.id;

//       const albumResponse = await fetch(`/api/albums/${albumId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (albumResponse.ok) {
//         const albumData = await albumResponse.json();
//         setAlbum(albumData);
//         setPhotos(albumData.photos || []);
//       } else {
//         alert("Failed to fetch album");
//         router.push("/admin/dashboard");
//       }
//     } catch (error) {
//       console.error("Error fetching album:", error);
//       alert("Error fetching album");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;

//     const newFiles: UploadFile[] = [];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];

//       // Check if file is an image
//       if (!file.type.startsWith("image/")) {
//         alert(
//           `"${file.name}" is not an image file. Please select image files only.`
//         );
//         continue;
//       }

//       // Check file size (max 10MB)
//       if (file.size > 10 * 1024 * 1024) {
//         alert(
//           `"${file.name}" is too large. Please select images smaller than 10MB`
//         );
//         continue;
//       }

//       // Create preview
//       const previewUrl = URL.createObjectURL(file);
//       newFiles.push({
//         file,
//         previewUrl,
//         uploadProgress: 0,
//         status: "pending",
//       });
//     }

//     setSelectedFiles((prev) => [...prev, ...newFiles]);
//   };

//   const removeSelectedFile = (index: number) => {
//     setSelectedFiles((prev) => {
//       const newFiles = [...prev];
//       URL.revokeObjectURL(newFiles[index].previewUrl);
//       newFiles.splice(index, 1);
//       return newFiles;
//     });
//   };

//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (selectedFiles.length === 0) {
//       alert("Please select files to upload");
//       return;
//     }

//     setIsUploading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();

//       // Add all files
//       selectedFiles.forEach((uploadFile) => {
//         formData.append("files", uploadFile.file);
//       });

//       // Add description
//       formData.append("description", description);

//       const response = await fetch(`/api/albums/${params.id}/photos`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         const result = await response.json();
//         // Refresh photos list
//         await fetchAlbumAndPhotos();

//         // Clear selected files and description
//         selectedFiles.forEach((file) => URL.revokeObjectURL(file.previewUrl));
//         setSelectedFiles([]);
//         setDescription("");

//         // Reset file input
//         const fileInput = document.getElementById("files") as HTMLInputElement;
//         if (fileInput) fileInput.value = "";

//         alert(`Success! ${result.message}`);
//       } else {
//         const errorData = await response.json();
//         alert(`Error: ${errorData.error || "Failed to upload photos"}`);
//       }
//     } catch (error) {
//       console.error("Error uploading photos:", error);
//       alert("Error uploading photos. Check console for details.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleDeletePhoto = async (photoId: number) => {
//     if (!confirm("Are you sure you want to delete this photo?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`/api/photos/${photoId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.ok) {
//         setPhotos(photos.filter((photo) => photo.id !== photoId));
//         alert("Photo deleted successfully!");
//       } else {
//         const errorData = await response.json();
//         alert(`Error: ${errorData.error || "Failed to delete photo"}`);
//       }
//     } catch (error) {
//       console.error("Error deleting photo:", error);
//       alert("Error deleting photo. Check console for details.");
//     }
//   };

//   const downloadImage = async (imageUrl: string, filename: string) => {
//     try {
//       const response = await fetch(imageUrl);
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading image:", error);
//       alert("Error downloading image");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
//       </div>
//     );
//   }

//   if (!album) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             Album Not Found
//           </h2>
//           <Link href="/admin/dashboard">
//             <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
//               Back to Dashboard
//             </button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 mt-16">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Header */}
//         <div className="mb-8">
//           <Link
//             href="/admin/dashboard"
//             className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
//           >
//             <ArrowLeft className="w-4 h-4 mr-1" />
//             Back to Dashboard
//           </Link>
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">
//                 {album.title}
//               </h1>
//               {album.description && (
//                 <p className="text-gray-600 mt-2">{album.description}</p>
//               )}
//               {album.category && (
//                 <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
//                   {album.category}
//                 </span>
//               )}
//               <p className="text-gray-500 mt-2">
//                 {photos.length} photo{photos.length !== 1 ? "s" : ""}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Upload Section */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
//               <h2 className="text-xl font-semibold mb-4">Upload Photos</h2>

//               <form onSubmit={handleUpload} className="space-y-4">
//                 {/* File Input */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Select Photos *
//                   </label>
//                   <input
//                     id="files"
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={handleFileSelect}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     required
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     Hold Ctrl/Cmd to select multiple files
//                   </p>
//                 </div>

//                 {/* Selected Files Preview */}
//                 {selectedFiles.length > 0 && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Selected Files ({selectedFiles.length})
//                     </label>
//                     <div className="space-y-2 max-h-48 overflow-y-auto">
//                       {selectedFiles.map((uploadFile, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center space-x-2 p-2 border rounded-md bg-gray-50"
//                         >
//                           <div className="flex-shrink-0 w-10 h-10 relative">
//                             <Image
//                               src={uploadFile.previewUrl}
//                               alt={`Preview ${index + 1}`}
//                               className="w-10 h-10 object-cover rounded border"
//                               width={40}
//                               height={40}
//                             />
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-gray-900 truncate">
//                               {uploadFile.file.name}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               {(uploadFile.file.size / (1024 * 1024)).toFixed(
//                                 2
//                               )}{" "}
//                               MB
//                             </p>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeSelectedFile(index)}
//                             className="flex-shrink-0 p-1 text-red-600 hover:text-red-800"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Description */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Description (Optional)
//                   </label>
//                   <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     rows={3}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     placeholder="Enter photo description (applies to all uploaded photos)..."
//                   />
//                 </div>

//                 {/* Upload Button */}
//                 <button
//                   type="submit"
//                   disabled={isUploading || selectedFiles.length === 0}
//                   className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   {isUploading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Uploading...
//                     </>
//                   ) : (
//                     <>
//                       <Upload className="w-4 h-4 mr-2" />
//                       Upload{" "}
//                       {selectedFiles.length > 1
//                         ? `${selectedFiles.length} Photos`
//                         : "Photo"}
//                     </>
//                   )}
//                 </button>
//               </form>

//               {/* Tips */}
//               <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//                 <h3 className="text-sm font-medium text-blue-800 mb-2">
//                   Tips:
//                 </h3>
//                 <ul className="text-xs text-blue-700 space-y-1">
//                   <li>• Select multiple images using Ctrl/Cmd + Click</li>
//                   <li>• Supported formats: JPG, PNG, WebP, GIF</li>
//                   <li>• Max file size: 10MB per image</li>
//                   <li>• Recommended ratio: 4:3 or 16:9</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Photos Grid */}
//           <div className="lg:col-span-3">
//             {photos.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {photos.map((photo) => (
//                   <div
//                     key={photo.id}
//                     className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//                   >
//                     {/* Photo */}
//                     <div className="aspect-square bg-gray-200 relative group">
//                       <Image
//                         src={photo.imageUrl}
//                         alt={photo.description || `Photo ${photo.id}`}
//                         className="w-full h-full object-cover cursor-pointer"
//                         onClick={() => setViewPhoto(photo)}
//                         width={400}
//                         height={400}
//                         placeholder="blur"
//                         blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9SQHLJwq8qHWUcbPyf/9k="
//                       />

//                       {/* Overlay Actions */}
//                       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => setViewPhoto(photo)}
//                             className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
//                             title="View Photo"
//                           >
//                             <Eye className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() =>
//                               downloadImage(
//                                 photo.imageUrl,
//                                 `photo-${photo.id}.jpg`
//                               )
//                             }
//                             className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
//                             title="Download Photo"
//                           >
//                             <Download className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => handleDeletePhoto(photo.id)}
//                             className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
//                             title="Delete Photo"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Photo Info */}
//                     <div className="p-4">
//                       {photo.description && (
//                         <p className="text-gray-700 text-sm mb-2 line-clamp-2">
//                           {photo.description}
//                         </p>
//                       )}
//                       <div className="flex justify-between items-center text-xs text-gray-500">
//                         <span>
//                           {new Date(photo.createdAt).toLocaleDateString()}
//                         </span>
//                         <span>
//                           {new Date(photo.createdAt).toLocaleTimeString()}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12 bg-white rounded-lg shadow">
//                 <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                   <Plus className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   No Photos Yet
//                 </h3>
//                 <p className="text-gray-500 mb-6">
//                   Upload the first photos to this album.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Photo View Modal */}
//       {viewPhoto && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
//           <div className="max-w-4xl max-h-full">
//             <div className="relative">
//               <Image
//                 src={viewPhoto.imageUrl}
//                 alt={viewPhoto.description || `Photo ${viewPhoto.id}`}
//                 className="max-w-full max-h-[80vh] object-contain"
//                 width={1200}
//                 height={800}
//               />

//               {/* Close Button */}
//               <button
//                 onClick={() => setViewPhoto(null)}
//                 className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>

//               {/* Photo Info */}
//               <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
//                 {viewPhoto.description && (
//                   <p className="text-sm mb-2">{viewPhoto.description}</p>
//                 )}
//                 <div className="flex justify-between items-center text-xs text-gray-300">
//                   <span>
//                     Uploaded:{" "}
//                     {new Date(viewPhoto.createdAt).toLocaleDateString()}
//                   </span>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() =>
//                         downloadImage(
//                           viewPhoto.imageUrl,
//                           `photo-${viewPhoto.id}.jpg`
//                         )
//                       }
//                       className="flex items-center hover:text-white transition-colors"
//                     >
//                       <Download className="w-3 h-3 mr-1" />
//                       Download
//                     </button>
//                     <button
//                       onClick={() => handleDeletePhoto(viewPhoto.id)}
//                       className="flex items-center text-red-300 hover:text-red-400 transition-colors"
//                     >
//                       <Trash2 className="w-3 h-3 mr-1" />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Download,
  Eye,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";

interface Photo {
  id: number;
  imageUrl: string;
  publicId: string;
  description: string | null;
  createdAt: string;
  albumId: number;
  uploadedBy: number;
}

interface Album {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
}

interface UploadFile {
  file: File;
  previewUrl: string;
  uploadProgress: number;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
}

export default function AlbumPhotos() {
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<UploadFile[]>([]);
  const [description, setDescription] = useState("");
  const [viewPhoto, setViewPhoto] = useState<Photo | null>(null);
  const router = useRouter();
  const params = useParams();

  const fetchAlbumAndPhotos = useCallback(async () => {
    try {
      const albumId = params.id;

      const albumResponse = await fetch(`/api/albums/${albumId}`);

      if (albumResponse.ok) {
        const albumData = await albumResponse.json();
        setAlbum(albumData);
        setPhotos(albumData.photos || []);
      } else {
        alert("Failed to fetch album");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error("Error fetching album:", error);
      alert("Error fetching album");
    } finally {
      setIsLoading(false);
    }
  }, [params.id, router]);

  useEffect(() => {
    fetchAlbumAndPhotos();
  }, [fetchAlbumAndPhotos]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: UploadFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        alert(
          `"${file.name}" is not an image file. Please select image files only.`
        );
        continue;
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(
          `"${file.name}" is too large. Please select images smaller than 10MB`
        );
        continue;
      }

      // Create preview
      const previewUrl = URL.createObjectURL(file);
      newFiles.push({
        file,
        previewUrl,
        uploadProgress: 0,
        status: "pending",
      });
    }

    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].previewUrl);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Please select files to upload");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();

      // Add all files
      selectedFiles.forEach((uploadFile) => {
        formData.append("files", uploadFile.file);
      });

      // Add description
      formData.append("description", description);

      const response = await fetch(`/api/albums/${params.id}/photos`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        // Refresh photos list
        await fetchAlbumAndPhotos();

        // Clear selected files and description
        selectedFiles.forEach((file) => URL.revokeObjectURL(file.previewUrl));
        setSelectedFiles([]);
        setDescription("");

        // Reset file input
        const fileInput = document.getElementById("files") as HTMLInputElement;
        if (fileInput) fileInput.value = "";

        alert(`Success! ${result.message}`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to upload photos"}`);
      }
    } catch (error) {
      console.error("Error uploading photos:", error);
      alert("Error uploading photos. Check console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePhoto = async (photoId: number) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    try {
      const response = await fetch(`/api/photos/${photoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPhotos(photos.filter((photo) => photo.id !== photoId));
        alert("Photo deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to delete photo"}`);
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Error deleting photo. Check console for details.");
    }
  };

  const downloadImage = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Error downloading image");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Album Not Found
          </h2>
          <Link href="/admin/dashboard">
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {album.title}
              </h1>
              {album.description && (
                <p className="text-gray-600 mt-2">{album.description}</p>
              )}
              {album.category && (
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {album.category}
                </span>
              )}
              <p className="text-gray-500 mt-2">
                {photos.length} photo{photos.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Upload Photos</h2>

              <form onSubmit={handleUpload} className="space-y-4">
                {/* File Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Photos *
                  </label>
                  <input
                    id="files"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Hold Ctrl/Cmd to select multiple files
                  </p>
                </div>

                {/* Selected Files Preview */}
                {selectedFiles.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selected Files ({selectedFiles.length})
                    </label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedFiles.map((uploadFile, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-2 border rounded-md bg-gray-50"
                        >
                          <div className="flex-shrink-0 w-10 h-10 relative">
                            <Image
                              src={uploadFile.previewUrl}
                              alt={`Preview ${index + 1}`}
                              className="w-10 h-10 object-cover rounded border"
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {uploadFile.file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(uploadFile.file.size / (1024 * 1024)).toFixed(
                                2
                              )}{" "}
                              MB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSelectedFile(index)}
                            className="flex-shrink-0 p-1 text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter photo description (applies to all uploaded photos)..."
                  />
                </div>

                {/* Upload Button */}
                <button
                  type="submit"
                  disabled={isUploading || selectedFiles.length === 0}
                  className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload{" "}
                      {selectedFiles.length > 1
                        ? `${selectedFiles.length} Photos`
                        : "Photo"}
                    </>
                  )}
                </button>
              </form>

              {/* Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-2">
                  Tips:
                </h3>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Select multiple images using Ctrl/Cmd + Click</li>
                  <li>• Supported formats: JPG, PNG, WebP, GIF</li>
                  <li>• Max file size: 10MB per image</li>
                  <li>• Recommended ratio: 4:3 or 16:9</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Photos Grid */}
          <div className="lg:col-span-3">
            {photos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Photo */}
                    <div className="aspect-square bg-gray-200 relative group">
                      <Image
                        src={photo.imageUrl}
                        alt={photo.description || `Photo ${photo.id}`}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setViewPhoto(photo)}
                        width={400}
                        height={400}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9SQHLJwq8qHWUcbPyf/9k="
                      />

                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setViewPhoto(photo)}
                            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                            title="View Photo"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              downloadImage(
                                photo.imageUrl,
                                `photo-${photo.id}.jpg`
                              )
                            }
                            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                            title="Download Photo"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Photo Info */}
                    <div className="p-4">
                      {photo.description && (
                        <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                          {photo.description}
                        </p>
                      )}
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>
                          {new Date(photo.createdAt).toLocaleDateString()}
                        </span>
                        <span>
                          {new Date(photo.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Photos Yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Upload the first photos to this album.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo View Modal */}
      {viewPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl max-h-full">
            <div className="relative">
              <Image
                src={viewPhoto.imageUrl}
                alt={viewPhoto.description || `Photo ${viewPhoto.id}`}
                className="max-w-full max-h-[80vh] object-contain"
                width={1200}
                height={800}
              />

              {/* Close Button */}
              <button
                onClick={() => setViewPhoto(null)}
                className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Photo Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                {viewPhoto.description && (
                  <p className="text-sm mb-2">{viewPhoto.description}</p>
                )}
                <div className="flex justify-between items-center text-xs text-gray-300">
                  <span>
                    Uploaded:{" "}
                    {new Date(viewPhoto.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        downloadImage(
                          viewPhoto.imageUrl,
                          `photo-${viewPhoto.id}.jpg`
                        )
                      }
                      className="flex items-center hover:text-white transition-colors"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </button>
                    <button
                      onClick={() => handleDeletePhoto(viewPhoto.id)}
                      className="flex items-center text-red-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Newspaper,
  Users,
  LogOut,
  Menu,
  X,
  Edit,
  Trash2,
  Plus,
  House,
  MailPlus,
  Copy,
  Video,
  Image as ImageIcon,
  Loader2,
  FileText,
} from "lucide-react";
import Image from "next/image";
interface News {
  id: number;
  image: string;
  title: string;
  text: string;
  date: string;
  category: string;
  excerpt: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  isFounder: boolean;
  displayOrder: number;
  isActive: boolean;
  created_at: string;
  updated_at: string;
}

interface NewsletterSubscriber {
  id: number;
  email: string;
  isActive: boolean;
  created_at: string;
}

interface ShortVideo {
  id: number;
  title: string;
  video: string | null;
  videoPublicId: string | null;
  created_at: string;
  updated_at: string;
}

interface Album {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  coverImage: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  photos: Photo[];
  _count: {
    photos: number;
  };
}

interface Photo {
  id: number;
  imageUrl: string;
  publicId: string;
  description: string | null;
  createdAt: string;
  albumId: number;
  uploadedBy: number;
}

interface ReportPdf {
  id: number;
  title: string;
  cover_url: string | null;
  pdf_url: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

type ActiveSection =
  | "news"
  | "users"
  | "our-family"
  | "mail-subscribe"
  | "short-videos"
  | "albums"
  | "report-pdfs";

function AdminDashboardInner() {
  const [news, setNews] = useState<News[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [shortVideos, setShortVideos] = useState<ShortVideo[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [reportPdfs, setReportPdfs] = useState<ReportPdf[]>([]);
  const [activeSection, setActiveSection] = useState<ActiveSection>("news");
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Set active section from query param
  useEffect(() => {
    const section = searchParams.get("section") as ActiveSection;
    if (
      section &&
      [
        "news",
        "users",
        "our-family",
        "mail-subscribe",
        "short-videos",
        "albums",
        "report-pdfs",
      ].includes(section)
    ) {
      setActiveSection(section);
    }
  }, [searchParams]);

  // Navigation items
  const navigationItems = [
    {
      id: "news" as ActiveSection,
      name: "News Management",
      icon: Newspaper,
      allowedRoles: ["admin", "editor"],
    },
    {
      id: "users" as ActiveSection,
      name: "User Management",
      icon: Users,
      allowedRoles: ["admin"],
    },
    {
      id: "our-family" as ActiveSection,
      name: "Our Family",
      icon: House,
      allowedRoles: ["admin", "editor"],
    },
    {
      id: "mail-subscribe" as ActiveSection,
      name: "Mail Subscribe",
      icon: MailPlus,
      allowedRoles: ["admin", "editor"],
    },
    {
      id: "short-videos" as ActiveSection,
      name: "Short Videos",
      icon: Video,
      allowedRoles: ["admin", "editor"],
    },
    {
      id: "albums" as ActiveSection,
      name: "Albums",
      icon: ImageIcon,
      allowedRoles: ["admin", "editor"],
    },
    {
      id: "report-pdfs" as ActiveSection,
      name: "Report PDFs",
      icon: FileText,
      allowedRoles: ["admin", "editor"],
    },
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/users/me");
        if (res.ok) {
          const me = await res.json();
          setCurrentUser(me);
        } else {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      }
    };
    load();
  }, [router]);

  const checkAuth = useCallback(() => {
    if (!currentUser) return false;
    if (currentUser.role !== "admin" && currentUser.role !== "editor") {
      router.push("/admin/login");
      return false;
    }
    return true;
  }, [currentUser, router]);

  const fetchData = useCallback(async () => {
    try {
      const newsResponse = await fetch("/api/news?all=true");
      if (newsResponse.ok) {
        const newsData = await newsResponse.json();
        setNews(newsData.news || []);
      }

      const teamResponse = await fetch("/api/team?all=true");
      if (teamResponse.ok) {
        const teamData = await teamResponse.json();
        setTeamMembers(teamData.team || []);
      }

      const subscribersResponse = await fetch("/api/newsletter");
      if (subscribersResponse.ok) {
        const subscribersData = await subscribersResponse.json();
        setSubscribers(subscribersData.subscribers || []);
      }

      const shortVideosResponse = await fetch("/api/short-videos?all=true");
      if (shortVideosResponse.ok) {
        const shortVideosData = await shortVideosResponse.json();
        setShortVideos(shortVideosData.shortVideos || []);
      }

      if (currentUser?.role === "admin") {
        const usersResponse = await fetch("/api/users");
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData || []);
        }
      }

      // FIXED: Fetch albums - remove .albums since API returns array directly
      const albumsResponse = await fetch("/api/albums");
      if (albumsResponse.ok) {
        const albumsData = await albumsResponse.json();
        console.log("Albums API response:", albumsData); // Debug log
        setAlbums(albumsData || []); // FIXED: Use albumsData directly, not albumsData.albums
      } else {
        console.error("Failed to fetch albums:", albumsResponse.status);
      }

      const reportPdfsResponse = await fetch("/api/report-pdfs");
      if (reportPdfsResponse.ok) {
        const reportPdfsData = await reportPdfsResponse.json();
        setReportPdfs(reportPdfsData || []);
      } else {
        console.error(
          "Failed to fetch report PDFs:",
          reportPdfsResponse.status
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("/api/newsletter");

      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers || []);
      } else {
        console.error("Failed to fetch subscribers");
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  useEffect(() => {
    if (checkAuth()) {
      fetchData();
    }
  }, [checkAuth, fetchData]);

  useEffect(() => {
    console.log("Albums state updated:", albums); // Debug log
  }, [albums]);

  useEffect(() => {
    if (activeSection === "mail-subscribe" && checkAuth()) {
      fetchSubscribers();
    }
  }, [activeSection, checkAuth]);

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple calls
    setIsLoggingOut(true);
    try {
      await fetch("/api/users/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
    }
  };

  const handleDeleteNews = async (id: number) => {
    if (!confirm("Are you sure you want to delete this news article?")) return;

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNews(news.filter((item) => item.id !== id));
        alert("News deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to delete news"}`);
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Error deleting news. Check console for details.");
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers(users.filter((item) => item.id !== id));
        alert("User deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to delete user"}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user. Check console for details.");
    }
  };

  const handleDeleteTeamMember = async (id: number) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      const response = await fetch(`/api/team/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTeamMembers(teamMembers.filter((item) => item.id !== id));
        alert("Team member deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to delete team member"}`);
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
      alert("Error deleting team member. Check console for details.");
    }
  };

  const handleDeleteSubscriber = async (email: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;

    try {
      const response = await fetch(
        `/api/newsletter/${encodeURIComponent(email)}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setSubscribers(subscribers.filter((item) => item.email !== email));
        alert("Subscriber deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to delete subscriber"}`);
      }
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      alert("Error deleting subscriber. Check console for details.");
    }
  };

  const handleDeleteShortVideo = async (id: number) => {
    if (!confirm("Are you sure you want to delete this short video?")) return;

    try {
      const response = await fetch(`/api/short-videos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setShortVideos(shortVideos.filter((item) => item.id !== id));
        alert("Short video deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to delete short video"}`);
      }
    } catch (error) {
      console.error("Error deleting short video:", error);
      alert("Error deleting short video. Check console for details.");
    }
  };

  const handleDeleteAlbum = async (id: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this album? All photos in this album will also be deleted."
      )
    )
      return;

    try {
      const response = await fetch(`/api/albums/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAlbums(albums.filter((item) => item.id !== id));
        alert("Album deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to delete album"}`);
      }
    } catch (error) {
      console.error("Error deleting album:", error);
      alert("Error deleting album. Check console for details.");
    }
  };

  const handleDeleteReportPdf = async (id: number) => {
    if (!confirm("Are you sure you want to delete this report PDF?")) return;

    try {
      const response = await fetch(`/api/report-pdfs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setReportPdfs(reportPdfs.filter((item) => item.id !== id));
        alert("Report PDF deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to delete report PDF"}`);
      }
    } catch (error) {
      console.error("Error deleting report PDF:", error);
      alert("Error deleting report PDF. Check console for details.");
    }
  };

  const copyAllEmails = () => {
    const emails = subscribers.map((s) => s.email).join(", ");
    navigator.clipboard
      .writeText(emails)
      .then(() => {
        alert("All emails copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy emails to clipboard");
      });
  };

  const copyEmail = (email: string) => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        alert("Email copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy email to clipboard");
      });
  };

  const filteredNavigation = navigationItems.filter((item) =>
    item.allowedRoles.includes(currentUser?.role)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex mt-20 sticky top-0 bg-white z-10">
      <div
        className={`
         fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:inset-0
      `}
      >
        <div className="flex items-center justify-between p-4 border-b ">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              if ((item as { href?: string }).href) {
                return (
                  <Link
                    key={item.id}
                    href={(item as unknown as { href: string }).href}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors text-gray-600 hover:bg-gray-100`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              }
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-green-100 text-green-700 border-l-4 border-green-500"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-medium text-gray-900">{currentUser?.name}</p>
              <p className="text-sm text-gray-600 capitalize">
                {currentUser?.role}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {navigationItems.find((item) => item.id === activeSection)?.name}
            </h2>
            <div className="w-9"></div> {/* Spacer for balance */}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {/* News Management Section */}
          {activeSection === "news" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  News Management
                </h2>
                <Link href="/admin/news/create">
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Create News
                  </button>
                </Link>
              </div>

              {/* News Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {news.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 line-clamp-2 max-w-xs">
                              {item.title}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(item.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Link href={`/admin/news/edit/${item.id}`}>
                              <button
                                className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                                title="Edit News"
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDeleteNews(item.id)}
                              className="flex items-center px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                              title="Delete News"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {news.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No news articles found.</p>
                    <Link
                      href="/admin/news/create"
                      className="inline-block mt-2"
                    >
                      <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First News Article
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* User Management Section (Admin only) */}
          {activeSection === "users" && currentUser?.role === "admin" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  User Management
                </h2>
                <Link href="/admin/users/create">
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Create User
                  </button>
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user, index) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : user.role === "editor"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Link href={`/admin/users/edit/${user.id}`}>
                              <button
                                className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                                title="Edit User"
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </button>
                            </Link>
                            {user.id !== currentUser?.id && (
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="flex items-center px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                                title="Delete User"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {users.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No users found.</p>
                    <Link
                      href="/admin/users/create"
                      className="inline-block mt-2"
                    >
                      <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First User
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Our Family Section (Team Members) */}
          {activeSection === "our-family" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Our Family Management
                </h2>
                <Link href="/admin/our-family/create">
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Family Member
                  </button>
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {teamMembers.map((member, index) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 line-clamp-2 max-w-xs">
                              {member.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              member.isFounder
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {member.isFounder ? "Founder" : "Team Member"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              member.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {member.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(member.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Link href={`/admin/our-family/edit/${member.id}`}>
                              <button
                                className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                                title="Edit Family Member"
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDeleteTeamMember(member.id)}
                              className="flex items-center px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                              title="Delete Family Member"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {teamMembers.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No family members found.</p>
                    <Link
                      href="/admin/our-family/create"
                      className="inline-block mt-2"
                    >
                      <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Family Member
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mail Subscribe Section */}
          {activeSection === "mail-subscribe" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Newsletter Subscribers
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={copyAllEmails}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All Emails
                  </button>
                  <button
                    onClick={fetchSubscribers}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600">
                      Total subscribers:{" "}
                      <span className="font-bold text-green-600">
                        {subscribers.length}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Last updated: {new Date().toLocaleTimeString()}
                    </p>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {subscribers.map((subscriber, index) => (
                      <div
                        key={subscriber.id}
                        className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-gray-500 w-8">
                            {index + 1}.
                          </span>
                          <span className="font-medium">
                            {subscriber.email}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              subscriber.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {subscriber.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => copyEmail(subscriber.email)}
                            className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                            title="Copy Email"
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteSubscriber(subscriber.email)
                            }
                            className="flex items-center px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                            title="Delete Subscriber"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {subscribers.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No subscribers found.</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Subscribers will appear here when people sign up through
                        the website footer.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Short Videos Section */}
          {activeSection === "short-videos" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Short Videos Management
                </h2>
                <Link href="/admin/short-videos/create">
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Video
                  </button>
                </Link>
              </div>

              {/* Short Videos Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Video
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {shortVideos.map((video, index) => (
                      <tr key={video.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 line-clamp-2 max-w-xs">
                              {video.title}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {video.video ? (
                            <video
                              src={video.video}
                              className="w-20 h-12 object-cover rounded border"
                              preload="metadata"
                            />
                          ) : (
                            <span className="text-gray-400 text-sm">
                              No video
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(video.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Link href={`/admin/short-videos/edit/${video.id}`}>
                              <button
                                className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                                title="Edit Video"
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDeleteShortVideo(video.id)}
                              className="flex items-center px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                              title="Delete Video"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {shortVideos.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No short videos found.</p>
                    <Link
                      href="/admin/short-videos/create"
                      className="inline-block mt-2"
                    >
                      <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Upload Your First Video
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* // Albums Management Section */}
          {activeSection === "albums" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Albums Management ({albums.length})
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => fetchData()}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Refresh
                  </button>
                  <Link href="/admin/albums/create">
                    <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Album
                    </button>
                  </Link>
                </div>
              </div>

              {/* Albums Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {albums.map((album) => (
                  <div
                    key={album.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Album Cover */}
                    <div className="aspect-video bg-gray-200 relative">
                      {album.photos && album.photos.length > 0 ? (
                        <div className="w-full h-full relative">
                          <Image
                            src={album.photos[0].imageUrl}
                            alt={album.title}
                            className="w-full h-full object-cover"
                            width={400}
                            height={300}
                            priority={false}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9SQHLJwq8qHWUcbPyf/9k="
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <Image
                            className="w-8 h-8 text-gray-400"
                            width={32}
                            height={32}
                            alt="No photos"
                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'%3E%3C/path%3E%3C/svg%3E"
                          />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                        {album._count?.photos || 0} photos
                      </div>
                    </div>

                    {/* Album Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                        {album.title}
                      </h3>
                      {album.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {album.description}
                        </p>
                      )}
                      {album.category && (
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-3">
                          {album.category}
                        </span>
                      )}
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>
                          Created:{" "}
                          {new Date(album.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="px-4 pb-4 flex space-x-2">
                      <Link
                        href={`/admin/albums/edit/${album.id}`}
                        className="flex-1"
                      >
                        <button className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                      </Link>
                      <Link
                        href={`/admin/albums/${album.id}/photos`}
                        className="flex-1"
                      >
                        <button className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
                          <Plus className="w-4 h-4 mr-1" />
                          Photos
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteAlbum(album.id)}
                        className="flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {albums.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Image
                      className="w-8 h-8 text-gray-400"
                      width={32}
                      height={32}
                      alt="No albums"
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'%3E%3C/path%3E%3C/svg%3E"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No albums yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Create your first album to start organizing photos.
                  </p>
                  <Link href="/admin/albums/create">
                    <button className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mx-auto">
                      <Plus className="w-5 h-5 mr-2" />
                      Create Your First Album
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
          {/* Report PDFs Section */}
          {activeSection === "report-pdfs" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Report PDFs Management
                </h2>
                <Link href="/admin/reportpdf/create">
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Report PDF
                  </button>
                </Link>
              </div>

              {/* Report PDFs Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Title
                      </th>
                      {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Cover
                      </th> */}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        PDF URL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reportPdfs.map((pdf, index) => (
                      <tr key={pdf.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 line-clamp-2 max-w-xs">
                              {pdf.title}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a
                            href={`/api/report-pdfs/${pdf.id}/view`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View PDF
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(pdf.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Link href={`/admin/reportpdf/edit/${pdf.id}`}>
                              <button
                                className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                                title="Edit Report PDF"
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDeleteReportPdf(pdf.id)}
                              className="flex items-center px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                              title="Delete Report PDF"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {reportPdfs.length === 0 && (
                  <div className="flex flex-col justify-center items-center text-center py-8">
                    <p className="text-gray-500">No report PDFs found.</p>
                    <Link href="/admin/reportpdf/create">
                      <button className="inline-block mt-2 flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Report PDF
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
      }
    >
      <AdminDashboardInner />
    </Suspense>
  );
}

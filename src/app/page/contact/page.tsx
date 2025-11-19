"use client";
import React, { useState } from "react";

// ContactPage.jsx
export default function ContactPage() {
  // State for success and error messages
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  // Handle form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.target as HTMLFormElement); // Extract form data

    // Add access key to the form data
    formData.append("access_key", "cc7b7303-711c-4db0-ae53-db458849051d");

    // Convert form data to an object
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Make a fetch request to Web3Forms API
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json, // Send the form data as JSON
      });

      const result = await response.json(); // Parse the response
      if (result.success) {
        setIsSuccess(true); // Success: Set the success state
        setMessage("Form submitted successfully!");
      } else {
        setIsSuccess(false); // Error: Set the error state
        setMessage("Form submission failed. Please try again.");
      }
    } catch {
      setIsSuccess(false); // Error: Set the error state
      setMessage("An error occurred. Please try again.");
    }
  }

  return (
    <div>
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-green-600 mb-8">CONTACT US</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Reach out to us for more information on how you can contribute,
            volunteer, or partner with us in our mission to create lasting
            impact and positive change.
          </p>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-4 mt-8">
            <a
              href="https://www.facebook.com/nhch.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-md"
              aria-label="Facebook"
            >
              <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@mr.j5982"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-md"
              aria-label="TikTok"
            >
              <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/jek_dot?igsh=MTJxNGk4cW9qM2x5cQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-md"
              aria-label="Instagram"
            >
              <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto py-16 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  className="bg-gray-200 p-4 rounded w-full text-base"
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  className="bg-gray-200 p-4 rounded w-full text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-gray-200 p-4 rounded w-full text-base"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="bg-gray-200 p-4 rounded w-full text-base"
                />
              </div>

              <textarea
                name="message"
                placeholder="Message"
                className="bg-gray-200 p-4 rounded w-full h-48 border border-blue-400 text-base"
              ></textarea>

              <button
                type="submit"
                className="bg-green-600 text-white py-4 px-6 rounded w-full hover:bg-green-700 transition duration-300 font-medium"
              >
                Submit
              </button>
            </form>

            {/* Display success or error message */}
            {message && (
              <div
                className={`mt-4 p-4 rounded ${
                  isSuccess
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {message}
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 h-96 md:h-auto min-h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.4750464093706!2d104.90155577645553!3d11.534571644855302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095197b21fa34b%3A0x77a33e5e11d85958!2sNew%20Hope%20for%20Orphans!5e0!3m2!1sen!2sus!4v1713456789012!5m2!1sen!2sus"
              width="100%"
              height="100%"
              className="border-0 min-h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map showing New Hope Children's Homes location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

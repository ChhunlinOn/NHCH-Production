'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div>Loading editor...</div>
});

export default function TinyMCEPage() {
  const [value, setValue] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [subscribers, setSubscribers] = React.useState<{email: string; created_at: string}[]>([]);
  const [showSubscribers, setShowSubscribers] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/users/me");
        if (res.ok) {
          // User is authenticated, can access the page
        } else {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      }
    };
    load();
  }, [router]);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/newsletter', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers || []);
        setShowSubscribers(true);
      } else {
        setMessage('Failed to fetch subscribers');
      }
    } catch {
      setMessage('Error fetching subscribers');
    }
  };

  const handleSendEmail = async () => {
    if (!subject || !value) {
      setMessage('Please fill in subject and content');
      return;
    }

    if (subscribers.length === 0) {
      setMessage('Please fetch subscribers first');
      return;
    }

    setSending(true);
    setMessage('Sending emails...');

    let sentCount = 0;
    let failedCount = 0;

    // Send to each subscriber one by one
    for (const subscriber of subscribers) {
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: subscriber.email, subject, html: value }),
          credentials: 'include',
        });

        if (response.ok) {
          sentCount++;
          setMessage(`Sending... ${sentCount}/${subscribers.length} sent`);
        } else {
          failedCount++;
          console.error(`Failed to send to ${subscriber.email}`);
        }

        // Small delay between sends to avoid overwhelming the SMTP server
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        failedCount++;
        console.error(`Error sending to ${subscriber.email}:`, error);
      }
    }

    setMessage(`Completed! Sent: ${sentCount}, Failed: ${failedCount}`);
    setSending(false);
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'indent', 'link', 'image'
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
      <h1 className="text-lg md:text-2xl font-bold mt-4 mb-4">ReactQuill Demo</h1>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        style={{ height: '300px' }}
      />
      <div className="mt-14">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={fetchSubscribers}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Show Subscribers ({subscribers.length})
            </button>
            <Link href="/admin/dashboard?section=mail-subscribe">
              <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </Link>
            <button
              onClick={handleSendEmail}
              disabled={sending}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send Email'}
            </button>
          </div>
          {message && (
            <div className="text-sm text-gray-700">{message}</div>
          )}
        </div>
      </div>

      {showSubscribers && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Subscribers ({subscribers.length})</h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {subscribers.map((subscriber, index) => (
                <div key={index} className="px-4 py-3 border-b border-gray-200 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900">{subscriber.email}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(subscriber.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
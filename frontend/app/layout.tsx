import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Asif | MERN Stack Web Developer',
  description:
    'Portfolio of Asif, a MERN Stack Web Developer specializing in React, Node.js, Express, MongoDB, and modern responsive web engineering.',
  keywords: ['MERN Stack', 'React Developer', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Web Developer'],
  authors: [{ name: 'Asif' }],
  creator: 'Asif',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://asifdev.com',
    title: 'Asif | MERN Stack Web Developer',
    description:
      'I build modern, responsive, and scalable web applications using React, Node.js, Express, and MongoDB.',
    siteName: 'Asif Portfolio',
  },
  icons: {
    icon: '/images/profile-placeholder.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#09090b] text-zinc-100 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}

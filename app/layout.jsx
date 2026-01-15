import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdsterraLayoutWrapper from '@/components/ads/AdsterraLayoutWrapper';
import { AdsterraProvider } from '@/hooks/useAdsterra';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LK21 - Ultimate Movie & TV Series Database',
  description: 'Your complete cinema guide with 10,000+ movies and 5,000+ TV series',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-gray-300`}>
        <AdsterraProvider>
          {/* Header dengan banner terintegrasi */}
          <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-gray-800">
            <div className="container mx-auto px-4">
              <Navbar />
            </div>
          </header>

          {/* Main content dengan ads wrapper */}
          <main className="min-h-screen">
            <div className="container mx-auto px-4 py-6">
              {children}
            </div>
            
            {/* Ads Section - RAPI dan SEJAJAR */}
            <AdsterraLayoutWrapper />
          </main>

          {/* Footer */}
          <footer className="bg-gray-900/50 border-t border-gray-800 mt-8">
            <div className="container mx-auto px-4 py-8">
              <Footer />
            </div>
          </footer>

          {/* Social Bar akan muncul otomatis via script */}
        </AdsterraProvider>
      </body>
    </html>
  );
}
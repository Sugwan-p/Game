import './globals.css';

export const metadata = {
  title: 'Seo3Kyung App',
  description: 'App-like Web UI',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-black m-0 p-0">
        <div className="mx-auto w-full max-w-[420px] min-h-screen bg-white px-6 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}

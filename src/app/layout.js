import localFont from "next/font/local";
import "./globals.css";
import Footer from "../components/Header";
import Header from "../components/Footer";
import { AppProvider } from "../components/AppContxt";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="max-w-6xl mx-auto p-10">
          <AppProvider>
            <Toaster />
            <Footer />
            {children}
            <Header />
          </AppProvider>
        </main>
      </body>
    </html>
  );
}

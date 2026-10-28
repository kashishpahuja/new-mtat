import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Header";
import Footer from "../../components/Footer";
import FloatingActions from "../../components/FloatingActions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://mtatindia.in"),

  title: {
    default: "MTAT Technologies | Engineering Precision, Powering Progress",
    template: "%s | MTAT Technologies",
  },

  description:
    "MTAT Technologies Private Limited provides advanced machine tools and industrial technology solutions across metal cutting, metal forming, metrology, and tool-room equipment, backed by sales, service, and spares support.",

  applicationName: "MTAT Technologies",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "MTAT Technologies | Engineering Precision, Powering Progress",
    description:
      "Discover advanced machine tools and industrial technology solutions from MTAT Technologies.",
    url: "https://mtatindia.in",
    siteName: "MTAT Technologies",
    locale: "en_IN",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />

        <FloatingActions />
      </body>
    </html>
  );
}

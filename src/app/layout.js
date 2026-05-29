import Header from "@/components/Library/header";
import "./globals.scss";
import SmoothScroll from "@/components/Utility/SmoothScroll";
import {Roboto} from 'next/font/google';
import Footer from "@/components/Library/footer";

const roboto = Roboto({
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="it-IT">
      <body className={`${roboto.className} antialiased`}>
        <Header />
        <SmoothScroll>{children}</SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}

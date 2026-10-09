

import "./globals.css";
import { Noto_Sans, EB_Garamond } from "next/font/google";
import { cn } from "@/lib/utils";

const ebGaramondHeading = EB_Garamond({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", notoSans.variable, ebGaramondHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        {/* Navbar */}
        {children}
        {/* Footer */}
        </body>
    </html>
  );
}

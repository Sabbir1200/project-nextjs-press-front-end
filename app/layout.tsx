

import "./globals.css";
import { Noto_Sans, EB_Garamond } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";





const ebGaramondHeading = EB_Garamond({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", notoSans.variable, ebGaramondHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
      
      
        
        <Toaster  position="top-right" richColors/>
        {/* Navbar */}
        
        {children}
        {/* Footer */}
        </body>
    </html>
  );
}

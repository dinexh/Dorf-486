import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Smart Village Revolution KLEF",
  description: "Smart Village Revolution KLEF",
};

export default function RootLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}

import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '../contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Smart Village Revolution | KLEF",
  description: "Welcome to the future of village development",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

import ScrollDownButton from "@/components/scroll-down-button";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToasterProvider } from "@/components/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ChatGPT Clone",
    description: "ChatGPT clone using Vercel AI SDK",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ToasterProvider />
                {children}
            </body>
        </html>
    );
}

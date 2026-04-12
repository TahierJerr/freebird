import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "freebird.gg",
    description: "Personal enchanter dashboard for freebird#mwah",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body style={{ fontFamily: "system-ui, -apple-system, sans-serif", margin: 0 }}>
                {children}
            </body>
        </html>
    );
}

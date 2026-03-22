import "../globals.css";

export const metadata = {
  title: "NASMO - Administration",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="dark" suppressHydrationWarning>{children}</body>
    </html>
  );
}

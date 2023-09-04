// import "ui/styles/";
import "@/styles/globals.scss"; // app specific global css

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="testing">{children}</body>
    </html>
  );
}

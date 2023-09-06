// import "ui/styles/";
import "@/styles/globals.scss"; // app specific global css

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Cllgnotes.com</title>
        <meta name="description" content="Cllgnotes.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}

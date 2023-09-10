import "@/styles/globals.scss"; // app specific global css
import { DeviceTypeWrapper } from "@cllgnotes/lib/hooks";
import { ThemeProvider, muiTheme } from "ui";
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="use-credentials"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gabriela&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="fcc">
        <DeviceTypeWrapper>
          <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
        </DeviceTypeWrapper>
      </body>
    </html>
  );
}

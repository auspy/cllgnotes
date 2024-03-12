import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { AuthWrapper } from "@/api/auth/useLogout";
import { ApolloWrapper } from "@/api/graphql/ApolloWrapper";
import "@/styles/globals.scss"; // app specific global css
import { DeviceTypeWrapper } from "@cllgnotes/lib/hooks";
import { ThemeProvider, muiTheme, RecoilWrapper, SessionWrapper } from "ui";
import ToastWrapper from "@/components/ToastWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
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
        <script src="http://localhost:8097"></script>
      </head>
      <body className="fcc">
        <ApolloWrapper>
          <RecoilWrapper>
            <DeviceTypeWrapper>
              <SessionWrapper session={session}>
                <AuthWrapper>
                  <ToastWrapper />
                  <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
                </AuthWrapper>
              </SessionWrapper>
            </DeviceTypeWrapper>
          </RecoilWrapper>
        </ApolloWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

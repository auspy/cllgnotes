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
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Cllgnotes.com",
  description: "Cllgnotes.com",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <Head>
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
      </Head>
      <body className="fcc">
        <ApolloWrapper>
          <RecoilWrapper>
            <DeviceTypeWrapper>
              <SessionWrapper session={session}>
                <AuthWrapper>
                  <ToastWrapper />
                  <ThemeProvider theme={muiTheme}>
                    {children}
                    <Analytics />
                  </ThemeProvider>
                </AuthWrapper>
              </SessionWrapper>
            </DeviceTypeWrapper>
          </RecoilWrapper>
        </ApolloWrapper>
        <SpeedInsights />
      </body>
    </html>
  );
}

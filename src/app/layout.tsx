import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const inter = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlipSnap",
  description:
    "Unlock a world of shared moments with FlipSnap. Share your favorite memories with friends and family.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className}`}>
        <Suspense fallback={<Loading />}>
          <Header />
          {modal}
          {children}
        </Suspense>
      </body>
    </html>
  );
}

// import { redirect } from 'next/navigation'
// import { getServerSession } from 'next-auth'
// import { ReactNode } from 'react'
// import { authOptions } from '~/lib/auth'

// const AuthLayout = async ({ children }: { children: ReactNode }) => {
//   const session = await getServerSession(authOptions)
//   if (!session) redirect('/login')

//   return <>{children}</>
// }

// export default AuthLayout

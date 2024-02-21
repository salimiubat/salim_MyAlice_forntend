import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import Navbar from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MYAlice",
  description: "Developed By Selim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
  <head>

  <meta charSet="utf-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  />
  <link rel="icon" href="images/fevicon.png" type="image/gif" />
  <meta name="keywords" content="" />
  <meta name="description" content="" />
  <meta name="author" content="" />

  <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
  <link
    href="https://fonts.googleapis.com/css?family=Poppins:400,600,700&display=swap"
    rel="stylesheet"
  />
  <link href="css/font-awesome.min.css" rel="stylesheet" />
  <link href="css/style.css" rel="stylesheet" />
  <link href="css/responsive.css" rel="stylesheet" />


  </head>
      <body className={inter.className}>
        <Navbar></Navbar>
      {children}
        </body>
    </html>
  );
}

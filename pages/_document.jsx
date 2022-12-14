import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri&family=Nunito&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+Da+2&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#E8F3F1" />
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
      </Head>
      <body className="text-dark font-hindSiliguri">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

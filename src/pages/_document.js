import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta property="og:title" content="Meghana Foods" />
          <meta property="og:type" content="eCommerce Website" />
          <meta property="og:description" content="Meghana Foods" />
          <meta
            property="og:url"
            content="https://todayfruit-store.vercel.app/"
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/ahossain/image/upload/v1636729752/facebook-page_j7alju.png"
          />
          <link
            rel="stylesheet"
            href="https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.0.0/maps/maps.css"
          />
          <script src="https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.0.0/maps/maps-web.min.js"></script>

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

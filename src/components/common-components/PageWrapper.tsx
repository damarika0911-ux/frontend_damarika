import { m } from "framer-motion";
import { Helmet } from "react-helmet";

interface PageWrapperProps {
  children: React.ReactNode;
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  image?: string;
  jsonLd?: object;
}

const BASE_URL = "https://www.damarika.in";
const DEFAULT_IMAGE = `${BASE_URL}/newLogo.svg`;

const PageWrapper = ({
  children,
  title,
  description,
  keywords,
  path = "",
  image,
  jsonLd,
}: PageWrapperProps) => {
  const fullTitle = title === "Home" ? "Damarika — Your Gateway to Archaeology & Heritage" : `${title} | Damarika`;
  const canonicalUrl = `${BASE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;

  // Breadcrumb JSON-LD (auto-generated for every page)
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      ...(path && path !== "/"
        ? [{ "@type": "ListItem", "position": 2, "name": title, "item": canonicalUrl }]
        : []),
    ],
  };

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Damarika" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TeamDamarika" />
        <meta name="twitter:creator" content="@TeamDamarika" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Breadcrumb JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>

        {/* Page-specific JSON-LD */}
        {jsonLd && (
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
        )}
      </Helmet>
      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col min-h-screen"
      >
        {children}
      </m.div>
    </>
  );
};

export default PageWrapper;

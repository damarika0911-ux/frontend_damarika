import { Suspense, useEffect } from "react";
import { lazyPage } from "./utils/lazyPage";
import { Helmet } from "react-helmet";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/sidebar/Navbar";
import Loader from "./screens/Loader";
import { CookieBanner, FloatingActions, RouteAnalytics, ScrollProgress, SiteChromeStyles } from "./components/site/SiteChrome";

const HomeScreen = lazyPage(() => import("./screens/HomeScreen"));
const AboutPage = lazyPage(() => import("./screens/AboutScreen"));
const ServicesPage = lazyPage(() => import("./screens/ServicePage"));
const ProgramsPage = lazyPage(() => import("./screens/ProgramScreen"));
const ProductsPage = lazyPage(() => import("./screens/ProductScreen"));
const ContactPage = lazyPage(() => import("./screens/ContactScreen"));
const PrivacyPage = lazyPage(() => import("./screens/legal/PrivacyScreen"));
const TermsPage = lazyPage(() => import("./screens/legal/TermsScreen"));
const NotFoundPage = lazyPage(() => import("./screens/NotFoundScreen"));

/** Pages served as prerendered HTML: load their code before React starts so nothing flashes. */
const PAGES: Record<string, { preload: () => Promise<void> }> = {
  "/": HomeScreen, "/about": AboutPage, "/services": ServicesPage, "/programs": ProgramsPage, "/program": ProgramsPage,
  "/products": ProductsPage, "/contact": ContactPage, "/privacy": PrivacyPage, "/terms": TermsPage,
};
export const preloadPage = (pathname: string) => PAGES[pathname.replace(/\/+$/, "") || "/"]?.preload() ?? Promise.resolve();

/** New page → top. Link with #hash → scroll to that section once the lazy page has rendered it. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    let tries = 0;
    const timer = setInterval(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el || ++tries > 40) {
        clearInterval(timer);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    return () => clearInterval(timer);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <>
      <Helmet>
        <title>Damarika — Gateway to Archaeology & Heritage</title>
        <meta
          name="description"
          content="Damarika promotes awareness and understanding of archaeology, heritage management and museums in Tamil Nadu through seminars, workshops, and educational programs."
        />
        <meta
          name="keywords"
          content="damarika, archaeology, Tamil Nadu, heritage, workshops, seminars, excavation, archaeological tools, programs, Keeladi, Thanjavur"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Damarika" />
        <meta property="og:title" content="Damarika — Gateway to Archaeology & Heritage" />
        <meta property="og:description" content="Your gateway to the world of archaeology. Explore Tamil Nadu's rich heritage through our programs, workshops, and educational resources." />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Skip to content — accessibility */}
      <a href="#main-content" className="skip-link">Skip to content</a>

      <ScrollToTop />
      <RouteAnalytics />
      <SiteChromeStyles />
      <ScrollProgress />
      <Navbar />

      <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/program" element={<ProgramsPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookies" element={<Navigate to="/privacy#cookies" replace />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/refund-policy" element={<Navigate to="/terms#refunds" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <FloatingActions />
      <CookieBanner />
    </>
  );
}

export default App;

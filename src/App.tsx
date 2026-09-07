import { Suspense, lazy, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Route, Routes, useLocation } from "react-router-dom";

import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/sidebar/Navbar";
import Loader from "./screens/Loader";

const HomeScreen = lazy(() => import("./screens/HomeScreen"));
const AboutPage = lazy(() => import("./screens/AboutScreen"));
const ServicesPage = lazy(() => import("./screens/ServicePage"));
const ProgramsPage = lazy(() => import("./screens/ProgramScreen"));
const ProductsPage = lazy(() => import("./screens/ProductScreen"));
const ContactPage = lazy(() => import("./screens/ContactScreen"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
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
        <link rel="canonical" href="https://www.damarika.in" />
      </Helmet>

      {/* Skip to content — accessibility */}
      <a href="#main-content" className="skip-link">Skip to content</a>

      <ScrollToTop />
      <Navbar />

      <main id="main-content">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/program" element={<ProgramsPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

export default App;

import React, { Suspense, lazy, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { IconButton, Drawer, Box } from "@mui/material";
import { m, AnimatePresence } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import logo from "../../assets/newLogo.svg";
import { useThemeMode } from "../../theme/ThemeMode";
// The search dialog (MUI Dialog + search logic) loads the first time it is opened.
const SiteSearch = lazy(() => import("../site/SiteSearch"));

const iconBtnSx = { color: "var(--brand-text)", border: "1px solid var(--border)", width: 36, height: 36, "&:hover": { background: "var(--page-alt)" } };

function HeaderTools({ onSearch }: { onSearch: () => void }) {
  const { mode, toggle } = useThemeMode();
  const dark = mode === "dark";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
      <IconButton onClick={onSearch} aria-label="Search the site (Ctrl+K)" title="Search (Ctrl+K)" size="small" sx={iconBtnSx}>
        <SearchIcon style={{ fontSize: "1.125rem" }} />
      </IconButton>
      <IconButton
        onClick={toggle}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={dark}
        title={dark ? "Light mode" : "Dark mode"}
        size="small"
        sx={iconBtnSx}
      >
        {dark ? <LightModeOutlinedIcon style={{ fontSize: "1.125rem" }} /> : <DarkModeOutlinedIcon style={{ fontSize: "1.125rem" }} />}
      </IconButton>
    </div>
  );
}

const routes = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/programs", label: "Programs" },
  { href: "/products", label: "Products" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [searchOpen, setSearchOpenState] = useState(false);
  const [searchLoaded, setSearchLoaded] = useState(false);
  const setSearchOpen = (open: boolean) => {
    if (open) setSearchLoaded(true);
    setSearchOpenState(open);
  };

  // Ctrl/Cmd+K or "/" opens search (ignored while typing in a field).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName);
      if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <m.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        transition: "background 0.4s, box-shadow 0.4s, backdrop-filter 0.4s",
        background: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg)",
        backdropFilter: scrolled ? "saturate(180%) blur(16px)" : "none",
        boxShadow: scrolled ? "0 1px 0 var(--border), 0 4px 16px rgba(0,0,0,0.04)" : "none",
      }}
    >
      <div
        className="section-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: scrolled ? "3.5rem" : "4rem",
          transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Logo */}
        <NavLink to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <m.img
            src={logo}
            alt="Damarika — home"
            className="site-logo"
            width={144}
            height={97}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            style={{
              width: scrolled ? "7.5rem" : "9rem",
              transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </NavLink>

        {/* Desktop Nav */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: "0.125rem",
            background: scrolled ? "var(--nav-pill-scrolled)" : "var(--nav-pill)",
            borderRadius: "2rem",
            padding: "0.25rem",
            border: "1px solid var(--border)",
          }}
        >
          {routes.map((route) => {
            const active = pathname === route.href;
            return (
              <NavLink
                key={route.href}
                to={route.href}
                aria-current={active ? "page" : undefined}
                style={{
                  position: "relative",
                  padding: "0.4375rem 1rem",
                  borderRadius: "1.5rem",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  fontFamily: "'DM Sans', sans-serif",
                  color: active ? "var(--heading)" : "var(--soft)",
                  background: active ? "var(--nav-active)" : "transparent",
                  boxShadow: active ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "var(--brand-text)";
                    e.currentTarget.style.background = "var(--nav-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "var(--soft)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {route.label}
              </NavLink>
            );
          })}
        </nav>

        {/* CTA Button - Desktop */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: "0.625rem" }}>
          <HeaderTools onSearch={() => setSearchOpen(true)} />
          <m.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            onClick={() => navigate("/contact")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              background: "#6d3a1f",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.8125rem",
              fontFamily: "'DM Sans', sans-serif",
              padding: "0.5rem 1.25rem",
              borderRadius: "2rem",
              border: "none",
              cursor: "pointer",
              letterSpacing: "-0.01em",
            }}
          >
            Get in Touch
            <ArrowOutwardIcon style={{ fontSize: "0.875rem" }} />
          </m.button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
          <HeaderTools onSearch={() => setSearchOpen(true)} />
          <m.div whileTap={{ scale: 0.9, rotate: 90 }} transition={{ duration: 0.15 }}>
            <IconButton
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
              size="small"
              sx={{ color: "var(--brand-text)" }}
            >
              <MenuIcon style={{ fontSize: "1.375rem" }} />
            </IconButton>
          </m.div>

          <Drawer
            anchor="right"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            PaperProps={{
              sx: {
                width: "min(17rem, 85vw)",
                borderRadius: "1.25rem 0 0 1.25rem",
                boxShadow: "-8px 0 32px rgba(0,0,0,0.08)",
                background: "var(--page)",
              },
            }}
          >
            <Box sx={{ p: "1.5rem", display: "flex", flexDirection: "column", height: "100%" }}>
              {/* Drawer header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <img src={logo} alt="Damarika" className="site-logo" style={{ width: "6.5rem" }} />
                <m.div whileTap={{ scale: 0.85, rotate: -90 }} transition={{ duration: 0.15 }}>
                  <IconButton onClick={() => setIsOpen(false)} size="small" aria-label="Close menu">
                    <CloseIcon style={{ fontSize: "1.125rem", color: "var(--brand-text)" }} />
                  </IconButton>
                </m.div>
              </div>

              {/* Drawer links */}
              <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
                <AnimatePresence>
                  {isOpen &&
                    routes.map((route, i) => {
                      const active = pathname === route.href;
                      return (
                        <m.div
                          key={route.href}
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
                        >
                          <NavLink
                            to={route.href}
                            onClick={() => setIsOpen(false)}
                            aria-current={active ? "page" : undefined}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "0.75rem 1rem",
                              borderRadius: "0.75rem",
                              fontSize: "0.9375rem",
                              fontFamily: "'DM Sans', sans-serif",
                              fontWeight: active ? 600 : 500,
                              color: active ? "var(--heading)" : "var(--soft)",
                              background: active ? "var(--page-alt)" : "transparent",
                              textDecoration: "none",
                              transition: "all 0.15s",
                            }}
                          >
                            {route.label}
                            {active && (
                              <span
                                style={{
                                  width: "0.375rem",
                                  height: "0.375rem",
                                  borderRadius: "50%",
                                  background: "var(--brand-text)",
                                }}
                              />
                            )}
                          </NavLink>
                        </m.div>
                      );
                    })}
                </AnimatePresence>
              </nav>

              {/* Drawer CTA */}
              {isOpen && (
                <m.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 }}
                  style={{ paddingTop: "1rem", borderTop: "1px solid var(--border)" }}
                >
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/contact");
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.375rem",
                      background: "#6d3a1f",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      fontFamily: "'DM Sans', sans-serif",
                      padding: "0.75rem 1.25rem",
                      borderRadius: "0.75rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Get in Touch
                    <ArrowOutwardIcon style={{ fontSize: "0.9375rem" }} />
                  </button>
                </m.div>
              )}
            </Box>
          </Drawer>
          </div>
        </div>
      </div>
      {searchLoaded && (
        <Suspense fallback={null}>
          <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
        </Suspense>
      )}
    </m.header>
  );
};

export default React.memo(Navbar);

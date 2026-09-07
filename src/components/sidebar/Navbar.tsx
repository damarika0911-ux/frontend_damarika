import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { IconButton, Drawer, Box } from "@mui/material";
import { m, AnimatePresence } from "framer-motion";
import logo from "../../assets/newLogo.svg";

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
        background: scrolled ? "rgba(255,255,255,0.85)" : "#ffffff",
        backdropFilter: scrolled ? "saturate(180%) blur(16px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)" : "none",
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
            alt="Damarika"
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
            background: scrolled ? "rgba(249,245,240,0.6)" : "#f9f5f0",
            borderRadius: "2rem",
            padding: "0.25rem",
            border: "1px solid rgba(139,69,19,0.06)",
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
                  color: active ? "#3d1e08" : "#8b7355",
                  background: active ? "#ffffff" : "transparent",
                  boxShadow: active ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "#6d3a1f";
                    e.currentTarget.style.background = "rgba(255,255,255,0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "#8b7355";
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
        <div className="hidden md:flex" style={{ alignItems: "center" }}>
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
          <m.div whileTap={{ scale: 0.9, rotate: 90 }} transition={{ duration: 0.15 }}>
            <IconButton
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
              size="small"
              sx={{ color: "#6d3a1f" }}
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
                background: "#fefcfa",
              },
            }}
          >
            <Box sx={{ p: "1.5rem", display: "flex", flexDirection: "column", height: "100%" }}>
              {/* Drawer header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <img src={logo} alt="Damarika" style={{ width: "6.5rem" }} />
                <m.div whileTap={{ scale: 0.85, rotate: -90 }} transition={{ duration: 0.15 }}>
                  <IconButton onClick={() => setIsOpen(false)} size="small" aria-label="Close menu">
                    <CloseIcon style={{ fontSize: "1.125rem", color: "#6d3a1f" }} />
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
                              color: active ? "#3d1e08" : "#8b7355",
                              background: active ? "rgba(109,58,31,0.06)" : "transparent",
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
                                  background: "#6d3a1f",
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
                  style={{ paddingTop: "1rem", borderTop: "1px solid rgba(139,69,19,0.08)" }}
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
    </m.header>
  );
};

export default React.memo(Navbar);

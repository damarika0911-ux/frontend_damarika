import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import CollectionsIcon from "@mui/icons-material/Collections";
import PlaceIcon from "@mui/icons-material/Place";
import IconButton from "@mui/material/IconButton";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import placeholderIcon from "../../assets/placeholder.svg";
import { getArchaeologicalSites, getDistrictData } from "../../service/apiService";
import { parseImageUrl } from "../../utils/config";
import { districts } from "./districtPaths";

type HeritageType = "cultural" | "natural" | "mixed";

interface ArchaeologicalSite {
  id: number;
  name: string;
  location: { x: number; y: number };
  type: HeritageType;
  description: string;
  period: string;
  image: string;
  images?: string[];
  district: string;
}

interface DistrictInfo {
  id: number;
  name: string;
  description: string;
  images: string[];
  notablePlaces: string[];
  center: { x: number; y: number };
}

const normalizeSite = (site: any): ArchaeologicalSite => ({
  ...site,
  id: Number(site.id),
  type: site.type === "natural" || site.type === "mixed" ? site.type : "cultural",
  image: parseImageUrl(site.image),
  images: Array.isArray(site.images) ? site.images.map(parseImageUrl).filter(Boolean) : [],
  district: String(site.district || "Unknown district"),
  location: {
    x: Number(site.location?.x ?? site.centerX) || 0,
    y: Number(site.location?.y ?? site.centerY) || 0,
  },
});

const typeConfig: Record<HeritageType, { color: string; glow: string; label: string }> = {
  cultural: { color: "#EF4444", glow: "#EF444480", label: "Cultural" },
  natural: { color: "#22C55E", glow: "#22C55E80", label: "Natural" },
  mixed: { color: "#F59E0B", glow: "#F59E0B80", label: "Mixed" },
};

const SVG_VIEWBOX = "0 0 500 650";

export const TamilnaduMap = () => {
  const [selectedSite, setSelectedSite] = useState<ArchaeologicalSite | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [hoveredSite, setHoveredSite] = useState<number | null>(null);
  const [archaeologicalSites, setArchaeologicalSites] = useState<ArchaeologicalSite[]>([]);
  const [districtInfoMap, setDistrictInfoMap] = useState<Record<string, DistrictInfo>>({});
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  // Auto-scroll gallery images every 3 seconds
  useEffect(() => {
    const allImages = selectedSite?.images?.length
      ? selectedSite.images
      : selectedDistrict?.images?.length
      ? selectedDistrict.images
      : [];
    if (allImages.length <= 1) return;
    const timer = setInterval(() => {
      setActiveImgIdx((prev) => (prev + 1) % allImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [selectedSite?.id, selectedDistrict?.id, selectedSite?.images, selectedDistrict?.images]);

  useEffect(() => {
    (async () => {
      try {
        const response: any = await getArchaeologicalSites();
        if (response.success && Array.isArray(response.data)) {
          setArchaeologicalSites(response.data.map(normalizeSite));
        }
      } catch (err) { console.error(err); }
    })();
    (async () => {
      try {
        const response: any = await getDistrictData();
        if (response.success) {
          const map: Record<string, DistrictInfo> = {};
          response.data.forEach((d: DistrictInfo) => {
            map[d.name.toLowerCase().replace(/\s+/g, "")] = {
              ...d,
              images: Array.isArray(d.images) ? d.images.map(parseImageUrl).filter(Boolean) : [],
              center: {
                x: Number(d.center?.x) || 0,
                y: Number(d.center?.y) || 0,
              },
            };
          });
          setDistrictInfoMap(map);
        }
      } catch (err) { console.error(err); }
    })();
  }, []);

  const sitePositions = useMemo(() => {
    const count: Record<string, number> = {};
    return archaeologicalSites.map((site) => {
      const key = site.district.toLowerCase();
      count[key] = (count[key] || 0) + 1;
      const offset = (count[key] - 1) * 12;
      return {
        x: (site.location?.x || 0) + offset,
        y: (site.location?.y || 0) + offset * 0.5,
      };
    });
  }, [archaeologicalSites]);

  const sitesInDistrict = (id: string) =>
    archaeologicalSites.filter((s) => {
      const siteNorm = s.district.toLowerCase().replace(/\s+/g, "");
      return siteNorm === id || siteNorm.includes(id) || id.includes(siteNorm);
    });

  const handleDistrictClick = (districtId: string) => {
    const norm = districtId.toLowerCase().replace(/\s+/g, "");
    const info = districtInfoMap[norm] || Object.values(districtInfoMap).find((d) =>
      d.name.toLowerCase().replace(/\s+/g, "").includes(norm) || norm.includes(d.name.toLowerCase().replace(/\s+/g, ""))
    );
    if (info && (info.images.length > 0 || info.description || info.notablePlaces.length > 0)) {
      setSelectedSite(null);
      setSelectedDistrict(info);
      setActiveImgIdx(0);
    }
  };

  const districtSites = selectedDistrict
    ? sitesInDistrict(selectedDistrict.name.toLowerCase().replace(/\s+/g, ""))
    : [];

  return (
    <>
      <div className="tn-map-layout">
        {/* Left: Map */}
        <div className="tn-map-col">
          <div className="tn-legend">
            {Object.entries(typeConfig).map(([key, cfg]) => (
              <div key={key} className="tn-legend-item">
                <span style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: cfg.color, boxShadow: `0 0 6px ${cfg.glow}` }} />
                <span>{cfg.label}</span>
              </div>
            ))}
          </div>

          <div className="tn-svg-wrap">
            <svg viewBox={SVG_VIEWBOX} style={{ width: "100%", height: "auto" }}>
              <defs>
                <filter id="d-shadow" x="-5%" y="-5%" width="110%" height="110%">
                  <feDropShadow dx="0" dy="0.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.12" />
                </filter>
                <filter id="s-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {districts.map((d) => {
                const has = sitesInDistrict(d.id).length > 0;
                const hov = hoveredDistrict === d.id;
                const sel = selectedDistrict?.name.toLowerCase().replace(/\s+/g, "") === d.id;
                return (
                  <g key={d.id}>
                    <path
                      d={d.path}
                      fill={sel ? "rgba(205,133,63,0.4)" : hov ? "rgba(205,133,63,0.3)" : has ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"}
                      stroke={sel ? "rgba(205,133,63,0.6)" : "rgba(255,255,255,0.25)"}
                      strokeWidth={sel ? "1.5" : "0.8"}
                      strokeLinejoin="round"
                      filter="url(#d-shadow)"
                      style={{ cursor: "pointer", transition: "fill 0.2s" }}
                      onMouseEnter={() => setHoveredDistrict(d.id)}
                      onMouseLeave={() => setHoveredDistrict(null)}
                      onClick={() => handleDistrictClick(d.id)}
                    />
                    {(hov || sel) && (
                      <text x={d.center.x} y={d.center.y - 6} textAnchor="middle" fill="#cd853f" fontSize="10" fontWeight="600" fontFamily="'DM Sans', sans-serif" style={{ pointerEvents: "none" }}>
                        {d.name}
                      </text>
                    )}
                  </g>
                );
              })}

              {archaeologicalSites.map((site, i) => {
                const cfg = typeConfig[site.type];
                const sel = selectedSite?.id === site.id;
                const hov = hoveredSite === site.id;
                const pos = sitePositions[i];
                if (!pos) return null;
                return (
                  <g key={site.id} filter={sel || hov ? "url(#s-glow)" : undefined} style={{ cursor: "pointer" }}
                    onClick={() => { setSelectedSite(site); setSelectedDistrict(null); setActiveImgIdx(0); }} onMouseEnter={() => setHoveredSite(site.id)} onMouseLeave={() => setHoveredSite(null)}>
                    {sel && (
                      <circle cx={pos.x} cy={pos.y} r="10" fill="none" stroke={cfg.color} strokeWidth="1">
                        <animate attributeName="r" from="7" to="16" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle cx={pos.x} cy={pos.y} r={sel ? 6.5 : hov ? 6 : 5} fill={cfg.color} stroke="#fff" strokeWidth={sel ? 1.5 : 0.8} style={{ transition: "all 0.2s" }} />
                    {hov && !sel && (
                      <g style={{ pointerEvents: "none" }}>
                        <rect x={pos.x + 10} y={pos.y - 12} width={site.name.length * 6.5 + 14} height="20" rx="4" fill="rgba(0,0,0,0.85)" />
                        <text x={pos.x + 17} y={pos.y + 2} fill="#fff" fontSize="10" fontWeight="500" fontFamily="'DM Sans', sans-serif">{site.name}</text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right: Detail panel */}
        <div className="tn-detail-col">
          <AnimatePresence mode="wait">
            {/* Archaeological Site Detail */}
            {selectedSite ? (
              <m.div key={`site-${selectedSite.id}`} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} className="tn-detail">
                {(() => {
                  const allImgs = [
                    ...(selectedSite.image ? [selectedSite.image] : []),
                    ...(selectedSite.images || []),
                  ].filter(Boolean);
                  const currentImg = allImgs.length > 0 ? allImgs[activeImgIdx % allImgs.length] : placeholderIcon;
                  return (
                    <div className="tn-detail-img">
                      <img loading="lazy" src={currentImg} alt={selectedSite.name} />
                      <div className="tn-detail-img-overlay" />
                      <IconButton size="small" onClick={() => setSelectedSite(null)}
                        sx={{ position: "absolute", top: 8, right: 8, bgcolor: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)", color: "#fff", "&:hover": { bgcolor: "rgba(0,0,0,0.5)" }, width: 28, height: 28 }}>
                        <CloseIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                      {allImgs.length > 1 && (
                        <div className="tn-gallery-nav">
                          <span className="tn-gallery-count">
                            <CollectionsIcon sx={{ fontSize: 12 }} />
                            {(activeImgIdx % allImgs.length) + 1}/{allImgs.length}
                          </span>
                          <div className="tn-gallery-dots">
                            {allImgs.map((_, i) => (
                              <button key={i} onClick={() => setActiveImgIdx(i)}
                                className={`tn-gallery-dot ${i === (activeImgIdx % allImgs.length) ? "active" : ""}`} />
                            ))}
                          </div>
                        </div>
                      )}
                      <span className="tn-type-badge" style={{ background: `${typeConfig[selectedSite.type].color}CC` }}>
                        <span style={{ width: "0.375rem", height: "0.375rem", borderRadius: "50%", background: "#fff", opacity: 0.8 }} />
                        {typeConfig[selectedSite.type].label}
                      </span>
                    </div>
                  );
                })()}
                <div className="tn-detail-body">
                  <h3 className="tn-detail-title">{selectedSite.name}</h3>
                  <div className="tn-detail-meta">
                    <div className="tn-meta-chip">
                      <PlaceIcon sx={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }} />
                      <span>{selectedSite.district}</span>
                    </div>
                    <div className="tn-meta-chip">
                      <CalendarMonthIcon sx={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }} />
                      <span>{selectedSite.period}</span>
                    </div>
                  </div>
                  <p className="tn-detail-desc">{selectedSite.description}</p>
                </div>
              </m.div>

            /* District Detail with Images Gallery */
            ) : selectedDistrict ? (
              <m.div key={`district-${selectedDistrict.id}`} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} className="tn-detail">
                {/* Image Gallery */}
                {selectedDistrict.images.length > 0 ? (
                  <div className="tn-detail-img">
                    <img loading="lazy" src={selectedDistrict.images[activeImgIdx] || placeholderIcon} alt={selectedDistrict.name} />
                    <div className="tn-detail-img-overlay" />
                    <IconButton size="small" onClick={() => { setSelectedDistrict(null); }}
                      sx={{ position: "absolute", top: 8, right: 8, bgcolor: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)", color: "#fff", "&:hover": { bgcolor: "rgba(0,0,0,0.5)" }, width: 28, height: 28 }}>
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                    {selectedDistrict.images.length > 1 && (
                      <div className="tn-gallery-nav">
                        <span className="tn-gallery-count">
                          <CollectionsIcon sx={{ fontSize: 12 }} />
                          {activeImgIdx + 1}/{selectedDistrict.images.length}
                        </span>
                        <div className="tn-gallery-dots">
                          {selectedDistrict.images.map((_, i) => (
                            <button key={i} onClick={() => setActiveImgIdx(i)}
                              className={`tn-gallery-dot ${i === activeImgIdx ? "active" : ""}`} />
                          ))}
                        </div>
                      </div>
                    )}
                    <span className="tn-type-badge" style={{ background: "rgba(205,133,63,0.85)" }}>
                      <PlaceIcon sx={{ fontSize: 10 }} />
                      District
                    </span>
                  </div>
                ) : (
                  <div style={{ position: "relative", padding: "1rem 1rem 0" }}>
                    <IconButton size="small" onClick={() => setSelectedDistrict(null)}
                      sx={{ position: "absolute", top: 12, right: 12, bgcolor: "rgba(255,255,255,0.1)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.2)" }, width: 28, height: 28 }}>
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </div>
                )}

                <div className="tn-detail-body">
                  <h3 className="tn-detail-title">{selectedDistrict.name}</h3>

                  {selectedDistrict.description && (
                    <p className="tn-detail-desc" style={{ marginBottom: "0.75rem" }}>{selectedDistrict.description}</p>
                  )}

                  {/* Notable Places */}
                  {selectedDistrict.notablePlaces.length > 0 && (
                    <div style={{ marginBottom: "0.75rem" }}>
                      <p style={{ fontSize: "0.625rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.375rem", fontFamily: "'DM Sans', sans-serif" }}>
                        Notable Places
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                        {selectedDistrict.notablePlaces.map((place, i) => (
                          <span key={i} className="tn-meta-chip">{place}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sites in this district */}
                  {districtSites.length > 0 && (
                    <div>
                      <p style={{ fontSize: "0.625rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.375rem", fontFamily: "'DM Sans', sans-serif" }}>
                        Heritage Sites ({districtSites.length})
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                        {districtSites.map((site) => (
                          <button key={site.id} onClick={() => { setSelectedSite(site); setSelectedDistrict(null); setActiveImgIdx(0); }}
                            className="tn-site-card">
                            <span className="tn-site-dot" style={{ background: typeConfig[site.type].color }} />
                            <span className="tn-site-name">{site.name}</span>
                            <span className="tn-site-period">{site.period}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </m.div>

            /* Empty state */
            ) : (
              <m.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="tn-empty">
                <div className="tn-empty-icon">
                  <PlaceIcon sx={{ fontSize: 24, color: "rgba(255,255,255,0.4)" }} />
                </div>
                <p className="tn-empty-title">Explore the Map</p>
                <p className="tn-empty-sub">Click a district to see its images and details, or click a marker to explore heritage sites</p>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .tn-map-layout { display: grid; grid-template-columns: 3fr 2fr; gap: 2rem; align-items: start; }
        .tn-map-col { }
        .tn-detail-col { position: sticky; top: 5rem; }
        .tn-legend { display: flex; justify-content: center; gap: 1.25rem; margin-bottom: 0.5rem; }
        .tn-legend-item { display: flex; align-items: center; gap: 0.375rem; font-size: 0.6875rem; color: rgba(255,255,255,0.6); font-family: 'DM Sans', sans-serif; font-weight: 500; }
        .tn-svg-wrap { max-width: 28rem; margin: 0 auto; }

        /* Detail panel */
        .tn-detail { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); border-radius: 0.75rem; overflow: hidden; backdrop-filter: blur(8px); }
        .tn-detail-img { position: relative; height: 11rem; overflow: hidden; }
        .tn-detail-img img { width: 100%; height: 100%; object-fit: cover; }
        .tn-detail-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%); }
        .tn-type-badge { position: absolute; bottom: 0.5rem; left: 0.75rem; display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.2rem 0.625rem; border-radius: 1rem; font-size: 0.625rem; font-weight: 600; color: #fff; font-family: 'DM Sans', sans-serif; backdrop-filter: blur(4px); }
        .tn-detail-body { padding: 1rem 1.125rem 1.25rem; }
        .tn-detail-title { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.625rem; line-height: 1.3; }
        .tn-detail-meta { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
        .tn-meta-chip { display: flex; align-items: center; gap: 0.3rem; background: rgba(255,255,255,0.07); border-radius: 0.375rem; padding: 0.3rem 0.5rem; font-size: 0.6875rem; color: rgba(255,255,255,0.7); font-family: 'DM Sans', sans-serif; }
        .tn-detail-desc { font-size: 0.8125rem; color: rgba(255,255,255,0.55); line-height: 1.65; }

        /* Gallery navigation */
        .tn-gallery-nav { position: absolute; bottom: 0.5rem; right: 0.75rem; display: flex; align-items: center; gap: 0.5rem; }
        .tn-gallery-count { display: flex; align-items: center; gap: 0.25rem; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); padding: 0.2rem 0.5rem; border-radius: 1rem; font-size: 0.5625rem; font-weight: 600; color: #fff; font-family: 'DM Sans', sans-serif; }
        .tn-gallery-dots { display: flex; gap: 0.25rem; }
        .tn-gallery-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.3); border: none; cursor: pointer; padding: 0; transition: background 0.2s; }
        .tn-gallery-dot.active { background: #cd853f; }

        /* District site cards */
        .tn-site-card { display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.06); border-radius: 0.375rem; padding: 0.5rem 0.625rem; cursor: pointer; transition: background 0.2s; text-align: left; width: 100%; color: inherit; font-family: inherit; }
        .tn-site-card:hover { background: rgba(255,255,255,0.1); }
        .tn-site-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .tn-site-name { font-size: 0.75rem; font-weight: 600; color: rgba(255,255,255,0.8); flex: 1; }
        .tn-site-period { font-size: 0.625rem; color: rgba(255,255,255,0.35); font-family: 'DM Sans', sans-serif; }

        /* Empty state */
        .tn-empty { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 0.75rem; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem 1.25rem; }
        .tn-empty-icon { width: 2.5rem; height: 2.5rem; border-radius: 50%; background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center; margin-bottom: 0.75rem; }
        .tn-empty-title { font-size: 0.875rem; font-weight: 600; color: rgba(255,255,255,0.7); margin-bottom: 0.25rem; }
        .tn-empty-sub { font-size: 0.6875rem; color: rgba(255,255,255,0.3); max-width: 13rem; line-height: 1.5; }

        @media (max-width: 768px) {
          .tn-map-layout { grid-template-columns: 1fr; }
          .tn-svg-wrap { max-width: 22rem; }
          .tn-detail-col { position: static; }
          .tn-detail-img { height: 10rem; }
        }
        @media (max-width: 480px) {
          .tn-svg-wrap { max-width: 18rem; }
        }
      `}</style>
    </>
  );
};

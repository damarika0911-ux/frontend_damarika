import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { productSearchQuery, programSearchQuery } from "../../service/queries";
import { useAppStore } from "../../store/appStore";

type Result = { title: string; snippet: string; section: string; to: string; programId?: number };

const STATIC: Result[] = [
  { section: "Page", title: "Home", to: "/", snippet: "Your gateway to the world of archaeology in Tamil Nadu" },
  { section: "Page", title: "About us", to: "/about", snippet: "Our mission, values and team — founded at Tamil University, Thanjavur" },
  { section: "Page", title: "Services", to: "/services", snippet: "Tours, student programs, workshops, research, conservation and tools" },
  { section: "Page", title: "Programs", to: "/programs", snippet: "Workshops, seminars and field training" },
  { section: "Page", title: "Products", to: "/products", snippet: "Archaeological tools and equipment" },
  { section: "Page", title: "Contact", to: "/contact", snippet: "Email, phone, WhatsApp, address and contact form" },
  { section: "Page", title: "FAQ", to: "/contact#faq", snippet: "Frequently asked questions: Tamil programs, registration, field trips, tools" },
  { section: "Legal", title: "Privacy & cookie policy", to: "/privacy", snippet: "What data we collect, cookies, and how to delete your data" },
  { section: "Legal", title: "Terms of service & refund policy", to: "/terms", snippet: "Registration, payments, cancellations and refunds" },
  { section: "Service", title: "Archaeological tours", to: "/services", snippet: "Keeladi, Gangaikonda Cholapuram, Mahabalipuram, Adichanallur" },
  { section: "Service", title: "Dissertation guidance", to: "/services", snippet: "Research methodology, documentation and career guidance" },
  { section: "Service", title: "Heritage conservation", to: "/services", snippet: "Monument conservation awareness and documentation" },
];

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

export default function SiteSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  // Debounce typing, then search programs/products on the server (5 best matches each).
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebounced(q.trim()), 250);
    return () => clearTimeout(t);
  }, [q]);
  const programs = useQuery({ ...programSearchQuery(debounced), enabled: open && debounced.length > 1 });
  const products = useQuery({ ...productSearchQuery(debounced), enabled: open && debounced.length > 1 });

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
    }
  }, [open]);

  const index = useMemo<Result[]>(
    () => [
      ...STATIC,
      ...(programs.data || []).map((p) => ({
        section: "Program",
        title: p.title,
        snippet: p.description,
        to: "/programs",
        programId: Number(p.id),
      })),
      ...(products.data || []).map((p) => ({ section: "Product", title: p.title, snippet: p.description, to: "/products" })),
    ],
    [programs.data, products.data],
  );

  const results = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return STATIC.slice(0, 7);
    return index
      .map((r) => {
        const t = norm(r.title), s = norm(r.snippet);
        let score = 0;
        for (const term of terms) {
          if (t.includes(term)) score += t.startsWith(term) ? 5 : 3;
          else if (s.includes(term)) score += 1;
          // Programs/products already matched on the server (it also searches modules).
          else if (r.section !== "Program" && r.section !== "Product") return null;
        }
        return { r, score };
      })
      .filter((x): x is { r: Result; score: number } => x !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((x) => x.r);
  }, [q, index]);

  const go = (r: Result) => {
    if (r.programId !== undefined) useAppStore.getState().setActiveProgramId(r.programId);
    onClose();
    navigate(r.to);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  const loading = open && q.trim().length > 1 && (q.trim() !== debounced || programs.isFetching || products.isFetching);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="site-search-title"
      TransitionProps={{ onEntered: () => inputRef.current?.focus() }}
      PaperProps={{ sx: { borderRadius: "1rem", alignSelf: "flex-start", mt: { xs: 2, sm: 10 }, mx: { xs: 1.5, sm: 4 }, width: { xs: "calc(100% - 1.5rem)", sm: undefined } } }}
    >
      <h2 id="site-search-title" className="sr-only">Search the site</h2>
      <div className="ss-bar">
        <SearchIcon aria-hidden="true" style={{ color: "var(--muted)" }} />
        <input
          ref={inputRef}
          className="ss-input"
          type="search"
          placeholder="Search programs, products, pages…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          aria-label="Search the site"
          aria-controls="ss-results"
          aria-activedescendant={results[active] ? `ss-r-${active}` : undefined}
          role="combobox"
          aria-expanded="true"
          autoComplete="off"
        />
        <button type="button" className="ss-close" onClick={onClose} aria-label="Close search">
          <CloseIcon fontSize="small" />
        </button>
      </div>
      <ul id="ss-results" className="ss-results" role="listbox" aria-label="Search results">
        {results.map((r, i) => (
          <li
            key={r.section + r.title + i}
            id={`ss-r-${i}`}
            role="option"
            aria-selected={i === active}
            className={`ss-item${i === active ? " is-active" : ""}`}
            onMouseEnter={() => setActive(i)}
            onClick={() => go(r)}
          >
            <span className="ss-section">{r.section}</span>
            <span className="ss-title">{r.title}</span>
            <span className="ss-snippet">{r.snippet}</span>
          </li>
        ))}
        {!results.length && (
          <li className="ss-empty" role="status">
            {loading ? "Searching…" : `No results for “${q}”. Try “epigraphy”, “trowel” or “Keeladi”.`}
          </li>
        )}
      </ul>
      <p className="ss-hint" aria-hidden="true">↑ ↓ to move · Enter to open · Esc to close</p>
      <style>{`
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        .ss-bar { display: flex; align-items: center; gap: 0.625rem; padding: 0.875rem 1rem; border-bottom: 1px solid var(--border); }
        .ss-input { flex: 1; border: none; outline: none; background: transparent; font-size: 1rem; color: var(--heading); font-family: inherit; min-width: 0; }
        .ss-input::placeholder { color: var(--muted); }
        .ss-input::-webkit-search-cancel-button { display: none; }
        .ss-close { border: none; background: transparent; color: var(--muted); cursor: pointer; border-radius: 0.5rem; padding: 0.25rem; display: flex; }
        .ss-results { list-style: none; margin: 0; padding: 0.5rem; max-height: min(60vh, 28rem); overflow-y: auto; }
        .ss-item { display: grid; grid-template-columns: auto 1fr; column-gap: 0.625rem; row-gap: 0.125rem; padding: 0.625rem 0.75rem; border-radius: 0.625rem; cursor: pointer; }
        .ss-item.is-active { background: var(--page-alt); outline: 1px solid var(--border); }
        .ss-section { grid-row: span 2; align-self: start; font-size: 0.625rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--label); background: var(--page-alt); border: 1px solid var(--border); border-radius: 1rem; padding: 0.125rem 0.5rem; margin-top: 0.125rem; }
        .ss-title { font-weight: 600; color: var(--heading); font-size: 0.875rem; }
        .ss-snippet { font-size: 0.75rem; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ss-empty { padding: 1.5rem 1rem; text-align: center; color: var(--muted); font-size: 0.875rem; }
        .ss-hint { margin: 0; padding: 0.5rem 1rem 0.75rem; font-size: 0.6875rem; color: var(--muted); border-top: 1px solid var(--border); }
        @media (max-width: 640px) { .ss-hint { display: none; } }
      `}</style>
    </Dialog>
  );
}

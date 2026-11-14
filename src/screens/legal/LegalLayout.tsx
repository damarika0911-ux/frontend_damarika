import type { ReactNode } from "react";
import PageWrapper from "../../components/common-components/PageWrapper";
import { LEGAL_LAST_UPDATED, formatLongDate } from "../../utils/business";

export default function LegalLayout({
  title,
  description,
  path,
  toc,
  children,
}: {
  title: string;
  description: string;
  path: string;
  toc: { id: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <PageWrapper title={title} description={description} path={path}>
      <section className="lg-hero">
        <div className="section-container">
          <p className="lg-kicker">Legal</p>
          <h1 className="lg-title">{title}</h1>
          <p className="lg-updated">
            Last updated: <time dateTime={LEGAL_LAST_UPDATED}>{formatLongDate(LEGAL_LAST_UPDATED)}</time>
          </p>
        </div>
      </section>
      <section className="lg-body">
        <div className="section-container lg-grid">
          <nav className="lg-toc" aria-label="On this page">
            <p className="lg-toc-title">On this page</p>
            <ol>
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`}>{t.label}</a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="lg-article">{children}</article>
        </div>
      </section>
      <style>{`
        .lg-hero { background: #1a0e05; padding: 3.5rem 0 3rem; }
        .lg-kicker { font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: #cd853f; margin: 0 0 0.75rem; font-family: 'DM Sans', sans-serif; }
        .lg-title { font-size: clamp(1.75rem, 5vw, 2.5rem); font-weight: 700; color: #fff; margin: 0 0 0.5rem; line-height: 1.15; }
        .lg-updated { color: rgba(255,255,255,0.72); font-size: 0.875rem; margin: 0; }
        .lg-body { background: var(--page); padding: 3rem 0 4rem; }
        .lg-grid { display: grid; grid-template-columns: 14rem minmax(0, 1fr); gap: 3rem; align-items: start; }
        .lg-toc { position: sticky; top: 5rem; font-size: 0.8125rem; }
        .lg-toc-title { font-weight: 700; color: var(--heading); margin: 0 0 0.5rem; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; }
        .lg-toc ol { margin: 0; padding-left: 1.125rem; display: grid; gap: 0.375rem; color: var(--muted); }
        .lg-toc a { color: var(--brand-text); text-decoration: none; }
        .lg-toc a:hover { text-decoration: underline; }
        .lg-article { max-width: 46rem; color: var(--text); font-size: 0.9375rem; line-height: 1.75; }
        .lg-article h2 { color: var(--heading); font-size: 1.25rem; font-weight: 700; margin: 2.25rem 0 0.75rem; scroll-margin-top: 5rem; }
        .lg-article h2:first-child { margin-top: 0; }
        .lg-article h3 { color: var(--heading); font-size: 1rem; font-weight: 600; margin: 1.5rem 0 0.5rem; }
        .lg-article p, .lg-article ul, .lg-article ol { margin: 0 0 0.875rem; }
        .lg-article ul, .lg-article ol { padding-left: 1.25rem; }
        .lg-article li { margin-bottom: 0.375rem; }
        .lg-article a { color: var(--brand-text); font-weight: 500; }
        .lg-article strong { color: var(--heading); }
        .lg-table { width: 100%; border-collapse: collapse; font-size: 0.8125rem; margin: 0 0 1rem; }
        .lg-table th, .lg-table td { text-align: left; padding: 0.5rem 0.625rem; border: 1px solid var(--border); vertical-align: top; }
        .lg-table th { background: var(--page-alt); color: var(--heading); font-weight: 600; }
        .lg-table-wrap { overflow-x: auto; }
        .lg-card { background: var(--page-alt); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem 1.25rem; margin: 0 0 1rem; }
        .lg-btn { display: inline-flex; align-items: center; gap: 0.375rem; background: var(--brand); color: #fff !important; padding: 0.5rem 1.125rem; border-radius: 2rem; border: none; font-weight: 600; font-size: 0.8125rem; text-decoration: none; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        @media (max-width: 900px) {
          .lg-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .lg-toc { position: static; background: var(--page-alt); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem 1.25rem; }
        }
      `}</style>
    </PageWrapper>
  );
}

import { useState, useEffect, useCallback, useRef } from "react";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_BASE = "https://news-aggregation-system-server.onrender.com/api";
// ─── UTILS ─
const formatDate = (d) => {
  if (!d) return "Unknown";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
};

const LANGUAGE_NAMES = {
  en: "English", fr: "French", de: "German", es: "Spanish",
  pt: "Portuguese", ar: "Arabic", zh: "Chinese", ja: "Japanese",
  hi: "Hindi", bn: "Bengali", ru: "Russian", it: "Italian",
};

// ─── COMPONENTS ─

function StatusBar({ status }) {
  if (!status) return null;
  return (
    <div className="status-bar">
      <span className="status-dot" />
      <span>{status.totalArticles?.toLocaleString()} articles in DB</span>
      <span className="status-sep">·</span>
      <span>Last: {formatDate(status.latestArticle)}</span>
      <span className="status-sep">·</span>
      <span className={`db-badge ${status.dbStatus === "connected" ? "ok" : "err"}`}>
        {status.dbStatus}
      </span>
    </div>
  );
}

function ArticleCard({ article }) {
  const cats = article.category?.slice(0, 2) || [];
  const author = article.creator?.join(", ") || "Unknown";
  const snippet = article.description || article.content?.slice(0, 180) || "No description available.";

  return (
    <article className="card" onClick={() => window.open(article.link, "_blank")}>
      {article.image_url && (
        <div className="card-img-wrap">
          <img src={article.image_url} alt={article.title} className="card-img"
            onError={(e) => { e.target.style.display = "none"; }} />
        </div>
      )}
      <div className="card-body">
        <div className="card-meta-top">
          {cats.map((c) => (
            <span key={c} className="badge">{c}</span>
          ))}
          {article.datatype && article.datatype !== "news" && (
            <span className="badge badge-type">{article.datatype}</span>
          )}
        </div>
        <h2 className="card-title">{article.title || "Untitled"}</h2>
        <p className="card-snippet">{snippet.slice(0, 200)}{snippet.length > 200 ? "…" : ""}</p>
        <div className="card-meta-bottom">
          <span className="card-author">✍ {author.slice(0, 40)}{author.length > 40 ? "…" : ""}</span>
          <span className="card-date">{formatDate(article.pubDate)}</span>
        </div>
        {article.source_id && (
          <span className="card-source">{article.source_id}</span>
        )}
      </div>
    </article>
  );
}

function MultiSelect({ label, options, selected, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (val) => {
    if (selected.includes(val)) onChange(selected.filter((v) => v !== val));
    else onChange([...selected, val]);
  };

  return (
    <div className="multi-select" ref={ref}>
      <button className="multi-btn" onClick={() => setOpen(!open)}>
        {selected.length > 0 ? `${label} (${selected.length})` : label}
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="multi-dropdown">
          {options.length === 0 && <div className="multi-empty">No options</div>}
          {options.map((opt) => (
            <label key={opt} className="multi-opt">
              <input type="checkbox" checked={selected.includes(opt)}
                onChange={() => toggle(opt)} />
              <span>{LANGUAGE_NAMES[opt] || opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function Filters({ filters, options, onChange, onReset }) {
  return (
    <aside className="filters-panel">
      <div className="filters-header">
        <h3>Filters</h3>
        <button className="reset-btn" onClick={onReset}>Reset All</button>
      </div>

      <div className="filter-group">
        <label>🔍 Search</label>
        <input className="filter-input" type="text" placeholder="Title or description..."
          value={filters.search} onChange={(e) => onChange("search", e.target.value)} />
      </div>

      <div className="filter-group">
        <label>📅 Date Range</label>
        <input className="filter-input" type="date" value={filters.startDate}
          onChange={(e) => onChange("startDate", e.target.value)} />
        <input className="filter-input mt4" type="date" value={filters.endDate}
          onChange={(e) => onChange("endDate", e.target.value)} />
      </div>

      <div className="filter-group">
        <label>✍ Author</label>
        <input className="filter-input" type="text" placeholder="Author name..."
          value={filters.author} onChange={(e) => onChange("author", e.target.value)} />
      </div>

      <div className="filter-group">
        <label>🌐 Language</label>
        <MultiSelect label="Select Languages" options={options.languages || []}
          selected={filters.language} onChange={(v) => onChange("language", v)} />
      </div>

      <div className="filter-group">
        <label>🗺 Country</label>
        <MultiSelect label="Select Countries" options={options.countries || []}
          selected={filters.country} onChange={(v) => onChange("country", v)} />
      </div>

      <div className="filter-group">
        <label>🏷 Category</label>
        <MultiSelect label="Select Categories" options={options.categories || []}
          selected={filters.category} onChange={(v) => onChange("category", v)} />
      </div>

      <div className="filter-group">
        <label>📰 Content Type</label>
        <select className="filter-input" value={filters.datatype}
          onChange={(e) => onChange("datatype", e.target.value)}>
          <option value="">All Types</option>
          {(options.datatypes || []).map((d) => (
            <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}

function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null;
  const pages = [];
  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => onPage(page - 1)}>← Prev</button>
      {start > 1 && <button onClick={() => onPage(1)}>1</button>}
      {start > 2 && <span className="dots">…</span>}
      {pages.map((p) => (
        <button key={p} className={p === page ? "active" : ""} onClick={() => onPage(p)}>{p}</button>
      ))}
      {end < totalPages - 1 && <span className="dots">…</span>}
      {end < totalPages && <button onClick={() => onPage(totalPages)}>{totalPages}</button>}
      <button disabled={page === totalPages} onClick={() => onPage(page + 1)}>Next →</button>
    </div>
  );
}

// ─── MAIN APP ──
const defaultFilters = {
  search: "", startDate: "", endDate: "", author: "",
  language: [], country: [], category: [], datatype: "",
};

export default function App() {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(defaultFilters);
  const [options, setOptions] = useState({});
  const [status, setStatus] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const debounceRef = useRef();

  // Load filter options from backend
  useEffect(() => {
    fetch(`${API_BASE}/filters`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setOptions(d); })
      .catch(() => { });

    fetch(`${API_BASE}/status`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setStatus(d); })
      .catch(() => { });
  }, []);

  const fetchNews = useCallback(async (currentFilters, currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("page", currentPage);
      params.set("limit", 20);

      if (currentFilters.search) params.set("search", currentFilters.search);
      if (currentFilters.startDate) params.set("startDate", currentFilters.startDate);
      if (currentFilters.endDate) params.set("endDate", currentFilters.endDate);
      if (currentFilters.author) params.set("author", currentFilters.author);
      if (currentFilters.datatype) params.set("datatype", currentFilters.datatype);
      if (currentFilters.language?.length) params.set("language", currentFilters.language.join(","));
      if (currentFilters.country?.length) params.set("country", currentFilters.country.join(","));
      if (currentFilters.category?.length) params.set("category", currentFilters.category.join(","));

      const res = await fetch(`${API_BASE}/news?${params}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to fetch");
      setArticles(data.articles);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced fetch on filter change
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchNews(filters, 1);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [filters]);

  useEffect(() => {
    fetchNews(filters, page);
  }, [page]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0e0e10;
          --bg2: #16161a;
          --bg3: #1e1e23;
          --border: #2a2a32;
          --text: #e8e6e1;
          --muted: #888;
          --accent: #d4a843;
          --accent2: #e8c67a;
          --red: #e05c5c;
          --green: #4caf7d;
          --radius: 10px;
          --font-head: 'Playfair Display', Georgia, serif;
          --font-body: 'Source Serif 4', Georgia, serif;
        }

        html { font-size: 16px; }
        body { background: var(--bg); color: var(--text); font-family: var(--font-body); min-height: 100vh; }

        /* HEADER */
        .header {
          background: var(--bg2);
          border-bottom: 1px solid var(--border);
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          position: sticky; top: 0; z-index: 100;
        }
        .header-brand {
          display: flex; align-items: center; gap: 10px;
        }
        .header-logo {
          width: 36px; height: 36px;
          background: var(--accent);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }
        .header-title {
          font-family: var(--font-head);
          font-size: 1.4rem;
          color: var(--accent);
          letter-spacing: -0.02em;
        }
        .header-right { display: flex; align-items: center; gap: 12px; }
        .sidebar-toggle {
          background: var(--bg3); border: 1px solid var(--border);
          color: var(--text); padding: 6px 14px; border-radius: 6px;
          cursor: pointer; font-size: 0.85rem; transition: all 0.2s;
        }
        .sidebar-toggle:hover { border-color: var(--accent); color: var(--accent); }

        /* STATUS BAR */
        .status-bar {
          background: var(--bg3); border-bottom: 1px solid var(--border);
          padding: 6px 2rem; display: flex; align-items: center; gap: 10px;
          font-size: 0.78rem; color: var(--muted);
        }
        .status-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--green); animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .status-sep { color: var(--border); }
        .db-badge { padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 600; }
        .db-badge.ok { background: rgba(76,175,125,0.15); color: var(--green); }
        .db-badge.err { background: rgba(224,92,92,0.15); color: var(--red); }

        /* LAYOUT */
        .layout { display: flex; min-height: calc(100vh - 100px); }

        /* FILTERS PANEL */
        .filters-panel {
          width: 280px; min-width: 280px;
          background: var(--bg2); border-right: 1px solid var(--border);
          padding: 1.5rem 1.2rem;
          overflow-y: auto; max-height: calc(100vh - 100px);
          position: sticky; top: 100px;
          transition: width 0.3s, min-width 0.3s, padding 0.3s;
        }
        .filters-panel.hidden { width: 0; min-width: 0; padding: 0; overflow: hidden; }

        .filters-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.2rem;
        }
        .filters-header h3 { font-family: var(--font-head); font-size: 1.1rem; color: var(--accent); }
        .reset-btn {
          font-size: 0.75rem; background: none; border: 1px solid var(--border);
          color: var(--muted); padding: 4px 10px; border-radius: 5px; cursor: pointer;
          transition: all 0.2s;
        }
        .reset-btn:hover { border-color: var(--red); color: var(--red); }

        .filter-group { margin-bottom: 1.2rem; }
        .filter-group label {
          display: block; font-size: 0.78rem; color: var(--muted);
          margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.06em;
        }
        .filter-input {
          width: 100%; background: var(--bg3); border: 1px solid var(--border);
          color: var(--text); padding: 8px 10px; border-radius: 6px;
          font-family: var(--font-body); font-size: 0.88rem;
          outline: none; transition: border 0.2s;
        }
        .filter-input:focus { border-color: var(--accent); }
        .mt4 { margin-top: 6px; }
        select.filter-input { appearance: none; cursor: pointer; }

        /* MULTI SELECT */
        .multi-select { position: relative; }
        .multi-btn {
          width: 100%; background: var(--bg3); border: 1px solid var(--border);
          color: var(--text); padding: 8px 10px; border-radius: 6px;
          font-family: var(--font-body); font-size: 0.88rem;
          cursor: pointer; display: flex; justify-content: space-between; align-items: center;
          transition: border 0.2s;
        }
        .multi-btn:hover { border-color: var(--accent); }
        .arrow { font-size: 0.65rem; color: var(--muted); }
        .multi-dropdown {
          position: absolute; top: 100%; left: 0; right: 0; z-index: 200;
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: 6px; max-height: 200px; overflow-y: auto;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .multi-opt {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 12px; cursor: pointer; font-size: 0.88rem;
          transition: background 0.15s;
        }
        .multi-opt:hover { background: rgba(212,168,67,0.1); }
        .multi-opt input { accent-color: var(--accent); cursor: pointer; }
        .multi-empty { padding: 12px; color: var(--muted); font-size: 0.85rem; text-align: center; }

        /* MAIN CONTENT */
        .main-content { flex: 1; padding: 1.5rem 2rem; overflow-x: hidden; }

        .content-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.5rem; flex-wrap: wrap; gap: 8px;
        }
        .content-title { font-family: var(--font-head); font-size: 1.6rem; color: var(--text); }
        .content-count { font-size: 0.85rem; color: var(--muted); }

        /* ACTIVE FILTERS TAGS */
        .active-filters { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1rem; }
        .filter-tag {
          background: rgba(212,168,67,0.15); border: 1px solid rgba(212,168,67,0.3);
          color: var(--accent2); padding: 3px 10px; border-radius: 20px;
          font-size: 0.78rem; display: flex; align-items: center; gap: 6px;
        }
        .filter-tag-remove { cursor: pointer; opacity: 0.7; }
        .filter-tag-remove:hover { opacity: 1; }

        /* GRID */
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.2rem;
        }

        /* CARD */
        .card {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: var(--radius); overflow: hidden;
          cursor: pointer; transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
          display: flex; flex-direction: column;
        }
        .card:hover {
          transform: translateY(-3px);
          border-color: rgba(212,168,67,0.4);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .card-img-wrap { height: 180px; overflow: hidden; }
        .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
        .card:hover .card-img { transform: scale(1.04); }
        .card-body { padding: 1rem; display: flex; flex-direction: column; flex: 1; }
        .card-meta-top { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
        .badge {
          padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.04em;
          background: rgba(212,168,67,0.12); color: var(--accent);
          border: 1px solid rgba(212,168,67,0.2);
        }
        .badge-type { background: rgba(100,120,255,0.12); color: #8899ff; border-color: rgba(100,120,255,0.2); }
        .card-title {
          font-family: var(--font-head); font-size: 1rem; font-weight: 700;
          line-height: 1.4; margin-bottom: 8px; color: var(--text);
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .card-snippet {
          font-size: 0.85rem; color: var(--muted); line-height: 1.55;
          flex: 1; margin-bottom: 10px;
        }
        .card-meta-bottom {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.78rem; color: var(--muted); margin-bottom: 6px;
        }
        .card-author { max-width: 55%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .card-source {
          font-size: 0.72rem; color: var(--accent); background: rgba(212,168,67,0.08);
          padding: 2px 7px; border-radius: 4px; display: inline-block; margin-top: 4px;
        }

        /* STATE */
        .loading-wrap, .error-wrap, .empty-wrap {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 4rem 2rem; gap: 1rem; color: var(--muted); text-align: center;
        }
        .spinner {
          width: 40px; height: 40px;
          border: 3px solid var(--border);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .error-icon { font-size: 2.5rem; }
        .error-msg { color: var(--red); font-size: 0.95rem; }

        /* PAGINATION */
        .pagination {
          display: flex; align-items: center; justify-content: center;
          gap: 6px; margin-top: 2.5rem; flex-wrap: wrap;
        }
        .pagination button {
          background: var(--bg3); border: 1px solid var(--border);
          color: var(--text); padding: 6px 14px; border-radius: 6px;
          cursor: pointer; font-family: var(--font-body); font-size: 0.88rem;
          transition: all 0.2s;
        }
        .pagination button:hover:not(:disabled):not(.active) { border-color: var(--accent); color: var(--accent); }
        .pagination button.active { background: var(--accent); color: #000; border-color: var(--accent); font-weight: 700; }
        .pagination button:disabled { opacity: 0.4; cursor: not-allowed; }
        .pagination .dots { color: var(--muted); padding: 0 4px; }

        /* SCROLLBAR */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--muted); }

        @media (max-width: 768px) {
          .filters-panel { position: fixed; left: 0; top: 100px; height: calc(100vh - 100px); z-index: 50; }
          .articles-grid { grid-template-columns: 1fr; }
          .header-title { font-size: 1.1rem; }
          .main-content { padding: 1rem; }
        }
      `}</style>

      <header className="header">
        <div className="header-brand">
          <div className="header-logo">📰</div>
          <span className="header-title">NewsAggregator</span>
        </div>
        <div className="header-right">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen((v) => !v)}>
            {sidebarOpen ? "◀ Hide Filters" : "▶ Show Filters"}
          </button>
        </div>
      </header>

      <StatusBar status={status} />

      <div className="layout">
        <div className={`filters-panel${sidebarOpen ? "" : " hidden"}`}>
          <Filters filters={filters} options={options} onChange={handleFilterChange} onReset={handleReset} />
        </div>

        <main className="main-content">
          <div className="content-header">
            <h1 className="content-title">Latest News</h1>
            <span className="content-count">
              {loading ? "Loading…" : `${total.toLocaleString()} article${total !== 1 ? "s" : ""} found`}
            </span>
          </div>

          {/* Active filter tags */}
          <div className="active-filters">
            {filters.search && (
              <span className="filter-tag">
                🔍 "{filters.search}"
                <span className="filter-tag-remove" onClick={() => handleFilterChange("search", "")}>✕</span>
              </span>
            )}
            {filters.author && (
              <span className="filter-tag">
                ✍ {filters.author}
                <span className="filter-tag-remove" onClick={() => handleFilterChange("author", "")}>✕</span>
              </span>
            )}
            {filters.language.map((l) => (
              <span key={l} className="filter-tag">
                🌐 {LANGUAGE_NAMES[l] || l}
                <span className="filter-tag-remove"
                  onClick={() => handleFilterChange("language", filters.language.filter((x) => x !== l))}>✕</span>
              </span>
            ))}
            {filters.country.map((c) => (
              <span key={c} className="filter-tag">
                🗺 {c}
                <span className="filter-tag-remove"
                  onClick={() => handleFilterChange("country", filters.country.filter((x) => x !== c))}>✕</span>
              </span>
            ))}
            {filters.category.map((c) => (
              <span key={c} className="filter-tag">
                🏷 {c}
                <span className="filter-tag-remove"
                  onClick={() => handleFilterChange("category", filters.category.filter((x) => x !== c))}>✕</span>
              </span>
            ))}
            {filters.datatype && (
              <span className="filter-tag">
                📰 {filters.datatype}
                <span className="filter-tag-remove" onClick={() => handleFilterChange("datatype", "")}>✕</span>
              </span>
            )}
          </div>

          {loading ? (
            <div className="loading-wrap"><div className="spinner" /><span>Fetching articles…</span></div>
          ) : error ? (
            <div className="error-wrap">
              <span className="error-icon">⚠️</span>
              <span className="error-msg">{error}</span>
              <span>Make sure your backend is running on port 5000</span>
            </div>
          ) : articles.length === 0 ? (
            <div className="empty-wrap">
              <span style={{ fontSize: "2.5rem" }}>📭</span>
              <span>No articles found for the selected filters.</span>
            </div>
          ) : (
            <div className="articles-grid">
              {articles.map((art) => (
                <ArticleCard key={art._id || art.article_id} article={art} />
              ))}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onPage={setPage} />
        </main>
      </div>
    </>
  );
}
const BRANDS = ["all", "nike", "adidas", "puma"];
const SIZES = ["all", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

export default function FilterBar({ filters, setFilters, sortBy, setSortBy, totalResults }) {
  const update = (key, val) => setFilters({ ...filters, [key]: val });

  return (
    <div className="filter-section">
      <div className="filter-bar">
        <span className="filter-label">Marca</span>
        {BRANDS.map((b) => (
          <button
            key={b}
            className={`filter-chip ${filters.brand === b ? "active" : ""}`}
            onClick={() => update("brand", b)}
          >
            {b === "all" ? "Todas" : b.charAt(0).toUpperCase() + b.slice(1)}
          </button>
        ))}

        <div className="filter-divider" />

        <span className="filter-label">Talla</span>
        <select
          className="filter-select"
          value={filters.size}
          onChange={(e) => update("size", e.target.value)}
        >
          {SIZES.map((s) => (
            <option key={s} value={s}>{s === "all" ? "Todas las tallas" : `EU ${s}`}</option>
          ))}
        </select>

        <span className="filter-label">Precio máx.</span>
        <select
          className="filter-select"
          value={filters.maxPrice}
          onChange={(e) => update("maxPrice", Number(e.target.value))}
        >
          <option value={300000}>Sin límite</option>
          <option value={50000}>₡50,000</option>
          <option value={80000}>₡80,000</option>
          <option value={100000}>₡100,000</option>
          <option value={130000}>₡130,000</option>
          <option value={180000}>₡180,000</option>
        </select>

        <div className="filter-divider" />

        <span className="filter-label">Ordenar</span>
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name">Nombre A–Z</option>
          <option value="stock">Mayor stock</option>
        </select>
      </div>

      <div className="results-meta">
        <span className="results-count">
          <strong>{totalResults}</strong> resultado{totalResults !== 1 ? "s" : ""} encontrado{totalResults !== 1 ? "s" : ""}
        </span>
        {(filters.brand !== "all" || filters.size !== "all" || filters.maxPrice < 300000) && (
          <button
            className="clear-filters"
            onClick={() => setFilters({ brand: "all", size: "all", maxPrice: 300000 })}
          >
            Limpiar filtros ✕
          </button>
        )}
      </div>
    </div>
  );
}

import SearchBar from "./SearchBar";

const BRANDS = [
  { key: "nike", label: "Nike", emoji: "✔" },
  { key: "adidas", label: "Adidas", emoji: "✔" },
  { key: "puma", label: "Puma", emoji: "✔" },
];

export default function Hero({ onSearch, onBrandClick }) {
  return (
    <section className="hero">
      <div className="hero-eyebrow">Costa Rica · Búsqueda en tiempo real</div>
      <h1 className="hero-title">
        ENCUENTRA<br />
        <span className="outline">TUS</span>{" "}
        <span className="accent">TENIS</span>
      </h1>
      <p className="hero-subtitle">
        Compara precios y disponibilidad de Nike, Adidas y Puma
        en todas las tiendas de Costa Rica desde un solo lugar.
      </p>
      <SearchBar onSearch={onSearch} />

      <div className="hero-brands">
        <p className="hero-brands-label">O explorar por marca:</p>
        <div className="hero-brand-buttons">
          {BRANDS.map((b) => (
            <button
              key={b.key}
              className="hero-brand-btn"
              onClick={() => onBrandClick(b.key)}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat">
          <span className="stat-number">12+</span>
          <span className="stat-label">Tiendas</span>
        </div>
        <div className="stat">
          <span className="stat-number">500+</span>
          <span className="stat-label">Modelos</span>
        </div>
        <div className="stat">
          <span className="stat-number">3</span>
          <span className="stat-label">Marcas</span>
        </div>
      </div>
    </section>
  );
}

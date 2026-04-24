const BRAND_COLORS = { nike: "#f97316", adidas: "#3b82f6", puma: "#a855f7" };

const formatPrice = (p) =>
  new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC", maximumFractionDigits: 0 }).format(p);

export default function ProductCard({ item, inCompare, onToggleCompare }) {
  const inStock = item.stock > 0;
  const accent = BRAND_COLORS[item.brand] || "#e8f04a";

  return (
    <div className={`product-card ${inCompare ? "in-compare" : ""}`}>
      <div className="card-image-wrap" style={{ "--brand-color": accent }}>
        <div className="card-image-bg" />
        <div className="card-image-emoji">👟</div>
        <div className={`card-badge ${!inStock ? "out-of-stock" : ""}`}>
          {inStock ? `${item.stock} en stock` : "Agotado"}
        </div>
        <button
          className="compare-checkbox"
          onClick={() => onToggleCompare(item)}
          title={inCompare ? "Quitar de comparación" : "Agregar a comparar (máx. 3)"}
        >
          {inCompare ? "✓" : "+"}
        </button>
      </div>
      <div className="card-body">
        <div className="card-brand" style={{ color: accent }}>{item.brand.toUpperCase()}</div>
        <div className="card-model">{item.model}</div>
        <div className="card-sizes-label">Tallas disponibles:</div>
        <div className="card-meta">
          {item.sizes.length === 0 ? (
            <span className="size-tag unavailable">Sin tallas</span>
          ) : (
            <>
              {item.sizes.slice(0, 6).map((s) => (
                <span key={s} className="size-tag">{s}</span>
              ))}
              {item.sizes.length > 6 && (
                <span className="size-tag more">+{item.sizes.length - 6}</span>
              )}
            </>
          )}
        </div>
        <div className="card-footer">
          <div>
            <div className="card-price">{formatPrice(item.price)}</div>
            <div className="card-price-sub">precio más bajo encontrado</div>
          </div>
          <div className="card-store">
            <div className={`store-dot ${!inStock ? "unavailable" : ""}`} />
            <span>{item.store}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

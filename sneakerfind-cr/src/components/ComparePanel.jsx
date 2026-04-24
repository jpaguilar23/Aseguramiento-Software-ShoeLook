const formatPrice = (p) =>
  new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC", maximumFractionDigits: 0 }).format(p);

export default function ComparePanel({ items, onClose, onRemove }) {
  const minPrice = Math.min(...items.map((i) => i.price));

  const rows = [
    { label: "Marca", render: (i) => i.brand.toUpperCase() },
    { label: "Modelo", render: (i) => i.model },
    { label: "Tienda", render: (i) => i.store },
    {
      label: "Precio",
      render: (i) => formatPrice(i.price),
      isBest: (i) => i.price === minPrice,
      className: "price-val",
    },
    {
      label: "Stock",
      render: (i) => i.stock > 0 ? `${i.stock} unidades` : "Agotado",
      isBest: (i) => i.stock > 0,
    },
    { label: "Tallas", render: (i) => i.sizes.join(", ") || "—" },
  ];

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal compare-panel">
        <div className="modal-header">
          <div className="modal-title">Comparar tenis</div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="compare-grid" style={{ gridTemplateColumns: `140px repeat(${items.length}, 1fr)` }}>
          {/* Headers */}
          <div />
          {items.map((item) => (
            <div key={item.id} className="compare-col-header">
              <div className="compare-emoji">👟</div>
              <div className="compare-col-name">{item.model}</div>
              <button className="compare-col-remove" onClick={() => onRemove(item)}>Quitar ✕</button>
            </div>
          ))}

          {/* Rows */}
          {rows.map((row) => (
            <div key={row.label} className="compare-row-wrap">
              <div className="compare-label">{row.label}</div>
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`compare-value ${row.className || ""} ${row.isBest && row.isBest(item) ? "is-best" : ""}`}
                >
                  {row.render(item)}
                  {row.label === "Precio" && item.price === minPrice && (
                    <span className="best-badge">Mejor precio 🏆</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

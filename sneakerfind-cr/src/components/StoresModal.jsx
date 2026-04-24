const STORES = [
  { name: "Sport Zone CR", zone: "Escazú, Multiplaza", hours: "10:00 – 21:00", brands: ["Nike", "Adidas", "Puma"], phone: "2201-0000" },
  { name: "Nike Factory CR", zone: "Heredia, Paseo de las Flores", hours: "10:00 – 21:00", brands: ["Nike"], phone: "2560-0000" },
  { name: "Adidas Store Escazú", zone: "Escazú, Multiplaza", hours: "10:00 – 21:00", brands: ["Adidas"], phone: "2201-1111" },
  { name: "Siman CR", zone: "San José, Barrio México", hours: "09:00 – 20:00", brands: ["Nike", "Puma"], phone: "2255-0000" },
  { name: "Almacenes El Rey", zone: "San José, Centro", hours: "09:00 – 19:00", brands: ["Nike", "Adidas"], phone: "2222-0000" },
  { name: "Decathlon CR", zone: "Heredia, América Mall", hours: "09:00 – 21:00", brands: ["Adidas", "Puma"], phone: "2562-0000" },
  { name: "La Colonia", zone: "San José, Curridabat", hours: "09:00 – 20:00", brands: ["Adidas"], phone: "2280-0000" },
];

const BRAND_COLORS = { Nike: "#f97316", Adidas: "#3b82f6", Puma: "#a855f7" };

export default function StoresModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal stores-modal">
        <div className="modal-header">
          <div className="modal-title">🏪 Tiendas participantes</div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <p className="modal-desc">{STORES.length} tiendas disponibles en Costa Rica con información actualizada.</p>
          <div className="stores-grid">
            {STORES.map((store) => (
              <div key={store.name} className="store-card">
                <div className="store-card-top">
                  <div className="store-card-name">{store.name}</div>
                  <div className="store-card-brands">
                    {store.brands.map((b) => (
                      <span key={b} className="store-brand-tag" style={{ background: BRAND_COLORS[b] + "22", color: BRAND_COLORS[b], border: `1px solid ${BRAND_COLORS[b]}44` }}>
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="store-card-info">
                  <div className="store-info-row">
                    <span className="store-info-icon">📍</span>
                    <span>{store.zone}</span>
                  </div>
                  <div className="store-info-row">
                    <span className="store-info-icon">🕐</span>
                    <span>{store.hours}</span>
                  </div>
                  <div className="store-info-row">
                    <span className="store-info-icon">📞</span>
                    <span>{store.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

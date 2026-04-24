import { mockResults } from "../data/mockData";

const BRANDS = [
  {
    key: "nike",
    label: "Nike",
    color: "#f97316",
    tagline: "Just Do It",
    description: "Líder mundial en calzado deportivo. Desde los Air Force hasta los React, Nike ofrece tecnología e icónico diseño.",
  },
  {
    key: "adidas",
    label: "Adidas",
    color: "#3b82f6",
    tagline: "Impossible is Nothing",
    description: "La marca alemana de las tres rayas. Innovación con Boost y estilos clásicos como Stan Smith y Superstar.",
  },
  {
    key: "puma",
    label: "Puma",
    color: "#a855f7",
    tagline: "Forever Faster",
    description: "Velocidad y estilo urbano. Desde la Suede hasta la RS-X, Puma combina rendimiento con diseño atrevido.",
  },
];

export default function BrandsModal({ onClose, onBrandClick }) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal brands-modal">
        <div className="modal-header">
          <div className="modal-title">👟 Explorar marcas</div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="brands-grid">
            {BRANDS.map((brand) => {
              const count = mockResults.filter((r) => r.brand === brand.key).length;
              return (
                <div key={brand.key} className="brand-card" style={{ "--bc": brand.color }}>
                  <div className="brand-card-header">
                    <div className="brand-card-name" style={{ color: brand.color }}>{brand.label}</div>
                    <div className="brand-card-tagline">"{brand.tagline}"</div>
                  </div>
                  <p className="brand-card-desc">{brand.description}</p>
                  <div className="brand-card-footer">
                    <span className="brand-count">{count} modelos disponibles</span>
                    <button
                      className="brand-explore-btn"
                      style={{ background: brand.color }}
                      onClick={() => onBrandClick(brand.key)}
                    >
                      Ver modelos →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

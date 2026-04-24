import { mockResults } from "../data/mockData";

const formatPrice = (p) =>
  new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC", maximumFractionDigits: 0 }).format(p);

const BRAND_COLORS = { nike: "#f97316", adidas: "#3b82f6", puma: "#a855f7" };

export default function DealsModal({ onClose, onDealClick }) {
  const deals = [...mockResults]
    .filter((r) => r.stock > 0)
    .sort((a, b) => a.price - b.price)
    .slice(0, 8);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal deals-modal">
        <div className="modal-header">
          <div className="modal-title">🔥 Mejores ofertas</div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <p className="modal-desc">Los tenis con el mejor precio disponibles ahora mismo en Costa Rica.</p>
          <div className="deals-list">
            {deals.map((deal, idx) => (
              <div
                key={deal.id}
                className="deal-row"
                onClick={() => onDealClick(deal)}
              >
                <div className="deal-rank">#{idx + 1}</div>
                <div className="deal-emoji">👟</div>
                <div className="deal-info">
                  <div className="deal-brand" style={{ color: BRAND_COLORS[deal.brand] }}>
                    {deal.brand.toUpperCase()}
                  </div>
                  <div className="deal-model">{deal.model}</div>
                  <div className="deal-store">{deal.store} · {deal.stock} en stock</div>
                </div>
                <div className="deal-price">{formatPrice(deal.price)}</div>
                <div className="deal-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

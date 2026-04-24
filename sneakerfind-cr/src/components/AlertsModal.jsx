import { useState } from "react";
import { mockResults } from "../data/mockData";

const formatPrice = (p) =>
  new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC", maximumFractionDigits: 0 }).format(p);

export default function AlertsModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const models = [...new Set(mockResults.map((r) => r.model))].sort();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !selectedModel) return;
    const newAlert = {
      id: Date.now(),
      email,
      model: selectedModel,
      targetPrice: targetPrice ? Number(targetPrice) : null,
    };
    setAlerts((prev) => [...prev, newAlert]);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setSelectedModel(""); setTargetPrice(""); }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal alerts-modal">
        <div className="modal-header">
          <div className="modal-title">🔔 Alertas de precio</div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <p className="modal-desc">
            Recibe una notificación cuando el precio de un tenis baje o cuando vuelva a estar disponible.
          </p>

          <form className="alert-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Tu correo electrónico</label>
              <input
                className="form-input"
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Modelo de tenis</label>
              <select
                className="form-input"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                required
              >
                <option value="">— Seleccionar modelo —</option>
                {models.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Precio objetivo (opcional)</label>
              <input
                className="form-input"
                type="number"
                placeholder="Ej: 80000"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
              />
              <span className="form-hint">Avísame cuando baje de este precio</span>
            </div>
            <button type="submit" className={`form-submit ${submitted ? "success" : ""}`}>
              {submitted ? "✓ Alerta creada" : "Crear alerta"}
            </button>
          </form>

          {alerts.length > 0 && (
            <div className="alerts-list">
              <div className="alerts-list-title">Tus alertas activas</div>
              {alerts.map((a) => (
                <div key={a.id} className="alert-item">
                  <div>
                    <strong>{a.model}</strong>
                    {a.targetPrice && <span> · Objetivo: {formatPrice(a.targetPrice)}</span>}
                  </div>
                  <button className="alert-remove" onClick={() => setAlerts((prev) => prev.filter((x) => x.id !== a.id))}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

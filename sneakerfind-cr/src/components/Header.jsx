export default function Header({ onLogoClick, onAlertsClick, onStoresClick, onBrandsClick, onDealsClick }) {
  return (
    <header className="header">
      <button className="header-logo" onClick={onLogoClick}>
        <div className="logo-mark">S</div>
        <span className="logo-text">Sneak<span>Find</span>.cr</span>
      </button>
      <nav className="header-nav">
        <button className="nav-link" onClick={onBrandsClick}>Marcas</button>
        <button className="nav-link" onClick={onStoresClick}>Tiendas</button>
        <button className="nav-link" onClick={onDealsClick}>Ofertas</button>
        <button className="btn-primary" onClick={onAlertsClick}>🔔 Alertas de precio</button>
      </nav>
    </header>
  );
}

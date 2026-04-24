export default function Footer({ onStoresClick, onBrandsClick }) {
  return (
    <footer className="footer">
      <span>© 2025 SneakFind.cr — Proyecto universitario, CENFOTEC</span>
      <div className="footer-links">
        <button className="footer-link" onClick={onBrandsClick}>Marcas</button>
        <button className="footer-link" onClick={onStoresClick}>Tiendas</button>
      </div>
      <span>Hecho con ❤️ en Costa Rica 🇨🇷</span>
    </footer>
  );
}

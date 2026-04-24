import ProductCard from "./ProductCard";

export default function ResultsGrid({ results, compareList, onToggleCompare }) {
  return (
    <div className="results-grid">
      {results.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div className="empty-title">No encontramos resultados</div>
          <p>Prueba con otro nombre, marca o ajusta los filtros</p>
        </div>
      ) : (
        results.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            inCompare={compareList.some((c) => c.id === item.id)}
            onToggleCompare={onToggleCompare}
          />
        ))
      )}
    </div>
  );
}

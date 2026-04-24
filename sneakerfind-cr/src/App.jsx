import { useState, useMemo } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import ResultsGrid from "./components/ResultsGrid";
import ComparePanel from "./components/ComparePanel";
import AlertsModal from "./components/AlertsModal";
import StoresModal from "./components/StoresModal";
import BrandsModal from "./components/BrandsModal";
import DealsModal from "./components/DealsModal";
import Footer from "./components/Footer";
import { mockResults } from "./data/mockData";
import { filterResults } from "./utils/filterResults";
import "./styles/globals.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ brand: "all", size: "all", maxPrice: 300000 });
  const [searched, setSearched] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showStores, setShowStores] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [showDeals, setShowDeals] = useState(false);
  const [sortBy, setSortBy] = useState("price-asc");

  const results = useMemo(() => {
    if (!searched) return [];
    return filterResults(mockResults, query, filters, sortBy);
  }, [query, filters, searched, sortBy]);

  const handleSearch = (q) => {
    setQuery(q);
    setSearched(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    if (!searched) setSearched(true);
  };

  const handleBrandClick = (brand) => {
    setQuery("");
    setFilters({ brand, size: "all", maxPrice: 300000 });
    setSearched(true);
    setShowBrands(false);
    setShowDeals(false);
  };

  const handleDealClick = (deal) => {
    setQuery(deal.model);
    setFilters({ brand: deal.brand, size: "all", maxPrice: 300000 });
    setSearched(true);
    setShowDeals(false);
  };

  const resetHome = () => {
    setSearched(false);
    setQuery("");
    setFilters({ brand: "all", size: "all", maxPrice: 300000 });
    setCompareList([]);
    setSortBy("price-asc");
  };

  const toggleCompare = (item) => {
    setCompareList((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev.filter((i) => i.id !== item.id);
      if (prev.length >= 3) return prev;
      return [...prev, item];
    });
  };

  return (
    <div className="app">
      <Header
        onLogoClick={resetHome}
        onAlertsClick={() => setShowAlerts(true)}
        onStoresClick={() => setShowStores(true)}
        onBrandsClick={() => setShowBrands(true)}
        onDealsClick={() => setShowDeals(true)}
      />

      {!searched ? (
        <Hero onSearch={handleSearch} onBrandClick={handleBrandClick} />
      ) : (
        <main className="main-content">
          <div className="search-section">
            <SearchBar onSearch={handleSearch} initialValue={query} />
            <FilterBar
              filters={filters}
              setFilters={handleFilterChange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalResults={results.length}
            />
          </div>
          <ResultsGrid
            results={results}
            compareList={compareList}
            onToggleCompare={toggleCompare}
          />
        </main>
      )}

      {compareList.length > 0 && (
        <div className="compare-bar">
          <div className="compare-bar-items">
            {compareList.map((i) => (
              <span key={i.id} className="compare-bar-tag">
                {i.model}
                <button className="compare-remove" onClick={() => toggleCompare(i)}>✕</button>
              </span>
            ))}
          </div>
          <button className="btn-compare" onClick={() => setShowCompare(true)}>
            Comparar ({compareList.length}) →
          </button>
        </div>
      )}

      {showCompare && <ComparePanel items={compareList} onClose={() => setShowCompare(false)} onRemove={toggleCompare} />}
      {showAlerts && <AlertsModal onClose={() => setShowAlerts(false)} />}
      {showStores && <StoresModal onClose={() => setShowStores(false)} />}
      {showBrands && <BrandsModal onClose={() => setShowBrands(false)} onBrandClick={handleBrandClick} />}
      {showDeals && <DealsModal onClose={() => setShowDeals(false)} onDealClick={handleDealClick} />}

      <Footer onStoresClick={() => setShowStores(true)} onBrandsClick={() => setShowBrands(true)} />
    </div>
  );
}

/**
 * filterResults.js
 * Lógica central de búsqueda y filtrado.
 * Extraída de App.jsx para poder probarse de forma unitaria (sin React).
 */

/**
 * Filtra y ordena una lista de productos según query y filtros.
 * @param {Array}  products  - Array completo de productos
 * @param {string} query     - Texto de búsqueda (modelo o marca)
 * @param {Object} filters   - { brand, size, maxPrice }
 * @param {string} sortBy    - 'price-asc' | 'price-desc' | 'name' | 'stock'
 * @returns {Array} productos filtrados y ordenados
 */
export function filterResults(products, query = "", filters = {}, sortBy = "price-asc") {
  const { brand = "all", size = "all", maxPrice = 300000 } = filters;

  const filtered = products.filter((r) => {
    const matchQuery =
      query.trim() === "" ||
      r.model.toLowerCase().includes(query.toLowerCase()) ||
      r.brand.toLowerCase().includes(query.toLowerCase());

    const matchBrand = brand === "all" || r.brand.toLowerCase() === brand.toLowerCase();
    const matchSize  = size  === "all" || r.sizes.includes(size);
    const matchPrice = r.price <= maxPrice;

    return matchQuery && matchBrand && matchSize && matchPrice;
  });

  return [...filtered].sort((a, b) => {
    if (sortBy === "price-asc")  return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "stock")      return b.stock - a.stock;
    if (sortBy === "name")       return a.model.localeCompare(b.model);
    return 0;
  });
}

/**
 * Devuelve el item con menor precio de un array.
 * Usado en ComparePanel para marcar el "mejor precio".
 */
export function getBestPrice(items) {
  if (!items || items.length === 0) return null;
  return items.reduce((best, item) => (item.price < best.price ? item : best));
}

/**
 * Calcula el porcentaje de ahorro entre el precio más alto y el más bajo.
 */
export function savingsPercent(items) {
  if (!items || items.length < 2) return 0;
  const max = Math.max(...items.map((i) => i.price));
  const min = Math.min(...items.map((i) => i.price));
  return Math.round(((max - min) / max) * 100);
}

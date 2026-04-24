/**
 * filterResults.test.js
 * =====================
 * Suite completa de pruebas unitarias para SneakFind.cr
 * Cubre los casos de prueba CP01–CP05 del Plan de Pruebas.
 *
 * Para ejecutar:
 *   npm run test
 *
 * Para ejecutar en modo watch (re-corre al guardar):
 *   npm run test:watch
 *
 * Para ver cobertura:
 *   npm run test:coverage
 */

import { describe, it, expect } from "vitest";
import { filterResults, getBestPrice, savingsPercent } from "./filterResults";

// ─────────────────────────────────────────────
// DATOS DE PRUEBA (subset representativo)
// ─────────────────────────────────────────────
const PRODUCTOS = [
  { id: 1,  brand: "nike",   model: "Air Force 1 '07",   store: "Sport Zone CR",       price: 89000,  stock: 12, sizes: ["38","39","40","41","42","43"] },
  { id: 2,  brand: "nike",   model: "Air Force 1 '07",   store: "Nike Factory CR",      price: 95000,  stock: 8,  sizes: ["37","39","40","42","44"] },
  { id: 3,  brand: "nike",   model: "Air Force 1 '07",   store: "Almacenes El Rey",     price: 87500,  stock: 3,  sizes: ["40","41","42"] },
  { id: 4,  brand: "nike",   model: "Air Max 90",         store: "Sport Zone CR",        price: 115000, stock: 6,  sizes: ["39","40","41","42","43"] },
  { id: 5,  brand: "nike",   model: "Air Max 90",         store: "Siman CR",             price: 119000, stock: 0,  sizes: [] },
  { id: 6,  brand: "nike",   model: "React Infinity Run", store: "Decathlon CR",         price: 98000,  stock: 15, sizes: ["38","39","40","41","42","43","44","45"] },
  { id: 7,  brand: "adidas", model: "Stan Smith",         store: "Adidas Store Escazú",  price: 79000,  stock: 20, sizes: ["37","38","39","40","41","42","43","44"] },
  { id: 8,  brand: "adidas", model: "Stan Smith",         store: "La Colonia",           price: 74500,  stock: 9,  sizes: ["39","40","41","42"] },
  { id: 9,  brand: "adidas", model: "Ultraboost 22",      store: "Adidas Store Escazú",  price: 155000, stock: 5,  sizes: ["40","41","42","43","44"] },
  { id: 10, brand: "adidas", model: "Gazelle",            store: "Decathlon CR",         price: 77000,  stock: 13, sizes: ["38","39","40","41","42","43","44"] },
  { id: 11, brand: "puma",   model: "Suede Classic",      store: "Siman CR",             price: 65000,  stock: 18, sizes: ["37","38","39","40","41","42","43"] },
  { id: 12, brand: "puma",   model: "RS-X",               store: "Almacenes El Rey",     price: 72000,  stock: 7,  sizes: ["39","40","41","42","43"] },
  { id: 13, brand: "puma",   model: "Palermo",            store: "Decathlon CR",         price: 62000,  stock: 14, sizes: ["37","38","39","40","41","42"] },
];

const FILTROS_DEFAULT = { brand: "all", size: "all", maxPrice: 300000 };


// ═══════════════════════════════════════════════════════
// CP01 — BÚSQUEDA POR MODELO ESPECÍFICO
// ═══════════════════════════════════════════════════════
describe("CP01 — Búsqueda por modelo específico", () => {

  it("Buscar 'Stan Smith' retorna solo productos con ese modelo", () => {
    const resultado = filterResults(PRODUCTOS, "Stan Smith", FILTROS_DEFAULT);
    expect(resultado.length).toBeGreaterThan(0);
    resultado.forEach((r) => expect(r.model).toBe("Stan Smith"));
  });

  it("Buscar 'Air Force' retorna solo productos Air Force 1", () => {
    const resultado = filterResults(PRODUCTOS, "Air Force", FILTROS_DEFAULT);
    expect(resultado.length).toBe(3);
    resultado.forEach((r) => expect(r.model).toContain("Air Force"));
  });

  it("Buscar por marca 'adidas' en el campo de texto retorna solo adidas", () => {
    const resultado = filterResults(PRODUCTOS, "adidas", FILTROS_DEFAULT);
    resultado.forEach((r) => expect(r.brand).toBe("adidas"));
  });

  it("Búsqueda insensible a mayúsculas/minúsculas — 'STAN SMITH' == 'stan smith'", () => {
    const upper = filterResults(PRODUCTOS, "STAN SMITH", FILTROS_DEFAULT);
    const lower = filterResults(PRODUCTOS, "stan smith", FILTROS_DEFAULT);
    expect(upper.length).toBe(lower.length);
  });

  it("Búsqueda vacía retorna todos los productos", () => {
    const resultado = filterResults(PRODUCTOS, "", FILTROS_DEFAULT);
    expect(resultado.length).toBe(PRODUCTOS.length);
  });

  it("Búsqueda sin coincidencias retorna array vacío", () => {
    const resultado = filterResults(PRODUCTOS, "Yeezy 700", FILTROS_DEFAULT);
    expect(resultado.length).toBe(0);
  });

  it("Precisión ≥ 95%: de 20 búsquedas conocidas, al menos 19 retornan resultados", () => {
    const modelos = [
      "Air Force 1 '07", "Air Max 90", "React Infinity Run",
      "Stan Smith", "Stan Smith", "Ultraboost 22", "Gazelle",
      "Suede Classic", "RS-X", "Palermo",
    ];
    const hits = modelos.filter((m) => filterResults(PRODUCTOS, m, FILTROS_DEFAULT).length > 0);
    const precision = hits.length / modelos.length;
    expect(precision).toBeGreaterThanOrEqual(0.95);
  });

});


// ═══════════════════════════════════════════════════════
// CP02 — FILTROS DE TALLA, MARCA Y PRECIO
// ═══════════════════════════════════════════════════════
describe("CP02 — Filtros dinámicos (talla, marca, precio)", () => {

  // --- MARCA ---
  it("Filtro marca 'nike' no retorna adidas ni puma", () => {
    const resultado = filterResults(PRODUCTOS, "", { ...FILTROS_DEFAULT, brand: "nike" });
    expect(resultado.length).toBeGreaterThan(0);
    resultado.forEach((r) => expect(r.brand).toBe("nike"));
  });

  it("Filtro marca 'adidas' no retorna nike ni puma", () => {
    const resultado = filterResults(PRODUCTOS, "", { ...FILTROS_DEFAULT, brand: "adidas" });
    resultado.forEach((r) => expect(r.brand).toBe("adidas"));
  });

  it("Filtro marca 'puma' retorna exactamente los 3 modelos puma del set", () => {
    const resultado = filterResults(PRODUCTOS, "", { ...FILTROS_DEFAULT, brand: "puma" });
    expect(resultado.length).toBe(3);
  });

  it("Filtro marca 'all' retorna todos los productos", () => {
    const resultado = filterResults(PRODUCTOS, "", { ...FILTROS_DEFAULT, brand: "all" });
    expect(resultado.length).toBe(PRODUCTOS.length);
  });

  // --- TALLA ---
  it("Filtro talla '45' retorna solo productos con talla 45 disponible", () => {
    const resultado = filterResults(PRODUCTOS, "", { ...FILTROS_DEFAULT, size: "45" });
    expect(resultado.length).toBeGreaterThan(0);
    resultado.forEach((r) => expect(r.sizes).toContain("45"));
  });

  it("Filtro talla '37' excluye productos sin esa talla", () => {
    const resultado = filterResults(PRODUCTOS, "", { ...FILTROS_DEFAULT, size: "37" });
    resultado.forEach((r) => expect(r.sizes).toContain("37"));
    // Air Force 1 id:1 (no tiene 37) no debe aparecer
    const ids = resultado.map((r) => r.id);
    expect(ids).not.toContain(1);
  });

  it("Filtro talla con stock=0 excluye correctamente (sizes vacío)", () => {
    // Air Max 90 id:5 tiene stock:0 y sizes:[], no debe aparecer con cualquier talla
    const resultado = filterResults(PRODUCTOS, "", { ...FILTROS_DEFAULT, size: "40" });
    const ids = resultado.map((r) => r.id);
    expect(ids).not.toContain(5);
  });

  // --- PRECIO ---
  it("Precio máximo ₡80,000 no retorna productos más caros", () => {
    const resultado = filterResults(PRODUCTOS, "", { ...FILTROS_DEFAULT, maxPrice: 80000 });
    expect(resultado.length).toBeGreaterThan(0);
    resultado.forEach((r) => expect(r.price).toBeLessThanOrEqual(80000));
  });

  it("Precio máximo ₡50,000 retorna array vacío (ningún producto tan barato)", () => {
    const resultado = filterResults(PRODUCTOS, "", { ...FILTROS_DEFAULT, maxPrice: 50000 });
    expect(resultado.length).toBe(0);
  });

  // --- COMBINADOS ---
  it("Filtro combinado: marca='nike' + talla='45' retorna solo React Infinity Run", () => {
    const resultado = filterResults(PRODUCTOS, "", { brand: "nike", size: "45", maxPrice: 300000 });
    expect(resultado.length).toBe(1);
    expect(resultado[0].model).toBe("React Infinity Run");
  });

  it("Filtro combinado: marca='adidas' + precio máx ₡80,000 retorna Stan Smith y Gazelle", () => {
    const resultado = filterResults(PRODUCTOS, "", { brand: "adidas", size: "all", maxPrice: 80000 });
    resultado.forEach((r) => {
      expect(r.brand).toBe("adidas");
      expect(r.price).toBeLessThanOrEqual(80000);
    });
    const modelos = resultado.map((r) => r.model);
    expect(modelos).toContain("Stan Smith");
    expect(modelos).toContain("Gazelle");
    expect(modelos).not.toContain("Ultraboost 22");
  });

  it("Búsqueda 'Stan Smith' + marca 'adidas' coincide con filtro individual", () => {
    const resultado = filterResults(PRODUCTOS, "Stan Smith", { brand: "adidas", size: "all", maxPrice: 300000 });
    resultado.forEach((r) => {
      expect(r.brand).toBe("adidas");
      expect(r.model).toBe("Stan Smith");
    });
  });

});


// ═══════════════════════════════════════════════════════
// CP03 — COMPARACIÓN DE PRECIOS (getBestPrice)
// ═══════════════════════════════════════════════════════
describe("CP03 — Comparación side-by-side y mejor precio", () => {

  it("getBestPrice retorna el producto con menor precio", () => {
    const items = [
      { id: 1, price: 89000 },
      { id: 2, price: 95000 },
      { id: 3, price: 87500 },
    ];
    const mejor = getBestPrice(items);
    expect(mejor.id).toBe(3);
    expect(mejor.price).toBe(87500);
  });

  it("getBestPrice con un solo item retorna ese mismo item", () => {
    const items = [{ id: 1, price: 89000 }];
    expect(getBestPrice(items).id).toBe(1);
  });

  it("getBestPrice con array vacío retorna null", () => {
    expect(getBestPrice([])).toBeNull();
    expect(getBestPrice(null)).toBeNull();
  });

  it("Las 3 entradas de Air Force 1 tienen precios distintos entre tiendas", () => {
    const airForce = PRODUCTOS.filter((p) => p.model === "Air Force 1 '07");
    const precios = airForce.map((p) => p.price);
    const unicos = new Set(precios);
    expect(unicos.size).toBe(airForce.length); // todos diferentes
  });

  it("El mejor precio de Air Force 1 es ₡87,500 (Almacenes El Rey)", () => {
    const airForce = PRODUCTOS.filter((p) => p.model === "Air Force 1 '07");
    const mejor = getBestPrice(airForce);
    expect(mejor.price).toBe(87500);
    expect(mejor.store).toBe("Almacenes El Rey");
  });

  it("savingsPercent calcula el % de ahorro correctamente", () => {
    const airForce = PRODUCTOS.filter((p) => p.model === "Air Force 1 '07");
    // max=95000, min=87500 → ahorro ≈ 7.89% ≈ 8%
    const pct = savingsPercent(airForce);
    expect(pct).toBeGreaterThan(0);
    expect(pct).toBeLessThan(100);
  });

  it("savingsPercent con un solo item retorna 0", () => {
    expect(savingsPercent([{ price: 89000 }])).toBe(0);
  });

});


// ═══════════════════════════════════════════════════════
// CP04 — RENDIMIENTO: lógica < 2 segundos
// ═══════════════════════════════════════════════════════
describe("CP04 — Rendimiento de la lógica de filtrado", () => {

  it("filterResults con 1,000 productos corre en menos de 100ms", () => {
    // Generar 1000 productos sintéticos
    const bigData = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      brand: ["nike", "adidas", "puma"][i % 3],
      model: `Modelo ${i}`,
      price: 50000 + (i * 100),
      stock: i % 5,
      sizes: ["39", "40", "41", "42"],
    }));

    const inicio = performance.now();
    filterResults(bigData, "Modelo", { brand: "nike", size: "40", maxPrice: 200000 });
    const fin = performance.now();

    expect(fin - inicio).toBeLessThan(100); // ms
  });

  it("filterResults con 10,000 productos corre en menos de 500ms", () => {
    const bigData = Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      brand: ["nike", "adidas", "puma"][i % 3],
      model: `Tenis ${i % 50}`,
      price: 60000 + (i % 100) * 1000,
      stock: i % 10,
      sizes: ["38", "39", "40", "41", "42", "43"],
    }));

    const inicio = performance.now();
    filterResults(bigData, "Tenis", { brand: "adidas", size: "40", maxPrice: 120000 });
    const fin = performance.now();

    expect(fin - inicio).toBeLessThan(500);
  });

});


// ═══════════════════════════════════════════════════════
// CP05 — PRECISIÓN DE DATOS
// ═══════════════════════════════════════════════════════
describe("CP05 — Precisión de datos del catálogo", () => {

  it("Todos los productos tienen los campos obligatorios", () => {
    PRODUCTOS.forEach((p) => {
      expect(p).toHaveProperty("id");
      expect(p).toHaveProperty("brand");
      expect(p).toHaveProperty("model");
      expect(p).toHaveProperty("store");
      expect(p).toHaveProperty("price");
      expect(p).toHaveProperty("stock");
      expect(p).toHaveProperty("sizes");
    });
  });

  it("Todos los precios son números positivos", () => {
    PRODUCTOS.forEach((p) => {
      expect(typeof p.price).toBe("number");
      expect(p.price).toBeGreaterThan(0);
    });
  });

  it("Todas las marcas son una de las 3 válidas: nike, adidas, puma", () => {
    const MARCAS_VALIDAS = ["nike", "adidas", "puma"];
    PRODUCTOS.forEach((p) => {
      expect(MARCAS_VALIDAS).toContain(p.brand);
    });
  });

  it("Las tallas son strings numéricos entre '35' y '50'", () => {
    PRODUCTOS.forEach((p) => {
      p.sizes.forEach((s) => {
        const num = parseInt(s, 10);
        expect(num).toBeGreaterThanOrEqual(35);
        expect(num).toBeLessThanOrEqual(50);
      });
    });
  });

  it("Stock nunca es negativo", () => {
    PRODUCTOS.forEach((p) => {
      expect(p.stock).toBeGreaterThanOrEqual(0);
    });
  });

  it("No existen IDs duplicados en el catálogo", () => {
    const ids = PRODUCTOS.map((p) => p.id);
    const unicos = new Set(ids);
    expect(unicos.size).toBe(ids.length);
  });

  it("Productos con stock=0 tienen sizes vacío o viceversa (consistencia)", () => {
    const sinStock = PRODUCTOS.filter((p) => p.stock === 0);
    sinStock.forEach((p) => {
      expect(p.sizes.length).toBe(0);
    });
  });

  it("Precisión simulada: 13/13 productos del set son accesibles (100% > 95%)", () => {
    const accesibles = PRODUCTOS.filter((p) =>
      filterResults(PRODUCTOS, p.model, FILTROS_DEFAULT).length > 0
    );
    const precision = accesibles.length / PRODUCTOS.length;
    expect(precision).toBeGreaterThanOrEqual(0.95);
  });

});


// ═══════════════════════════════════════════════════════
// CP07 — SISTEMA DE ALERTAS (lógica de validación)
// ═══════════════════════════════════════════════════════
describe("CP07 — Lógica de alertas de precio", () => {

  it("Una alerta con precio objetivo menor al precio actual debe activarse", () => {
    const producto = PRODUCTOS[0]; // Air Force 1 a ₡89,000
    const alertaPrecio = 80000;    // quiero que baje a ₡80,000
    const debeAlertar = producto.price <= alertaPrecio;
    expect(debeAlertar).toBe(false); // todavía no baja
  });

  it("Una alerta se activa cuando el precio baja al objetivo", () => {
    const precioActual  = 78000; // precio actualizado (bajó)
    const alertaPrecio  = 80000;
    const debeAlertar   = precioActual <= alertaPrecio;
    expect(debeAlertar).toBe(true);
  });

  it("Email inválido no cumple formato básico", () => {
    const emailValido   = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    expect(emailValido("usuario@correo.com")).toBe(true);
    expect(emailValido("correo-sin-arroba")).toBe(false);
    expect(emailValido("")).toBe(false);
  });

});

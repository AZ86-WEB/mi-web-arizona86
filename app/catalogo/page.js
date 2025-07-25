"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaSearch, FaUndo } from "react-icons/fa";
import { useProductos } from "../context/ProductosContext";

export default function CatalogoPage() {
  const { productos } = useProductos(); // Usa el contexto de productos
  const [busqueda, setBusqueda] = useState("");
  const [filtroPrecio, setFiltroPrecio] = useState(0); // se ajusta en useEffect
  const [esMobile, setEsMobile] = useState(false);

  // Slider: Determina el rango real de precios
  const precioMin = productos.length > 0 ? Math.min(...productos.map(p => p.precio)) : 0;
  const precioMax = productos.length > 0 ? Math.max(...productos.map(p => p.precio)) : 0;

  // Inicializa el slider al precio máximo disponible al cargar productos
  useEffect(() => {
    if (precioMax > 0) setFiltroPrecio(precioMax);
  }, [precioMax]);

  // Responsividad para filtros apilados en móvil
  useEffect(() => {
    function handleResize() {
      setEsMobile(window.innerWidth < 700);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filtrar productos por texto de búsqueda y precio
  const productosFiltrados = productos.filter(prod =>
    (prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      prod.descripcion.toLowerCase().includes(busqueda.toLowerCase())) &&
    prod.precio <= filtroPrecio
  );

  // Restablecer el filtro de precio
  function restablecerPrecio() {
    setFiltroPrecio(precioMax);
  }

  return (
    <main style={{ maxWidth: 950, margin: "0 auto", padding: "40px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 18 }}>
        Catálogo de Productos
      </h1>
      
      {/* Barra de búsqueda y filtro de precio */}
      <div
        style={{
          display: "flex",
          gap: esMobile ? 18 : 28,
          flexWrap: esMobile ? "wrap" : "nowrap",
          alignItems: esMobile ? "stretch" : "center",
          marginBottom: 24,
          flexDirection: esMobile ? "column" : "row",
          width: "100%",
        }}
      >
        {/* Input de búsqueda con icono */}
        <div
          style={{
            position: "relative",
            width: esMobile ? "100%" : 340,
            minWidth: 180,
            maxWidth: 1000,
            flexShrink: 0,
            marginBottom: esMobile ? 18 : 0
          }}
        >
          <FaSearch
            style={{
              position: "absolute",
              top: "50%",
              left: 12,
              transform: "translateY(-50%)",
              color: "#bbb"
            }}
          />
          <input
            type="text"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar mueble, tipo, etc..."
            style={{
              width: "100%",
              padding: "10px 12px 10px 38px",
              borderRadius: 8,
              border: "1.5px solid #ddd",
              fontSize: 16,
              outline: "none",
              background: "#fff"
            }}
          />
        </div>
        {/* Slider de precios y botón restablecer */}
        <div
          style={{
            minWidth: 200,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: esMobile ? "stretch" : "flex-end",
            gap: 7
          }}
        >
          <label style={{ fontWeight: 500, fontSize: 15, color: "#222", width: esMobile ? "100%" : "70%", textAlign: esMobile ? "left" : "right" }}>
            Precio máximo: <b>${filtroPrecio}</b>
          </label>
          <input
            type="range"
            min={precioMin}
            max={precioMax}
            value={filtroPrecio}
            onChange={e => setFiltroPrecio(Number(e.target.value))}
            style={{ width: esMobile ? "100%" : "70%" }}
          />
          {/* Botón restablecer, SIEMPRE abajo del slider */}
          <div style={{
            width: esMobile ? "100%" : "70%",
            display: "flex",
            justifyContent: esMobile ? "center" : "flex-end"
          }}>
            <button
              type="button"
              onClick={restablecerPrecio}
              disabled={filtroPrecio === precioMax}
              style={{
                marginTop: 8,
                background: filtroPrecio === precioMax ? "#eee" : "#188944",
                color: filtroPrecio === precioMax ? "#888" : "#fff",
                border: "none",
                borderRadius: 7,
                padding: "7px 16px",
                fontWeight: 700,
                fontSize: "0.98rem",
                cursor: filtroPrecio === precioMax ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: 7,
                transition: "background .18s"
              }}
            >
              <FaUndo style={{ marginRight: 3 }} /> Restablecer
            </button>
          </div>
        </div>
      </div>
      {/* Cantidad de resultados */}
      <div style={{
        fontSize: 16,
        color: productosFiltrados.length > 0 ? "#188944" : "#ef4444",
        fontWeight: 700,
        marginBottom: 12,
        minHeight: 22
      }}>
        {productosFiltrados.length === 0
          ? "No hay productos que coincidan."
          : productosFiltrados.length === 1
            ? "1 producto encontrado"
            : `${productosFiltrados.length} productos encontrados`}
      </div>
      
      {/* Grid de productos */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "2.3rem",
        marginTop: "1.7rem"
      }}>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(prod => (
            <div key={prod.id} style={{
              border: "1.5px solid #eee",
              borderRadius: "18px",
              boxShadow: "0 2px 12px 0 rgba(120,120,120,0.06)",
              padding: "1.3rem",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <img
                src={prod.imagen}
                alt={prod.nombre}
                style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "13px", marginBottom: 12 }}
              />
              <h2 style={{ marginTop: "0.5rem", fontSize: 19 }}>{prod.nombre}</h2>
              <p style={{ minHeight: "50px", color: "#333", fontSize: 15 }}>{prod.descripcion}</p>
              <div style={{ fontWeight: "bold", color: "#188944", fontSize: "1.2rem", margin: "1rem 0 0.6rem 0" }}>
                ${prod.precio} MXN
              </div>
              <Link href={`/catalogo/${prod.id}`}>
                <button style={{
                  background: "#188944",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9,
                  padding: "10px 18px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer"
                }}>Ver detalles</button>
              </Link>
            </div>
          ))
        ) : (
          <div style={{
            gridColumn: "1 / -1",
            color: "#999",
            fontSize: "1.18rem",
            textAlign: "center",
            background: "#fff",
            borderRadius: 14,
            padding: "38px 0",
            boxShadow: "0 2px 12px #2221"
          }}>
            <b>No encontramos productos con ese criterio.</b><br />
            Prueba con otra palabra o <Link href="/contacto" style={{ color: "#188944", textDecoration: "underline" }}>contáctanos</Link>.
          </div>
        )}
      </div>
    </main>
  );
}

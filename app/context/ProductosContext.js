"use client";
import { createContext, useContext, useState, useEffect } from "react";

const productosIniciales = [
  {
    id: 1,
    nombre: "Mesa Paramétrica CNC",
    descripcion: "Mesa de diseño único cortada con CNC, acabados en madera de pino, fácil de ensamblar.",
    precio: 4200,
    categoria: "Mesas",
    imagen: "/catalogo/mesa-parametrica.jpg",
    glb: "/catalogo/models/mesa-parametrica.glb"
  },
  {
    id: 2,
    nombre: "Sillón Modular Reclinable",
    descripcion: "Sillón con módulos intercambiables y reclinables, opción de bocinas y cargador inalámbrico.",
    precio: 7100,
    categoria: "Sillones",
    imagen: "/catalogo/sillon-reclinable.jpg",
    glb: "/catalogo/models/sillon-reclinable.glb"
  },
  {
    id: 3,
    nombre: "Zapatera Minimalista",
    descripcion: "Zapatera para entrada, madera sólida CNC, diseño compacto y moderno.",
    precio: 1600,
    categoria: "Zapateras",
    imagen: "/catalogo/zapatera.jpg",
    glb: "/catalogo/models/zapatera.glb"
  },
  {
    id: 4,
    nombre: "Repisas Geométricas",
    descripcion: "Set de repisas flotantes, diferentes formas y tamaños, para cualquier pared.",
    precio: 950,
    categoria: "Repisas",
    imagen: "/catalogo/repisa.jpg",
    glb: "/catalogo/models/repisa-cnc.glb"
  },
];

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);

  // Al iniciar, cargar productos desde LS, y si no hay, poner los iniciales
  useEffect(() => {
    if (typeof window === "undefined") return;
    let guardados = [];
    try {
      guardados = JSON.parse(localStorage.getItem("az86_productos")) || [];
    } catch {}
    if (!guardados.length) {
      setProductos(productosIniciales);
      localStorage.setItem("az86_productos", JSON.stringify(productosIniciales));
    } else {
      setProductos(guardados);
    }
  }, []);

  // Sincronizar con LocalStorage cada vez que productos cambia
  useEffect(() => {
    if (productos.length) {
      localStorage.setItem("az86_productos", JSON.stringify(productos));
    }
  }, [productos]);

  // Métodos para agregar, editar, eliminar
  function agregarProducto(producto) {
    setProductos(prev => [...prev, { ...producto, id: Date.now() }]);
  }
  function editarProducto(id, datos) {
    setProductos(prev => prev.map(p => p.id === id ? { ...p, ...datos } : p));
  }
  function eliminarProducto(id) {
    setProductos(prev => prev.filter(p => p.id !== id));
  }

  return (
    <ProductosContext.Provider value={{ productos, agregarProducto, editarProducto, eliminarProducto }}>
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductosContext);
}

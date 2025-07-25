"use client";
import { useState, useEffect } from "react";

// Clave para productos en localStorage
const KEY = "az86_productos";

// Leer productos de localStorage
function getProductosLS() {
  if (typeof window === "undefined") return [];
  try {
    const arr = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
// Guardar productos en localStorage
function setProductosLS(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr));
}

export default function AdminPanel() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    id: null, nombre: "", descripcion: "", precio: "", categoria: "", imagen: "", glb: ""
  });
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");

  // Carga productos de localStorage al montar
  useEffect(() => {
    setProductos(getProductosLS());
  }, []);

  // Cambios de formulario
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Guardar o actualizar producto
  const handleSave = () => {
    if (!form.nombre.trim() || !form.precio) {
      setMsg("¡Nombre y precio son obligatorios!");
      return;
    }
    let nuevos;
    if (editId) {
      nuevos = productos.map(p => p.id === editId ? { ...form, id: editId, precio: Number(form.precio) } : p);
      setMsg("¡Producto actualizado!");
    } else {
      const nextId = productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1;
      nuevos = [...productos, { ...form, id: nextId, precio: Number(form.precio) }];
      setMsg("¡Producto agregado!");
    }
    setProductos(nuevos);
    setProductosLS(nuevos);
    setForm({ id: null, nombre: "", descripcion: "", precio: "", categoria: "", imagen: "", glb: "" });
    setEditId(null);
    setTimeout(() => setMsg(""), 2000);
  };

  // Editar producto
  const handleEdit = p => {
    setForm({ ...p });
    setEditId(p.id);
    setMsg("");
  };

  // Eliminar producto
  const handleDelete = id => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    const nuevos = productos.filter(p => p.id !== id);
    setProductos(nuevos);
    setProductosLS(nuevos);
    setMsg("Producto eliminado.");
    setTimeout(() => setMsg(""), 1800);
    if (editId === id) {
      setForm({ id: null, nombre: "", descripcion: "", precio: "", categoria: "", imagen: "", glb: "" });
      setEditId(null);
    }
  };

  // Auth simple
  if (!auth) {
    return (
      <main style={{ maxWidth: 400, margin: "0 auto", padding: 40 }}>
        <h2>Admin Panel</h2>
        <input
          type="password"
          placeholder="Contraseña de admin"
          value={pw}
          onChange={e => setPw(e.target.value)}
          style={{ marginBottom: 20, padding: 10, borderRadius: 8, border: "1px solid #ddd", width: "100%" }}
        />
        <button
          onClick={() => setAuth(pw === "AZ86admin")}
          style={{ padding: "10px 18px", borderRadius: 8, background: "#188944", color: "#fff", border: "none", width: "100%", fontWeight: 700 }}
        >
          Entrar
        </button>
        <div style={{ color: "#888", marginTop: 20, fontSize: 15 }}>
          Contraseña: <b>AZ86admin</b>
        </div>
      </main>
    );
  }

  // UI del panel admin
  return (
    <main style={{ maxWidth: 940, margin: "0 auto", padding: "40px 10px" }}>
      <h2 style={{ fontWeight: 700, fontSize: 27, marginBottom: 15 }}>Panel de Administración</h2>
      <div style={{
        background: "#f6f6f6",
        padding: 18,
        borderRadius: 11,
        margin: "30px 0 28px 0",
        maxWidth: 530,
        boxShadow: "0 2px 8px #0001"
      }}>
        <h3 style={{ marginTop: 0 }}>{editId ? "Editar producto" : "Agregar producto"}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 7, border: "1px solid #ccc" }}
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 7, border: "1px solid #ccc", minHeight: 40 }}
          />
          <input
            name="precio"
            type="number"
            placeholder="Precio"
            value={form.precio}
            onChange={handleChange}
            min={0}
            style={{ padding: 8, borderRadius: 7, border: "1px solid #ccc" }}
          />
          <input
            name="categoria"
            placeholder="Categoría"
            value={form.categoria}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 7, border: "1px solid #ccc" }}
          />
          <input
            name="imagen"
            placeholder="URL imagen"
            value={form.imagen}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 7, border: "1px solid #ccc" }}
          />
          {/* Campo para modelo 3D */}
          <input
            name="glb"
            placeholder="URL modelo 3D (.glb)"
            value={form.glb}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 7, border: "1px solid #ccc" }}
          />
          <div style={{ display: "flex", gap: 7, alignItems: "center", marginTop: 7 }}>
            <button
              onClick={handleSave}
              style={{
                background: "#188944",
                color: "#fff",
                border: "none",
                padding: "9px 18px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer"
              }}
            >
              {editId ? "Actualizar" : "Agregar"}
            </button>
            {editId && (
              <button
                onClick={() => { setEditId(null); setForm({ id: null, nombre: "", descripcion: "", precio: "", categoria: "", imagen: "", glb: "" }) }}
                style={{ color: "#188944", background: "#fff", border: "1px solid #188944", padding: "8px 16px", borderRadius: 8, fontWeight: 700 }}
              >Cancelar</button>
            )}
            {msg && (
              <span style={{ color: "#00732d", fontWeight: 600, marginLeft: 16, fontSize: 14 }}>{msg}</span>
            )}
          </div>
        </div>
      </div>
      {/* Lista de productos */}
      <h3 style={{ marginTop: 18 }}>Productos actuales</h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16 }}>
          <thead>
            <tr style={{ background: "#e7ecec" }}>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Imagen</th>
              <th>Modelo 3D</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(prod => (
              <tr key={prod.id}
                style={{
                  borderBottom: "1px solid #ececec",
                  background: editId === prod.id ? "#eaffea" : "#fff"
                }}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>${prod.precio}</td>
                <td>{prod.categoria}</td>
                <td>
                  {prod.imagen && (
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      style={{
                        width: 54, height: 38, borderRadius: 5, objectFit: "cover",
                        boxShadow: "0 2px 8px #0001", border: "1px solid #eee"
                      }}
                    />
                  )}
                </td>
                <td>
                  {prod.glb && (
                    <a href={prod.glb} target="_blank" rel="noopener noreferrer" style={{ color: "#188944", fontWeight: 700, textDecoration: "underline" }}>Ver GLB</a>
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(prod)} style={{ marginRight: 8, color: "#111", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Editar</button>
                  <button onClick={() => handleDelete(prod.id)} style={{ color: "#e11d48", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {productos.length === 0 && <div style={{ margin: 30, color: "#888" }}>No hay productos.</div>}
      </div>
    </main>
  );
}

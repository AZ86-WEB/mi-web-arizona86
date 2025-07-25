"use client";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useProductos } from "../../context/ProductosContext";
import Product3DViewer from "../../components/Product3DViewer";

export default function ProductoDetallePage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { productos } = useProductos();

  const productoId = Number(params.productoId);
  const producto = productos.find(p => p.id === productoId);

  if (!producto) {
    return (
      <main>
        <h1>Producto no encontrado</h1>
        <button onClick={() => router.back()} className="button">Regresar</button>
      </main>
    );
  }

  return (
    <main>
      <button onClick={() => router.back()} className="button" style={{ marginBottom: "1.4rem" }}>← Regresar</button>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2.5rem"
      }}>
        <div>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            style={{ width: "370px", height: "320px", objectFit: "cover", borderRadius: "18px", maxWidth: "100%" }}
          />
          {/* Mostrar visor 3D SOLO si hay modelo glb */}
          {producto.glb && (
            <div style={{ marginTop: "1rem", width: 370, height: 320 }}>
              <Product3DViewer glbPath={producto.glb} />
            </div>
          )}
        </div>
        <div>
          <h1>{producto.nombre}</h1>
          <p style={{ fontSize: "1.18rem" }}>{producto.descripcion}</p>
          <div style={{ fontWeight: "bold", color: "#111", fontSize: "1.35rem", margin: "1.3rem 0" }}>
            ${producto.precio} MXN
          </div>
          <div>
            <strong>Categoría:</strong> {producto.categoria}
          </div>
          <button
            onClick={() => addToCart(producto)}
            style={{
              marginTop: "1.5rem",
              padding: "0.7rem 1.6rem",
              borderRadius: "9px",
              background: "#111",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.05rem",
              border: "none",
              cursor: "pointer"
            }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </main>
  );
}

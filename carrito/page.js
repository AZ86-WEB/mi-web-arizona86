"use client";
import { useCart } from "../context/CartContext";

export default function CarritoPage() {
  const { cart, removeFromCart, setQuantity, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <main>
        <h1>Carrito de Compras</h1>
        <p>Aquí verás los productos que hayas agregado.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Carrito de Compras</h1>
      <ul style={{listStyle: "none", padding: 0, marginTop: "2rem"}}>
        {cart.map(prod => (
          <li key={prod.id} style={{
            display: "flex", alignItems: "center", gap: "1.3rem",
            borderBottom: "1px solid #eee", padding: "1.2rem 0"
          }}>
            <img src={prod.imagen} alt={prod.nombre} style={{ width: 90, borderRadius: 12 }} />
            <div>
              <strong>{prod.nombre}</strong>
              <div style={{fontSize: "1.09rem", color: "#111"}}>${prod.precio} MXN</div>
            </div>
            <div>
              <label>
                Cantidad:
                <input
                  type="number"
                  min={1}
                  value={prod.cantidad}
                  onChange={e => setQuantity(prod.id, Number(e.target.value))}
                  style={{ width: 50, marginLeft: 8 }}
                />
              </label>
            </div>
            <button onClick={() => removeFromCart(prod.id)} style={{
              marginLeft: "1rem", background: "#eee", borderRadius: 7, padding: "0.2rem 0.8rem"
            }}>Quitar</button>
          </li>
        ))}
      </ul>
      <div style={{marginTop: "2rem", fontWeight: "bold"}}>
        Total: ${cart.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)} MXN
      </div>
      <button onClick={clearCart} style={{marginTop: 20, background: "#eee", borderRadius: 9, padding: "0.6rem 1.3rem"}}>
        Vaciar carrito
      </button>
    </main>
  );
}

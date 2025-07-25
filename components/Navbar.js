"use client";
import Link from "next/link";
import { useState } from "react";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + (item.cantidad || 1), 0);

  const toggleMenu = () => setOpen(prev => !prev);

  return (
    <header className="navbar">
      <nav className="nav-container">
        <Link href="/" className="brand-link">
          <img src="/logo.png" alt="Logo" className="logo" />
          <span className="brand-text">Arizona 86 Carpintería</span>
        </Link>

        <div className="nav-links-desktop">
          <NavLink href="/catalogo" label="Catálogo" />
          <NavLink href="/quienes-somos" label="Quiénes somos" />
          <NavLink href="/contacto" label="Contacto" />
        </div>

        <div className="nav-actions">
          {!user ? (
            <Link href="/login" className="auth-link">Iniciar sesión</Link>
          ) : (
            <div className="user-box">
              <Link href="/perfil" className="auth-link">
                Hola, {user.nombre?.split(" ")[0] || user.correo}
              </Link>
              <button className="logout-btn" onClick={logout}>Cerrar sesión</button>
            </div>
          )}

          <Link href="/carrito" className="cart-btn">
            <FaShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            <span className="cart-label">Carrito</span>
          </Link>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menú">
            <FaBars size={24} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="nav-mobile">
          <NavLink href="/catalogo" label="Catálogo" mobile onClick={toggleMenu} />
          <NavLink href="/quienes-somos" label="Quiénes somos" mobile onClick={toggleMenu} />
          <NavLink href="/contacto" label="Contacto" mobile onClick={toggleMenu} />
          {!user ? (
            <Link href="/login" className="mobile-link" onClick={toggleMenu}>Iniciar sesión</Link>
          ) : (
            <>
              <Link href="/perfil" className="mobile-link" onClick={toggleMenu}>
                Hola, {user.nombre?.split(" ")[0] || user.correo}
              </Link>
              <button className="logout-btn" onClick={() => { logout(); toggleMenu(); }}>
                Cerrar sesión
              </button>
            </>
          )}
          <Link href="/carrito" className="mobile-link" onClick={toggleMenu}>
            <FaShoppingCart /> Carrito
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      )}

      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          background: white;
          box-shadow: 0 2px 16px #2221;
          z-index: 100;
        }
        .nav-container {
          max-width: 1300px;
          margin: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 64px;
          padding: 0 32px;
        }
        .brand-link {
          display: flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
        }
        .logo {
          width: 50px;
          height: 30px;
          object-fit: contain;
        }
        .brand-text {
          font-weight: 800;
          font-size: 22px;
          color: #212529;
          letter-spacing: -1px;
        }
        .nav-links-desktop {
          display: flex;
          gap: 32px;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .auth-link {
          color: #188944;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
        }
        .logout-btn {
          background: none;
          border: none;
          color: #e11d48;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
        }
        .cart-btn {
          position: relative;
          color: #188944;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }
        .cart-count {
          position: absolute;
          top: -6px;
          right: -10px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          padding: 2px 6px;
          font-size: 12px;
          font-weight: 700;
        }
        .cart-label {
          margin-left: 2px;
        }
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: #188944;
          cursor: pointer;
        }
        .nav-mobile {
          background: white;
          box-shadow: 0 2px 16px #2222;
          border-top: 1px solid #eee;
          padding: 30px 18px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: fadeInDown 0.18s ease-in-out;
        }
        .mobile-link {
          color: #188944;
          font-weight: 700;
          font-size: 18px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .nav-links-desktop {
            display: none;
          }
          .menu-toggle {
            display: block;
          }
        }

        @media (min-width: 901px) {
          .nav-mobile {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}

function NavLink({ href, label, onClick, mobile }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={mobile ? "mobile-link" : "nav-link"}
      style={{
        color: "#232323",
        fontWeight: 700,
        fontSize: mobile ? 18 : 17,
        letterSpacing: "-0.5px",
        textDecoration: "none",
      }}
    >
      {label}
    </Link>
  );
}

"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { FaUserEdit, FaSignOutAlt, FaBoxOpen } from "react-icons/fa";

export default function PerfilPage() {
  const { user, logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const inicial = user.nombre ? user.nombre.charAt(0).toUpperCase() : user.correo.charAt(0).toUpperCase();

  return (
    <main style={{
      maxWidth: 450,
      margin: "3.5rem auto 2rem auto",
      background: "#fff",
      borderRadius: 18,
      boxShadow: "0 4px 32px 0 rgba(60,60,80,0.10)",
      padding: "2.2rem 2rem"
    }}>
      {/* Card de usuario */}
      <section style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
        <div style={{
          background: "#18894422",
          width: 64, height: 64, minWidth: 64, minHeight: 64,
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32, fontWeight: 700, color: "#188944", marginRight: 20
        }}>
          {inicial}
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 22, color: "#222" }}>
            {user.nombre ? user.nombre : "Usuario"}
          </div>
          <div style={{ color: "#60646b", fontSize: 15 }}>{user.correo}</div>
        </div>
        <button
          style={{
            marginLeft: "auto",
            background: "#eafbef",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            padding: "8px 14px",
            color: "#188944",
            fontWeight: 600,
            display: "flex",
            alignItems: "center"
          }}
          title="Editar perfil"
          onClick={() => alert("Pronto podrás editar tu perfil")}
        >
          <FaUserEdit style={{ marginRight: 6 }} />
          Editar
        </button>
      </section>

      <hr style={{ border: 0, borderTop: "1.5px solid #eee", margin: "24px 0" }} />

      {/* Pedidos pasados */}
      <section>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 6,
          color: "#222"
        }}>
          <FaBoxOpen /> Pedidos pasados
        </div>
        <div style={{
          color: "#bbb",
          fontSize: 16,
          marginTop: 10,
          padding: "8px 0",
        }}>
          Todavía no tienes pedidos registrados.
        </div>
      </section>

      <button
        onClick={logout}
        style={{
          background: "#e11d48",
          color: "#fff",
          fontWeight: 700,
          borderRadius: 8,
          fontSize: 16,
          padding: "0.65rem 1.5rem",
          border: "none",
          cursor: "pointer",
          marginTop: 38,
          display: "flex",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
        <FaSignOutAlt style={{ marginRight: 9, fontSize: 19 }} />
        Cerrar sesión
      </button>
    </main>
  );
}

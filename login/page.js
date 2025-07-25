"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const ok = await login(correo, password); // <-- CORREGIDO
    if (ok) {
      router.push("/perfil");
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <main style={{
      maxWidth: 390,
      margin: "3rem auto",
      background: "#fff",
      borderRadius: 18,
      boxShadow: "0 4px 32px 0 rgba(60,60,80,0.10)",
      padding: "2.2rem 2rem"
    }}>
      <h2 style={{ marginBottom: 22, fontWeight: 800, fontSize: 26, textAlign: "center" }}>
        Iniciar sesión
      </h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        {error && (
          <div style={{ color: "#e11d48", fontWeight: 700, marginTop: 4, textAlign: "center" }}>{error}</div>
        )}
        <button type="submit" style={{
          background: "#188944",
          color: "#fff",
          fontWeight: 700,
          borderRadius: 8,
          fontSize: 17,
          padding: "0.75rem 0",
          border: "none",
          cursor: "pointer",
          marginTop: 10
        }}>
          Iniciar sesión
        </button>
      </form>
      {/* ENLACE A REGISTRO */}
      <div style={{ textAlign: "center", marginTop: 25, fontSize: 16 }}>
        ¿No tienes cuenta?{" "}
        <a href="/registro" style={{ color: "#188944", fontWeight: 700, textDecoration: "underline" }}>
          Regístrate
        </a>
      </div>
    </main>
  );
}

// Estilo para los inputs
const inputStyle = {
  padding: "0.75rem 1rem",
  fontSize: 16,
  borderRadius: 8,
  border: "1.5px solid #d3dee5",
  outline: "none",
  fontWeight: 500
};

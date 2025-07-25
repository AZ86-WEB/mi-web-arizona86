"use client";
import Link from "next/link";

export default function QuienesSomos() {
  // Estilos reutilizables
  const cardStyle = {
    background: "#fff",
    borderRadius: 15,
    boxShadow: "0 2px 12px #2221",
    padding: "20px 20px",
    minWidth: 220,
    maxWidth: 310,
    flex: 1
  };
  const cardTitle = {
    color: "#188944",
    fontWeight: 700,
    fontSize: "1.2rem",
    marginBottom: 8
  };
  const cardText = {
    color: "#222",
    fontSize: "1.05rem"
  };
  const buttonStyleGreen = {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    fontWeight: 700,
    fontSize: "1.09rem",
    padding: "12px 30px",
    borderRadius: 11,
    cursor: "pointer",
    marginRight: 18,
    marginTop: 14
  };
  const buttonStyleOutline = {
    background: "#fff",
    color: "#16a34a",
    border: "2px solid #16a34a",
    fontWeight: 700,
    fontSize: "1.09rem",
    padding: "12px 30px",
    borderRadius: 11,
    cursor: "pointer",
    marginTop: 14
  };

  return (
    <main style={{ maxWidth: 950, margin: "0 auto", padding: "46px 18px 28px" }}>
      {/* TITULO */}
      <h1 style={{
        fontSize: "2.4rem",
        fontWeight: 800,
        color: "#188944",
        marginBottom: "16px"
      }}>
        ¿Quiénes somos en <span style={{ color: "#232323" }}>Arizona 86 Carpintería</span>?
      </h1>

      {/* INTRO HISTORIA */}
      <p style={{
        fontSize: "1.15rem",
        color: "#333",
        marginBottom: "22px",
        maxWidth: 700
      }}>
        Somos una empresa 100% sonorense, especializada en muebles CNC de alta precisión, diseño moderno y atención personalizada. 
        Nuestra pasión es crear muebles funcionales, resistentes y con acabados premium, hechos a tu medida, desde Hermosillo para todo México.
      </p>

      {/* MISION, VISION, VALORES */}
      <div style={{
        display: "flex",
        gap: 28,
        flexWrap: "wrap",
        marginBottom: "34px"
      }}>
        <div style={cardStyle}>
          <h3 style={cardTitle}>Misión</h3>
          <p style={cardText}>
            Crear muebles innovadores y personalizados, que mejoren la vida y espacios de nuestros clientes, usando tecnología CNC y materiales sustentables.
          </p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardTitle}>Visión</h3>
          <p style={cardText}>
            Ser la carpintería CNC más confiable y reconocida de Sonora, llevando calidad y diseño a hogares y empresas en todo México.
          </p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardTitle}>Valores</h3>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            <li>Calidad y precisión</li>
            <li>Atención personalizada</li>
            <li>Innovación y creatividad</li>
            <li>Sustentabilidad</li>
            <li>Compromiso local</li>
          </ul>
        </div>
      </div>

      {/* POR QUE ELEGIRNOS */}
      <div style={{
        margin: "38px 0 20px"
      }}>
        <h2 style={{
          color: "#188944",
          fontWeight: 800,
          fontSize: "1.3rem",
          marginBottom: "16px"
        }}>
          ¿Por qué elegir AZ86 Carpintería?
        </h2>
        <ul style={{
          color: "#232323",
          fontSize: "1.1rem",
          listStyle: "disc inside",
          marginBottom: 18
        }}>
          <li>Atención directa y cercana, desde la cotización hasta la entrega.</li>
          <li>Diseños únicos que se adaptan a tus necesidades y estilo.</li>
          <li>Producción local, apoyando a proveedores y talento de Sonora.</li>
          <li>Entrega segura en Hermosillo y envíos a todo México.</li>
          <li>Compromiso con materiales certificados y procesos responsables.</li>
        </ul>
      </div>

      {/* FOTOS TALLER o EQUIPO (opcional) */}
      {/* Descomenta esto si tienes imágenes */}
      {/*
      <div style={{
        display: "flex",
        gap: 22,
        marginTop: 18,
        flexWrap: "wrap"
      }}>
        <img src="/taller1.jpg" alt="Taller CNC" style={{ width: 200, borderRadius: 14, boxShadow: "0 2px 10px #2221" }} />
        <img src="/taller2.jpg" alt="Equipo AZ86" style={{ width: 200, borderRadius: 14, boxShadow: "0 2px 10px #2221" }} />
      </div>
      */}

      {/* CTA FINAL */}
      <div style={{ marginTop: 34 }}>
        <Link href="/catalogo">
          <button style={buttonStyleGreen}>Explora nuestro catálogo</button>
        </Link>
        <Link href="/contacto">
          <button style={buttonStyleOutline}>Contáctanos</button>
        </Link>
      </div>
    </main>
  );
}

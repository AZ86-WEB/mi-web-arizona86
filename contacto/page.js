"use client";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contacto() {
  return (
    <main
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "2.5rem 1.1rem",
        background: "#fff",
        borderRadius: 22,
        boxShadow: "0 4px 30px 0 rgba(24,137,68,0.09)",
      }}
    >
      <h1 style={{
        fontSize: "2.15rem",
        marginBottom: 22,
        color: "#188944",
        fontWeight: 900,
        textAlign: "center",
        letterSpacing: "-2px",
      }}>
        Contáctanos
      </h1>

      <p style={{ fontSize: "1.16rem", marginBottom: 28, textAlign: "center", color: "#222" }}>
        ¿Tienes dudas, quieres una cotización o te gustaría visitarnos?<br />
        Escríbenos y te respondemos lo antes posible.
      </p>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.1rem",
          margin: "0 auto 26px auto",
          maxWidth: 410,
        }}
        onSubmit={e => { e.preventDefault(); alert("¡Mensaje enviado!"); }}
        autoComplete="off"
      >
        <input
          type="text"
          placeholder="Tu nombre"
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Tu correo"
          required
          style={inputStyle}
        />
        <textarea
          placeholder="¿En qué te ayudamos?"
          required
          style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
        />
        <button
          type="submit"
          style={buttonStyle}
        >
          Enviar mensaje
        </button>
      </form>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        background: "#f6fef9",
        borderRadius: 13,
        padding: "18px 17px 10px 17px",
        margin: "0 0 18px 0",
        boxShadow: "0 2px 12px #18894408",
        fontSize: "1.03rem",
      }}>
        <ContactoDato
          icon={<FaEnvelope size={20} color="#188944" />}
          label="Email"
          value="AZHMO@outlook.com"
          link="mailto:AZHMO@outlook.com"
        />
        <ContactoDato
          icon={<FaWhatsapp size={20} color="#25d366" />}
          label="WhatsApp"
          value="662-338-4960"
          link="https://wa.me/526623384960"
        />
        <ContactoDato
          icon={<FaMapMarkerAlt size={20} color="#ff4040" />}
          label="Ubicación"
          value="Hermosillo, Sonora, México"
        />
      </div>

      <div style={{
        width: "100%",
        height: 320,
        borderRadius: 16,
        overflow: "hidden",
        marginTop: 20,
        boxShadow: "0 2px 18px #1889440a"
      }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d308.14622773878347!2d-110.97416850543969!3d29.09751446199103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smx!4v1752548037945!5m2!1sen!2smx"
          width="100%"
          height="320"
          style={{ border: 0, minHeight: 200 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </main>
  );
}

// COMPONENTE PARA CONTACTO
function ContactoDato({ icon, label, value, link }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 9,
      marginBottom: 6
    }}>
      {icon}
      <span style={{ fontWeight: 700, marginRight: 6, minWidth: 74 }}>{label}:</span>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#188944", textDecoration: "underline" }}
        >
          {value}
        </a>
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
}

// ESTILOS REUTILIZABLES
const inputStyle = {
  padding: "0.85rem",
  borderRadius: 8,
  border: "1.6px solid #e0e0e0",
  fontSize: "1.07rem",
  outline: "none",
  transition: "border 0.18s",
};

const buttonStyle = {
  background: "linear-gradient(90deg,#16a34a 70%,#188944 100%)",
  color: "#fff",
  border: "none",
  borderRadius: 11,
  padding: "0.98rem 1.6rem",
  fontWeight: "bold",
  fontSize: "1.13rem",
  marginTop: 12,
  cursor: "pointer",
  boxShadow: "0 2px 14px #18894424",
  letterSpacing: "-0.5px",
  transition: "background 0.2s, transform 0.11s",
};


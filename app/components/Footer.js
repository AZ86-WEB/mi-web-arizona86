"use client";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#181F2A",
        color: "#fff",
        padding: "38px 0 20px 0",
        textAlign: "center",
        marginTop: "80px",
      }}
    >
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "36px",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 22
      }}>
        <FooterLink
          href="mailto:AZHMO@outlook.com"
          icon={<FaEnvelope size={26} color="#38a1fa" />}
          text="AZHMO@outlook.com"
          color="#38a1fa"
        />
        <FooterLink
          href="https://wa.me/6623384960"
          icon={<FaWhatsapp size={26} color="#25d366" />}
          text="WhatsApp"
          color="#25d366"
        />
        <FooterLink
          href="https://www.instagram.com/86arizona/"
          icon={<FaInstagram size={26} color="#f54c74" />}
          text="Instagram"
          color="#f54c74"
        />
      </div>

      <div style={{ fontSize: "1.09rem", marginBottom: 7, color: "#d1d5db" }}>
        © 2025 Arizona 86 Carpintería · Hermosillo, Sonora, México
      </div>
      <div style={{ fontSize: "1.04rem", color: "#cbd5e1" }}>
        Sitio web desarrollado por <span style={{ fontWeight: 700, color: "#fff" }}>Arizona 86 Carpintería</span>.
      </div>
    </footer>
  );
}

function FooterLink({ href, icon, text, color }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        textDecoration: "none",
        fontWeight: 700,
        fontSize: "1.17rem",
        color: color,
        background: "#fff",
        padding: "9px 17px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px 0 rgba(40,50,90,0.08)",
        transition: "transform .13s",
      }}
      onMouseOver={e => (e.currentTarget.style.transform = "translateY(-3px) scale(1.04)")}
      onMouseOut={e => (e.currentTarget.style.transform = "none")}
    >
      {icon} <span style={{color: "#222"}}>{text}</span>
    </a>
  );
}

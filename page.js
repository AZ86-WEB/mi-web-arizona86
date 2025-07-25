"use client";
import Link from "next/link";
import {
  FaCogs,
  FaTruck,
  FaPencilRuler,
  FaLeaf,
  FaShieldAlt,
  FaTools,
  FaStar,
} from "react-icons/fa";

export default function Home() {
  return (
    <main className="home-container">
      <HeroSection />
      <VentajasSection />
      <TopProductosSection />
      <TestimoniosSection />
      <FAQSection />
      <div style={{ height: 80 }} />
      <style jsx>{styles}</style>
    </main>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <img src="/FRONTPAGE.jpg" alt="Portada Arizona 86 Carpintería" className="hero-img" />
      <h1 className="hero-title">Arizona 86 Carpintería</h1>
      <p className="hero-subtitle">
        Muebles CNC de precisión, modernos y a tu medida. Fabricados en Hermosillo, ¡envíos a todo México!
      </p>
      <div className="hero-buttons">
        <Link href="/catalogo"><button className="btn btn-green">Ver catálogo</button></Link>
        <Link href="/contacto"><button className="btn btn-outline">Cotiza tu mueble</button></Link>
      </div>
    </section>
  );
}

function VentajasSection() {
  const ventajas = [
    { icon: <FaCogs />, title: "Corte CNC Premium", text: "Precisión milimétrica y acabados profesionales." },
    { icon: <FaPencilRuler />, title: "Personaliza tu diseño", text: "Medidas, módulos, acabados y más." },
    { icon: <FaTruck />, title: "Entrega Local y Nacional", text: "Hermosillo y todo México." },
    { icon: <FaLeaf />, title: "Materiales Sustentables", text: "Maderas certificadas y procesos responsables." },
    { icon: <FaShieldAlt />, title: "Durabilidad Garantizada", text: "Resistencia y larga vida útil." },
    { icon: <FaTools />, title: "Instalación Profesional", text: "Disponible en Hermosillo y alrededores." },
  ];

  return (
    <section className="ventajas">
      {ventajas.map((v, i) => (
        <div className="ventaja" key={i}>
          <div className="ventaja-icon">{v.icon}</div>
          <div className="ventaja-title">{v.title}</div>
          <div className="ventaja-text">{v.text}</div>
        </div>
      ))}
    </section>
  );
}

function TopProductosSection() {
  const productos = [
    { id: 1, nombre: "Mesa Paramétrica CNC", precio: 4200, imagen: "/catalogo/mesa-parametrica.jpg" },
    { id: 2, nombre: "Sillón Modular Reclinable", precio: 7100, imagen: "/catalogo/sillon-reclinable.jpg" },
    { id: 3, nombre: "Zapatera Minimalista", precio: 1600, imagen: "/catalogo/zapatera.jpg" },
  ];

  return (
    <section>
      <h2 className="section-title">Top productos</h2>
      <div className="productos">
        {productos.map(p => (
          <div className="producto-card" key={p.id}>
            <img src={p.imagen} alt={p.nombre} className="producto-img" />
            <div className="producto-nombre">{p.nombre}</div>
            <div className="producto-precio">${p.precio} MXN</div>
            <Link href={`/catalogo/${p.id}`}>
              <button className="btn btn-outline btn-small">Ver detalle</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimoniosSection() {
  const testimonios = [
    { nombre: "Martha L.", texto: "Me encantó mi escritorio CNC, llegó justo como lo pedí. ¡Atención excelente!" },
    { nombre: "José S.", texto: "El sillón modular es una joya, muy cómodo y fácil de armar. Los recomiendo mucho." },
    { nombre: "Ana P.", texto: "Atención personalizada y los mejores precios en Hermosillo. ¡Gracias por todo!" },
  ];

  return (
    <section>
      <h2 className="section-title">Lo que dicen nuestros clientes</h2>
      <div className="testimonios">
        {testimonios.map((t, i) => (
          <div className="testimonio" key={i}>
            <div className="estrellas">
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
            <div>"{t.texto}"</div>
            <div className="autor">— {t.nombre}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    ["¿Puedo ver muestras físicas antes de comprar?", "¡Por supuesto! Puedes visitarnos en Hermosillo para ver muestras."],
    ["¿Hacen muebles para empresas?", "Sí, fabricamos para oficinas, locales, restaurantes y más."],
    ["¿Qué formas de pago aceptan?", "Transferencias, efectivo y tarjetas."],
    ["¿Cuánto cuesta el envío fuera de Hermosillo?", "Depende del tamaño y destino. Cotizamos sin compromiso."],
    ["¿Puedo solicitar un diseño personalizado?", "¡Claro! Creamos desde cero a partir de tus ideas."],
    ["¿Se integran accesorios tecnológicos?", "Sí: cargadores, luces, bocinas, etc."],
    ["¿Utilizan materiales ecológicos?", "Sí, trabajamos con maderas certificadas."],
    ["¿Ofrecen instalación?", "Sí, en Hermosillo. Nacionalmente se incluyen instrucciones."],
    ["¿Qué pasa si hay defectos?", "Nos encargamos de repararlo o reponerlo rápidamente."],
  ];

  return (
    <section>
      <h2 className="section-title">Preguntas frecuentes</h2>
      {faqs.map(([q, r], i) => (
        <details key={i} className="faq">
          <summary>{q}</summary>
          <div>{r}</div>
        </details>
      ))}
    </section>
  );
}

const styles = `
  .home-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 50px 16px;
  }
  .hero {
    text-align: center;
    margin-bottom: 50px;
  }
  .hero-img {
    width: 100%;
    max-height: 280px;
    object-fit: cover;
    border-radius: 16px;
    margin-bottom: 22px;
  }
  .hero-title {
    font-size: 2.6rem;
    font-weight: 800;
    color: #188944;
  }
  .hero-subtitle {
    font-size: 1.3rem;
    color: #1e293b;
    margin: 18px 0 28px;
  }
  .hero-buttons {
    display: flex;
    gap: 18px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: 12px 32px;
    font-weight: 700;
    border-radius: 11px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: 0.2s;
  }
  .btn-green {
    background: #16a34a;
    color: #fff;
    border: none;
  }
  .btn-outline {
    background: #fff;
    color: #16a34a;
    border: 2px solid #16a34a;
  }
  .btn-small {
    font-size: 0.95rem;
    padding: 7px 18px;
    margin-top: 10px;
  }

  .ventajas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 26px;
    margin-bottom: 44px;
  }
  .ventaja {
    background: #fff;
    border-radius: 13px;
    box-shadow: 0 2px 8px #2221;
    text-align: center;
    padding: 22px 16px;
  }
  .ventaja-icon {
    color: #188944;
    font-size: 30px;
    margin-bottom: 10px;
  }
  .ventaja-title {
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 5px;
  }
  .ventaja-text {
    color: #222;
    font-size: 0.99rem;
  }

  .section-title {
    font-weight: 800;
    font-size: 1.45rem;
    color: #188944;
    margin: 0 0 18px 0;
  }

  .productos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 26px;
    margin-bottom: 42px;
  }
  .producto-card {
    background: #fff;
    border-radius: 17px;
    box-shadow: 0 4px 18px #2221;
    padding: 18px;
    text-align: center;
  }
  .producto-img {
    width: 100%;
    height: 130px;
    object-fit: cover;
    border-radius: 11px;
    margin-bottom: 13px;
  }
  .producto-nombre {
    font-weight: 700;
  }
  .producto-precio {
    color: #16a34a;
    font-weight: 700;
    font-size: 1.03rem;
  }

  .testimonios {
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 42px;
  }
  .testimonio {
    background: #fff;
    border-radius: 13px;
    box-shadow: 0 2px 14px #2221;
    padding: 20px 19px;
    max-width: 320px;
    min-width: 180px;
    font-style: italic;
  }
  .estrellas {
    color: #16a34a;
    margin-bottom: 7px;
  }
  .autor {
    margin-top: 9px;
    font-weight: 700;
    color: #222;
  }

  .faq {
    background: #fff;
    border-radius: 11px;
    padding: 11px 19px;
    margin: 12px 0;
    box-shadow: 0 2px 8px #2221;
  }
  .faq summary {
    font-weight: 700;
    cursor: pointer;
    outline: none;
  }
`;


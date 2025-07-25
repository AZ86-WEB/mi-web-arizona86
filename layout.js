import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { ProductosProvider } from "./context/ProductosContext";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: 'Arizona 86 Carpintería',
  description: 'Muebles CNC personalizados y modernos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <ProductosProvider>
            <UserProvider> {/* <- Envuelve todo */}
              <Navbar />
              {children}
              <Footer />
            </UserProvider>
          </ProductosProvider>
        </CartProvider>
      </body>
    </html>
  );
}

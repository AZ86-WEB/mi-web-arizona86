"use client";
import { createContext, useContext, useState, useEffect } from "react";

const KEY_USUARIOS = "az86_usuarios";
const KEY_USER = "az86_user";

const UserContext = createContext();

function getUsuariosLS() {
  if (typeof window === "undefined") return [];
  try {
    const arr = JSON.parse(localStorage.getItem(KEY_USUARIOS));
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
function setUsuariosLS(arr) {
  localStorage.setItem(KEY_USUARIOS, JSON.stringify(arr));
}
function setUserLS(user) {
  if (user) localStorage.setItem(KEY_USER, JSON.stringify(user));
  else localStorage.removeItem(KEY_USER);
}
function getUserLS() {
  if (typeof window === "undefined") return null;
  try {
    const u = JSON.parse(localStorage.getItem(KEY_USER));
    return u && u.correo ? u : null;
  } catch {
    return null;
  }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Persistencia de sesión
  useEffect(() => {
    setUser(getUserLS());
  }, []);

  // LOGIN (ahora requiere correo y contraseña)
  function login(correo, password) {
    const usuarios = getUsuariosLS();
    const usuario = usuarios.find(u => u.correo === correo && u.password === password);
    if (usuario) {
      setUser({ correo: usuario.correo, nombre: usuario.nombre });
      setUserLS({ correo: usuario.correo, nombre: usuario.nombre });
      return true;
    }
    return false;
  }

  // REGISTRO (no repite correos)
  function register({ nombre, correo, password }) {
    let usuarios = getUsuariosLS();
    if (usuarios.some(u => u.correo === correo)) {
      return false; // Correo ya registrado
    }
    const nuevo = { nombre, correo, password };
    usuarios.push(nuevo);
    setUsuariosLS(usuarios);
    setUser({ nombre, correo });
    setUserLS({ nombre, correo });
    return true;
  }

  // LOGOUT
  function logout() {
    setUser(null);
    setUserLS(null);
  }

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

'use client'; // Indica que es un client component

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Define en qué rutas no mostrar la navegación
  const showNavigation = pathname !== "/" && pathname !== "/chef";

  // Si no se debe mostrar, retorna null
  if (!showNavigation) return null;

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        {/* Logo o título */}
        <div>
          <h1 className="text-lg font-bold">Los Pinos Polo Club</h1>
        </div>
        {/* Enlaces de navegación */}
        <ul className="flex space-x-6">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/chef">Vista del Chef</Link>
          </li>
          <li>
            <Link href="/otros-modulos">Otros Módulos</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

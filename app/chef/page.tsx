'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MenuCard } from './menu-card';

interface MenuStats {
  [key: number]: number; // Representa menú y cantidad de comensales
}

export default function MenuPage() {
  const [menuStats, setMenuStats] = useState<MenuStats | null>(null);
  const [error, setError] = useState(false);

  // Función para obtener los datos del backend
  const fetchMenuStats = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/menu_stats'
      );
      const result = await response.json();

      if (response.ok) {
        setMenuStats(result.data);
        setError(false); // Restablecer errores si la solicitud es exitosa
      } else {
        console.error('Error al obtener los datos:', result.error);
        setError(true);
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
      setError(true);
    }
  };

  useEffect(() => {
    // Llama a la función inicialmente
    fetchMenuStats();

    // Configura un intervalo para que se ejecute cada 30 minutos
    const intervalId = setInterval(() => {
      fetchMenuStats();
    }, 3000); // 30 minutos en milisegundos

    // Limpia el intervalo cuando se desmonta el componente
    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Imagen de fondo */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/restaurant-1 1.jpg"
          alt="Restaurant interior"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Logo */}
        <div className="flex justify-end mb-8">
          <Image
            src="/logo-club 2.png"
            alt="Los Pinos Polo Club"
            width={150}
            height={150}
            className="w-auto h-auto"
          />
        </div>

        {/* Grilla de menú */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {menuStats ? (
            <>
              <MenuCard
                title="Estilo Campestre"
                menuNumber={1}
                diners={menuStats[1] || 0}
                imageSrc="/image 1.jpg"
                price={190}
              />
              <MenuCard
                title="Auténtico Gourmet"
                menuNumber={2}
                diners={menuStats[2] || 0}
                imageSrc="/image 2.jpg"
                price={260}
              />
              <MenuCard
                title="Cosecha Verde"
                menuNumber={3}
                diners={menuStats[3] || 0}
                imageSrc="/image 3.jpg"
                price={103}
              />
            </>
          ) : (
            <p className="text-center text-white">Cargando datos...</p>
          )}
        </div>
      </div>
    </main>
  );
}

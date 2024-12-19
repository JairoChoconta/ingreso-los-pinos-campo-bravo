import Image from "next/image"
import { MenuCard } from "./menu-card";

export default function MenuPage() {
  return (
    <main className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/restaurant-1 1.jpg"
          alt="Restaurant interior"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>

      {/* Content */}
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

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <MenuCard
            title="Estilo Campestre"
            menuNumber={1}
            diners={2}
            imageSrc="/image 1.jpg"
            price={190}
          />
          <MenuCard
            title="Auténtico Gourmet"
            menuNumber={2}
            diners={2}
            imageSrc="/image 2.jpg"
            price={260}
          />
          <MenuCard
            title="Cosecha Verde"
            menuNumber={3}
            diners={2}
            imageSrc="/image 3.jpg"
            price={103}
          />
        </div>
      </div>
    </main>
  )
}


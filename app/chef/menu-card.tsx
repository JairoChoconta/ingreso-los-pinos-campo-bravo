import Image from "next/image";

interface MenuCardProps {
  title: string;
  menuNumber: number;
  diners: number;
  imageSrc: string;
  price: number;
}

export function MenuCard({ title, menuNumber, diners, imageSrc, price }: MenuCardProps) {
  return (
    <div className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-6 text-center">
        <h2 className="text-2xl font-medium text-emerald-500 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">Menú {menuNumber}. Comensales:</p>
        <p className="text-5xl font-light text-emerald-500">{price}</p>
      </div>
    </div>
  );
}

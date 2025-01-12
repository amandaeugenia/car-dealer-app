"use client";

import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";

export default function Home() {
  interface Make {
    MakeId: number;
    MakeName: string;
    LogoUrl: string;
  }

  const [makes, setMakes] = useState<Make[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedMake, setSelectedMake] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const carBrands = [
    { LogoUrl: "/images/car-logo-1.svg", MakeName: "Tesla" },
    { LogoUrl: "/images/car-logo-2.svg", MakeName: "BMW" },
    { LogoUrl: "/images/car-logo-3.svg", MakeName: "Jaguar" },
    { LogoUrl: "/images/car-logo-4.svg", MakeName: "Ford" },
    { LogoUrl: "/images/car-logo-5.svg", MakeName: "Kia" },
    { LogoUrl: "/images/car-logo-6.svg", MakeName: "Nissan" },
    { LogoUrl: "/images/car-logo-7.svg", MakeName: "Toyota" },
    { LogoUrl: "/images/car-logo-8.svg", MakeName: "Rolls-Royce" },
    { LogoUrl: "/images/car-logo-9.svg", MakeName: "Mercedes-Benz" },
    { LogoUrl: "/images/car-logo-10.svg", MakeName: "Fiat" },
    { LogoUrl: "/images/car-logo-11.svg", MakeName: "Bugatti" },
    { LogoUrl: "/images/car-logo-12.svg", MakeName: "Aston Martin" },
  ];

  useEffect(() => {
    async function fetchMakes() {
      try {
        const response = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
        );
        const data = await response.json();

        const makesWithLogos = data.Results.map((make: any) => {
          const formattedMakeName = make.MakeName.replace(/ /g, "_");
          const logoUrl = `/images/${formattedMakeName.toLowerCase()}-logo.png`;

          return {
            ...make,
            LogoUrl: logoUrl,
          };
        });

        setMakes(makesWithLogos || []);
      } catch (error) {
        console.error("Erro ao buscar marcas de veículos:", error);
      }
    }

    const currentYear = new Date().getFullYear();
    setYears(
      Array.from({ length: currentYear - 2015 + 1 }, (_, index) => 2015 + index)
    );

    fetchMakes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6 text-black">Find your dream car!</h1>

      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <Suspense fallback={<p className="text-black">Loading...</p>}>
          <select
            id="make"
            className="mb-4 block w-full p-2 border border-gray-300 rounded text-black"
            value={selectedMake ?? ""}
            onChange={(e) => setSelectedMake(Number(e.target.value))}
          >
            <option value="">Select a make</option>
            {makes.map((make) => (
              <option key={make.MakeId} value={make.MakeId}>
                {make.MakeName}
              </option>
            ))}
          </select>
        </Suspense>
        <Suspense fallback={<p className="text-black">Loading...</p>}>
          <select
            id="year"
            className="mt-1 block w-full p-2 border border-gray-300 rounded text-black"
            value={selectedYear ?? ""}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            <option value="">Select a year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </Suspense>
        <div className="mt-6"> {selectedMake && selectedYear ? ( <Link href={`/result/${selectedMake}/${selectedYear}`} className="w-full py-2 px-4 rounded text-white bg-blue-500 hover:bg-blue-600 block text-center" > Próximo </Link> ) : ( <button disabled className="w-full py-2 px-4 rounded text-white bg-gray-400 cursor-not-allowed block text-center" > Search </button> )} </div>

      </div>
      <div className="w-full max-w-5xl mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
        {carBrands.map((brand, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="h-16 w-16 mb-2 flex items-center justify-center bg-gray-200 rounded-full">
              <Image
                src={brand.LogoUrl || "/images/car-placeholder.svg"} 
                alt={brand.MakeName}
                width={48}
                height={48}
                onError={(e) => {
                  e.currentTarget.src = "/images/car-placeholder.svg";
                }}
              />
            </div>
            <p className="text-sm font-medium text-gray-700 text-center">
              {brand.MakeName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

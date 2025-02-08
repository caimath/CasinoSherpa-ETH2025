"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const numbers = [
  { num: "0", color: "green" },
  { num: "32", color: "red" },
  { num: "15", color: "black" },
  { num: "19", color: "red" },
  { num: "4", color: "black" },
  { num: "21", color: "red" },
  { num: "2", color: "black" },
  { num: "25", color: "red" },
  { num: "17", color: "black" },
  { num: "34", color: "red" },
  { num: "6", color: "black" },
  { num: "27", color: "red" },
  { num: "13", color: "black" },
  { num: "36", color: "red" },
  { num: "11", color: "black" },
  { num: "30", color: "red" },
  { num: "8", color: "black" },
  { num: "23", color: "red" },
  { num: "10", color: "black" },
  { num: "5", color: "red" },
  { num: "24", color: "black" },
  { num: "16", color: "red" },
  { num: "33", color: "black" },
  { num: "1", color: "red" },
  { num: "20", color: "black" },
  { num: "14", color: "red" },
  { num: "31", color: "black" },
  { num: "9", color: "red" },
  { num: "22", color: "black" },
  { num: "18", color: "red" },
  { num: "29", color: "black" },
  { num: "7", color: "red" },
  { num: "28", color: "black" },
  { num: "12", color: "red" },
  { num: "35", color: "black" },
  { num: "3", color: "red" },
  { num: "26", color: "black" }
];

export default function Roulette() {
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const spinRoulette = () => {
    if (selectedNumbers.length === 0) return;
    setSpinning(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      setResult(numbers[randomIndex].num);
      setSpinning(false);
    }, 3000);
  };

  const toggleNumber = (num: string) => {
    setSelectedNumbers((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-green-700 to-green-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-6">🎰 Roulette de Casino 🎰</h1>

      {/* Tapis de jeu */}
      <div className="grid grid-cols-12 gap-1 p-4 bg-green-900 rounded-lg shadow-lg">
        {numbers.map(({ num, color }) => (
          <button
            key={num}
            className={`px-4 py-2 border rounded-md transition-transform transform hover:scale-110 ${selectedNumbers.includes(num) ? "bg-yellow-400 text-black" : color === "red" ? "bg-red-600" : color === "black" ? "bg-black" : "bg-green-600"}`}
            onClick={() => toggleNumber(num)}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Roue de roulette */}
      <div className="relative w-64 h-64 mt-6 flex items-center justify-center">
        <motion.div
          animate={{ rotate: spinning ? 1440 : 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="w-64 h-64 bg-red-600 border-4 border-yellow-500 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg relative"
        >
          <motion.div
            className="absolute w-6 h-6 bg-white rounded-full shadow-lg"
            animate={{ rotate: spinning ? 0 : 0 }}
            transition={{ duration: 0, ease: "easeInOut" }}
            style={{ left: "50%", top: "5%", transform: "translateX(-50%)" }}
          />
          {result || "🎡"}
        </motion.div>
      </div>

      {/* Boutons */}
      <div className="mt-6 flex gap-4">
        <button 
          className="px-6 py-3 bg-blue-500 rounded text-white shadow-lg transition-transform transform hover:scale-110 disabled:opacity-50" 
          onClick={spinRoulette} 
          disabled={spinning || selectedNumbers.length === 0}
        >
          {spinning ? "🔄 En train de tourner..." : "🎲 Lancer la roulette"}
        </button>
        <Link href="/" passHref>
          <button className="px-6 py-3 bg-gray-700 rounded text-white shadow-lg transition-transform transform hover:scale-110">
            🏠 Retour à l'accueil
          </button>
        </Link>
      </div>

      {/* Résultat */}
      {result && (
        <p className="mt-4 text-2xl font-bold">
          🎯 Résultat : <span className="text-yellow-300">{result}</span>
        </p>
      )}
    </div>
  );
}
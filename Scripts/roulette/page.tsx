"use client";

import { useState } from "react";
import Link from "next/link";

export default function PileOuFace() {
  const [result, setResult] = useState<string | null>(null);
  const [choix, setChoix] = useState<string | null>(null);

  function lancer() {
    if (!choix) {
      alert("Choisissez Pile ou Face !");
      return;
    }

    const outcome = Math.random() < 0.5 ? "Pile" : "Face";
    setResult(outcome);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">🎲 Pile ou Face</h1>

      <div className="space-x-4 mb-4">
        <button onClick={() => setChoix("Pile")} className="px-6 py-3 bg-blue-500 text-white rounded">
          Pile
        </button>
        <button onClick={() => setChoix("Face")} className="px-6 py-3 bg-red-500 text-white rounded">
          Face
        </button>
      </div>

      <button onClick={lancer} className="px-6 py-3 bg-green-500 text-white rounded mb-4">
        Lancer la pièce
      </button>

      {result && (
        <p className="text-xl">
          🎉 Résultat : <span className="font-bold">{result}</span>
          {choix === result ? " ✅ Gagné !" : " ❌ Perdu..."}
        </p>
      )}

      <Link href="/" className="mt-6 px-4 py-2 bg-gray-700 text-white rounded">
        🔙 Retour au casino
      </Link>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import { Wallet } from "lucide-react";
import Cookies from "js-cookie"; // 📌 Gestion des cookies

const Button = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={onClick}>
    {children}
  </button>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="border border-gray-700 p-4 rounded bg-gray-800">{children}</div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => <div className="p-6">{children}</div>;

export default function Casino() {
  const [account, setAccount] = useState<string | null>(null);

  // Vérifier si MetaMask est installé et récupérer le wallet stocké
  useEffect(() => {
    const savedAccount = Cookies.get("wallet"); 
    if (savedAccount) {
      setAccount(savedAccount);
    }

    if (!window.ethereum) {
      console.warn("MetaMask non détecté !");
    }
  }, []);

  // Connexion à MetaMask
  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);

        // 📌 Stocker l'adresse du portefeuille pour 1 minute
        Cookies.set("wallet", accounts[0], { expires: 1 / 1440 });
      } catch (error) {
        console.error("Erreur de connexion :", error);
      }
    } else {
      alert("Veuillez installer MetaMask !");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🎰 Casino Crypto 🎰
      </motion.h1>

      <Card>
        <CardContent>
          {account ? (
            <p className="text-green-400">✅ Connecté : {account}</p>
          ) : (
            <Button onClick={connectWallet}>
              <Wallet /> Connecter MetaMask
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Liens vers les jeux */}
      <div className="mt-8 space-y-4">
        <Link href="/pile-ou-face" className="block px-6 py-3 bg-blue-500 text-white rounded text-center">
          🎲 Jouer à Pile ou Face
        </Link>
        <Link href="/roulette" className="block px-6 py-3 bg-red-500 text-white rounded text-center">
          🎡 Jouer à la Roulette
        </Link>
        <Link href="/blackjack" className="block px-6 py-3 bg-green-500 text-white rounded text-center">
          🃏 Jouer au Blackjack
        </Link>
      </div>
    </div>
  );
}

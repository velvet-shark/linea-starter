"use client";

import ConnectButton from "@/components/ConnectButton";
import { useAccount } from "wagmi";
import MagicButton from "@/components/MagicButton";

export default function Home() {
  const { isConnected, address } = useAccount();

  return (
    <main className="min-h-screen flex flex-col items-start justify-start pt-24 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="flex justify-center">
            <ConnectButton />
          </div>

          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
              Linea Starter Template
            </h1>
          </div>

          <div className="flex justify-center">
            <MagicButton />
          </div>
        </div>
      </div>
    </main>
  );
}

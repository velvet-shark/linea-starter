"use client";

import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface WagmiProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<WagmiProviderProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Provider;

import { http, createConfig } from "wagmi";
import { lineaSepolia, localhost } from "wagmi/chains";
import { metaMask } from "@wagmi/connectors";

const MetaMaskOptions = {
  dappMetadata: {
    name: "Linea Magic Button"
  },
  infuraAPIKey: "c4f66e6306bc44299e9e99aa477781e5"
};

export const config = createConfig({
  chains: [lineaSepolia, localhost],
  connectors: [metaMask(MetaMaskOptions)],
  ssr: true,
  transports: {
    [lineaSepolia.id]: http(),
    [localhost.id]: http()
  }
});

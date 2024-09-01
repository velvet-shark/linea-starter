import { http, createConfig } from "wagmi";
import { linea } from "wagmi/chains";
import { metaMask } from "@wagmi/connectors";

const MetaMaskOptions = {
  dappMetadata: {
    name: "Linea Magic Button"
  },
  infuraAPIKey: "c4f66e6306bc44299e9e99aa477781e5"
};

export const config = createConfig({
  chains: [linea],
  connectors: [metaMask(MetaMaskOptions)],
  ssr: true,
  transports: {
    [linea.id]: http()
  }
});

"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

const ConnectButton = () => {
  const { address, chain, chainId, isConnected } = useAccount(); // Get account and chain information
  const { connectors, connect, error } = useConnect(); // Handle wallet connection
  const { disconnect } = useDisconnect(); // Handle wallet disconnection

  return (
    <div className="fixed top-4 right-4 flex flex-col items-center space-y-2 sm:top-4 sm:right-4 sm:flex-col sm:items-center sm:space-y-2 xs:relative xs:top-0 xs:right-0 xs:w-full xs:mb-4">
      {isConnected ? (
        <>
          <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            {chainId !== 59141 && (
              <div className="flex flex-col items-center space-y-2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <p className="font-bold text-center sm:text-left">You need to be connected to Linea network</p>
                <button
                  onClick={async () => {
                    try {
                      await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0xe705" }]
                      });
                    } catch (error: unknown) {
                      try {
                        await window.ethereum.request({
                          method: "wallet_addEthereumChain",
                          params: [
                            {
                              chainId: "0xe705",
                              chainName: "Linea Sepolia Testnet",
                              nativeCurrency: { name: "Ether", symbol: "LineaETH", decimals: 18 },
                              rpcUrls: ["https://rpc.sepolia.linea.build"],
                              blockExplorerUrls: ["https://sepolia.lineascan.build"]
                            }
                          ]
                        });
                      } catch (addError) {
                        console.error(addError);
                      }
                      console.error(error);
                    }
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full text-sm w-full sm:w-auto"
                >
                  Connect to Linea Testnet
                </button>
              </div>
            )}
            <button
              onClick={() => disconnect()}
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out w-full sm:w-auto"
            >
              Disconnect {address?.slice(0, 6)}...{address?.slice(-4)}
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 w-full">
          {connectors
            .filter((connector) => connector.id !== "metaMaskSDK")
            .map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out flex items-center justify-center w-full sm:w-auto"
              >
                {connector.icon && <img src={connector.icon} alt={`${connector.name} icon`} className="w-5 h-5 mr-2" />}
                Connect {connector.name}
              </button>
            ))}
        </div>
      )}
      {chain && (
        <div className="text-sm text-gray-600 text-center sm:text-left">
          Chain: <strong>{chain.name}</strong>
        </div>
      )}
      {error && <div className="text-sm text-red-500 text-center sm:text-left">{error.message}</div>}
    </div>
  );
};

export default ConnectButton;

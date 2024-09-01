"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

const ConnectButton = () => {
  const { address, chain, chainId, isConnected } = useAccount(); // Get account and chain information
  const { connectors, connect, error } = useConnect(); // Handle wallet connection
  const { disconnect } = useDisconnect(); // Handle wallet disconnection

  return (
    <div className="fixed top-4 right-4 flex flex-col items-center space-y-2">
      {isConnected ? (
        <>
          <div className="flex items-center space-x-2">
            {/* Check if user is connected to Linea network */}
            {chainId !== 59141 && (
              // If not connected to Linea network, display a message and a button to connect
              <div className="flex items-center space-x-2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2">
                <p className="font-bold">You need to be connected to Linea network</p>
                {/* Button to switch to Linea network */}
                <button
                  onClick={async () => {
                    try {
                      await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0xe705" }]
                      });
                    } catch (error: unknown) {
                      // If switching fails, try to add the network to the wallet
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
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full text-sm"
                >
                  Connect to Linea Testnet
                </button>
              </div>
            )}
            {/* Disconnect button with address */}
            <button
              onClick={() => disconnect()}
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out"
            >
              Disconnect {address?.slice(0, 6)}...{address?.slice(-4)}
            </button>
          </div>
        </>
      ) : (
        // When not connected, display connect buttons for all available wallets
        <div className="flex space-x-2">
          {connectors
            .filter((connector) => connector.id !== "metaMaskSDK")
            .map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out flex items-center"
              >
                {connector.icon && <img src={connector.icon} alt={`${connector.name} icon`} className="w-5 h-5 mr-2" />}
                Connect {connector.name}
              </button>
            ))}
        </div>
      )}
      {/* Display current chain information. Doesn't work for Linea Testnet but works for Linea Mainnet */}
      {chain && (
        <div className="text-sm text-gray-600">
          Chain: <strong>{chain.name}</strong>
        </div>
      )}
      {/* Display error message if any */}
      {error && <div className="text-sm text-red-500">{error.message}</div>}
    </div>
  );
};

export default ConnectButton;

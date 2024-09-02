import { useAccount, useConnect, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { Abi, parseEther, formatEther } from "viem";
// import abi from "../../contracts/out/ContribuThor.sol/ContribuThor.json"; // The original location
import abi from "../lib/ContribuThor.json"; // Copied from contracts/out/ContribuThor.sol/ContribuThor.json, to be able to deploy with Vercel

import { useEffect, useState } from "react";

const MagicButton = () => {
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();

  const [currentUrl, setCurrentUrl] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0.001);
  const [totalContributed, setTotalContributed] = useState<string | null>(null);

  const { writeContract, data: txData } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: txData
  });
  const contractAbi = abi.abi as Abi;

  // Set the current URL when the component mounts
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  // Read the total amount contributed for the current URL
  const { data: urlAmount, error: readError } = useReadContract({
    abi: contractAbi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "getUrlAmount",
    args: [currentUrl]
  });

  // Update the total contributed amount when urlAmount changes
  useEffect(() => {
    if (urlAmount && typeof urlAmount === "bigint") {
      setTotalContributed(formatEther(urlAmount));
    }
  }, [urlAmount]);

  // Handle the payment process
  const handlePay = async () => {
    if (!isConnected) {
      await connect({ connector: connectors[0] });
    } else {
      writeContract({
        abi: contractAbi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "pay",
        args: [currentUrl],
        value: parseEther(paymentAmount.toString())
      });
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <input
          type="number"
          step="0.0001"
          defaultValue="0.001"
          min="0.001"
          className="shadow appearance-none border rounded w-40 h-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
        />
        <button
          onClick={handlePay}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-40 h-10 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 whitespace-nowrap"
        >
          {isLoading ? "Sending..." : `Send ${paymentAmount} ETH`}
        </button>
      </div>
      {txData && (
        <div>
          <a
            href={`https://sepolia.lineascan.build/tx/${txData}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Check your transaction
          </a>
        </div>
      )}
      {isSuccess && (
        <div>
          <div>Thank you for your payment!</div>
        </div>
      )}
      {totalContributed !== null && !isSuccess ? (
        <div>Total contributed for this page: {totalContributed} ETH</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MagicButton;

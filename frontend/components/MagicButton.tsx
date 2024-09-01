import { useAccount, useConnect, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";

const CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890";
const ABI = [
  {
    name: "pay",
    type: "function",
    stateMutability: "payable",
    inputs: [{ name: "pageUrl", type: "string" }],
    outputs: []
  }
];

const MagicButton = () => {
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();

  const { writeContract, data: txData } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: txData
  });

  const handleDonate = async () => {
    if (!isConnected) {
      await connect({ connector: connectors[0] });
    } else {
      const currentUrl = window.location.href;
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "pay",
        args: [currentUrl],
        value: parseEther("0.001") // Minimum amount
      });
    }
  };

  return (
    <div>
      <button onClick={handleDonate} disabled={isLoading}>
        {isLoading ? "Donating..." : "Donate 0.01 ETH"}
      </button>
      {isSuccess && <div>Thank you for your donation!</div>}
    </div>
  );
};

export default MagicButton;

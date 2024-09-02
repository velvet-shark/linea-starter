# Linea Starter dApp

## Overview

ContribuThor is a decentralized application (dApp) designed to receive and track payments for web pages. Users can make payments for specific URLs, and the contract owner can withdraw the accumulated funds.

"Web pages" can be anything you control and can embed your payment button.

The idea is to give an easy way to receive donations for your website, blog, or any other web page.

On top of that, you can track which specific pages are getting the most attention and donations. This can be useful to show what the community likes and wants to reward.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/velvet-shark/linea-starter
   cd linea-starter/
   ```

2. Deploy the smart contract on LineaSepolia (you need to have some ETH on the network):

   ```bash
   cd contracts
   forge build
   forge create --rpc-url https://linea-sepolia.infura.io/v3/<your_infura_api_key> --private-key <your_private_key> src/ContribuThor.sol:ContribuThor
   ```

3. Copy the contract address and keep it for the next step.

4. Add the contract address to the `.env` file in the `frontend` directory:

   ```plaintext
   NEXT_PUBLIC_CONTRACT_ADDRESS=<your_contract_address>
   ```

5. Install dependencies for the frontend:

   ```bash
   cd frontend
   npm install
   ```

6. Update the `MetaMaskOptions` in `frontend/lib/wagmiConfig.ts` with your Infura API key:
   ```typescript
   const MetaMaskOptions = {
     dappMetadata: {
       name: "Linea Magic Button"
     },
     infuraAPIKey: "<your_infura_api_key>"
   };
   ```

### Running the Development Server

1. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deploying Smart Contracts locally

1. Build the smart contracts:

   ```bash
   cd contracts
   forge build
   ```

2. Start a local blockchain:

   ```bash
   anvil
   ```

3. Deploy the contract locally:

   ```bash
   forge script script/ContribuThor.s.sol:ContribuThorScript --rpc-url http://localhost:8545 --private-key <your_private_key>
   ```

4. Deploy on Sepolia Testnet:
   ```bash
   forge create --rpc-url https://linea-sepolia.infura.io/v3/<your_infura_api_key> --private-key <your_private_key> src/ContribuThor.sol:ContribuThor
   ```

## Next Steps

- Implement more detailed payment tracking and reporting.
- Enhance the UI/UX for better user interaction.
- Catch more edge cases and improve robustness.

## Resources

- [Linea docs](https://docs.linea.build/)
- [Linea Sepolia Testnet Explorer](https://sepolia.lineascan.build/)
- [Infura](https://www.infura.io/)
- [Wagmi](https://wagmi.sh/)

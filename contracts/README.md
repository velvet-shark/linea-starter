### Build

```shell
$ forge build
```

### Local blockchain

```shell
$ anvil
```

### Deploy

Local deployment:

```shell
forge script script/ContribuThor.s.sol:ContribuThorScript --rpc-url <your_rpc_url> --private-key <your_private_key>
# For example, using anvil RPC URL and the default anvil private key:
forge create contracts/src/ContribuThor.sol:ContribuThor --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

Deploy on Sepolia Testnet:

```shell
forge script script/ContribuThor.s.sol:ContribuThorScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

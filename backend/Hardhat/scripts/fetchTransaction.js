import { JsonRpcProvider } from 'ethers';

// Connect to the Ethereum network
const provider = new JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/l0XrDQf1VjA1u8EN6_14S5I3tHo8FaB-");

// Get block by number
const blockNumber = "latest";
const block = await provider.getBlock(blockNumber);

console.log(block);
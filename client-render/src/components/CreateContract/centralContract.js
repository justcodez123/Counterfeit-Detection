import { ethers } from "ethers";

// Paste your deployed Central contract address here
const CENTRAL_CONTRACT_ADDRESS = "0xb4e25efc01efadd1ef945fb77783011d2e613fae";

// ABI of the Central contract
const CENTRAL_ABI = [
  {
    "inputs": [],
    "name": "createSmartContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_walletAddress", "type": "address" }
    ],
    "name": "getCompanySmartContractAddress",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Function to connect to the contract
export const getCentralContract = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return null;
  }
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  
  return new ethers.Contract(CENTRAL_CONTRACT_ADDRESS, CENTRAL_ABI, signer);
};

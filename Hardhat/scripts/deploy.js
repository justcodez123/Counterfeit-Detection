const { ethers } = require("hardhat");
require("dotenv").config(); // Load environment variables

async function main() {
    // --- Configuration ---
    const alchemySepoliaUrl = process.env.ALCHEMY_SEPOLIA_URL;
    const privateKey = process.env.PRIVATE_KEY;

    if (!alchemySepoliaUrl) throw new Error("Missing ALCHEMY_SEPOLIA_URL in .env file.");
    if (!privateKey) throw new Error("Missing PRIVATE_KEY in .env file.");

    // --- Provider & Signer ---
    const provider = new ethers.JsonRpcProvider(alchemySepoliaUrl);
    const signer = new ethers.Wallet(privateKey, provider);

    console.log(`Using signer address: ${await signer.getAddress()}`);

    // --- Check Balance ---
    const balance = await provider.getBalance(signer.address);
    console.log(`Signer balance: ${ethers.formatEther(balance)} Sepolia ETH`);
    if (balance === 0n) console.warn("Warning: Balance is zero. Get Sepolia ETH from a faucet.");

    // --- Deploy Contract ---
    console.log("\nDeploying Central contract...");
    const CentralFactory = await ethers.getContractFactory("Central", signer);
    const centralContract = await CentralFactory.deploy();

    console.log(`Waiting for deployment confirmation (Tx: ${centralContract.deploymentTransaction()?.hash})...`);
    await centralContract.waitForDeployment();

    console.log("-----------------------------------------------------------------------------------");
    const deployedAddress = await centralContract.getAddress();
    console.log("\n✅ Central Contract Deployed Successfully!");
    console.log(`Contract Address: ${deployedAddress}`);
    console.log(`View on Sepolia Etherscan: https://sepolia.etherscan.io/address/${deployedAddress} \n`);
    console.log("-----------------------------------------------------------------------------------");
}

// --- Execute Deployment ---
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("\n❌ Deployment Failed:", error);
        process.exit(1);
    });

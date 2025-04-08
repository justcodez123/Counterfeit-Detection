const fs = require("fs");
const path = require("path");

async function main() {
    const alchemySepoliaUrl = process.env.ALCHEMY_SEPOLIA_URL;
    const privateKey = process.env.PRIVATE_KEY;

    const provider = new ethers.JsonRpcProvider(alchemySepoliaUrl);
    const signer = new ethers.Wallet(privateKey, provider);

    console.log(`Using signer address: ${await signer.getAddress()}`);

    // Deploy Central Contract
    const CentralFactory = await ethers.getContractFactory("Central", signer);
    const centralContract = await CentralFactory.deploy();
    await centralContract.waitForDeployment();

    const deployedAddress = await centralContract.getAddress();
    console.log(`\n✅ Contract deployed at: ${deployedAddress}`);

    // Save contract address and ABI
    const contractData = {
        address: deployedAddress,
        abi: CentralFactory.interface.formatJson()
    };

    const filePath = path.join(__dirname, "../artifacts/central_contract.json");
    fs.writeFileSync(filePath, JSON.stringify(contractData, null, 2));

    console.log(`Contract details saved to ${filePath}`);
}

main().catch((error) => {
    console.error("\n❌ Deployment Failed:", error);
    process.exit(1);
});

const { ethers } = require("hardhat");
const fetch = require("node-fetch");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  // Deploy DMT.sol
  const DMT = await ethers.getContractFactory("DMT");
  const dmt = await DMT.deploy();
  await dmt.deployed();

  console.log("✅ DMT deployed at:", dmt.address);

  // Send deployment hash to Biconomy for gasless relay
  const apiKey = process.env.BICONOMY_API_KEY;
  if (!apiKey) throw new Error("❌ Missing BICONOMY_API_KEY");

  const tx = {
    to: dmt.address,
    data: "0x", // placeholder, already deployed
  };

  console.log("⏳ Relaying via Biconomy...");

  const response = await fetch("https://api.biconomy.io/api/v2/meta-tx/native", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: deployer.address,
      apiId: apiKey,
      params: [tx],
    }),
  });

  const result = await response.json();
  console.log("✅ Relayer response:", result);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

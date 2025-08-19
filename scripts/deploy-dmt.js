async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const DMT = await ethers.getContractFactory("DMT");
  const dmt = await DMT.deploy(ethers.utils.parseEther("5000000000")); // 5B tokens
  await dmt.deployed();

  console.log("DMT deployed to:", dmt.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

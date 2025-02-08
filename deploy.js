const fs = require('fs');
const solc = require('solc');
const { ethers } = require('ethers');

// Lecture du fichier du contrat
const source = fs.readFileSync("CoinFlip.sol", "utf8");

// Configuration d'entrée pour la compilation
const input = {
  language: 'Solidity',
  sources: {
    'CoinFlip.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode'],
      },
    },
  },
};

// Compilation
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Gestion des erreurs de compilation (le cas échéant)
if (output.errors) {
  output.errors.forEach(err => console.error(err.formattedMessage));
  process.exit(1);
}

const contractFile = output.contracts["CoinFlip.sol"]["CoinFlip"];
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

async function main() {
  // Se connecter à un nœud local (assurez-vous qu'il tourne sur http://localhost:8545)
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const signer = provider.getSigner();

  console.log("Déploiement du contrat...");

  // Déployer le contrat avec un minimum de mise (ici 0.01 ETH)
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const contract = await factory.deploy(ethers.utils.parseEther("0.01"));
  await contract.deployed();

  console.log("Contrat déployé à l'adresse :", contract.address);
  // Sauvegarder l'adresse dans un fichier pour l'utiliser dans l'interface (optionnel)
  fs.writeFileSync("contractAddress.txt", contract.address);
}

main().catch((error) => {
  console.error("Erreur lors du déploiement :", error);
  process.exit(1);
});
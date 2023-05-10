const { ethers } = require('hardhat');

async function deploy(){
    const EscrowFactory = await ethers.getContractFactory('EscrowFactory');
    const escrowFactory = await EscrowFactory.deploy();

    console.log(`Contract deployed at: ${await escrowFactory.address}`);
}
deploy();
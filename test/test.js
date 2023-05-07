const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Escrow', function () {
  let contract;
  let depositor;
  let beneficiary;
  let arbiter;
  let Escrows;
  const deposit = ethers.utils.parseEther('1');

  before(async () => {
    const Escrow = await ethers.getContractFactory("EscrowFactory");
    [beneficiary, depositor, arbiter] = await ethers.getSigners();
    Escrows = await Escrow.deploy();
  });

  describe('Deployment', ()=>{
    it('should have 0 listings', async()=>{
      expect(await Escrows.noOfListings()).to.equal(0);
    });
  });
  describe('New List', ()=>{
    it('should create new list', async()=>{
      const list1 = await Escrows.newListing('title', 'description', 100, "IMG");
      await list1.wait();
      expect(await Escrows.noOfListings()).to.equal(1);
      console.log(await Escrows.listings(0));
    })
  })
});

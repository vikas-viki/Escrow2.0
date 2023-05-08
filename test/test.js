const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Escrow', function () {
  let contract;
  let depositor;
  let beneficiary;
  let arbiter;
  let Escrows;
  let Escrow;
  before(async () => {
    const Escrow_s = await ethers.getContractFactory("EscrowFactory");
    Escrow = await ethers.getContractFactory('Escrow');
    [beneficiary, depositor, arbiter] = await ethers.getSigners();
    Escrows = await Escrow_s.deploy();
  });

  describe('Deployment', () => {
    it('should have 0 listings', async () => {
      expect(await Escrows.noOfListings()).to.equal(0);
    });
  });

  describe('New List', () => {
    it('should create new list', async () => {
      const list1 = await Escrows.connect(beneficiary).newListing('title_1', 'description_1', 10, "IMG_1");
      await list1.wait();
      expect(await Escrows.noOfListings()).to.equal(1);
    });

    it('Assigns the escrow details correctly', async () => {
      const escrowContract = new ethers.Contract(Escrows.listings(0), Escrow.interface, beneficiary);
      // Retrieve the title and description of the new listing.
      const title = await escrowContract.title();
      const description = await escrowContract.description();
      const image = await escrowContract.image();
      const amount = await escrowContract.amountInUsd();
      const creator = await escrowContract.beneficiary();

      expect(title).to.equal('title_1');
      expect(description).to.equal('description_1');
      expect(image).to.equal('IMG_1');
      expect(amount).to.equal(10);
      expect(creator).to.equal(beneficiary.address);

    });

    it('allows to buy the product', async () => {
      const escrowContract = new ethers.Contract(Escrows.listings(0), Escrow.interface, beneficiary);
      const weiOf11USD = await escrowContract.convertUSDToEther(Number(11));
      const tx = await escrowContract.connect(depositor).buy(arbiter.address, { value: weiOf11USD });
      await tx.wait();
      // Get the balance of contract and checkk if it has the got the amount sent by buyer.
      const add = await Escrows.listings(0);
      const bal = await ethers.provider.getBalance(add);
      expect(bal).to.equal(weiOf11USD);
      expect(await escrowContract.bought()).to.equal(true);
    });
    
    it('allows approver to approbe the buy', async ()=>{
      const sellerBalanceBefore = await ethers.provider.getBalance(beneficiary.address);
      const escrowContract = new ethers.Contract(Escrows.listings(0), Escrow.interface, beneficiary);
      const tx = await escrowContract.connect(arbiter).approve(true);
      await tx.wait();
      // Check if the seller balance updates after the buyer buys the product (approved).
      const sellerBalanceAfter = await ethers.provider.getBalance(beneficiary.address);
      expect(sellerBalanceAfter).to.greaterThan(sellerBalanceBefore);
    });


  });

});

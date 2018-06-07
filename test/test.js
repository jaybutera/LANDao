const ICOtokenContract = artifacts.require("ICOtoken");
const MANACrowdsale = artifacts.require("MANACrowdsale");
const MANAToken = artifacts.require("MANAToken");
const ERC20 = artifacts.require("ERC20");

contract("Crowdsale", ([owner, externalWallet, buyer]) => {
  let ICOtoken, crowdsale, MANAtoken;
  const TOTAL_TOKEN_SUPPLY = 1000000000000000000;
  const MANA_FOR_BUYER = TOTAL_TOKEN_SUPPLY / 100;
  const MANA_USED_FOR_BUYING = MANA_FOR_BUYER / 1;

  before(async () => {
    ICOtoken = await ICOtokenContract.new(owner, TOTAL_TOKEN_SUPPLY);
    MANAtoken = await MANAToken.new(owner, TOTAL_TOKEN_SUPPLY);
    crowdsale = await MANACrowdsale.new(
      1,
      externalWallet,
      ICOtoken.address,
      MANAtoken.address
    );
    // Transfer ICO tokens to crowdsale
    await ICOtoken.transfer(crowdsale.address, TOTAL_TOKEN_SUPPLY, {
      from: owner
    });
    // Transfer some MANA to the buyer for purchasing
    await MANAtoken.transfer(buyer, MANA_FOR_BUYER, { from: owner });
  });

  context("ICOtoken", async () => {
    it(`should have a total supply of: ${TOTAL_TOKEN_SUPPLY}`, async () => {
      let supply = await ICOtoken.totalSupply();
      assert.equal(supply, TOTAL_TOKEN_SUPPLY, "Token Supply: " + supply);
    });
  });

  context("MANAtoken", async () => {
    it(`should have a total supply of: ${TOTAL_TOKEN_SUPPLY}`, async () => {
      let supply = await MANAtoken.totalSupply();
      assert.equal(supply, TOTAL_TOKEN_SUPPLY, "Token Supply: " + supply);
    });

    it(`should have transferred ${MANA_FOR_BUYER} tokens to buyer`, async () => {
      let buyerMANA = await MANAtoken.balanceOf(buyer);
      assert.equal(buyerMANA, MANA_FOR_BUYER, "after buy");
    });
  });

  context("Crowdsale", async () => {
    it(`should own ${TOTAL_TOKEN_SUPPLY} ICO tokens`, async () => {
      let crowdsaleICOTokenBalance = await ICOtoken.balanceOf(
        crowdsale.address
      );
      assert(crowdsaleICOTokenBalance == TOTAL_TOKEN_SUPPLY);
    });

    it("should accept MANA payments", async () => {
      // Log Buyer balance of MANA and ICOtoken before buy
      let buyerMANA = await MANAtoken.balanceOf(buyer);
      let buyerICOtoken = await ICOtoken.balanceOf(buyer);
      console.log(
        "Before Buy - ",
        "Buyer MANA: ",
        buyerMANA["c"],
        "Buyer ICOtoken: ",
        buyerICOtoken["c"]
      );

      // Approve transfer of MANA from buyer to ICO
      let tx1 = await MANAtoken.approve(
        crowdsale.address,
        MANA_USED_FOR_BUYING,
        {
          from: buyer
        }
      );

      //Check Allowance of MANA from buyer to ICO
      let MANAallowance = await MANAtoken.allowance(buyer, crowdsale.address);
      assert.equal(
        MANAallowance.valueOf(),
        MANA_USED_FOR_BUYING,
        `Allowance is not ${MANA_USED_FOR_BUYING}`
      );
      //
      // Buy ICO Tokens from crowdsale contract with MANA
      let tx2 = await crowdsale.buyTokens(MANA_USED_FOR_BUYING, {
        from: buyer
      });

      // Log Buyer balance of MANA and ICOtoken after buy
      buyerMANA = await MANAtoken.balanceOf(buyer);
      buyerICOtoken = await ICOtoken.balanceOf(buyer);
      let manaRaised = await crowdsale.manaRaised();
      console.log(
        "After Buy - ",
        "Buyer MANA: ",
        buyerMANA["c"],
        "Buyer ICOtoken: ",
        buyerICOtoken["c"],
        "MANA Raised: ",
        manaRaised["c"]
      );

      // Test: Check variable tokens on contract
      console.log("MANA Raised: ", manaRaised["c"]);

      // assert.equal(buyerMANA.valueOf(), 0, "After buy");
      // assert.equal(buyerICOtoken.valueOf(), 50, "After buy");
    });
  });
});

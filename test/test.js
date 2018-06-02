const DCLtoken = artifacts.require('DCLtoken')
const MANACrowdsale = artifacts.require('MANACrowdsale')
const MANAToken = artifacts.require('MANAToken')
const ERC20 = artifacts.require('ERC20')

contract('Test', ([owner, manaAddress]) => {
   let token, crowdsale, MANAtoken

   before( async () => {
      token = await DCLtoken.new(owner, 1000, {from: owner})
      MANAtoken = await MANAToken.new({from: owner})

      crowdsale = await MANACrowdsale.new(
         1,
         manaAddress,
         token.address,
         MANAtoken.address,
         {from: owner}
      )
   })

   context('Fuknutz', async () => {
      it('test', async () => {
         assert(1==1)
      })
   })
})

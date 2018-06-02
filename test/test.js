const DCLtoken = artifacts.require('DCLtoken')
const MANACrowdsale = artifacts.require('MANACrowdsale')
const MANAToken = artifacts.require('MANAToken')
const ERC20 = artifacts.require('ERC20')

contract('Test', ([owner, manaAddress]) => {
   let token, crowdsale, MANAtoken

   before( async () => {
      token = await DCLtoken.new(owner, 1000)
      MANAtoken = await MANAToken.new()
      crowdsale = await MANACrowdsale.new(1, manaAddress, ERC20(token.address), ERC20(MANAtoken.address))
   })

   context('Fuknutz', async () => {
      it('test', async () => {
         assert(1==1)
      })
   })
})

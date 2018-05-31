const DCLtoken = artifacts.require('DCLtoken')
const MANACrowdsale = artifacts.require('MANACrowdsale')
const MANAToken = artifacts.require('MANAToken')
const ERC20 = artifacts.require('ERC20')

contract('Test', accounts => {
   let token, crowdsale, MANAtoken
   let manaAddress = accounts[1]

   before( async () => {
      token = await DCLtoken.new()
      MANAtoken = await MANAToken.new()
      crowdsale = await MANACrowdsale.new(1, manaAddress, ERC20(token.address), ERC20(MANAtoken.address))
   })

   context('Fuknutz', async () => {
      it('test', async () => {
         assert(1==1)
      })
   })
})

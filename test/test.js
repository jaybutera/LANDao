const DCLtoken = artifacts.require('DCLtoken')
const MANACrowdsale = artifacts.require('MANACrowdsale')

contract('Test', accounts => {
   let token, crowdsale

   before( async () => {
      token = await DCLtoken.new()
      crowdsale = await MANACrowdsale.new()
   })

   context('Fuknutz', async () => {
   })
})

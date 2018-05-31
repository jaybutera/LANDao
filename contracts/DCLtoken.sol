//import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/BasicToken.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/BasicToken.sol';

contract DCLtoken is BasicToken {
   constructor (uint256 _totalSupply) {
      totalSupply_ = _totalSupply;
   }
}

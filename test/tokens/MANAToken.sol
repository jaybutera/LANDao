pragma solidity ^0.4.11;

import 'openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

//import "./BurnableToken.sol";

contract MANAToken is StandardToken {

    string public constant symbol = "MANA";

    string public constant name = "Decentraland MANA";

    uint8 public constant decimals = 18;

    constructor(address initialAccount, uint256 initialBalance) public {
      balances[initialAccount] = initialBalance;
      totalSupply_ = initialBalance;
    }
}

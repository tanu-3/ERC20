// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract Ethereum is ERC20 {
    struct Customer {
        address toAddress;
        uint256 amount;
}
    Customer[] public customers;
    event Minting(address indexed _from, address indexed _to, uint256 amount);
    event Burning(address indexed _of, uint256 amount);
    event Transferring(address indexed _from, address indexed _to, uint256 amount);
    constructor() ERC20("ETHEREUM", "ETH") {
        _mint(msg.sender, 1000 * 2 ** uint(decimals())); // Initial minting for contract owner
    }
    // Function to add buyer to the queue
    function requestTokens(address _toAddress, uint256 _amount) public  {
        customers.push(Customer({toAddress: _toAddress, amount: _amount}));
    }
    // Function to mint tokens for buyers in queue
    function mintTokens() public {
      for (uint256 i = customers.length; i > 0; i--) {
      if (customers[i - 1].toAddress != address(0)) { // Check for non-zero address
      _mint(customers[i - 1].toAddress, customers[i - 1].amount);
      emit Minting(msg.sender, customers[i - 1].toAddress, customers[i - 1].amount);
      customers.pop();
      }
   }
}
    // Function to burn tokens
    function burnTokens(address _from, uint256 _amount) public  {
        _burn(_from, _amount);
        emit Burning(_from, _amount);
    }
    // Function to transfer tokens
    function transferTokens(address _from, address _to, uint256 _amount) public {
        _transfer(_from,_to, _amount);
        emit Transferring(_from, _to, _amount);
    }
    // Function to get the queue of buyers
    function getBuyer() public view returns (Customer[] memory) {
        return customers;
    }
}

# Ethereum Exchange using ERC20

This is the demo of how token can be minted ,transferred and also burned in ERC20.

## Description
The smart contract  is deployed n remix and done on vs code, This contract is an ERC20 contract. ```Customer[] public customers``` used for storing the data.  We have used ``` functions requestTokens``` , ```function mintTokens```, ```function burnTokens``` , ```function transferTokens``` these are used for owner how will token be burned,transferred, minted by owner easily.

## Getting Started
### Executing the program
To run the code, follow these steps:
1) open my project
2) copy the ```Ethereum.sol```into remix and deploy.
3) After deploying copy the address of contract and paste in ```contractAddress``` inside ```app.js```, and copy abi and paste in ```contractABI``` inside same ```app.js```.
4) Now open ```index.html``` in browser and start interacting.

### Interaction with FrontEnd
1) Always click ```connect wallet``` button whenever the page relodes.
2) Add buyers in queue using ```request tokens```
3) Using the owner account click ```Mint Tokens```. After transaction check supply using ```Get Total Supply```.
4) For burn tokens switch to the account you want to burn token of, enter the address of the same account and amount and click ```Burn Tokens```.
5) For Transfer token switch to account you want to transfer from, enter from , to address and amount then click ```Transfer Tokens```.
6) You can check all the transaction and address on sepolia ether scan.

let provider;
let signer;
let contract;
const contractAddress = '0x3b014c0307Ad9dc4262F1696BC463Fd3c6dC4679';//paste your own address
const contractABI = [
	[
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_from",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				}
			],
			"name": "burnTokens",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "allowance",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "needed",
					"type": "uint256"
				}
			],
			"name": "ERC20InsufficientAllowance",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "sender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "balance",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "needed",
					"type": "uint256"
				}
			],
			"name": "ERC20InsufficientBalance",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "approver",
					"type": "address"
				}
			],
			"name": "ERC20InvalidApprover",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "receiver",
					"type": "address"
				}
			],
			"name": "ERC20InvalidReceiver",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "ERC20InvalidSender",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				}
			],
			"name": "ERC20InvalidSpender",
			"type": "error"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "_of",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "Burning",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "_from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "_to",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "Minting",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "mintTokens",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_toAddress",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				}
			],
			"name": "requestTokens",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "transfer",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "_from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "_to",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "Transferring",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				}
			],
			"name": "transferTokens",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				}
			],
			"name": "allowance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "customers",
			"outputs": [
				{
					"internalType": "address",
					"name": "toAddress",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "decimals",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getBuyer",
			"outputs": [
				{
					"components": [
						{
							"internalType": "address",
							"name": "toAddress",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "amount",
							"type": "uint256"
						}
					],
					"internalType": "struct Ethereum.Customer[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "name",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "symbol",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]
]; // paste your own abi

// const contractAddress;
// const contractABI;
 
//function to connect wallet and get provider, signer, contract
// async function connectWallet(){
//     if (typeof window.ethereum !== 'undefined') {
// 		try{
//         console.log('MetaMask is installed!');
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         await provider.send("eth_requestAccounts",[]);
//         contract = new ethers.Contract(contractAddress, contractABI, signer);
//     } else {
//         alert('Please install MetaMask!');
//         return;
//     }
// }
async function connectWallet(setWalletState) {
    if (typeof window.ethereum !== 'undefined') {
        try {
            console.log('MetaMask is installed!');
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Request account access
            await provider.send("eth_requestAccounts", []);
            
            // Create contract instance
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            
            // Get connected account
            const account = await signer.getAddress();
            const balance = await provider.getBalance(account);
            
            // Update state with wallet info
            setWalletState({
                account,
                balance: ethers.utils.formatEther(balance),
                connected: true
            });

            console.log(`Connected account: ${account}`);
            console.log(`Balance: ${ethers.utils.formatEther(balance)} ETH`);

        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            alert('Failed to connect to MetaMask. Please try again.');
        }
    } else {
        alert('Please install MetaMask!');
    }
}

export default connectWallet;

//function to add buyer in request queue
async function requestTokenFunction() {
    const address = document.getElementById('requestAddress').value;
    const amount = document.getElementById('requestAmount').value;
	if (!ethers.utils.isAddress(address)) {
        alert('Invalid address. Please enter a valid Ethereum address.');
        return;
    }
	if (isNaN(amount) || amount <= 0) {
        alert('Invalid amount. Please enter a positive number.');
        return;
    }
    try {
        const tx = await contract.requestTokens(address, amount);
        await tx.wait();
        alert('Tokens requested successfully!');
    } catch (error) {
        console.error(error);
		if (error.code === 4001) {
            alert('Transaction rejected by user.');
        } else {
            alert('Error requesting tokens: ' + (error.message || 'Unknown error'));
        }
    }
}
//         alert('Error requesting tokens');
//     }
// }

//function to mint tokens for all the buyers
async function mintTokenFunction() {
    try {
        const tx = await contract.mintToken();
        await tx.wait();
        alert('Tokens minted successfully!');
    } catch (error) {
        console.error(error);
        alert('Error minting tokens');
    }
}

    //function to burn tokens
    async function burnTokensFuntion(){
        const address = document.getElementById('burnAddress').value;
        const amount = document.getElementById('burnAmount').value;

        try {
            const tx = await contract.burnToken(address, amount);
            await tx.wait();
            alert('Tokens burnt successfully!');
        } catch (error) {
            console.error(error);
            alert('Error burning tokens');
        }
    }

    // function to transfer token to other address
    async function transferTokensFunction() {
        const fromAddress = document.getElementById('transferFromAddress').value;
        const toAddress = document.getElementById('transferToAddress').value;
        const amount = document.getElementById('transferAmount').value;

        try {
            const tx = await contract.transferToken(fromAddress, toAddress, amount);
            await tx.wait();
            alert('Tokens transferred successfully!');
        } catch (error) {
            console.error(error);
            alert('Error transferring tokens');
        }
    }
    //functino to check the queue of buyers
    async function getCustomersFunction() {
        try {
            const customers = await contract.getBuyerBalance();
            const customerRequests = customers.map(customer => {
                const toAddress = customer.toAddress ;
                const amount = parseInt(customer.amount);
    
                return `Address: ${toAddress}, Amount: ${amount}\n`;
            }).join('\n');
    
            document.getElementById("customerRequests").innerText = customerRequests;
            console.log("Customer requests retrieved");
        } catch (error) {
            console.error("Error retrieving customer requests:", error);
            document.getElementById("customerRequests").innerText = "Error retrieving customer requests.";
        }
    }
    
    // function to check total supply of tokens
    async function getTotalSupply() {
        try {
            const totalSupply = await contract.totalSupply();
            const formattedTotalSupply = parseInt(totalSupply);
            document.getElementById("totalSupply").innerText = `Total Supply: ${formattedTotalSupply}`;
            console.log(`Total Supply: ${formattedTotalSupply}`);
        } catch (error) {
            console.error("Error retrieving total supply:", error);
            document.getElementById("totalSupply").innerText = "Error retrieving total supply.";
        }
    }
    


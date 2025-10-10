export const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
export const coffeeAbi = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "priceFeed",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "fallback",
        "stateMutability": "payable"
    },
    {
        "type": "receive",
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "fund",
        "inputs": [],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "getAddressToAmountFunded",
        "inputs": [
            {
                "name": "funderIndex",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getFunder",
        "inputs": [
            {
                "name": "funder",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getFundersLength",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getMinimumUsd",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "getOwner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getPriceFeed",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract AggregatorV3Interface"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getVersion",
        "inputs": [
            {
                "name": "priceFeed",
                "type": "address",
                "internalType": "contract AggregatorV3Interface"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "withdraw",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "OwnerWithdraw",
        "inputs": [
            {
                "name": "Owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ProjectFunded",
        "inputs": [
            {
                "name": "funder",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "FundMe__CallFailed",
        "inputs": []
    },
    {
        "type": "error",
        "name": "FundMe__FunderIndexOutOfBounds",
        "inputs": []
    },
    {
        "type": "error",
        "name": "FundMe__MustBeOwnerToWithdraw",
        "inputs": []
    },
    {
        "type": "error",
        "name": "FundMe__SendMinimumOfFiveDollarsWorth",
        "inputs": []
    }
]
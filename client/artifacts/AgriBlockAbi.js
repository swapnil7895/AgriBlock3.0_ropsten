const AgriBlockAbi =  [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "cropCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "dCropCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "dealerProfitPercent",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "dealers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "dealerId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "dealerName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "contact",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "addrs",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "farmers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "farmerId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "farmerName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "contact",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "addrs",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "sdCropCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "subdealerProfitPercent",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "subdealers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "subDealerId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "subdealerName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "contact",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "addrs",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_jwari",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_bajari",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_wheat",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_groundnut",
        "type": "uint256"
      }
    ],
    "name": "setPrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_forDealer",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_forSubdealer",
        "type": "uint256"
      }
    ],
    "name": "setProfitPercentage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_farmerName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phoneNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      }
    ],
    "name": "registerFarmer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cropType",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_quantity",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "addCropDetails",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_dealerName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phoneNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      }
    ],
    "name": "registerDealer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cropId",
        "type": "uint256"
      }
    ],
    "name": "seeCropsAtFarmer",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "cropId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "cropName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "farmer_quantity",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "location",
            "type": "string"
          },
          {
            "internalType": "address payable",
            "name": "farmerAddrs",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "dealerAddrs",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "subDealerAddrs",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isAdded",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "cropPrice",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "farmerName",
            "type": "string"
          }
        ],
        "internalType": "struct AgriBlock.Crop",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cropId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_quantity",
        "type": "uint256"
      }
    ],
    "name": "buyFromFarmer",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cropId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_newPrice",
        "type": "uint256"
      }
    ],
    "name": "dealerSetPriceOfCropExpl",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_subdealerName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phoneNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      }
    ],
    "name": "registerSubdealer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cropId",
        "type": "uint256"
      }
    ],
    "name": "seeCropsAtDealer",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "cropId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "farmerCropId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "cropName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "farmer_quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "dealer_quantity",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "location",
            "type": "string"
          },
          {
            "internalType": "address payable",
            "name": "farmerAddrs",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "dealerAddrs",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "cropPrice",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "dealerName",
            "type": "string"
          }
        ],
        "internalType": "struct AgriBlock.DCrop",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cropId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_quantity",
        "type": "uint256"
      }
    ],
    "name": "buyFromDealer",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cropId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_newPrice",
        "type": "uint256"
      }
    ],
    "name": "subdealerSetPriceOfCropExpl",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cropId",
        "type": "uint256"
      }
    ],
    "name": "seeCropsAtSubdealer",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "cropId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "farmerCropId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "dealerCropId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "cropName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "farmer_quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "dealer_quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "subdealer_quantity",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "location",
            "type": "string"
          },
          {
            "internalType": "address payable",
            "name": "farmerAddrs",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "dealerAddrs",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "subdealerAddrs",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "cropPrice",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "subdealerName",
            "type": "string"
          }
        ],
        "internalType": "struct AgriBlock.SDCrop",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cropId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_quantity",
        "type": "uint256"
      }
    ],
    "name": "buyCrop",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cropId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_quantity",
        "type": "uint256"
      }
    ],
    "name": "getPriceForQuantityInWei",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_quote",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
] ;

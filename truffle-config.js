

const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()

module.exports = {

  networks: {

    ropsten: {
      provider: () =>
        new HDWalletProvider(
          {
            mnemonic: {
              phrase: process.env.MNEMONIC
            },
            providerOrUrl: "wss://ropsten.infura.io/ws/v3/" + process.env.INFURA_API_KEY,
            //providerOrUrl: "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY,
            numberOfAddresses: 1,
            shareNonce: true
          }
        ),
      gasPrice: 25000000000000000,
      network_id: 3,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 200

    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          MN,
          URL
          // process.env.MNEMONIC,
          // `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`

        )

      },

      gasPrice: 25000000000,
      network_id: 4,
      networkCheckTimeout: 100000000,
      timeoutBlocks: 20000

    },
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    }
    // Another network with more advanced options...
    // advanced: {
    // port: 8777,             // Custom port
    // network_id: 1342,       // Custom network
    // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    // from: <address>,        // Account to send txs from (default: accounts[0])
    // websocket: true        // Enable EventEmitter interface for web3 (default: false)
    // },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    // ropsten: {
    // provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
    // network_id: 3,       // Ropsten's id
    // gas: 5500000,        // Ropsten has a lower block limit than mainnet
    // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      optimizer: {
        enabled: true,
        runs: 200
      },
      //  evmVersion: "byzantium"
      // }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
  //
  // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
  // those previously migrated contracts available in the .db directory, you will need to run the following:
  // $ truffle migrate --reset --compile-all

  db: {
    enabled: false
  }
};

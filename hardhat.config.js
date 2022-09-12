require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

/** @type import('hardhat/config').HardhatUserConfig */

const ROPSTEN_RPC_URL = process.env.RINKEBY_RPC_URL
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
// const REPORT_GAS = process.env.REPORT_GAS

module.exports = {
    // solidity: "0.8.8",
    solidity: {
        compilers: [
            {
                version: "0.8.8",
            },
            {
                version: "0.6.6",
            },
        ],
    },
    networks: {
        ropsten: {
            url: process.env.ROPSTEN_RPC_URL || "",
            accounts: [],
            chainId: 3,
        },
        rinkeby: {
            url: RINKEBY_RPC_URL || "",
            accounts: [RINKEBY_PRIVATE_KEY],
            chainId: 4,
            blockConfirmations: 6,
            gas: 6000000,
        },
    },
    gasReporter: {
        enabled: true /*process.env.REPORT_GAS !== undefined*/,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        //coinmarketcap: COINMARKETCAP_API_KEY,
        token: "MATIC",
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
}

// function deployFunc(hre) {
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { deployments, network, getNamedAccounts } = require("hardhat")
const { verify } = require("../utils/verify")
//     console.log("Hi!")
//     hre.getNamedAcconts()
//     hre.deployments()
// }
//
// module.exports.default = deployFunc

//
// module.exports = async (hre) => {
//     const { getNamedAccounts, deployents } = hre
// }

// the same as
// const helperConfig = require("../helper-hardhat-config")
// const networkConfig = helperConfig.networkConfig
// const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // well, what happens when we want to change chains?
    // when going for localhost or hardhat network we want to use a mock

    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    const args = [ethUsdPriceFeedAddress]
    log("Deploying FundMe and waiting for confirmations...")
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], // put price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`FundMe deployed at ${fundMe.address}`)
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        // verfify
        await verify(fundMe.address, args)
    }

    log("-------------------------------------")
}

module.exports.tags = ["all", "fundme"]

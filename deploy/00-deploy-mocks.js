const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSER,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployents }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // if (developmentChains.includes(chainId)) {
    if (developmentChains.includes(network.name)) {
        /* if (chainId == "31337") */
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSER],
        })
        log("Mocks deployed!")
        log("---------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]

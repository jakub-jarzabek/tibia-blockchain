import { ethers } from 'hardhat'
import fs from 'fs'
import path from 'path'
import util from 'util'
const DECIMALS = '18'
const INITIAL_PRICE = '2000000000000000000000'

const readFile = util.promisify(fs.readFile)

async function main() {
    const obj = JSON.parse(
        await readFile(path.resolve('./output/Addresses.json'), 'utf8')
    )

    const Aggregator = await ethers.getContractFactory('MockV3Aggregator')
    const aggregator = await Aggregator.deploy(DECIMALS, INITIAL_PRICE)

    await aggregator.deployed()
    const aggregatorAddress = aggregator.address
    obj.aggregator = aggregatorAddress
    fs.writeFileSync(
        path.resolve('./output/Addresses.json'),
        JSON.stringify(obj)
    )
}
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

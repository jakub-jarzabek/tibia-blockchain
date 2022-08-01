import { ethers } from 'hardhat'
import util from 'util'
import fs from 'fs'
import path from 'path'
import { priceRates } from '../constants'
const readFile = util.promisify(fs.readFile)

async function main() {
    const obj = JSON.parse(
        await readFile(path.resolve('./output/Addresses.json'), 'utf8')
    )
    const TibiaPayment = await ethers.getContractFactory('TibiaPayment')
    const tibiaPayment = await TibiaPayment.deploy(
        priceRates[0],
        priceRates[1],
        obj.aggregator
    )

    await tibiaPayment.deployed()
    const tibiaAddress = tibiaPayment.address
    obj.tibia = tibiaAddress
    fs.writeFileSync(
        path.resolve('./output/Addresses.json'),
        JSON.stringify(obj)
    )
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

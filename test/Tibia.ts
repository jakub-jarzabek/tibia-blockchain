import { BaseProvider } from '@ethersproject/providers'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import { describe } from 'mocha'
import { priceRates } from '../constants'
import { TibiaPayment } from '../typechain-types'
const DECIMALS = '18'
const INITIAL_PRICE = '2000000000000000000000'

describe('Tibia Payment', () => {
    let tibia: TibiaPayment
    let accounts: SignerWithAddress[]
    let provider: BaseProvider
    beforeEach(async () => {
        accounts = await ethers.getSigners()
        provider = ethers.getDefaultProvider()
        const Aggregator = await ethers.getContractFactory('MockV3Aggregator')
        const aggregator = await Aggregator.deploy(DECIMALS, INITIAL_PRICE)
        await aggregator.deployed()
        const tibiaPayment = await ethers.getContractFactory('TibiaPayment')
        tibia = await tibiaPayment.deploy(
            priceRates[0],
            priceRates[1],
            aggregator.address
        )
        await tibia.deployed()
    })
    it('Should allow donation', async () => {
        await tibia
            .connect(accounts[1])
            .donate(123, 5, { value: ethers.utils.parseEther('1') })

        expect(await provider.getBalance(tibia.address)).to.equal(
            ethers.utils.parseEther('1')
        )

        // it('Shoould reject dontaion with too small amout', async () => {
        //     await tibia.connect(accounts[1]).donate(123, 5, { value: 1 })
        // })
    })
})

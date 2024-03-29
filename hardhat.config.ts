import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: '0.8.8',
            },
            {
                version: '0.6.6',
            },
        ],
    },
}

export default config

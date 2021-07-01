/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import '@nomiclabs/hardhat-waffle'

module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.6',
        settings: {
        },
      },
    ],
  },
  networks: {
    hardhat: {
      // throwOnCallFailures: false,
      // throwOnTransactionFailures: false,
    },
  },
  mocha: {
    bail: true,
    timeout: '600s',
  },
}

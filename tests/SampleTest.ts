import { ethers } from 'hardhat'
import { Contract, Signer } from 'ethers'

// The `expect` object imported from `testUtil` uses the matchers from
// `ethereum-waffle` as well as `chai-as-promised`.
import { expect, expectStatusOK, expectStatusFail } from './testUtil'

describe('SampleTest', () => {
    let signers: Signer[]
    let signer: Signer
    let foo: Contract

    before(async () => {
        signers = await ethers.getSigners()
        signer = signers[0]

        const factory = await ethers.getContractFactory('SampleContract')
        foo = await factory.deploy()
    })

    it('expects tx to succeed', async () => {
        const tx = await foo.anything()

        // Since `expectStatusOK` and `expectStatusFail` are of type `PromisedAssertion`,
        // either `return` or `notify` must be used with them, as with promised assertions
        // created using the `eventually` property.
        return expectStatusOK(tx)
    })

    it('expects tx to fail', async () => {

        // When on `hardhat` network with `throwOnTransactionFailures` set to `true`
        // (the default), Hardhat throws before there's a `TransactionResponse`.
        // Rinkeby would allow the transaction to be mined with a `status` of 0 in the
        // transaction receipt.
        const tx = await signer.sendTransaction({
            to: foo.address,
            data: foo.interface.encodeFunctionData('alwaysFail()'),
            gasLimit: 100000,
        })

        return expectStatusFail(tx)
    })

    it('expects 5 to be returned', async () => {
        return expect(foo.returnSomething()).to.eventually.eq(5)
    })
})

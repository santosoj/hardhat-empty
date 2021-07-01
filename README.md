## hardhat-empty

Empty Hardhat project with some QoL improvements.

#### Install dependencies
```
yarn install
```

#### Hardhat console startup
[scripts/consoleStartup.ts](scripts/consoleStartup.ts)

In order to eliminate repetitive tasks that would often be performed after starting a Hardhat console, a console startup script was added that can be invoked using:
```
yarn run console
```
(The `console` script defined in `package.json` sets Node's `--experimental-repl-await` option to enable top-level `await`.) If any options need to be passed to `hardhat`, they may be specified after an end-of-options marker (`--`), e.g.:
```
yarn run console -- --network rinkeby
```
The console startup injects these objects into the REPL context:
- `signers` ― `Signer` instances as returned by `ethers.getSigners`
- `signer` ― Default signer (`signers[0]`)
- `provider` ― `signers[0].provider`
- `factories` ― Factory  for each deployable contract; keys match artifact names
  + If e.g. there's a deployable contract named `Foo`, it may be deployed by issuing: `await factories.Foo.deploy()`
- `formatEther`, `parseEther` ― Just automatic imports of `ethers.utils.formatEther`, `ethers.utils.parseEther`

#### Test utilities
[tests/testUtil.ts](tests/testUtil.ts)

- `chai` and `expect` pre-loaded with matchers from `hardhat-waffle` and `chai-as-promised` promised assertions
- Promised transaction success/failure assertions heeding the transaction receipt's `status` field

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv/config");

const { HARDHAT_PORT } = process.env;

module.exports = {
  solidity: "0.7.3",
  networks: {
    localhost: { url: `http://127.0.0.1:${HARDHAT_PORT}` },
    hardhat: {
      accounts: [{"privateKey":"0x15486b3e0492ea9707d36bd4844c8e2b2c6f9c44ebd7bf2f358cd872f49f0c47","balance":"1000000000000000000000"},{"privateKey":"0xc6860d6aae731c4621e682b0c7db14f90ad9f6c478fc81edc1045ea2ecd16258","balance":"1000000000000000000000"},{"privateKey":"0x51be81aa3e00c443aa35d936092377fc3739cda4ea646500a76848a911dba470","balance":"1000000000000000000000"},{"privateKey":"0x4e8ef90de5b64e5a8fb96035840f1a4b6b361e950c53d6e2456c55cffc270f93","balance":"1000000000000000000000"},{"privateKey":"0x0d4d7b5d041e3f3aaa479b8566709fc6586d70ab25813f07ccd563a1239a5cf4","balance":"1000000000000000000000"},{"privateKey":"0xdc7fc6f8913a92d050b6b440113c60255d6e0a173859597c0eb7a2a0ac831db7","balance":"1000000000000000000000"},{"privateKey":"0x0b2b9950e1522c728f79f30bd53f524c51ea4ab311d37530679474397c2a4829","balance":"1000000000000000000000"},{"privateKey":"0xd819cef278afa4aef0de6de440481d7687aaddc175dd5b789159faff233adfe9","balance":"1000000000000000000000"},{"privateKey":"0x91d98bdc498a5d6c5bedb7d7fbf166c87742d78630be938af67870aeeb605c24","balance":"1000000000000000000000"},{"privateKey":"0x60e2d967584f0e051ac79d917f945f09e10b50a930350b9b436a7e85cf388d50","balance":"1000000000000000000000"}]
    },
  },
  paths: {
    sources: './contracts',
    tests: './__tests__/contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};
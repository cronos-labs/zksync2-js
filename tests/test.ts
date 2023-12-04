import { expect } from "chai";
import { Provider, Wallet, utils } from "../src";
import { ethers } from "ethers";
import { TOKENS } from "./const";

const CRO_ADDR = "0x6296e99a56BC92ff200fbFAB1EcCa899366e1014"
const MNEMONIC="fine music test violin matrix prize squirrel panther purchase material script deal"

const DERIVE_PATH = "m/44'/60'/0'/0/1";
const main = async () => {

    const wallet1 = ethers.Wallet.fromMnemonic(MNEMONIC, DERIVE_PATH);

    const provider = Provider.getDefaultProvider();
    const ethProvider = ethers.getDefaultProvider("http://localhost:8545");

    const wallet = new Wallet(wallet1.privateKey, provider, ethProvider);

    console.log("Wallet address: ", await wallet.getAddress());

    const DEPOSIT_L2_GAS_LIMIT = 1_000_000;

    const gasPrice = await wallet.getGasPrice();
    const baseCost = await wallet.getBaseCost({
        gasLimit: DEPOSIT_L2_GAS_LIMIT
    })

    console.log("expectedCost: ", ethers.utils.formatEther(baseCost));

    // const fullDepositFee = await wallet.getFullRequiredDepositFee({
    //     token: CRO_ADDR,
    //     to: await wallet.getAddress()
    // })

    // console.log("fullDepositFee: ", fullDepositFee);
    

    await wallet.deposit({
        token: CRO_ADDR,
        amount: 1,
        overrides: {

        }
    })

}


main();

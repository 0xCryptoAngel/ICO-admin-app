import Web3 from "web3/dist/web3.min.js";
import ABI_ERC20 from "./erc20_abi.json";

import { Transaction as Tx } from "ethereumjs-tx";
import { getApproveCode, performMetaTx } from "../api/meta-api";

const ERC20_ADDRESS = "0xa067ce4acaf755aaee4c3fbe5c5057ec4dfce348";
const ACCOUNT2 = "0x86f41Fb061A3706F834665F2003caE43BA491996";
const MAX_UINT256 = "0xffffffffffffffffffffffffffffffffffffffff";

class MetaTestWeb3 {
    constructor() {
        // this.rpcUrl = "https://mainnet.infura.io/v3/2c5f30f7c7804ae1bd5b7440758e4a1c";
        this.rpcUrl =
            "https://rinkeby.infura.io/v3/2c5f30f7c7804ae1bd5b7440758e4a1c";
        this.web3 = new Web3(this.rpcUrl);
    }

    async getAddress() {
        if (this.web3) {
            this.accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
        }
        return this.accounts[0];
    }

    async linkWallet() {
        this.web3Provider = window.ethereum;
        try {
            // Request user authorization
            this.accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
        } catch (error) {
            // When the user is not authorized
            console.error("User rejected the request.");
            return false;
        }
        this.web3 = new Web3(this.web3Provider);
        this.network = await this.web3.eth.net.getId();
    }
    async getSign() {
        const from = this.accounts[0];
        let response = await getApproveCode(from);
        const msgParams = "0x" + response.data.signHash;
        const txObject = response.data.txObject;
        const params = [from, msgParams];
        const method = "eth_sign";

        const result = await window.ethereum.request({
            method,
            params,
            from,
        });
        response = await performMetaTx(result.slice(2), txObject);
        const txObj = response.data;
        console.log("txHash", txObj.txHash);
        window.open(
            `https://rinkeby.etherscan.io/tx/${txObj.txHash}`,
            "_blank"
        );
    }

    async getGasPrice() {
        return await this.web3.eth.getGasPrice();
    }
}

export { MetaTestWeb3 as default };

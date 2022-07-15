const Web3 = require("web3");
const ethers = require("ethers");
var ERC20Abi = require("./ERC20.json");

const provider = "https://polygon-mumbai.infura.io/v3/a4905e3b34cc498aa5a839bbcf49b8f2";

//interacting with the blockchain node
const Web3client = new Web3(new Web3.providers.HttpProvider(provider));
const ethersClient = new ethers.providers.JsonRpcProvider(provider);

const signer = Web3client.eth.accounts.privatekeyToAccount("0x13133c59f5879073e62eb6844f91cdd716e29ac5eb89136df08a720bd3b73699");

const tokenAddress = "0x340069Fa0F0e97031eC7676240dF301378275Eab";
const walletAddress = "0x9BAcBDb2AC030D7d15FA0f94e730bA1Ac1132992";

const web3contract = new Web3client.eth.Contract(ERC20Abi.abi, tokenAddress);
const ethersContract = new ethers.Contract(tokenAddress, ERC20Abi.abi, ethersClient);

async function getBalanceWeb3() {
  const result = await web3contract.methods.balanceOf(walletAddress).call();
  
  const format = Web3client.utils.fromWei(result);

  console.log("Web3 - " + format);
}

async function getBalanceEthers() {
  const result = await ethersContract.balanceOf(walletAddress);
  const format = ethers.utils.formatUnits(result, 18);

  console.log("Ethers - " + format);
}

//create token
/*async function createToken() {
    const result = await web3contract.methods.createToken(ethers.utils.parseEther("2000"), "MoonCash", "MCH").send({from: signer.address, gas: 200000});
    const format = Web3client.utils.fromWei(result);
    console.log("create token - " + format);
}*/

getBalanceWeb3();
getBalanceEthers();
//createToken();
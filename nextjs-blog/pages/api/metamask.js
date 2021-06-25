import {ethers} from 'ethers';

async function main() {
    // connect to metamask
    // await ethereum.request({ method: 'eth_requestAccounts' });

    // set up ethers provider
    let provider = new ethers.providers.Web3Provider(window.ethereum);


    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    console.log("signer address: " + address);

    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);

    // const json = require("./artifacts/contracts/ERC721PresetDistributable.sol/ERC721PresetDistributable.json");
    // const contract = new ethers.Contract("0x0402D4831C3580E9D0767e061876f2e90A49e640", json.abi, signer);

    // const privateKey = urlParams.get('secret')

    // if (!privateKey) {
    //     throw '';
    // }

    //try
    // const signingKey = new ethers.utils.SigningKey(privateKey);

    // const keyHash = ethers.utils.solidityKeccak256(["address"], [address]);
    // const signature = signingKey.signDigest(ethers.utils.arrayify(keyHash));

    // console.log(ethers.utils.recoverAddress(keyHash, signature));
    // console.log(ethers.utils.computeAddress(signingKey.publicKey));

    // await contract.ellipticMint(address, signature.v, signature.r, signature.s);
}

main();
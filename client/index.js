import Web3 from "web3";
import 'bootstrap/dist/css/bootstrap.css'
import configuration from '../build/contracts/BookingContract.json'
import data from '../data.json'


(new URL(window.location.href)).searchParams.forEach((x, y) =>
    document.getElementById(y).value = x);

const CONTRACT_ADDRESS = configuration.networks['3'].address;
const CONTRACT_ABI = configuration.abi;
const address = data.address
const privateKey = data.PrivKey
const infuraUrl = 'https://ropsten.infura.io/v3/4dedbeba7f894e588f573103e855ed36'

const web3 = new Web3(infuraUrl);
    const myContract = new web3.eth.Contract(
        CONTRACT_ABI,
        CONTRACT_ADDRESS
    );
myContract.methods.bookingCount().call().then(function(result){document.getElementById('transactionID').value = parseInt(result)+1})
// const web3 = new Web3(
//     'https://ropsten.infura.io/v3/4dedbeba7f894e588f573103e855ed36'
// );

// const address = '0xA6B2C8940e5D351c2dcbB031508934D8f51CD8c7'

// web3.eth.getBalance('0xA6B2C8940e5D351c2dcbB031508934D8f51CD8c7', async (err, result) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     let balance = web3.utils.fromWei(result, "ether");
//     console.log(balance + " ETH");
// });

// const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
// contract.methods.bookingCount().call().then(console.log)
// console.log(CONTRACT_ADDRESS)
// contract.defaultAccount = '0xA6B2C8940e5D351c2dcbB031508934D8f51CD8c7'
// web3.eth.accounts.privateKeyToAccount('3c9b9c4eb238971abfc625dca986840d44eaa40681627141e208ccf2dba8a9df')

const form = document.forms['details'];
form.addEventListener('submit', function(event){
    event.preventDefault()
//     const transactionNo = document.getElementById("transactionID").value
//     const receiver = document.getElementById("receiver").value
//     const locker = document.getElementById("lockerID").value
//     const booker = document.getElementById("booker").value
//     let text = transactionNo + ", " + receiver + ", " + locker + ", " + booker
//     console.log(text)
//     document.getElementById("things").innerHTML = text
    init2()
//     // const tx = contract.methods.registerNewBooking(String(transactionNo), String(receiver), String(locker), String(booker))
//     // const gas = tx.estimateGas({from: "0xA6B2C8940e5D351c2dcbB031508934D8f51CD8c7"})
//     // const gasPrice = web3.eth.getGasPrice()
//     // const data = tx.encodeABI();
//     // const nonce = web3.eth.getTransactionCount("0xA6B2C8940e5D351c2dcbB031508934D8f51CD8c7")
//     // const signedTx = web3.eth.accounts.signTransaction(
//     //     {
//     //         to: CONTRACT_ADDRESS,
//     //         data,
//     //         gas,
//     //         gasPrice,
//     //         nonce,
//     //         chainId: 3
//     //     },
//     //     '3c9b9c4eb238971abfc625dca986840d44eaa40681627141e208ccf2dba8a9df'
//     // ).then(console.log)
//     // // const receipt = web3.eth.sendSignedTransaction(signedTx.rawTransaction)
//     // // console.log("transaction hash: " + receipt.transactionHash)
//     // contract.methods.bookingCount().call().then(console.log)
})

// const init1 = async() => {
//     const tx = contract.methods.registerNewBooking("1", "whai hoe", "locker1", "nicholas");
//     const gas = await tx.estimateGas({from: address});
//     const gasPrice = await web3.eth.getGasPrice();
//     const data = tx.encodeABI();
//     const nonce = await web3.eth.getTransactionCount(address);
//     const signedTx = await web3.eth.accounts.signTransaction(
//         {
//             to: contract.options.address,
//             data,
//             gas,
//             gasPrice,
//             nonce,
//             chainId: 3
//         }, "3c9b9c4eb238971abfc625dca986840d44eaa40681627141e208ccf2dba8a9df"
        
//     );
//     const receipt = await web3.eth.sendTransaction(signedTx.rawTransaction);
//     // console.log("Transaction Hash: "+ receipt.transactionHash);

// }
const init1 = async () => {
    const web3 = new Web3(infuraUrl);
    const myContract = new web3.eth.Contract(
        CONTRACT_ABI,
        CONTRACT_ADDRESS
    )
    const tx = myContract.methods.registerNewBooking("1", "whai Hoe", "locker1", "Nicholas");
    const gas = await tx.estimateGas({from: address});
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = web3.eth.getTransactionCount(address);

    console.log(`gas  = ${gas} \n gas price = ${gasPrice} \n data = ${data}`)

    const signedTx = await web3.eth.accounts.signTransaction({
        to: CONTRACT_ADDRESS,
        data: data,
        gas: gas,
        gasPrice: gasPrice,
        nonce:nonce,
        chainId: "3"
    }, 
    privateKey);
    console.log(`old count ${await myContract.methods.bookingCount().call()}`);
    console.log(signedTx.rawTransaction)
    const receipt = await web3.eth.sendTransaction({from: address, data: signedTx.rawTransaction});
    console.log(`Transaction hash: ${receipt.transactionHash}`)
    console.log(`new count ${await myContract.methods.bookingCount().call()}`);
}

const init2 = async() => {

    const transactionNo = document.getElementById("transactionID").value
    const receiver = document.getElementById("receiver").value
    const locker = document.getElementById("lockerID").value
    const booker = document.getElementById("booker").value

    web3.eth.accounts.wallet.add(privateKey);
    const tx = myContract.methods.registerNewBooking(transactionNo, receiver, locker, booker);
    const gas = await tx.estimateGas({from: address});
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(address);
    console.log(`gas: ${gas}, gasprice: ${gasPrice}`)
    const txData = {
        from: address,
        to: CONTRACT_ADDRESS,
        data: data,
        gas,
        gasPrice,
        nonce,
        chain: 'ropsten',
        hardfork: 'london'
    };
    console.log(`old count ${await myContract.methods.bookingCount().call()}`);
    const receipt = await web3.eth.sendTransaction(txData);
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    console.log(`new count ${await myContract.methods.bookingCount().call()}`);
}

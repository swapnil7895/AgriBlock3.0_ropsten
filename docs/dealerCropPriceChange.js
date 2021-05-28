

const ethEnabled = () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.web3.currentProvider);
        window.ethereum.enable();
        //window.eth_requestAccounts();
        return true;
    }
    return console.log(false);
}
ethEnabled();


//const web3 = new Web3('http://127.0.0.1:7545');
const contract = new web3.eth.Contract(
    AgriBlockAbi,
    AgriBlockAddress
);

let defaultAccount;//temp
web3.eth.getAccounts()
    .then(
        accounts => defaultAccount = accounts[0]//temp
    );

const changePriceButton = document.getElementById("cp-id");

const handlePriceChange = () => {
    const cid = document.getElementById("c-id").value;
    const newp = document.getElementById("newp-id").value;
    const newpp = document.getElementById("new-p-d")

    if (newp == '' || newp < 1) { alert("Enter valid input"); return; }
    if (cid == '' || cid < 1) { alert("Enter valid crop Id"); return; }
    if (newp < 100) { alert("Enter price greater than 100") };


    contract.methods.dealerSetPriceOfCropExpl(cid, newp)
        .send(
            {

                from: web3.eth.currentProvider.selectedAddress,
                gasPrice: 10000,
                gas: 1000000
            }
        )
        .on('transactionHash', h => { alert(" Wait till transaction is being confirmed.. \nTransaction hash is"+h) })
        .on('confirmation', c => { console.log(c) })
        .on('error', e => { alert(e.message) })
        .then(
            result => {
                // alert(console.log);
                alert("Price changed successfully to "+newp+" !! \nTransaction hash is"+result.transactionHash)
                alert("Block hash: " + result.blockHash);
                alert("Block number: " + result.blockNumber);
                newpp.innerHTML ="New price is:<strong>"+ newp+"</strong>";
            })
}

changePriceButton.addEventListener("click", handlePriceChange)

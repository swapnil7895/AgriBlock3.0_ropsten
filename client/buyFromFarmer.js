
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



var cropId= sessionStorage.getItem("cropId");
var inputField = document.getElementById("crop-id");
inputField.value =cropId;
console.log(cropId);
sessionStorage.clear();



const calculateWeiButton = document.getElementById("cal-wei");
const handleWeiCal = () => {
    const c = document.getElementById("crop-id").value;
    const d = document.getElementById("qnt-id").value;
    var amt=document.getElementById("amt-id");

    if (d == '' || d < 1) { alert("Enter valid quantity"); return; }
    if (c == '' || c < 1) { alert("Enter valid crop Id"); return; }

//    try {
       contract.methods.getPriceForQuantityInWei
        (c, d)
        .call({
            from: web3.eth.currentProvider.selectedAddress,
            gasPrice: 10000, gas: 1000000
        },
        (error,result) => {
            if(!error)
            {amt.value = result;
            alert(result);}
            else
            {
                alert(error.message);
            }
            }
        )
        .then()
    //}
    // catch(error)
    // {
    //     console.log(error)
    //     alert("Error:"+error.message);
    //     alert("Error:"+error);
    // }
}


calculateWeiButton.addEventListener('click', handleWeiCal)


const buyFromFarmer = document.getElementById("dBuyCrop-id");
const handleBuyFromFarmer = () => {

    var dqnt = document.getElementById("qnt-id").value;
    var cid = document.getElementById("crop-id").value;
    var val = document.getElementById("amt-id").value;

    if (dqnt == '' || dqnt < 1) { alert("Enter valid quantity"); return; }
    if (cid == '' || cid < 1) { alert("Enter valid crop Id"); return; }
    if (val == '' || val < 1) { alert("Enter valid amount"); return; }

    contract.methods.buyFromFarmer(cid, dqnt).send
        ({
            from: web3.eth.currentProvider.selectedAddress,
            gasPrice: 10000, gas: 1000000, value: val
        })
        .on('transactionHash', h => { alert(dqnt+" unit/units bought successfully !\nEthers transferred successfully\n Transaction hash:  " + h) })
        .on('confirmation', c => { console.log(c) })
        .on('error', e => { alert(e.message) })
        .then(
            result => {
                alert("Block Hash " + result.blockHash);
                console.log(result);
                alert("Block Number " + result.blockNumber);
            }
        )
}

buyFromFarmer.addEventListener('click', handleBuyFromFarmer);

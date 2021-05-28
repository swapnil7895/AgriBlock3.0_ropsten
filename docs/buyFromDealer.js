
const ethEnabled = () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.web3.currentProvider);
        window.ethereum.enable();
        return true;
    }
    return false;
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



var val = document.getElementById("amt-id").value;

var buyFromFarmer = document.getElementById("dBuyCrop-id");


var calculateWeiButton = document.getElementById("cal-wei");
const handleWeiCal = () => {

    var c = document.getElementById("crop-id").value;
    var d = document.getElementById("qnt-id").value;
    var amt=document.getElementById("amt-id");

    console.log(c);
    console.log(d);
    if(c=="" || c<1 ){alert("Enter valid crop Id");};
    if(d=="" || d<1){alert("Enter valid quantity")};
    

    contract.methods.getPriceForQuantityInWei
        (c, d)
        .call({
            from: web3.eth.currentProvider.selectedAddress,
            gasPrice: 10000, gas: 1000000
        },
        (error,result) => {
            if(!error)
            {
                amt.value = result;
                alert(result);
            }
            else
            {
                alert(error.message);
            }
            }
        )
//         .then(result => {
//             amt.value = result;
//            alert(result);
//         })
}

calculateWeiButton.addEventListener('click', handleWeiCal)


const handleBuyFromFarmer = () => {

    var val = document.getElementById("amt-id").value;
    var cc = document.getElementById("crop-id").value;
    var dd = document.getElementById("qnt-id").value;


    if (cc == '' || cc < 1) { alert("Enter valid crop Id"); return; }
    if (dd == '' || dd < 1) { alert("Enter valid quantity"); return; }
    if (val == '' || val < 1) { alert("Enter valid quantity"); return; }

    contract.methods.buyFromDealer(cc, dd)
        .send
        ({
            from: web3.eth.currentProvider.selectedAddress,
            gasPrice: 10000, gas: 1000000, value: val
        })
        .on('transactionHash', h => { alert(" Wait till transaction is being confirmed.. \n Transaction hash is  " + h) })
        .on('confirmation', c => { console.log(c) })
        .on('error', e => { alert(e.message) })
        .then(
            result => {
                alert(dd + " unit/uints bought successfully!!!\nEthers transferred successfully\nTransaction hash is" + result.transactionHash);
                alert("Block Hash " + result.blockHash);
                console.log(result);
                alert("Block Number " + result.blockNumber);
            }
        )
}
buyFromFarmer.addEventListener('click', handleBuyFromFarmer);

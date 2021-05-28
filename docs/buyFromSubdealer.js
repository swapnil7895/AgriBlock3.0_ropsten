

const ethEnabled = () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.web3.currentProvider);
        window.ethereum.enable();
        return true;
    }
    return console.log(false);
}
ethEnabled();


const contract = new web3.eth.Contract(
    AgriBlockAbi,
    AgriBlockAddress
);

let defaultAccount;//temp
web3.eth.getAccounts()
    .then(
        accounts => defaultAccount = accounts[0]//temp
    );



const calculateWeiButton = document.getElementById("cal-wei");
const handleWeiCal = () => {

    const c = document.getElementById("crop-id").value;
    const d = document.getElementById("qnt-id").value;
    const amt = document.getElementById("amt-id");

    if (c == '' || c < 1) { alert("Enter valid crop Id"); }
    if (d == '' || d < 1) { alert("Enter valid quantity"); }

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
        .then(result => {
            console.log(result);
            amt.value = result;
            alert(result);
        })
}

calculateWeiButton.addEventListener('click', handleWeiCal)


const buyFromFarmer = document.getElementById("dBuyCrop-id");
const handleBuyFromFarmer = () => {

    var dqnt = document.getElementById("qnt-id").value;
    var cid = document.getElementById("crop-id").value;
    var val = document.getElementById("amt-id").value;

    if (cid == '' || cid < 1) { alert("Enter valid crop Id"); }
    if (dqnt == '' || dqnt < 1) { alert("Enter valid quantity"); }
    if (val == '' || val < 1) { alert("Enter valid value"); }

    contract.methods.buyCrop(cid, dqnt)
        .send
        ({ from: web3.eth.currentProvider.selectedAddress, gasPrice: 10000, gas: 1000000, value: val })
        .on('transactionHash', h => { alert(" Wait till transaction is being confirmed.. \nTransaction hash is" + h) })
        .on('confirmation', c => { console.log(c) })
        .on('error', e => { alert(e.message) })
        .then(
            result => {
                alert(dqnt + " unit/units bought successfully!!!\nEthers transferred successfully\nTransaction hash is" + result.transactionHash)
                alert("Block Hash " + result.blockHash);
                console.log(result);
                alert("Block Number " + result.blockNumber);
            }
        )
}

buyFromFarmer.addEventListener('click', handleBuyFromFarmer);

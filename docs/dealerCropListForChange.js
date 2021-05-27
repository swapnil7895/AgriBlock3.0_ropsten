

const ethEnabled = () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.web3.currentProvider);
        window.ethereum.enable();
        return true;
    }
    return console.log(false);
}
ethEnabled();


//    const web3 = new Web3('http://127.0.0.1:7545');
const contract = new web3.eth.Contract(
    AgriBlockAbi,
    AgriBlockAddress
);

let defaultAccount;//temp
web3.eth.getAccounts()
    .then(
        accounts => defaultAccount = accounts[0]//temp
    );

const seeAllCropsButton = document.getElementById("dSeeCrops-id");
const tbd = document.getElementById("tbl-bd");
const handleSeeAllCrpos = () => {
    var counter = 1;

    //here we can make another functions for getting dealer crop count (in contract)
    contract.methods.dCropCounter()
        .call
        ({
            from: web3.eth.currentProvider.selectedAddress,
            gasPrice: 10000,
            gas: 1000000
        })
        .then(result => {
            if (result < 1) { alert("You dont have crops yet! Purchase from farmer") }

            let top = result;
            for (i = 1; i <= top; i++) {
                contract.methods.seeCropsAtDealer(i)
                    .call()
                    .then(
                        result => {
                            if (result < 1) { alert("You dont have crops yet! Purchase from farmer") }

                            if (result.dealer_quantity != 0) {
                                console.log(counter);
                                tbd.innerHTML += "<tr><th scope=\"row\" id=\"cid-1\">" + result.cropId + "</th><td id=\"c-1\">" + result.cropName + "</td><td id=\"cp-1\">" + result.cropPrice + "</td><td id=\"cq-1\">" + result.dealer_quantity + "</td><td id=\"cl-1\">" + result.location + "</td><td id=\"bb-1\"><a href=\"./dealerLogin5page14.html\"><button>Change price</button></a></td></tr>"

                                // document.getElementById("c-"+counter).innerHTML=result.cropName;
                                // document.getElementById("cid-"+counter).innerHTML=result.cropId;
                                // document.getElementById("cp-"+counter).innerHTML=result.cropPrice;
                                // document.getElementById("cq-"+counter).innerHTML=result.dealer_quantity;
                                // document.getElementById("cl-"+counter).innerHTML=result.location;
                                // document.getElementById("bb-"+counter).value=result.cropId;
                                counter = counter + 1;
                            }

                        })
            }
        })
}
//seeAllCropsButton.addEventListener('click',handleSeeAllCrpos);


window.onload = handleSeeAllCrpos();

//   const fAddCropDetailsButton=document.getElementById("fadd-b");
//   const handleAddCropDetails = ()=>{
//     var t=document.getElementById("ctype-id").value;
//     var q=document.getElementById("cqnt-id").value;
//     var p=document.getElementById("cplace-id").value;

//     contract.methods.addCropDetails(t,q,p).send
//    ({
//      from: farmerAddress,//temp
//      gasPrice: 10000,
//      gas:1000000 
//    })
//    console.log("crop adding done")
//    alert("crop adding done");
//   }
//   fAddCropDetailsButton.addEventListener("click",handleAddCropDetails);





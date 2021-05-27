
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
  
   let defaultAccount;
   web3.eth.getAccounts()
      .then(
          accounts => defaultAccount =accounts[0]
          );

const seeAllCropsButton=document.getElementById("dSeeCrops-id");
const tbd=document.getElementById("tbl-bd");
const handleSeeAllCrpos=()=>{
    var counter=1;
    
    //here we can make another functions for getting dealer crop count (in contract)
contract.methods.sdCropCounter().call
({  from: web3.eth.currentProvider.selectedAddress,
    gasPrice:10000,gas:1000000
})
.then(result =>
    {
        if (result < 1) { alert("You dont have crops yet! Purchase from dealer") }

        let top=result;
        for(i=1;i<= top; i++)
        {
            contract.methods.seeCropsAtSubdealer(i)
            .call().then(
                result=>{
                    if(result<1){alert("You dont have crops yet! Purchase from farmer")}
     
                    if(result.subdealer_quantity!=0){
                    console.log(counter);
        tbd.innerHTML += "<tr><th scope=\"row\" id=\"cid-1\">"+result.cropId+"</th><td id=\"c-1\">"+result.cropName+"</td><td id=\"cp-1\">"+result.cropPrice+"</td><td id=\"cq-1\">"+result.subdealer_quantity+"</td><td id=\"cl-1\">"+result.location+"</td><td id=\"bb-1\"><a href=\"./subdealerLogin5page19.html\"><button>Change price</button></a></td></tr>"
    
           
                counter=counter+1;
                    }
                })
        }
    })
}

window.onload = handleSeeAllCrpos();



  

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
  
const contract = new web3.eth.Contract(
    AgriBlockAbi,
    AgriBlockAddress
);

let defaultAccount;
web3.eth.getAccounts()
    .then(
        accounts => defaultAccount = accounts[0]
    );

const changePriceButton=document.getElementById("cp-id");

const handlePriceChange=()=>{
    const cid=document.getElementById("c-id").value;
    const newp=document.getElementById("newp-id").value;
    const newpp=document.getElementById("new-p-d")
    
    if(cid=='' || cid<1){alert("Enter valid crop Id");return;}
    if(newp==''|| newp<1){alert("Enter valid new crop price");return;}
    if(newp<100){alert("Enter price greater than 100");return};
    
    contract.methods.subdealerSetPriceOfCropExpl(cid,newp)
    .send(
        {
            from: web3.eth.currentProvider.selectedAddress,
            gasPrice:10000,gas:1000000
        }
    )
    .on('transactionHash',h=>{alert(" Wait till transaction is being confirmed..\nTransaction hash is"+h)})
    .on('confirmation',c=>{console.log(c)})
    .on('error',e=>{alert(e.message)})
    .then(
        result=>{
            alert("Price changed successfully to "+newp+" !! \nTransaction hash is"+h)
            console.log("done");
            newpp.innerHTML ="New price is<strong>"+ newp+"</strong>";
        })
}

changePriceButton.addEventListener("click",handlePriceChange)

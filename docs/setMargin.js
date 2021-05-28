
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
  
   let defaultAccount;
   web3.eth.getAccounts()
      .then(
          accounts => defaultAccount=accounts[0]
          );
    contract.defaultAccount=defaultAccount;
  
  const setMarginButton=document.getElementById("setm-b");
  const handleSetMargin = ()=>{
    var dm=document.getElementById("dm-id").value;
    var sdm=document.getElementById("sdm-id").value;

    if(dm =='' || sdm == '' ){ alert("Enter valid values");return;}
    if(dm <1 || sdm <1 ){ alert("Enter values greater than 0");return;}
    if(dm >30 || sdm >30 ){ alert("Margin should not exceed 30%");return;}
  
    contract.methods.setProfitPercentage(dm,sdm).send
   ({
     from: web3.eth.currentProvider.selectedAddress,
     gasPrice: 10000,
     gas:1000000 
   })
   .on('confirmation', c => { console.log(c) })
   .on('transactionHash', h => { alert(" Wait till transaction is being confirmed.. \nTransaction hash :  " + h") })
   .on('error', err => { alert(err.message + " Failed, try value greater than 100 / You are not government") })
   .then
   (

     result=>
     {
       alert("Transaction hash :  " + result.transactionHash + "\nMargin set done")
       alert("Block Hash "+result.blockHash);
       console.log(result);
       alert("Block Number "+result.blockNumber);
      }
   )
   
   
  }
  setMarginButton.addEventListener("click",handleSetMargin);
  
  
  
  

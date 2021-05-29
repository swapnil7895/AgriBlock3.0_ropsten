
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
    accounts => defaultAccount = accounts[0]
  );
contract.defaultAccount = defaultAccount;


let ele = document.getElementById("bal");


function bal() {
  const B=document.getElementById("B");
  web3.eth.getBalance(web3.eth.currentProvider.selectedAddress)
    .then(
      result => {

        let bal = "<strong>Your balance is: </strong>" + web3.utils.fromWei(result, 'ether') + " Ether";
        B.innerHTML=bal;
        console.log(bal);
      });
}
function nameShow()
{
  const N = document.getElementById("N");
  
   if(web3.eth.currentProvider.selectedAddress == defaultAccount )
  {
    N.innerHTML +="GOVERNMENT"
  }
//   else{
//     N.innerHTML +="CUSTOMER";
//   }
    
  
  contract.methods.farmers(web3.eth.currentProvider.selectedAddress)
    .call()
    .then
    (
      (result) => {
          console.log(result.farmerName)
          if(result==undefined){return;}
          N.innerHTML = "<strong>Name: </strong>"+result.farmerName;
      }
    );

    contract.methods.dealers(web3.eth.currentProvider.selectedAddress)
    .call()
    .then(
      (result) => {
         if(result==undefined){return;}
          console.log(result.dealerName);
          N.innerHTML += result.dealerName;
        
      }
    );

  
    contract.methods.subdealers(web3.eth.currentProvider.selectedAddress)
    .call()
    .then(
      result => {
        if(result==undefined){return;}
        console.log(result.subdealerName)
        N.innerHTML +=  result.subdealerName;
      }
    );
  
 
    

}
function addrs()
{
  const A=document.getElementById("A");
  const ad= document.getElementById("ad");
  A.innerHTML ="<strong>Address: </strong> "+web3.eth.currentProvider.selectedAddress;

}
function BNA()
{
  bal()
  nameShow();
  addrs();
}

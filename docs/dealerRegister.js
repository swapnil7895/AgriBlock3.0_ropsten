

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


// const web3 = new Web3('http://127.0.0.1:7545');
const contract = new web3.eth.Contract(
  AgriBlockAbi,
  AgriBlockAddress
);

let defaultAccount;//temp
web3.eth.getAccounts()
  .then(
    accounts => defaultAccount = accounts[0]//temp
  );
// contract.defaultAccount=defaultAccount;

const dRegisterButton = document.getElementById("dreg-b");
const handleDealerRegister = () => {
  var dn = document.getElementById("dname-id").value;
  var dno = document.getElementById("dno-id").value;
  var de = document.getElementById("demail-id").value;

  if(dn==''){alert("Enter your name!");return;}
  if(dno==''){alert('Enter your phone number!');return;}
  if(de==''){alert("Enter your email id");return;}

  contract.methods.registerDealer(dn, dno, de).send
    ({
      from: web3.eth.currentProvider.selectedAddress,//temp
      gasPrice: 10000,
      gas: 1000000
    })
    .on('transactionHash', h => { alert(" Wait till transaction is being confirmed.. \nTransaction hash: " + h) })
    .on('reciept', r => alert(r))
    .on('confirmation', c => { console.log(c) })
    .on('error', e => { alert(e.message) })
    .then(
      result => 
      {
        alert("Registered successfully!!\nTransaction hash: " + result.transactionHash)
        alert("Block Hash " + result.blockHash);
        console.log(result);
        alert("Block Number " + result.blockNumber);
        alert("Transaction hash " + result.transactionHash);
      })
    .catch(
            (error)=>{
              if(error){
              alert("Error: " + error.message);
                     }
                }
          );

}
dRegisterButton.addEventListener("click", handleDealerRegister);





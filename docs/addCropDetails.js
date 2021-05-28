
const ethEnabled = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.web3.currentProvider);
    window.ethereum.enable();
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
// contract.defaultAccount=defaultAccount;
var a = document.getElementById("a");

const fAddCropDetailsButton = document.getElementById("fadd-b");
const handleAddCropDetails = () => {
  var t = document.getElementById("ctype-id").value;
  var q = document.getElementById("cqnt-id").value;
  var p = document.getElementById("cplace-id").value;

  if (q == '' || q < 1) { alert("Enter valid quantity!"); return; }
  if (p == '' || p == "place") { alert("Enter valid location!"); return; }

  contract.methods.addCropDetails(t, q, p)
    .send
    ({
      from: web3.eth.currentProvider.selectedAddress,
      gasPrice: 10000,
      gas: 1000000
    })
    .on('transactionHash', h => { alert(" Wait till transaction is being confirmed.. \nTransaction hash: " + h) })
    .on('reciept', rec => {
      console.log(rec)
      alert("Reciept: " + rec)
    })
    .on('confirmation',
      (c, r) => {
        console.log(c);
      })
    .on('error', e => { alert(e.message) })
    .then
    (
      result => {

        alert(q+" KG crop/crops added successfully !! \nTransaction hash: " + result.transactionHash)
        alert("Blockhash:  " + result.blockHash);
        alert("Block number: " + result.blockNumber);
      }
    );
}
fAddCropDetailsButton.addEventListener("click", handleAddCropDetails);


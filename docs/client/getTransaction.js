
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
    
     let defaultAccount;
     web3.eth.getAccounts()
        .then(
            accounts => defaultAccount=accounts[0]
            );
      contract.defaultAccount=defaultAccount;
    

  const blockP = document.getElementById("block-p");

  function getTrx() {
  const blockNo = document.getElementById("block-no").value;
  const indexNo = document.getElementById("index-no").value;
  const tbd = document.getElementById("tb-body");

web3.eth.getTransactionFromBlock( blockNo, indexNo,
    (err,o)=>{
        if(!err){
            console.log(o);
        }else{
            console.log(err.message)
            console.log(err)
        }
    })
.then(obj=>{
       
        blockP.innerHTML=""
          tbd.innerHTML = "<tr><th scope=\"row\">Block Number</th><td><b>"+obj.blockNumber+"<b></td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Transaction hash</th><td> "+obj.hash+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">From</th><td> "+obj.from+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">to</th><td> "+obj.to+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Block hash</th><td> "+obj.blockHash+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Nonce</th><td> "+obj.nonce+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Gas </th><td> "+obj.gas+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Gas price</th><td> "+obj.gasPrice+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">r</th><td> "+obj.r+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">s</th><td> "+obj.s+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Input</th><td> "+obj.input+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Transaction index</th><td> "+obj.transactionIndex+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">v </th><td> "+obj.v+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\"> Value</th><td> "+obj.value+"</td></tr><br><br>"

          console.log(obj);       
      })
}

function getTrxc()
{
  const tc=document.getElementById("tc");
  const add=document.getElementById("addr").value;
  try {web3.eth.getTransactionCount(add
    )
  .then(
    r=>{
      tc.innerHTML = "Click here to get transaction: "+"<b>"+r;console.log(r);
      }
  )}
  catch (error) {
      console.log(error);
      alert("Error"+error.message);
      alert("Error"+error);
  };
}
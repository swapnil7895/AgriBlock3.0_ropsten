
  


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
    
   



const blockP = document.getElementById("block-p");

function getBlock() {
  const blockNo = document.getElementById("block-no").value;
  const tbd = document.getElementById("tb-body");
  const r="row";

      web3.eth.getBlock(blockNo)
      .then(obj=>{
          blockP.innerHTML=""
        tbd.innerHTML = "<tr><th scope=\"row\">Block Number</th><td><b>"+obj.number+"<b></td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Block hash</th><td> "+obj.hash+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Parent hash</th><td> "+obj.parentHash+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Mix hash</th><td> "+obj.mixHash+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Nonce</th><td> "+obj.nonce+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Gas limit</th><td> "+obj.gasLimit+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Gas used</th><td> "+obj.gasUsed+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Size</th><td> "+obj.size+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Timestamp</th><td> "+obj.timestamp+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">State root</th><td> "+obj.stateRoot+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Transaction root</th><td> "+obj.transactionsRoot+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Difficulty</th><td> "+obj.difficulty+"</td></tr>"
        tbd.innerHTML += "<tr><th scope=\"row\">Miner</th><td> "+obj.miner+"</td></tr><br><br>"

        // blockP.innerHTML +=  "<br><br><h3>Block details: </h3>";
        // blockP.innerHTML +=  "<br><b>Block number: </b>" + obj.number;
        // blockP.innerHTML += "<br><b>Hash: </b>"+obj.hash;
        // blockP.innerHTML +="<br><b>Parent hash</b>: " + obj.parentHash;
        // blockP.innerHTML +="<br><b>Mix hash:</b> " + obj.mixHash;
        // blockP.innerHTML +="<br><b>Nonce: </b>" + obj.nonce;
        // blockP.innerHTML +="<br><b>Gas limit: </b>" + obj.gasLimit;
        // blockP.innerHTML +="<br><b>Gas used: </b>" + obj.gasUsed;
        // blockP.innerHTML +="<br><b>Receipt root: </b>" + obj.receiptsRoot;
        // blockP.innerHTML +="<br><b>Size: </b>" + obj.size;
        // blockP.innerHTML +="<br><b/>State root: </b>" + obj.stateRoot;
        // blockP.innerHTML +="<br><b>Time stamp: </b>" + obj.timestamp;
        // blockP.innerHTML += "<br><b>Transaction root: </b>"+obj.transactionsRoot

 
          console.log(obj);       
      })
}



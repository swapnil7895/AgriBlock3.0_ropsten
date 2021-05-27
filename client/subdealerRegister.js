




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





  //  const web3 = new Web3('http://127.0.0.1:7545');
    const contract = new web3.eth.Contract(
      AgriBlockAbi,
      AgriBlockAddress
    );
  
   let defaultAccount;//temp
   web3.eth.getAccounts()
      .then(
          accounts => defaultAccount = accounts[0]//temp
          );

  const sdRegisterButton=document.getElementById("sdreg-b");
  const handleSubdealerRegister = ()=>{
    var sdn=document.getElementById("sdname-id").value;
    var sdno=document.getElementById("sdno-id").value;
    var sde=document.getElementById("sdemail-id").value;

    if(sdn==''){alert("Enter your name!");return;}
    if(sdno==''){alert('Enter your phone number!');return;}
    if(sde==''){alert("Enter your email id");return;}
  
    contract.methods.registerSubdealer(sdn,sdno,sde)
    .send(
      {
        from: web3.eth.currentProvider.selectedAddress,
        gasPrice:10000,
        gas:1000000
      }
    )
   .on('transactionHash',h=>{alert("Registered successfully!! \nTransaction Hash:"+h)})
   .on('error',e=>{alert(e.message)})
   .then();
   
  }
  sdRegisterButton.addEventListener("click",handleSubdealerRegister);
  
  

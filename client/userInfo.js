
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
      accounts => {defaultAccount = accounts[0];
      console.log(accounts);}
    );
  contract.defaultAccount = defaultAccount;
  
  function bal() {

    const B=document.getElementById("u-balance");
    web3.eth.getBalance(web3.eth.currentProvider.selectedAddress)
      .then(
        result => {
  
          let bal = web3.utils.fromWei(result, 'ether') + " Ether";
          B.innerHTML=bal;
          console.log(bal);
        });
  }

  function nameShow()
  {
    const E= document.getElementById("u-email");
    const C=document.getElementById("u-contact");
    const N = document.getElementById("u-name");
    const S =document.getElementById("u-status");
    const I=document.getElementById("u-id");
    const A=document.getElementById("u-address");
    A.innerHTML = web3.eth.currentProvider.selectedAddress;
    contract.methods.farmers(web3.eth.currentProvider.selectedAddress)
      .call()
      .then
      (
        (result) => {
            console.log(result.farmerName)
            if(result==undefined){return;}
            N.innerHTML = result.farmerName;
            E.innerHTML = result.email;
            C.innerHTML =result.contact;
            I.innerHTML =result.farmerId;
            if(result.isRegistered == true){S.innerHTML="Registered"}
            else{S.innerHTML="Unregistered"}
        }
      );
  
      contract.methods.dealers(web3.eth.currentProvider.selectedAddress)
      .call()
      .then(
        (result) => {
           if(result==undefined){return;}
            console.log(result.dealerName);
            N.innerHTML += result.dealerName;
            E.innerHTML +=result.email;
            C.innerHTML += result.contact;
            I.innerHTML +=result.dealerId;
            if(result.isRegistered == true){S.innerHTML="Registered"}
            else{S.innerHTML="Unregistered"}
        }
      );
  
    
      contract.methods.subdealers(web3.eth.currentProvider.selectedAddressd)
      .call()
      .then(
        result => {
          if(result==undefined){
              var st=document.getElementById("u-status");
              st.innerHTML="Unregistered user"
              return;
            }
          console.log(result.subdealerName)
          N.innerHTML +=  result.subdealerName;
          E.innerHTML += result.email;
          C.innerHTML += result.contact;
          I.innerHTML +=result.subdealerId;
          if(result.isRegistered == true){S.innerHTML="Registered"}
            else{S.innerHTML="Unregistered"}
        }
      );
  
  }
  



  function info()
  {
    bal()
    nameShow();
  }
  
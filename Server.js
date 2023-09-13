  const express = require("express");
  const app = express();
  const walletModule = require('./wallet_bitcoin'); 
  const { mainnet } = require("bitcore-lib/lib/networks");
  require('dotenv').config();
  const apis= require('./controller/allapi');
  


  //private  public and mnemonic of wallet created
  const mainnetHDWallet = walletModule.createWallet(walletModule.mainnet);
  console.log("Created Wallet 1:");
  console.log("Private Key:", mainnetHDWallet.privateKey);
  console.log("Address:", mainnetHDWallet.address);
  console.log("Phase:", mainnetHDWallet.mnemonic);




  //ans of importing wallet -> priv and address key ans mnemonivc phase
  const import_wall = walletModule.importWalletWithMnemonic(mainnetHDWallet.mnemonic,walletModule.mainnet)
  console.log("imported wallet");
  console.log("private key", import_wall.privateKey);
  console.log("mnmonic", import_wall.mnemonic);



  //answer of list of wallets

  const  list= walletModule.listWallets();
  console.log("array of all wallets",list);

  //4

  //bitcoin balance
    // const addressreal='zpub6niRjLdMVnaQybUHM5PoboZcCpnwJfZgzLhXUxojQ5JB8iHrn7RJb7t5wADr8A5BB2Lb8uzHhi6E9RFLMyt4zutwuHY4mFAsN7kHwXeWAZu'
    
  const addressreal1=process.env.addressreal1
  //const addressreal1='bc1qvfdm6fyvfp84hl6253ltnl002xd42dc9vg3egf'


  async function getBalance() {
    try {
      const balance = await walletModule.getBitcoinBalance(addressreal1);
      console.log("Balance:", balance);
    } catch (error) {
      console.error("Error fetching balance:", error.message);
    }
  }

  getBalance();

  //5

  async function  gettransaction(){
    try{
      const transactions=  await walletModule.getBitcoinBalance(addressreal1)
  console.log("transaction:", transactions);
    } catch(error){
      console.error("Error fetching transaction:", error.message);

    }
  }

    gettransaction();


    //6
    const wallet= walletModule.createWallet(mainnet);
    const  unusedadd=walletModule.generateUnusedBitcoinAddress(wallet);
    console.log("unused Bitcoin address" ,unusedadd)






  // Use other functions and wallets as needed

    
  app.get('/createWallet/:walletname',apis.createwalletep);

  app.get('/importWallet/:mnemonicPhrase', apis.importwalletep
  );

  app.get('/listWallets', apis.listwalletep
  );

  app.get("/", (req, res) => {
      res.status(200).json({ message: "successfull" });
    });
    
    module.exports = app;
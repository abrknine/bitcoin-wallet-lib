
  const { PrivateKey } = require("bitcore-lib"); 
  const { mainnet } = require("bitcore-lib/lib/networks");
  const Mnemonic = require("bitcore-mnemonic");
  const axios = require("axios");
  const bitcore = require('bitcore-lib');
  require('dotenv').config();

  // Maintain an array to store created or imported wallets
  const wallets = [];
//  task1 
  // Function to create a new wallet
  const createWallet = ( walletname ,network = mainnet) => {
    const passPhrase = new Mnemonic();      
    const xpriv = passPhrase.toHDPrivateKey(null, network);
    const wallet = {
      name:walletname,
      xpub: xpriv.xpubkey,
      privateKey: xpriv.privateKey.toString(),
      address: xpriv.publicKey.toAddress().toString(),
      mnemonic: passPhrase.toString(),
      addresses: [],
    };

    wallets.push(wallet); // Add the wallet to the array

    return wallet;
  };



 //task 2--
  // Function to import a wallet using a mnemonicphase
  const importWalletWithMnemonic= (mnemonicPhrase, network = mainnet) => {

    const xpriv = new Mnemonic(mnemonicPhrase).toHDPrivateKey(null, network);

    const address = xpriv.publicKey.toAddress(network).toString();

    const wallet = {
      mnemonic:mnemonicPhrase,
      privateKey: xpriv.privateKey.toString(),
      address,
    };

    wallets.push(wallet); // Add the wallet to the array

    return wallet;
  };


 // Task3--
  // Function to list all wallets
  const listWallets = () => {
    return wallets;
  };




  //Task4--
  //function to interact with bitcoin blockchain using  blockcypher api  to get balance using adress(public key) of any wallet
  const TOKEN = process.env.TOKEN;
  


  const getBitcoinBalance = async (address) => {
    try {
      const response = await axios.get(
        `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`,{
          params:{
            token:TOKEN,
          },  
        }
      );

      // The response contains the balance in Satoshis (1 BTC = 100,000,000 Satoshis)
      const balanceSatoshis = parseInt(response.data);
        const balanceBTC = balanceSatoshis / 100000000;

      return balanceBTC;
    } 
    
    catch (error) {
      console.error("Error fetching balance1:", error.message);
      return null;
    }
  };

  //Task 5
  const getBitcoinTransactions = async (address) => {
    try {
      const response = await axios.get(
        `https://api.blockcypher.com/v1/btc/main/addrs/${address}/full`,
        {
          params: {
            token: TOKEN,
          },
        }
      );

      // Extract the list of transactions from the response
      const transactions = response.data.txrefs || [];

      return transactions;
    } catch (error) {
      console.error("Error fetching Bitcoin transactions:", error.message);
      return null;
    } 
  };



//Task 6--
  const generateUnusedBitcoinAddress = (wallet) => {
    const xpub = new bitcore.HDPublicKey(wallet.xpub);
    const addressIndex = wallet.addresses.length;

    // Generate the next unused address based on the index
    const newAddress = xpub.derive(addressIndex).publicKey.toAddress().toString();

    // Add the new address to the wallet's addresses array
    wallet.addresses.push(newAddress);

    return newAddress;
  };


  module.exports = {
    createWallet,
    importWalletWithMnemonic,
    listWallets,
    wallets, 
    getBitcoinBalance,
    getBitcoinTransactions,
    generateUnusedBitcoinAddress
  };

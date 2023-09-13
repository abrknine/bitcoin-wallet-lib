const walletModule = require('../wallet_bitcoin'); 


const createwalletep= async (req,res)=>{
    const { walletname } = req.params;
    console.log( "++++")
    console.log(walletname);
    const wallet = walletModule.createWallet(walletname);
    res.json(wallet);
}
const importwalletep= async (req,res)=>{
    const { mnemonicPhrase } = req.params;
    const wallet = walletModule.importWalletWithMnemonic(mnemonicPhrase);
    res.json(wallet);
}

const listwalletep= async (req,res)=>{
    const walletsList = walletModule.listWallets();
    res.json(walletsList);
}



module.exports = {
    createwalletep,
    importwalletep,
    listwalletep
};




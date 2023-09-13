wallet_bitcoin -> this file contain all the method that exexuted in server.js


server.js -> contain apis of method that i created in wallet_bitcoin as well as testing of all functions 


controller/allapis.js -> contain all the methods of apis

  Here-> Balance ans transaction is showing NAN(Not-A-Number)  because  the there are currently 0 balance and transaction in wallet (MY ELECTRUM WALLET) and code gives the response in satoshis (1 btc=100,000,000) on convertinf that into bitcoin we get NAN;
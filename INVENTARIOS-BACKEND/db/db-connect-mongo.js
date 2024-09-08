const mongoose = require('mongoose');

const getConnection = async () => {
    try{

        const url = 'mongodb://Admin_mongo:VZD3YPcwJHELCDZZ@cluster0-shard-00-00.d2jra.mongodb.net:27017,cluster0-shard-00-01.d2jra.mongodb.net:27017,cluster0-shard-00-02.d2jra.mongodb.net:27017/Bd-Apppeliculas?ssl=true&replicaSet=atlas-usqbg2-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'


        await mongoose.connect(url);
        console.log ('Conexion exitosa');

}    catch(error){
    console.log(error);
   }
}

module.exports = {
    getConnection
}
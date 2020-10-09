const username=require('./appConfig').username;
const password=require('./appConfig').password;
const dbName=require('./appConfig').dbname;
module.exports= mongoDBUri=`mongodb+srv://${username}:${password}@cluster0.ceilt.mongodb.net/${dbName}?retryWrites=true&w=majority`


//googleClientID:'763868416761-lg1vquu4a5tfcmknhva8rum28cetjlcj.apps.googleusercontent.com',
//googleClientSecret:'ev9c0AtV-468n49YhmQyCfsH',
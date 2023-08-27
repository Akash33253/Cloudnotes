const mongoose = require('mongoose');
const db_link = 'mongodb+srv://akashgtcatopk:LETq46e1ffc4nugV@cluster0.zg148lb.mongodb.net/'

const connectToMongoose = ()=>{
    mongoose.connect(db_link)
.then(function(){  
    console.log("dbms connected");
})
.catch(function(err){
    console.log(err);
}) 

}

module.exports = connectToMongoose;
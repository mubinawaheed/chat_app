const mongoose = require('mongoose')
mongoURI = "mongodb://localhost:27017/Chat"

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('connected to mongoDB')
    })
};

module.exports = connectToMongo
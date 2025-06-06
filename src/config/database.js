const mongoose = require('mongoose');


const connectDB = async() => {
    await mongoose.connect("mongodb+srv://devSync:GXz4Qpvw5ElVjhRN@cluster0.i1yu5de.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

}

module.exports = connectDB;
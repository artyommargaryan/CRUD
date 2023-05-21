const mongoose = require('mongoose');

const db = "mongodb://localhost:27017/userDataBase";

//connection to database
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database")
}).catch((error) => {
    console.log("Error while connecting to database: ", error)
})

//Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: String,
    name: String,
    surname: String,
    age: Number,
    email: String
})

const User = mongoose.model("User", userSchema);

module.exports = {User}
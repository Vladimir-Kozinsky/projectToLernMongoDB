
const mongoose = require("mongoose");

module.exports = async function connection() {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect("mongodb+srv://user1:user@cluster0.i1mxu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", connectionParams);
        console.log("connected to database");
    } catch (error) {
        console.log(error);
        console.log("could not connect to database");
    }
};
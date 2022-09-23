const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('dotenv');
const userRoute = require("./routes/userRoute");
const tasksRoute = require("./routes/tasksRoute");
env.config();


const app = new express();

app.use(cors());
app.use(express.json());

app.use("/auth", userRoute);
app.use("/tasks", tasksRoute);



const connect = () => {
    return mongoose.connect(process.env.CONNECTION_URL);
};

app.listen(process.env.PORT, async () => {
    try {
        await connect();
        console.log('listening on port ' + process.env.PORT || 5005);
    } catch (error) {
        console.log("error while connecting to the server")
    }
})
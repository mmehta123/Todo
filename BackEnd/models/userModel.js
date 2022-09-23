const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: { type: String, default: "Not updated" },
    state: { type: String, default: "Not updated" },
    age: { type: Number, default: 18 }
},
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('User', userSchema);



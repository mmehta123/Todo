const express = require('express');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const UserModel = require('../models/userModel.js');
const TasksModel = require('../models/tasksModel.js');
const router = express.Router();
dotenv.config();

//Sign Up
router.post("/register", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            const newUser = await UserModel.create({ ...req.body, password: bcrypt.hashSync(req.body.password, 8) });
            const { password, ...info } = newUser._doc;
            return res.status(200).json({...info,status:true});
        }
        return res.json({msg:"user already exists", status: false});
    } catch (err) {
        return res.status(500).json({msg:"something went wrong",status: false});
    }
});
// Sign In
router.post("/login", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.json({msg:"user does not exist",status:false});
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.json({ msg: "password mismatch", status: false });
        }
        const { password, ...info } = user._doc;
        return res.status(200).json({...info,status:true});
    } catch (error) {
        return res.json({msg:"something went wrong",status:false});
    }
});
//Get Profile
router.get("/profile/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        if (user) {
            const tasks = await TasksModel.find({ creator: id });
            const { password, ...info } = user._doc;
            return res.status(200).json({ info, tasks });
        }
        return res.status(400).json("user not found");
    } catch (err) {
        return res.status(400).json(err);
    }
});

//Edit Profile
router.put("/profile/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findByIdAndUpdate(id,req.body, { new: true });
        if (user) {
            const { password, ...info } = user._doc;
            return res.status(200).json(info);
        }
        return res.status(402).json("user not found");
    } catch (err) {
        return res.status(401).json(err);
    }
});


module.exports = router;
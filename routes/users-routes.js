const router = require("express").Router();

const Users = require("../models/users-model");

// GET - all users 
router.get("/", async (req, res) => {
    try {
        const users = await Users.get();
        
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json({ error: "Server failed to grab all users." });
    }

});

module.exports = router;
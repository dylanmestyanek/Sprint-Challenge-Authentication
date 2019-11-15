const router = require('express').Router();
const bcrypt = require("bcryptjs");

const Users = require("../models/users-model");

router.post('/register', async (req, res) => {
  try {
    const user = await req.body;
    const hashedPassword = await bcrypt.hashSync(user.password, 12);
    user.password = await hashedPassword;

    const createdUser = await Users.add(user);
      
    res.status(201).json(createdUser);
  } catch(err) { 
    res.status(500).json({ error: "The server encountered an error while registering the user." });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = await req.body;

    const user = await Users.getByUsername(username);

    if (await user && await bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ message: "Success! You are logged in!" });
    } else {
      res.status(400).json({ message: "Please provide valid credentials." });
    }
  } catch(err) {
    res.status(500).json({ error: "Server failed to login the user." });
  }
});

module.exports = router;

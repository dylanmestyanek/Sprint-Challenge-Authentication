const router = require('express').Router();
const bcrypt = require("bcryptjs");

const Users = require("../models/users-model");
const generateToken = require("./generateToken"); 

router.post('/register', async (req, res) => {
  try {
    const user = req.body;
    const token = generateToken(user);
    const hashedPassword = bcrypt.hashSync(user.password, 12);
    user.password = hashedPassword;

    const createdUser = await Users.add(user);

    res.status(201).json({ user: createdUser, token });
  } catch(err) { 
    res.status(500).json({ error: "The server encountered an error while registering the user." });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.getByUsername(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user); 

      res.status(200).json({ message: "Success! You are logged in!", token });
    } else {
      res.status(400).json({ message: "Please provide valid credentials." });
    }

  } catch(err) {
    res.status(500).json({ error: "Server failed to login the user." });
  }
});

module.exports = router;

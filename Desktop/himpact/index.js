const express = require("express");
const mongoose = require("mongoose");
// const morgan = require('morgan')
const helmet = require("helmet");
const jwt = require("jsonwebtoken");

const jwtKey = "jwt";

const app = express();
app.use(express.json());
// app.use(morgan())
app.use(helmet());

const db = "mongodb://localhost:27017/test";

//mongodb connection
mongoose
  .connect(db)
  .then((res) => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const User = require("./models/users");

//routes

//api for register user
app.post("/register", async (req, res) => {
  const { username, contact_number, password } = req.body;
  const user = new User({
    username: req.body.username,
    contact_number: req.body.contact_number,
    password: req.body.password,
  });
  try {
    const data = await user.save();
    console.log(data);
    res.status(201).json({
        message : "Registered successfully"
    })
  } catch (err) {
    console.log("error is ", err.message);
    res.json({
        message : err.message
    })
  }
});
 // api for get users from database
app.get("/user", async (req, res) => {
  try {
    const data = await User.find().sort({ create_date_time: 1 });
    res.json({
      message: data,
    });
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
});

//login api
var token;
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      contact_number: req.body.contact_number
    });
    if (user) {
      console.log(user);
      if (user.password == req.body.password) {
        token = await jwt.sign({ user }, jwtKey, { expiresIn: "300s" });
        res.json({ token: token });
      } else {
        res.status(401).json({
          message: "Password do not match",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    console.log("error is ", err.message);
  }
});

//api for delete multiple user details
app.delete("/deleteUser", async (req, res) => {
  const phone = req.body.contact_number;
  try{
    const deletedUser = await User.deleteMany( { contact_number : phone} );
    console.log(deletedUser)
    res.json({
        message : "Users deleted"
    })
  }
  catch(err){
    res.json( {
        message : err.message
    })
  }
});


app.listen(5000, () => {
  console.log("app is listening at 5000");
});

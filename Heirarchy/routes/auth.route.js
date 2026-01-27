const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware.js")

const jwt = require("jsonwebtoken")

const router = express.Router()
const SECRET = "abc123"
// -------------  Main thingy (turn app ==> router) ---------------------

router.get("/profile", authMiddleware ,(req, res) => {
    res.status(200).send("hello" + req.body);
})


router.post("/login", (req, res) => {  // using post because when logging in we gave credentials
      const {email, pass} = req.body;   // req.body ===> everything in same format as send by client

      if(!email || !pass){
          return res.status(400).send("less input");
      }

      if(email === "ayush@gmail.com" && pass === "1234"){
          // NOte --> payload should be an object like that json file;
          const payload = {
                email
          }

          const jwt_key = jwt.sign(payload, SECRET);          // create token

          const jwt_key1 = jwt.sign(payload, SECRET, {expiresIn: "20s", issuer: "my-backend"});     // now added time limit , 3rd parameteer is object and can alter properties
          // 3600s == seconds
          // 5m   == min
          // 6h   == hrs
          // 7d   == days
          
          return res.status(200).send(jwt_key);
      }
      else{
          return res.status(401).send("not ok");
      }
})

module.exports = router;        // exports "router" object and it contains "/login and all other" as its function or member function
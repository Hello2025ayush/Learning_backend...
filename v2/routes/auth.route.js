const express = require("express")
const bcrypt = require("bcrypt")            // install libs of it
const authMiddleware = require("../middlewares/auth.middleware.js")
const {signup, login} = require("../controllers/auth.controller.js")
const jwt = require("jsonwebtoken")
const User = require("../models/User.model.js")
const router = express.Router()
const SECRET = "abc123"
// -------------  Main thingy (turn app ==> router) ---------------------

router.get("/profile", authMiddleware ,(req, res) => {
    res.status(200).send("hello" + req.body);
})

/* ------------  OLD WAY -----------------
router.post("/login", async (req, res) => {  // using post because when logging in we gave credentials
      
// Login always works like this:
// 1.  Take email and pass
// 2.  Find user by email in MongoDB
// 3.  If user not found → reject
// 4.  Compare entered password with stored hash
// 5.  If match → generate JWT
// 6.  Send token (never password)
    
    
    const {email, pass} = req.body;   // req.body ===> everything in same format as send by client

      if(!email || !pass){
          return res.status(400).send("less input");
      }

      // find the user in db
      const user = await User.findOne({email});     // use the model to find in it and pass a object(json) of whom we are referring

      // i forgot to put await in above .findone  --> which gave 
      // data and hash arguments required
      // at bcrypt.compare(...) 

      if(!user){
            return res.status(401).send("Invalid Credentials");
      }


       const ok = await bcrypt.compare(pass, user.pass);  // also takes time so "async/await"
      

      if(ok){
          // NOte --> payload should be an object like that json file;
          const payload = {
                email
          }

          const jwt_key = jwt.sign(payload, SECRET);          // create token

          const jwt_key1 = jwt.sign(payload, SECRET, {expiresIn: "1h", issuer: "my-backend"});     // now added time limit , 3rd parameteer is object and can alter properties
          // 3600s == seconds
          // 5m   == min
          // 6h   == hrs
          // 7d   == days
          
          return res.status(200).send(jwt_key);
      }
      else{
          return res.status(401).send("wrong password");
      }
})

*/

/*  ----------  OLD WAY ---------------

// using "bcrypt" for password hashing....
router.post("/signup", async (req, res) => {          // add 'aync' at shown place
    // using controller  for this
    
})
   -------------------- NEW WAY ---------
*/

router.post("/signup", signup);   // yes it directly passes the arguments i.e (req, res)
router.post("/login", login);

module.exports = router;        // exports "router" object and it contains "/login and all other" as its function or member function
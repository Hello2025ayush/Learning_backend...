const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());   // allows code to take json as inputs..

const SECRET = "abc123";
const PORT = 5000;

app.post("/login", (req, res) => {  // using post because when logging in we gave credentials
      const {email, pass} = req.body;

      if(!email || !pass){
          return res.status(400).send("less input");
      }

      if(email === "ayush@gmail.com" && pass === "1234"){
          // NOte --> payload should be an object like that json file;
          const payload = {
                email
          }

          const jwt_key1 = jwt.sign(payload, SECRET);          // create token

          const jwt_key = jwt.sign(payload, SECRET, {expiresIn: "20s", issuer: "my-backend"});     // now added time limit , 3rd parameteer is object and can alter properties
          // 3600s == seconds
          // 5m   == min
          // 6h   == hrs
          // 7d   == days
          
          return res.status(200).send(jwt_key);
      }
      else{
          return res.status(401).send("not ok");
      }
});

app.get("/profile", (req, res) => {
        const header = req.headers.authorization;      // as said jwt = headers + payload + secret .. so headers CONTAINS metaData + jwt key 

        // Authorisation = Bearer abshuhaxx3782mkj     
        // so header is a string and the 2nd thing in it is the jwt_token
       
        if(!header){    // if i hadnt handled this then POSTMAN was giving Error : 500
            return res.status(401).send("NO Header");
        }

        const jwt_token = header.split(" ")[1];

        if(!jwt_token){
            return res.status(401).send("no token / not logged in");
        }


        try{
            const decoded = jwt.verify(jwt_token, SECRET);

            // if not decoded or not valid then just throws it.

            // ------- write your logic ----
            res.status(200).send("okay u r valid BOI !!!")
        }
        catch(err){
            return res.status(401).send(err.name);  // .name gives name of throwe err
        }
});


app.listen(PORT, () => {
    console.log("server is running i think");
});

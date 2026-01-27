const express = require("express");
const authRoutes = require("./routes/auth.route.js")
const users = require("./data/user.js")
const authMiddleware = require("./middlewares/auth.middleware.js")


const PORT = 5000;
const SECRET = "abc123"


const app = express()

app.use(express.json())
app.use("/auth", authRoutes)         // its just like a snippet (move all those routers here)...

// app.use("/auth", authRoutes)     ok!!
//                                            This means
//      /auth/signup 
//      /auth/login
//      /auth/profile

// OR just add "/auth" in front of the addresses of them..

// NOTE --> Routes don’t know their full URL
//          They only know their local path.
// the full URL is built using --- app.use(prefix, router)

//  -------------- functions -----------------
app.listen(PORT, () => {
    console.log("server is running and listening");
})


app.post("/idk", (req, res) => {
    console.log(req.body);          // req.body --> gets the data send by the client..
                                    //              if its in .json then it outputs exactly....
                                    // if u do console.log() ---> it prints it in TERMINAL..

    return res.status(200).send("hello");       // if u dont return anything this func. will keep running and postman req. will be stuck
})




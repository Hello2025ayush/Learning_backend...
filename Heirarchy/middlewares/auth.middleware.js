const jwt = require("jsonwebtoken")
const SECRET = "abc123"

function authMiddleware(req, res, next){
    const header = req.headers.authorization;

    // Auth  = Bearer JWT_KEY

    if(!header) return res.status(401).send("NO Header");

    const JWT_TOKEN = header.split(" ")[1];

    if(!JWT_TOKEN) return res.status(401).send("NO JWT KEY");

    // verifying key

    try{
        const decoded = jwt.verify(JWT_TOKEN, SECRET);

        // return res.status(200).send("You r in boii !!!");
        // now move to the routers or logic
        next();

    }
    catch(err){
        return res.status(401).send(err.name);
    }
}


module.exports = authMiddleware;  // exporting the func..
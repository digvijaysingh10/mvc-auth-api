const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send("ACCESS DENIED!!!");
    }
    try {
        const verified = jwt.verify(token, "poiuytrewqmnbvcxz");
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("INVALID TOKEN!!!");
    }
}

module.exports = { auth  }
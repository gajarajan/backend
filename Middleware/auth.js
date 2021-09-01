const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    //get the token form header
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: "no token,authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, "kaggroup");
        req.user = decoded.user;
        next();
    }
    catch (err) {
        res.status(401).json({ msg: 'token is not valid' });
    }

}
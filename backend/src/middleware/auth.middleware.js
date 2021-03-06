const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const {authorization} = req.headers;

    try {
        if (!authorization) {
            throw new Error("Authorization not exists");
        }

        const [, token] = authorization.split(' ');
        const user = jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch (error) {
        res.status(401).send({message: error.message})
    }
};

module.exports = authMiddleware;
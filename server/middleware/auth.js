const jwt = require("jsonwebtoken");
const secretKey = "userTokenKey";

const options = {
    expiresIn: "24h",
};

exports.createJwtToken = (user) => {
    try {
        const token = jwt.sign(user, secretKey, options);
        console.log('Token created '.blue);
        return token;
    } catch (error) {
        console.error('Error creating JWT token:', error);
        return null;
    }
};

var jwt = require('jsonwebtoken');

exports.authorizeRequest = function (app) {

    return function (req, res, next) {

        if(req.url == "/login" || req.url == "/") {
            return next();
        }

        // check header or url parameters or post parameters for token
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        // if (token && token.startsWith('Bearer ')) {
        //     // Remove Bearer from string
        //     token = token.slice(7, token.length);
        // }
        // decode token

        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'),  function (err, decoded) {
                if (err) {
                    console.error(err)
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded; next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    }
}
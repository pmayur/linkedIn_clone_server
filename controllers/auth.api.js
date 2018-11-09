let authService = require("../modules/auth")
let uniqid = require("uniqid")
module.exports = function (router) { // Router factory

    router.post("/signup", async function (req, res) {
        try {
            let username = req.body.username;
            let email = req.body.email;
            let password = req.body.password;
            let firstName = req.body.firstName;
            let lastName = req.body.lastName;

          
            let result = await authService.signup(username, email, password, firstName, lastName);
            req.session.user = result.data;
            res.locals.user = result.data;

            if(result.success) {
                res.json({
                    success: true,
                    message: "Successfully registered"
                })
            } else {
                res.json({
                    success: false,
                    message: result.message
                })
            }
        } catch (error) {
            console.log(error);
        }
    });

    router.post("/login", async function (req, res) {
        try {
            let username = req.body.username;
            let email = req.body.email;
            let password = req.body.password;

            let result = await authService.login(username, email, password);
            req.session.user = result.data;
            res.locals.user = result.data;
            if (result.success) {
                res.json({
                    success: true,
                    message: "Logged in successfully"
                })
            } else {
                res.json({
                    success: false,
                    message: result.message
                })
            }
          
        } catch (error) {
            console.log(error);
        }
    });

    router.post("/logout", function (req, res) {
        req.session.destroy(function (error) {
            if (error) {
                console.error(error);
                res.json({ success: false });
            }
            res.clearCookie('connect.sid');
            res.json({ success: true });
        });
    });

    return router;
};
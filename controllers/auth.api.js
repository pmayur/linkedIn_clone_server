let authService = require("../modules/auth")
let uniqid = require("uniqid")
module.exports = function (router) { // Router factory

    
    router.post("/signup", async function (req, res) {
        try {
            
            // prep for signup request body
            const signUpBody = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            };

            // signup funtion call
            let result = await authService.signup(signUpBody);
            
            // success handle
            if(result.success) {
                res.json({
                    success: true,
                    message: result.message
                });
                return;
            }

            // failed to signup
            res.json({
                success: false,
                message: result.message
            })
            return;
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({
                success: false,
                message: "Internal error."
            })
        }
    });

    router.post("/login", async function (req, res) {
        try {
            const logInBody = {
                email: req.body.email,
                password: req.body.password
            }

        let result = await authService.login(logInBody);

            
        } catch (error) {
            console.log(error);
        }
    });

    router.post("/logout", function (req, res) {
        
    });

    return router;
};
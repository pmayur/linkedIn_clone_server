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
            req.session.userInfo = result;
            res.locals.userInfo = result;

            if(result.success) {
                res.json({
                    success: true,
                    message: result.message
                });
                return;
            }

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

    router.get("/logout", function (req, res) {
        // session destroy
        req.session.destroy(function(error) {
            if (error) {
                console.error(error);
                res.json({success:false})
            }
            // clear browser cookie
            res.clearCookie('connect.sid');
            res.json({success:true})
        });
    });

    router.post("/createProfile", function (req, res){

        try{

            const profileBody = {
                maidenName = req.body.maidenName,
                firstName = req.body.firstName,
                lastName = req.body.lastName,
                headline = req.body.headline,
                location = req.body.location,
                industry = req.body.industry,
                summary = req.body.summary,
                specialties = req.body.specialties,
                mobile = req.body.mobile,
                dateOfBirth = req.body.dateOfBirth,
                maritalStatus = req.body.maritalStatus
            }

            let result = await authService.createProfile(signUpBody);
            
            // success handle
            if(result.success) {
                res.json({
                    success: true,
                    message: result.message
                });
                return;
            }

            // failed to createProfile
            res.json({
                success: false,
                message: result.message
            })
            return;

        }catch(error){
            console.log(error);
            res.status(500);
            res.json({
                success: false,
                message: "Internal error."
            })
        }
    })

    return router;
};
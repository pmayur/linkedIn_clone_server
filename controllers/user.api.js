let userModule = require("../modules/user")

module.exports = function (router) { // Router factory

    router.post("/sendPassResetLink", async function (req, res) {
        try {
            let email = req.body.email;
          
            let result = await userModule.sendPassResetLink(email);

            if(result.success) {
                res.json({
                    success: true
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

    router.post("/updateForgotPass", async function (req, res) {
        try {
            let password = req.body.password;
            let token = req.body.token;

          
            let result = await userModule.updateForgotPassword(token, password)

            if(result.success) {
                res.json({
                    success: true,
                    message: "Password updated successfully."
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
    
    router.post("/getUserById", async function (req, res) {
        try {
            let userId = req.body.userId;
          
            let result = await userModule.getUserById(userId)

            if(result.success) {
                res.json({
                    success: true
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

    router.post("/updateUserProfileSections", async function (req, res) {
        try {
            let userId = req.body.userId;
            let profileSectionId = req.body.profileSectionId;

            let dataToUpdate = {

            }

            let result = await userModule.updateUserProfileSections(userId, profileSectionId, dataToUpdate)

            if(result.success) {
                res.json({
                    success: true,
                    message: "Section updated successfully"
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
    return router;
};
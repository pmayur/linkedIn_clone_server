var uniqid = require("uniqid");

module.exports = function (router) { // Router factory

    router.post("/signup", function (req, res) {
        try {
            let id = uniqid();
            let email = req.body.email;
            let password = req.body.password;
            let firstName = req.body.firstName;
            let lastName = req.body.lastName;
            let mobile = req.body.mobile;

          
        } catch (error) {
            console.log(error);
        }
    });

    router.post("/login", async function (req, res) {
        try {
            let email = req.body.email;
            let password = req.body.password;
    
          
            
        } catch (error) {
            console.log(error);
        }
    });

    router.post("/logout", function (req, res) {
        try {
            req.session.destroy(function (error) {
                if (error) {
                    console.error(error);
                    throw error;
                }
                res.clearCookie('connect.sid');
                res.json({ success: true });
            });
            
        } catch (error) {
            console.error(error);
        }
    });
      
    return router;
};
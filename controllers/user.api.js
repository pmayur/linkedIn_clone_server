let userModule = require("../modules/user")

module.exports = function (router) { // Router factory
    router.post("/updateBasicProfile", async function (req, res){
        try {
            const profileBody = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                headline: req.body.headline,
                address: {
                    city: req.body.city,
                    country: req.body.country,
                    state: req.body.state
                },
                industry: req.body.industry,
                summary: req.body.summary
            }

            let result = await userModule.updateBasicProfile(profileBody);

            if(result.success) {
                res.json({
                    success: true,
                    message: "Update successfully"
                })
                return;
            }
            res.json({
                success: false,
                message: "Failed to update basic profile"
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

    router.post("addExperience", async function(req, res) {
        try {
            let reqBody = {
                title: req.body.title,
                companyId: req.body.companyId,
                addressId: req.body.addressId,
                from: req.body.from,
                to: req.body.to,
                isPresent: req.body.isPresent,
            }
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({
                success: false,
                message: "Internal error."
            })
        }
    });

    router.post("updateExperience", async function(req, res) {
        try {
            let reqBody = {
                title: req.body.title,
                companyId: req.body.companyId,
                addressId: req.body.addressId,
                from: req.body.from,
                to: req.body.to,
                isPresent: req.body.isPresent,
                description: req.body.description,
            }

        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({
                success: false,
                message: "Internal error."
            })
        }
    });

    router.post("addEducation", async function(req, res) {
        try {
            let reqBody = {
                title: req.body.title,
                companyId: req.body.companyId,
                addressId: req.body.addressId,
                from: req.body.from,
                to: req.body.to,
                isPresent: req.body.isPresent,
                description: req.body.description,
            }
            
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({
                success: false,
                message: "Internal error."
            })
        }
    });

    router.post("updateEducation", async function(req, res) {
        try {
            let reqBody = {
                title: req.body.title,
                companyId: req.body.companyId,
                addressId: req.body.addressId,
                from: req.body.from,
                to: req.body.to,
                isPresent: req.body.isPresent,
                description: req.body.description
            }
            
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({
                success: false,
                message: "Internal error."
            })
        }
    });

    router.post("addSkill", async function(req, res) {
        try {
            let reqBody = {
                title: req.body.title,
                companyId: req.body.companyId,
                addressId: req.body.addressId,
                from: req.body.from,
                to: req.body.to,
                isPresent: req.body.isPresent,
                description: req.body.description
            }
            
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({
                success: false,
                message: "Internal error."
            })
        }
    });

    router.post("updateSkillById", async function(req, res) {
        try {
            let reqBody = {
                title: req.body.title,
                companyId: req.body.companyId,
                addressId: req.body.addressId,
                from: req.body.from,
                to: req.body.to,
                isPresent: req.body.isPresent,
                description: req.body.description
            }
            
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({
                success: false,
                message: "Internal error."
            })
        }
    });

    router.post("")

    return router;
};
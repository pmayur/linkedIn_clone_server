let userModule = require("../modules/user")

module.exports = function (router) { // Router factory
    router.post("/updateBasciProfile", async function (req, res){
        try{
            const profileBody = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                headline: req.body.headline,
                currentPosition: req.body.currentPosition,
                education: req.body.education,
                country: req.body.country,
                state: req.body.state,
                city: req.body.city,
                industry: req.body.industry,
                summary: req.body.summary
            }

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
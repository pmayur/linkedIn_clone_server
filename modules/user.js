let UserModel = require("../models/basicProfile.model");
const JobPosition = require("../models/position.model");



exports.updateBasicProfile = function(basicProfile) {
    return new Promise(async (resolve, reject) => {
        try {

            // get user info by user _id
            let UserData = await UserModel.findById({_id: basicProfile.userId});

            let updateBasicProfile = {
                firstName: basicProfile.firstName ? basicProfile.firstName : UserData.firstName,
                lastName: basicProfile.lastName ? basicProfile.lastName : UserData.lastName,
                headline: basicProfile.headline ? basicProfile.headline : UserData.headline,
                address: basicProfile.address ? basicProfile.address : UserData.address.address,
                industry: basicProfile.industry ? basicProfile.industry : UserData.industry,
                summary: basicProfile.summary ? basicProfile.summary : UserData.summary
            }

            // update user baic profile
            await UserModel.findByIdAndUpdate({_id: basicProfile.userId}, updateBasicProfile);

            resolve({
                success: true
            })

        } catch (error) {
            reject(error);
        }
    })
}
let Promise = require("bluebird");
const nodemailer = Promise.promisifyAll(require("nodemailer"));

// reading email server configs from .env
let fromEmail = global.deployConfig.get('emailServer_email');
let fromPassword = global.deployConfig.get('emailServer_password');
let emailServerHost = deployConfig.get('emailServer_host');
let emailServerPort = deployConfig.get('emailServer_port')
let emailServerSsl = deployConfig.get('emailServer_ssl')

exports.sendMail = async function (mailTo, mailData, template, subject) {
    return new Promise((resolve, reject) => {
        try {
            if (mailData && mailTo) {
                let filePath = path.join(__dirname, "../template", template);

                ejs.renderFile(filePath, mailData, async function (error, data) {
                    if (error) {
                        console.error(error);
                        reject(reject);
                    } else {
                        let mailOptions = {
                            from: '"no_reply@gmail.com"', // sender address
                            to: mailTo, // list of receivers
                            subject: subject, // Subject line 
                            htmlBody: data // html body
                        };

                        await nodeMailerTemplate(mailOptions, resolve, reject);
                    }
                });
            }
        } catch (error) {
            console.error("Failed to send mail", error);
            reject(error);
        }
    })
}
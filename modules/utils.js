let Promise = require("bluebird");
const nodemailer = Promise.promisifyAll(require("nodemailer"));


/* #region email method start*****************************************/
// reading email server configs from .env
let fromEmail = deployConfig.get('EMAIL');
let fromPassword = deployConfig.get('EMAIL_APP_PASS');
let emailServerHost = deployConfig.get('EMAIL_SERVER_HOST');
let emailServerPort = deployConfig.get('EMAIL_PORT')
let emailServerSsl = deployConfig.get('EMAIL_SSL');

const nodeMailerTemplate = async function (mailOptions, resolve, reject) {
    try {
        const transporter = nodemailer.createTransport({
            host: emailServerHost,
            port: emailServerPort,
            ssl: emailServerSsl,
            auth: {
                user: fromEmail,
                pass: fromPassword
            }
        });

        // setup email data with unicode symbols
        let mailData = {
            from: mailOptions.from, // sender address
            to: mailOptions.to, // list of receivers
            subject: mailOptions.subject, // Subject line
            html: mailOptions.htmlBody // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                console.error(error);
                Raven.captureException(error);
                reject(error);
                return;
            }
            console.debug("Email successfully sent to " + mailOptions.to)
            resolve();
        });
    } catch (error) {
        console.error("Failed to send error report", error);
        reject(error);
    }
}
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

/* #endregion email sending ethod end*****************************************/
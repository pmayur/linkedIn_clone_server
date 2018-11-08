var Q = require('q');
var Mongoose = require('mongoose');
var ObjectId = Mongoose.Types.ObjectId;
var moment = require('moment-timezone');
var A = require('../config/authenticate');
var C = require('../constant');
var fs = require('fs');
var	path = require('path');
var url = require("url");
var https = require('https');

var getJson = function (code, message, data, error, paginate) {
	var out = {};
	out.status = code;
	out.message = message;
	if (data) {
		if (data.constructor === {}.constructor)
			out.data = [data];
		else
			out.data = data;
	} else out.data = [{}];
	if (paginate) {
		out.paginate = paginate;
	} else {
		out.paginate = {};
	}
	if (error) {
		error.internalMessage = "Error : " + error;
		error.internalMessageJson = "Error json : " + JSON.stringify(error);
		out.error = error;
	} else out.error = {};

	return out;
}
exports.getJson = getJson;

exports.getTime = function () {
	var utc = moment(new Date().toISOString);
	return utc.tz('Asia/Kolkata').format('YYYY:MM:DD hh:mm:ss');
}

exports.getDateFormat = function () {
	var date = new Date();
	var d = date.getFullYear();
	var mm = (date.getMonth() + 1)
	if (mm < 10)
		mm = '0' + mm;
	var dd = date.getDate()
	if (dd < 10)
		dd = '0' + dd;
	var returnDate = d + '-' + mm + '-' + dd;
	return returnDate;
}

exports.getDaysBetweenDates = function(date1, date2){

	// The number of milliseconds in one day
	var ONE_DAY = 1000 * 60 * 60 * 24;

	// Convert both dates to milliseconds
	var date1_ms = date1.getTime();
	var date2_ms = date2.getTime();

	// Calculate the difference in milliseconds
	var difference_ms = Math.abs(date1_ms - date2_ms);

	// Convert back to days and return
	return Math.round(difference_ms/ONE_DAY);
};

exports.getPassword = function () {
	var length = 6;
	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
};

exports.getStaffId = function () {
	var length = 6;
	var result = '';
	var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var digits = "0123456789";
	for (var i = length; i > 4; --i) {
		result += chars[Math.round(Math.random() * (chars.length - 1))];
	}
	for (var i = (length / 2) + 1; i > 0; --i) {
		result += digits[Math.round(Math.random() * (digits.length - 1))];
	}
	return result;
};

exports.getOTP = function () {
	var length = 4;
	var chars = '0123456789';
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
};

exports.generateRandomToken = function () {
	var length = 8;
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
};

exports.getRandomNumber = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.getTimeStamp = function () {
	var timestamp = +new Date();
	return timestamp;
};
getTimeStamp = function () {
	var timestamp = +new Date();
	return timestamp;
};

exports.getPaginationObject = function (count, pageSize, pageNumber) {
	var paginate = {};
	paginate.total = count
	paginate.limit = pageSize;
	paginate.pageNumber = pageNumber;

	return paginate;
};

exports.logError = function (methodName, message, input, error) {
	console.log("Method Name:-", methodName, " Message :-", message, "Error :-", error);

};

exports.stringToObjectId = function (str) {
	var ids = str.split("|");
	//var objectIdsArr = ids.map(function (o) { return Mongoose.Types.ObjectId(o) })
	return ids;
};

getKeyFromS3Url = function(s3url){
	var parsed = url.parse(s3url);
	return path.basename(parsed.pathname);
};

exports.deleteS3Object = function(url){
	var d = Q.defer();
	var out;
	var key = getKeyFromS3Url(url);
	const AWS = require('aws-sdk');
	var accessKeyId = C.AWS_ACCESS_KEY;
	var secretKey = C.AWS_SECRET_KEY;
	const myBucket = C.AWS_BUCKET;
	const myKey = key;
	AWS.config.update({
		accessKeyId: accessKeyId,
		secretAccessKey: secretKey,
		signatureVersion: 'v4',
		region: 'ap-south-1'
	});
	//taken directly from http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-examples.html
	var s3 = new AWS.S3();
	var params = {
		Bucket: myBucket,
		Key: myKey
	};
	s3.deleteObject(params,function(err,data){
		if(!err){
			out = getJson(C.STATUS_SUCCESS_CODE, C.STATUS_SUCCESS, url);
			d.resolve(out);
		} else{
			out = getJson(C.STATUS_ERR_UNKNOWN_CODE, C.STATUS_ERR_UNKNOWN, url, err);
			d.reject(out);
		}
	});
	return d.promise;
};

// VIMEO
exports.vimeoUpload = function(url){
	var d = Q.defer();
	var reqObject = {
		upload : {
			approach : "pull",
			link : url
		},
		privacy : {
			view : 'nobody'
		}
	};
	client.request({
		method: 'POST',
		path: '/me/videos?fields=uri,link',
		params: reqObject
		// path: '/me/videos?upload.approach=pull&upload.link='+b.url+'&privacy.view=nobody&fields=uri'
	},function (error, body, status_code, headers){
		if(error){
			d.reject(error);
		} else{
			d.resolve(body);
		}
	});
	return d.promise;
};

exports.getVimeoVideo = function(id){
	var d = Q.defer();
	client.request({
		method: 'GET',
		path: '/videos/'+id+'?fields=link,duration,status'
	},function (error, body, status_code, headers){
		if(error){
			d.reject(error);
		} else{
			d.resolve(body);
		}
		
	});
	return d.promise;
};

exports.deleteVimeoVideo = function(id){
	var d = Q.defer();
	client.request({
		method: 'DELETE',
		path: '/videos/'+ id
	},function (error, body, status_code, headers){
		if(error){
			d.reject(error);
		} else{
			d.resolve(body);
		} 
	});
	return d.promise;
};

exports.vimeoProfile = function(){
	var d = Q.defer();
	client.request({
		method: 'GET',
		path: '/me?fields=name,upload_quota'
	},function (error, body, status_code, headers){
		if(error){
			d.reject(error);
		} else{
			d.resolve(body);
		}
		
	});
	return d.promise;
};
// VIMEO

exports.getDeletedName = function (name) {
	return 'X-' + name + '-' + getTimeStamp();
};

exports.getUid = function () {
	return uuidV1();
};

exports.sendWelcomeMail = function (mailTo, name) {
	var defer = Q.defer();
	var out;
	if (name && name.length > 0 && mailTo && mailTo.length > 0) {
		var filePath = path.join(__dirname + "/template", 'mail_welcome.html');
		fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
			if (!err) {
				var htmlBody = data.replace("{{name}}", name);
				const msg = {
					to: mailTo,
					from: 'Neutron <no-reply@neutron.com>',
					subject: 'Welcome to Neutron',
					html: htmlBody,
				  };
				  sgMail.send(msg,function(err,res){
					if (!err) {
						out = getJson(200, 'success', body);
						defer.resolve(out);
					} else {
						out = getJson(300, 'failed', data, err);
						defer.reject(out);
					}
				});
			} else {
                defer.reject('failed');   
			}
	    });
	} else {
 		defer.reject("Please provide student names and their email id");
	}
	return defer.promise;
};

exports.sendResetLinkStaff = function(staff) {
	var defer = Q.defer();
	var out;
	if (staff) {
		var filePath = path.join( __dirname + "/template", 'reset_link.html');
		fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
			var file = data;
			if (!err) {
				var t = A.generateAuthToken(staff._id);
				var resetLink = `http://localhost:5060/users/staff/reset/${t.token}`;
				Staff.findByIdAndUpdate({
                    "_id": staff._id
				}, {
					"$set" : {
						"resetPasswordLink" : resetLink,
						"resetPasswordRequestedOn": getTimeStamp()
					},
					"$push" :{
						tokens: t
					}
				}, function(err, data){
                    if(!err) {
						if(data == null) {
							out = getJson(C.STATUS_ERR_KNOWN_CODE, C.STATUS_ERR_NO_DATA);
							defer.reject(out);
						} else {
							var htmlBody = file.replace("{{name}}", staff.name).replace("$ResetLink", resetLink);
							const msg = {
								to: staff.email,
								from: 'Neutron <no-reply@neutron.com>',
								subject: 'Password Reset Link',
								html: htmlBody
								};
								sgMail.send(msg, function(err,res){
								if (!err) {
									out = getJson(200, 'success', body);
									defer.resolve(out);
								} else {
									out = getJson(300, 'failed', data, err);
									defer.reject(out);
								}
							});
						}
					}
				})
			} else {
                defer.reject('failed');   
			}
	    });
	} else {
 		defer.reject("Please provide staff information");
	}
	return defer.promise;
};

exports.sendResetLinkStudent = function(student) {
	var defer = Q.defer();
	var out;
	if (student) {
		var filePath = path.join( __dirname + "/template", 'reset_link.html');
		fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
			var file = data;
			if (!err) {
				var t = A.generateAuthToken(student._id);
				var resetLink = `http://localhost:5060/users/student/reset/${t.token}`;
				Student.findByIdAndUpdate({
                    "_id": student._id
				}, {
					"$set" : {
						"resetPasswordLink" : resetLink,
						"resetPasswordRequestedOn": getTimeStamp()
					},
					"$push" :{
						tokens: t
					}
				}, function(err, data){
                    if(!err) {
						if(data == null) {
							out = getJson(C.STATUS_ERR_KNOWN_CODE, C.STATUS_ERR_NO_DATA);
							defer.reject(out);
						} else {
							var htmlBody = file.replace("{{name}}", student.name).replace("$ResetLink", resetLink);
							const msg = {
								to: student.email,
								from: 'Neutron <no-reply@neutron.com>',
								subject: 'Password Reset Link',
								html: htmlBody
								};
								sgMail.send(msg, function(err,res){
								if (!err) {
									out = getJson(200, 'success', body);
									defer.resolve(out);
								} else {
									out = getJson(300, 'failed', data, err);
									defer.reject(out);
								}
							});
						}
					}
				})
			} else {
                defer.reject('failed');   
			}
	    });
	} else {
 		defer.reject("Please provide student information");
	}
	return defer.promise;
};


function sendMail(from, mailTo, subject, bodyText, bodyHtml, bcc = "") {
	var defer = Q.defer();
	var data = {};
	var out = {};
	data.from = from;
	data.to = mailTo;
	data.subject = subject;

	//  Validation
	if (!from || !mailTo || !subject) {
		out = U.getJson(C.STATUS_ERR_KNOWN_CODE, "Please check from and to mail and subject", data);
		defer.reject(out);
	}
	if (bodyText && bodyText != "")
		data.text = bodyText;
	else if (bodyHtml && bodyHtml != "")
		data.html = bodyHtml;
	else {
		out = U.getJson(C.STATUS_ERR_KNOWN_CODE, "Please provide mail body", data);
		defer.reject(out);
	}
	if (bcc && bcc.length > 0)
		data.bcc = bcc;
	const msg = {
		to: mailTo,
		from: from,
		subject: subject,
		bcc: bcc,
		text: bodyText,
		html: bodyHtml,
		};
	sgMail.send(msg,function(err,res){
		if (!error) {
			out = getJson(200, 'success', body);
			defer.resolve(out);
		} else {
			out = getJson(300, 'failed', data, error);
			defer.reject(out);
		}
	});
	return defer.promise;
}

//	TODO change SMS content
exports.sendWelcomeSms = function (numbers) {
	var defer = Q.defer();
	var out;
	var succeedCount = 0;
	var failedCount = 0;
	var sendSMSPromise = [];
	if (numbers && numbers.length > 0) {
		for (var i = 0; i < numbers.length; i++) {
			var bodyText = "Thanks for attending BloomCAP Life Skill Session at your school. We are soon launching our APP to make our journey exciting. %0AKeep Blooming.%0A-BloomCAP Team.";
			sendSMSPromise.push(sendSms(bodyText, numbers[i]));
		}
		Q.allSettled(sendSMSPromise)
			.then(function (results) {
				results.forEach(function (result) {
					if (result.state === "fulfilled") {
						succeedCount++;
					} else {
						var reason = result.reason;
						failedCount++;
						console.log("Sms sent failed : " + JSON.stringify(reason));
					}
				});
				out = getJson(C.STATUS_SUCCESS_CODE, succeedCount + " SMS queued successfully and " + failedCount + " failed");
				console.log(succeedCount + " SMS queued successfully and " + failedCount + " failed");
				defer.resolve(out);
			})

	} else {
		out = U.getJson(C.STATUS_ERR_KNOWN_CODE, "Please provide mobile numbers and otps to sent");
		defer.reject(out);
	}
	return defer.promise;
}

//	TODO change SMS content
exports.sendOtp = function (numbers, otps) {
	var defer = Q.defer();
	var out;
	var succeedCount = 0;
	var failedCount = 0;
	var sendSMSPromise = [];
	if (numbers && numbers.length > 0 && otps && otps.length > 0) {
		if (numbers.length != otps.length) {
			out = U.getJson(C.STATUS_ERR_KNOWN_CODE, "Mobile number and otp count are not equal", { "numbers": numbers, "otps": otps });
			defer.reject(out);
		} else {
			for (var i = 0; i < numbers.length; i++) {
				var bodyText = otps[i] + "%20is%20your%20one%20time%20password%20(OTP)%20for%20logging%20into%20Neutron.";
				sendSMSPromise.push(sendSms(bodyText, numbers[i]));
			}
			Q.allSettled(sendSMSPromise)
				.then(function (results) {
					results.forEach(function (result) {
						if (result.state === "fulfilled") {
							succeedCount++;
						} else {
							var reason = result.reason;
							failedCount++;
							console.log("Sms sent failed : " + JSON.stringify(reason));
						}
					});
					out = getJson(C.STATUS_SUCCESS_CODE, succeedCount.length + " SMS queued successfully and " + failedCount.length + " failed");
					console.log(" SMS queued successfully and " + failedCount.length + " failed");
					defer.resolve(out);
				})
		}
	} else {
		out = getJson(C.STATUS_ERR_KNOWN_CODE, "Please provide mobile numbers and otps to sent");
		defer.reject(out);
	}
	return defer.promise;
}

//	TODO change SMS gateway
function sendSms(bodyText, number) {
	var defer = Q.defer();
	var out;
	var smsApiUrl = "https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=GvBJ66dBnUu7mX8J3ugqbg&senderid=BLMCAP&channel=2&DCS=0&flashsms=0&number=" + number
		+ "&text=" + bodyText + "&route=13";
	console.log("SMS url : " + smsApiUrl);
	var request = https.get(smsApiUrl,
		function (response) {
			if (response.statusCode == 200) {
				defer.resolve(response.status);
			} else {
				defer.reject(response.status);
			}
		});
	return defer.promise;
}

exports.log = function (message) {
	console.log(message);
}

exports.addNotifications = function (message, description,  type, student, staff) {

	var defer = Q.defer();
	var item = new Notification();
	item.message = message;
	item.description = description;
	item.timestamp = getTimeStamp();
	item.type = type;
	if(b.type == null) {
		item.staff = staff
	} else {
        item.student = student;
	}

    item.save(function(err, data) {
		if(!err) {
            if(data == null || data.length == 0) {
				d.reject('notification not added')
			} else {
				d.resolve('notification added')
			}
		} else {
           d.reject('notification not added')
		}
	})
	return defer.promise;
}

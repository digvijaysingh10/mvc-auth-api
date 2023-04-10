const nodemailer = require('nodemailer');

const sendMail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: "gmail",
            port: 578,
            secure: true,
            auth: {
                user: "deepak.singh@indicchain.com",
                pass: "pkzzwckxjkpoesks",
            },
        });
        await transporter.sendMail({
            from: "deepak.singh@indicchain.com",
            to: email,
            subject: subject/* "Registration link..." */,
            text: text/* `Click the link to verify : ${url}` */,
        });
        console.log("EMAIL SENT!");
    } catch (error) {
        console.log("EMAIL NOT SENT!");
        console.log(error);
		return error;
    }
};

module.exports = sendMail;
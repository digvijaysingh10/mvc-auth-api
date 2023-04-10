const sendMail = async (email, subject, text) => {
    try {
        nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error("FAILED TO CREATE TEST ACCOUNT" + err.message);
                return process.exit(1);
            }
            console.log("CREDENTIALS OBTAIEND");
        })
        const transporter = nodemialer.createTransporrt({
            host: account.smtp.host,
            // service: 'gmail',
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });
        await transporter.sendMail({
            from: account.user,
            to: email,
            subject: subject,
            text: text
        });
        console.log("EMAIL SENT!");
    } catch (error) {
        console.log("EMAIL NOT SENT!");
    }
    console.log(error);
}

module.exports = {
    sendMail
}
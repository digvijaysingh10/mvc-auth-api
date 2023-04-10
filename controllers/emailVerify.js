const sendMail = async (email, subject, text) => {
    try {
        const transporter = nodemialer.createTransporrt({
            host: smtp.gmail.com,
            service: gmail,
            port: Number(process.env.EMAIL_PORT),
            secure: true,
            auth: {
                user: 'digvijay.singh@indicchain.com',
                password: 'TestPass@123'
            }
        });
        await transporter.sendMail({
            from: 'digvijay.singh@indicchain.com',
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
const nodemailer = require('nodemailer');

module.exports = {
  async sendMail(email, subject, text) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'deepak.singh@indicchain.com',
          pass: 'pkzzwckxjkpoesks'
        }
      });

      const mailOptions = {
        from: 'deepak.singh@indicchain.com',
        to: email,
        subject: subject,
        text: text
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.response}`);
    } catch (error) {
      console.log(`Error sending email: ${error}`);
      throw error;
    }
  }
};

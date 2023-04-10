const nodemailer = require('nodemailer');

module.exports={
   async sendMail (email, subject, text){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: "deepak.singh@indicchain.com",
              pass: "pkzzwckxjkpoesks"
            }
          });
          
          var mailOptions = {   
            from: 'deepak.singh@indicchain.com',
            to: email,
            subject: "sub",
            text: "mail"
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}


// const sendMail = async (email) => {
//     // try {
//     //     const transporter = nodemailer.createTransport({
//     //         host: 'smtp.gmail.com',
//     //         service: "gmail",
//     //         port: 578,
//     //         secure: true,
//     //         auth: {
//     //             user: "deepak.singh@indicchain.com",
//     //             pass: "pkzzwckxjkpoesks",
//     //         },
//     //     });
//     //     await transporter.sendMail({
//     //         from: "deepak.singh@indicchain.com",
//     //         to: email,
//     //         subject: subject/* "Registration link..." */,
//     //         text: text/* `Click the link to verify : ${url}` */,
//     //     });
//     //     console.log("EMAIL SENT!");
//     // } catch (error) {
//         // console.log("EMAIL NOT SENT!");
//         // console.log(error);
// 		// return error;
//     // }
//     try {
        // const subject = "Sending Email using Node.js"
        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       user: "deepak.singh@indicchain.com",
        //       pass: "pkzzwckxjkpoesks"
        //     }
        //   });
          
        //   var mailOptions = {   
        //     from: 'deepak.singh@indicchain.com',
        //     to: email,
        //     subject: subject,
        //     text: 'That was easy!'
        //   };
          
        //   transporter.sendMail(mailOptions, function(error, info){
        //     if (error) {
        //       console.log(error);
        //     } else {
        //       console.log('Email sent: ' + info.response);
        //     }
        //   });
//     } catch (error) {
//         console.log("EMAIL NOT SENT!");
//         console.log(error);
// 		return error;
//     }
// };

// module.exports = sendMail;
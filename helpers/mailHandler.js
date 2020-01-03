const nodemailer = require("nodemailer");
const dotenv = require('dotenv')
dotenv.config()


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME, 
      pass: process.env.SMTP_PASSWORD 
    }
  });

  exports.confirmEmail = async (to, token) => {
    let url = process.env.APP_URL;

    try {

        let info = await transporter.sendMail({
            from: 'testmail@gmail.com', 
            to: to, 
            subject: "Welcome Message", 
            html: 'Thank you for registering on our platform.'
                + 'Please click on the following link, or paste this into your browser to confirm your email address within one hour of receiving it:\n\n'
                + `${url}/user/verifyEmail?verification=${token}&email=${to}\n\n`
                + 'Once again, Thanks.\n'
                    
          });

          console.log("Message sent: %s", info.messageId);
          return;
        
    } catch (error) {
        console.log(error);
        return;
    }
  
  }


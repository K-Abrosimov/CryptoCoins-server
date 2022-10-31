const nodemailer = require("nodemailer")

class Mailservice{

    constructor(){
    this.transporter = nodemailer.createTransport({
            service:'gmail',
            port: process.env.PORT,
            secure: false, 
            auth: {
              user: process.env.SMTP_USER, 
              pass: process.env.SMTP_PASSWORD,
            },
          })
    }

    async sendActivationMail(to,link){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Activation Mail",
            text: "",
            html: `<div><h3> Follow the link to activeta your accaunt </h3>
            
            <a href=${link}>${link}</a>
            </div>`
          })
    }
}

module.exports = new Mailservice();
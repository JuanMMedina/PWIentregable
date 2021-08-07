const nodemailer = require('nodemailer');


const send = async ({mail, asunto ="Gracias por registrarte!", cuerpo}) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            auth : {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });
        const info={
            to: mail,
            subjet: asunto,
            html: cuerpo,
        };
        const {messageId} = await transporter.sendMail(info);
        return messageId;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {send};
const nodemailer = require('nodemailer');

const sendEmail = (toEmail, token, role) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL, // generated ethereal user
      pass: process.env.USER_EMAIL_PW, // generated ethereal password
    },
  });

  transporter
    .sendMail({
      from: 'Tuku.com', // sender address
      to: toEmail, // list of receivers
      subject: 'verifikasi email', // Subject line
      // text: `Please activate your account with this link http://localhost:4000/v1/${role}/activation/${token}`, // plain text body
      text: `Please activate your account with this link ${process.env.FRONT_END_URL}/activationSuccess/?role=${role}&token=${token}`, // plain text body
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('error', err);
    });
};

module.exports = {
  sendEmail,
};

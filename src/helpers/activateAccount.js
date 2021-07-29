const nodemailer = require("nodemailer");

const sendEmail = (toEmail, token, role) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "chandrakqurniawan2002@gmail.com", // generated ethereal user
      pass: "kucinggila", // generated ethereal password
    },
  });

  transporter
    .sendMail({
      from: process.env.USER_EMAIL, // sender address
      to: toEmail, // list of receivers
      subject: "verifikasi email", // Subject line
      text: `Please activate your account with this link http://localhost:4000/v1/${role}/activation/${token}`, // plain text body
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("error", err);
    });
};

module.exports = {
  sendEmail,
};

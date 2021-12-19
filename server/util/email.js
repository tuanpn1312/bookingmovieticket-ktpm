const nodemailer = require("nodemailer");
const hogan = require("hogan.js");
const fs = require("fs");

const config = require("../config/email");

const template = fs.readFileSync(`${__dirname}/email.hjs`, "utf-8");
const compiledTemplate = hogan.compile(template);

module.exports.sendMail = (
  subject,
  email,
  name,
  title,
  description,
  cinema,
  movie,
  seat,
  room,
  price,
  showtime
) => {
  const transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    requireSSL: true,
    auth: {
      user: config.email,
      pass: config.password,
    },
  };

  let transporter = nodemailer.createTransport(transport);
  const mailOption = {
    from: '"Tix.vn👻" <noreply@wigroup.com>',
    to: email,
    subject: subject,
    html: compiledTemplate.render({
      name: name,
      title: title,
      description: description,
      cinema: cinema,
      movie: movie,
      seat: seat,
      room: room,
      price: price,
      showtime: showtime,
    }),
  };

  transporter.sendMail(mailOption, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

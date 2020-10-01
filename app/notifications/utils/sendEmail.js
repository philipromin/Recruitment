import * as nodemailer from 'nodemailer';

export const sendEmail = (subject, receiver, text) => {
  const transporter = nodemailer.createTransport({
    host: 'hotmail',
    auth: {
      user: 'rekryt123@outlook.com',
      pass: process.env.HOTMAIL_PASS,
    },
  });

  const options = {
    from: 'rekryt123@outlook.com',
    to: receiver,
    subject: subject,
    text: text,
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.error(err);
    }
    console.log('SENT' + info.response);
  });
};

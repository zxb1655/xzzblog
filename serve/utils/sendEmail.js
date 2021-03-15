//发送邮件
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = {
  email: {
    service: 'QQ', // 邮箱类别，我固定QQ
    user: '204006387@qq.com',
    pass: 'oqirfpwbsavdcabh',
  },
};

sendSmtpTransport = nodemailer.createTransport(
  smtpTransport({
    service: config.email.service,
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  })
);

var sendMail = function (replyObj) {
  sendSmtpTransport.sendMail(
    {
      from: config.email.user,
      to: replyObj.recipient, //收件人
      subject: `${replyObj.subject} 你好! 你有新邮件了, 请查收`, //发送的主题
      html: replyObj.html, //发送的html内容
    },
    function (error, response) {
      if (error) {
        console.log(error);
      }
      console.log('发送成功');
    }
  );
};

module.exports = sendMail;

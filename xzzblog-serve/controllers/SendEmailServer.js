const nodemailer = require("nodemailer");
const { NODEMAILER } = require("../config");

class sendService {
  static async reply(data) {
    const transporter = nodemailer.createTransport({
      host: "smtp.qq.com",
      port: 465, // SMTP 端口
      secure: true,
      auth: {
        user: NODEMAILER.email,
        pass: NODEMAILER.pass,
      },
    });
    const website = `http://192.168.16.100:8273/message`;
    var html = `
                    <h3>回复提醒</h3>
                    <p>您的留言已经通过审核</p>
                    <p>点击：<a href=${website} target="_blank">传送门</a>查看</p>
                `;
    const mailOptions = {
      to: data.email, // 接受者
      from: "204006387@qq.com", // 这里的from和上面的user 账号一样的
      subject: "回复提醒", // 标题
      html: html, // html 内容
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.info("邮箱发送成功");
      transporter.close();
    });
  }
}

module.exports = sendService;

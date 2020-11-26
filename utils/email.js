const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Shubham Anchaliya <shubhamanchaliya@example.com>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "ova.kreiger@ethereal.email",
        pass: "xqVT88jGYGW1VcwFVR",
      },
    });
  }

  // Send the actual email
  async send(subject, body) {
    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: body,
    };

    // Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
    console.log("message sent");
  }

  async sendWelcome() {
    await this.send(
      "Welcome to the The Loan Usurer!",
      " Hi, Welcome to The Loan Usurer, we're glad to have you"
    );
  }

  async sendPasswordReset() {
    await this.send(
      "Your password reset token (valid for only 10 minutes)",
      `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${this.url}`
    );
  }
};

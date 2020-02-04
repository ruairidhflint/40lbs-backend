const Mailgen = require('mailgen');
const transporter = require('./transporter');

async function sendEmailConfirmAccount(user, token, url) {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: '40lbs',
      link: `${url}`,
    },
  });
  const mail = {
    body: {
      name: user.email,
      intro:
        'You have received this email because you have registed to use 40lbs.',
      action: {
        instructions: 'Click the button below to confirm your account',
        button: {
          color: '#22BC66',
          text: 'Confirm your account',
          link: `${url}?token=${token}`,
        },
      },
      outro:
        'If you did not register to use 40lbs, no further action is required on your part.',
    },
  };
  const emailBody = mailGenerator.generate(mail);
  const emailText = mailGenerator.generatePlaintext(mail);

  const mailOption = {
    from: 'roryflintphoto@gmail.com',
    to: user.email,
    subject: '40lbs - Confirm your email',
    html: emailBody,
    text: emailText,
  };
  const confirmMail = await transporter().sendMail(mailOption);
  return confirmMail;
}

module.exports = {
  sendEmailConfirmAccount,
};

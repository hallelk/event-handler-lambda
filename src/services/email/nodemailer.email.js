const nodemailer = require("nodemailer");
const env = require('../../config');

const FROM_ALIAS = 'Oylo';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD
  },
});

const Templates = {
  WELCOME_SET_PASSWORD: {
    html: (model) => `
      <p style="color: blue; font-size: 16px;">
          Oylo! you need to set your password. 
          set it <a href='${model.setPasswordUrl}'>here</a> and enter.
      </p>`,
    subject: 'welcome to oylo!'
  }
};

async function sendTemplateEmail(to, templateName, templateModel, from) {
  console.log(`sending email to ${to} with template ${templateName}`);
  const template = Templates[templateName];

  if (!template) {
    throw new Error(`Template ${templateName} not defined`);
  }
  
  try {
    await sendEmail(to, template.subject, template.html(templateModel), from);
    return { message: 'email sent' };
  } catch (error) {
    console.error(error);
    throw new Error('Not implemented: sendTemplateEmail (nodemailer)');  
  }
}

async function sendEmail(to, subject, html, from = FROM_ALIAS) {
  const mailOptions = {
    from: `${FROM_ALIAS} <${env.SMTP_USER}>`, // TODO : shouldn't neccesarily be SMTP_USER
    to,
    subject,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return { message: 'email sent' };
  } catch (error) {
    console.error(error);
    throw new Error('Error sending email');
  }
}

// TODO : add attachments?
module.exports = { sendEmail, sendTemplateEmail };
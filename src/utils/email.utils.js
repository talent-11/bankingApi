const sgMail = require('@sendgrid/mail')

const sendTemplateEmail = (to, templateId, templateData) => {
  const msg = {
    to: to,
    from: 'info@goknack.com',
    templateId: templateId,
    dynamic_template_data: templateData
  }

  sgMail.send(msg, false, (err, result) => {
    if (err) {
      console.log({err})
    }
    console.log({result})
  });
}

const sendConfirmEmail = (to, token) => {
  const confirm_url = `http://localhost:3000/confirm?token=${token}`;
  const data = {
    year: new Date().getFullYear().toString(),
    confirm_url: confirm_url,
  }
  sendTemplateEmail(to, 'd-9f99d19da8de465e8c13f49b65b06d87', data);
}

module.exports = {
  sendConfirmEmail,
};
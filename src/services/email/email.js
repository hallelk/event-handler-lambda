const env = require('../../config');
const { sendEmail, sendTemplateEmail } = require('./nodemailer.email');

async function sendWelcomeSetPasswordEmail(to, name, setPasswordUrl) {
    return await sendTemplateEmail(
        to, 
        'WELCOME_SET_PASSWORD', 
        { 
            name : name ?? env.NO_RECIPIENT_NAME, 
            setPasswordUrl 
        }, 
        env.EMAIL_ADDRESS.HELLO
    );
}

async function sendReachoutEmail(from, message) {
    const attachments = [];

    if (message.debug) { 
        attachments.push({ 
            name: 'Debug_info.json', 
            content: Buffer.from(JSON.stringify(message.debug, null, 2)).toString('base64'), 
            contentType: 'application/json' 
        }); 
    }

    if (message.screenshot) { 
        attachments.push({ 
            name: 'Screenshot.jpg', 
            content: message.screenshot.split(',')[1], 
            contentType: 'image/jpeg' 
        }); 
    }

    return await sendTemplateEmail(
        env.EMAIL_ADDRESS.SUPPORT,
        'REACHOUT',
        {
            username: from,
            messageType: message.subject,
            message: message.message,
        },
        env.EMAIL_ADDRESS.SUPPORT,
        attachments,
        from
    );
}

module.exports = { sendEmail, sendReachoutEmail, sendWelcomeSetPasswordEmail };
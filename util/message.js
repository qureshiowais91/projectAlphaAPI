
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

const client = require('twilio')(accountSid, authToken, {
    lazyLoading: false,
});

 function notify(messageTo) {
    try {
         client.messages.create({
            body: 'Your Child is Absent Today',
            from: '+13343452962',
            to: messageTo,
        });
    } catch (error) {
        console.error('Error sending message:', error);
    }
}


module.exports = notify
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    // check if request id made by admin
    if (context.auth.token.admin !== true) {
        return {
            error: 'only admin can add other admin, LOL Hacker !!!'
        }
    }

    // get user and add custom claim (admin)
    // here data.email is passed from auth.js with named parameter
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true, //claim
        });
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an admin`
        }
    }).catch(err => {
        return "Error" + err;
    });
});

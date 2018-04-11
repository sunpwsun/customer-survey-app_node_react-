console.log('starting authRoutes.js');

const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/google', passport.authenticate('google', {

        scope : ['profile', 'email']
    
    }));

    app.get('/auth/google/callback', passport.authenticate('google'))


    // Need another route handler to give req.user once auth starts working??
    app.get('/api/currentUser', (req, res) => {

        // the user info is incomming from cookieSession containing the user document
        //      created by serializeUser/deserializeUser of passport.
        // ********** That is, the session remembers the user logged in before!!!!!
        res.send(req.user);

    });

}
// Route Handler to listen to the user access to the defined route "/auth/google".
//      => It is a kind of the first user request.
// Then it will try to send the info including "clientID" and "clientSecret"
//      for the configuration.

// We will not use a customized callback because we are using "passport" MW.
// The " passport~~~ " below is to process "send" authenticate response info to
//      google server, not back to the user.

// 1) 'google', the first argument defines that the strategy defined above
//      for the google strategis other than any other app.
// Therefore 'google' stands for containing the information about
//      Google's Strategy object. 

// 2) Google defines different properties for the auth.
//    'scope' defines the properties we want? to use for auth
//      ,among many different properties.
// In this app, we will use "profile" and "email" only.

// To get permission and To Receive the code
/*
app.get('/auth/google', passport.authenticate('google', {

    scope : ['profile', 'email']

}));
*/

// To auth after this app server receives the code from Google.
// Then after Google receives "code", it will exchange the code 
//      with the user profile. 
// Whever Google exchange "the code" with the user profile,
//      it produces "accessToken" which is generated by "callback"
//      of "Strategy" above.   
// app.get('/auth/google/callback', passport.authenticate('google'))

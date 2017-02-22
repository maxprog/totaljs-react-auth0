// ================================================
// AUTHORIZATION
// ================================================

var jwt = require('jsonwebtoken');

F.onAuthorize = function(req, res, flags, callback) {

    //Auth0 Part
    var bearerHeader = req.headers['authorization'] || req.query.token;
    var bearer = bearerHeader ? bearerHeader.split(' ') : [];
    var token = (bearer && bearer.length > 0) ? bearer[1] : null;
    var auth0UserID = null;

    if (token) {
        jwt.verify(token, F.config.AUTH0_SECRED_KEY, function(err, decoded) {
            if (err) {
                console.log(err)
                callback(false);
                return;
            }


            auth0UserID = decoded.sub;

        });
    } else {

        callback(false);
        return;
    }

    //End Auth0 Part

    //Check user in NoSQL DB
    NOSQL('users').find().make(function(builder) {
        builder.where('auth0_user_id', auth0UserID);
        builder.first();
        builder.callback(function(err, response) {
            if (!response)
                return callback(false);

            callback(true, response);
        });
    });
};
const { urlencoded } = require('express');

module.exports = (app) => {

    // okta callback
    app.get('/callback', async (req, res, next) => {
        try {
            console.log('Callback initiated');
            res.sendFile(__dirname + '/public/index.html');
        } catch (err) {
            return next(err)
        }
    })
};
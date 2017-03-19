/**
 * Created by mathias on 28/02/17.
 */

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send('está é a home');
    });
};